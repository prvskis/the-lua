#!/usr/bin/env python3
"""
Convert + resize images under a target folder to WebP, then update code references safely.

Key guarantees:
- Only processes images under --target (default: ./public/images), recursively.
- Skips directories: node_modules, .next, dist, build (if encountered under target).
- Only converts: .jpg, .jpeg, .png, .webp
- Resizes only if either dimension exceeds --max-size (default: 1800), keeping aspect ratio.
- Writes output in-place with .webp extension (overwrites existing .webp safely via temp file).
- Deletes original (non-webp) only if the new .webp was written successfully.
- Updates code references only when the referenced path resolves to a successfully converted image
  inside the target folder.

Requires: Pillow (PIL)
  pip install Pillow
"""

from __future__ import annotations

import argparse
import dataclasses
import os
import re
import shutil
import sys
import time
from pathlib import Path
from typing import Dict, Iterable, Iterator, List, Optional, Sequence, Set, Tuple

from PIL import Image, ImageOps


SKIP_DIR_NAMES: Set[str] = {"node_modules", ".next", "dist", "build"}
IMAGE_EXTS: Set[str] = {".jpg", ".jpeg", ".png", ".webp"}

CODE_EXTS: Set[str] = {
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".json",
    ".md",
    ".mdx",
    ".html",
    ".css",
    ".scss",
}


@dataclasses.dataclass(frozen=True)
class ConvertResult:
    src: Path
    dst: Path
    ok: bool
    error: Optional[str]
    old_px: Optional[Tuple[int, int]]
    new_px: Optional[Tuple[int, int]]
    old_bytes: Optional[int]
    new_bytes: Optional[int]
    resized: Optional[bool]
    overwritten: Optional[bool]


@dataclasses.dataclass
class FileUpdateResult:
    path: Path
    changed: bool
    replacements: int


def _norm_abs(p: Path) -> Path:
    # Normalize path for stable comparisons (Windows-safe).
    return Path(os.path.normcase(os.path.abspath(str(p))))


def iter_images(target: Path) -> Iterator[Path]:
    for root, dirnames, filenames in os.walk(target):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIR_NAMES]
        for name in filenames:
            p = Path(root) / name
            if p.suffix.lower() in IMAGE_EXTS:
                yield p


def iter_code_files(project_root: Path) -> Iterator[Path]:
    for root, dirnames, filenames in os.walk(project_root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIR_NAMES]
        for name in filenames:
            p = Path(root) / name
            if p.suffix.lower() in CODE_EXTS:
                yield p


def _safe_copy_backup(src: Path, backup_suffix: str) -> Path:
    dst = src.with_name(src.name + backup_suffix)
    # Avoid clobbering an existing backup.
    if dst.exists():
        ts = time.strftime("%Y%m%d-%H%M%S")
        dst = src.with_name(src.name + f"{backup_suffix}.{ts}")
    shutil.copy2(src, dst)
    return dst


def _compute_resize(old_w: int, old_h: int, max_size: int) -> Tuple[int, int, bool]:
    if old_w <= max_size and old_h <= max_size:
        return old_w, old_h, False
    scale = min(max_size / old_w, max_size / old_h)
    new_w = max(1, int(round(old_w * scale)))
    new_h = max(1, int(round(old_h * scale)))
    return new_w, new_h, True


def convert_one_image(
    src: Path,
    *,
    max_size: int,
    quality: int,
    dry_run: bool,
    backup: bool,
) -> ConvertResult:
    src = _norm_abs(src)
    dst = src.with_suffix(".webp")
    dst = _norm_abs(dst)

    try:
        old_bytes = src.stat().st_size
    except OSError:
        old_bytes = None

    try:
        with Image.open(src) as im0:
            im = ImageOps.exif_transpose(im0)
            old_px = (im.width, im.height)

            new_w, new_h, resized = _compute_resize(im.width, im.height, max_size)
            if resized:
                im = im.resize((new_w, new_h), resample=Image.Resampling.LANCZOS)
            new_px = (im.width, im.height)

            # Preserve alpha when present; otherwise convert to RGB.
            # WebP supports alpha in lossy mode; keep RGBA if needed.
            if im.mode in ("RGBA", "LA"):
                im = im.convert("RGBA")
            elif im.mode == "P":
                # Palette images may have transparency; convert to RGBA to be safe.
                im = im.convert("RGBA") if "transparency" in im.info else im.convert("RGB")
            elif im.mode != "RGB":
                im = im.convert("RGB")

            overwritten = dst.exists()

            if dry_run:
                return ConvertResult(
                    src=src,
                    dst=dst,
                    ok=True,
                    error=None,
                    old_px=old_px,
                    new_px=new_px,
                    old_bytes=old_bytes,
                    new_bytes=None,
                    resized=resized,
                    overwritten=overwritten,
                )

            if overwritten and backup:
                _safe_copy_backup(dst, ".bak")
            if backup and src.exists() and src.suffix.lower() != ".webp":
                _safe_copy_backup(src, ".bak")

            tmp = dst.with_name(dst.name + ".tmp")
            if tmp.exists():
                try:
                    tmp.unlink()
                except OSError:
                    pass

            # Save to temp then replace (safer than writing in-place).
            im.save(
                tmp,
                format="WEBP",
                quality=quality,
                method=6,
                optimize=True,
            )
            os.replace(tmp, dst)

        new_bytes = dst.stat().st_size if dst.exists() else None

        # Delete old only after successful write AND only if old wasn't already webp.
        if src.suffix.lower() != ".webp" and dst.exists():
            try:
                src.unlink()
            except OSError:
                # Keep going; conversion succeeded but cleanup failed.
                pass

        return ConvertResult(
            src=src,
            dst=dst,
            ok=True,
            error=None,
            old_px=old_px,
            new_px=new_px,
            old_bytes=old_bytes,
            new_bytes=new_bytes,
            resized=resized,
            overwritten=dst.exists(),
        )
    except Exception as e:
        return ConvertResult(
            src=src,
            dst=dst,
            ok=False,
            error=f"{type(e).__name__}: {e}",
            old_px=None,
            new_px=None,
            old_bytes=old_bytes,
            new_bytes=None,
            resized=None,
            overwritten=None,
        )


def human_bytes(n: Optional[int]) -> str:
    if n is None:
        return "?"
    units = ["B", "KB", "MB", "GB"]
    size = float(n)
    for u in units:
        if size < 1024 or u == units[-1]:
            if u == "B":
                return f"{int(size)} {u}"
            return f"{size:.2f} {u}"
        size /= 1024
    return f"{n} B"


def _split_query_hash(p: str) -> Tuple[str, str]:
    # Split path from suffix like ?v=... or #hash
    m = re.search(r"([?#].*)$", p)
    if not m:
        return p, ""
    return p[: m.start(1)], p[m.start(1) :]


def _resolve_referenced_path(
    raw_path: str,
    *,
    code_file: Path,
    project_root: Path,
) -> Optional[Path]:
    """
    Resolve a referenced path string to an absolute path within the repo, if possible.
    Supports:
    - "/images/..." (web root) -> "<project_root>/public/images/..."
    - "public/images/..." -> "<project_root>/public/images/..."
    - "./..."/"../..." (relative) -> resolved against the code_file directory
    """
    s = raw_path.strip()
    if not s:
        return None

    path_part, _suffix = _split_query_hash(s)
    # Normalize slashes for parsing; keep original for replacement later.
    path_part_norm = path_part.replace("\\", "/")

    if path_part_norm.startswith("/"):
        # Treat as public root path for common web apps.
        abs_path = project_root / "public" / path_part_norm.lstrip("/")
        return _norm_abs(abs_path)

    if path_part_norm.startswith("public/"):
        return _norm_abs(project_root / path_part_norm)

    if path_part_norm.startswith("./") or path_part_norm.startswith("../"):
        return _norm_abs((code_file.parent / path_part_norm).resolve())

    return None


def _to_webp_ref(raw_path: str) -> str:
    base, suffix = _split_query_hash(raw_path)
    # Replace only the last extension segment.
    return re.sub(r"\.(?:jpe?g|png)$", ".webp", base, flags=re.IGNORECASE) + suffix


def update_code_references(
    *,
    project_root: Path,
    target_dir: Path,
    successful_src_to_dst: Dict[Path, Path],
    dry_run: bool,
    backup: bool,
) -> Tuple[List[FileUpdateResult], Dict[Path, Set[Path]]]:
    """
    Returns:
    - list of per-file update results
    - reverse map: image_src -> set(code_files_updated)
    """
    target_dir_abs = _norm_abs(target_dir)

    # Track where each image is referenced and changed.
    updated_by_image: Dict[Path, Set[Path]] = {k: set() for k in successful_src_to_dst.keys()}

    # Find candidate path strings inside quotes/backticks and in CSS url(...)
    quoted_pat = re.compile(
        r"""(?P<q>["'`])(?P<p>[^"'`\n\r]+?\.(?:jpe?g|png)(?:[?#][^"'`\n\r]*)?)(?P=q)""",
        re.IGNORECASE,
    )
    css_url_pat = re.compile(
        r"""url\(\s*(?P<q>["']?)(?P<p>[^)"'\s]+?\.(?:jpe?g|png)(?:[?#][^)"'\s]*)?)(?P=q)\s*\)""",
        re.IGNORECASE,
    )

    results: List[FileUpdateResult] = []

    for code_file in iter_code_files(project_root):
        code_file = _norm_abs(code_file)
        try:
            text = code_file.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue

        replacements = 0
        changed_images: Set[Path] = set()

        def replace_match(m: re.Match) -> str:
            nonlocal replacements, changed_images
            raw = m.group("p")
            resolved = _resolve_referenced_path(raw, code_file=code_file, project_root=project_root)
            if resolved is None:
                return m.group(0)
            resolved = _norm_abs(resolved)

            # Only update if the resolved file is within target_dir and was successfully converted.
            try:
                if target_dir_abs not in resolved.parents and resolved != target_dir_abs:
                    return m.group(0)
            except Exception:
                return m.group(0)

            if resolved not in successful_src_to_dst:
                return m.group(0)

            new_ref = _to_webp_ref(raw)
            if new_ref == raw:
                return m.group(0)

            replacements += 1
            changed_images.add(resolved)
            # Rebuild original wrapper (quotes/backticks)
            if "q" in m.groupdict() and m.group("q"):
                q = m.group("q")
                return f"{q}{new_ref}{q}"
            # For css url() pattern, full match includes url(...) already; reconstruct it.
            if m.re is css_url_pat:
                q = m.group("q") or ""
                return f"url({q}{new_ref}{q})"
            return m.group(0)

        new_text = quoted_pat.sub(replace_match, text)
        new_text = css_url_pat.sub(replace_match, new_text)

        changed = new_text != text
        if changed:
            if dry_run:
                results.append(FileUpdateResult(path=code_file, changed=True, replacements=replacements))
            else:
                if backup:
                    _safe_copy_backup(code_file, ".bak")
                try:
                    code_file.write_text(new_text, encoding="utf-8")
                    results.append(FileUpdateResult(path=code_file, changed=True, replacements=replacements))
                except OSError:
                    # If write fails, mark as unchanged.
                    results.append(FileUpdateResult(path=code_file, changed=False, replacements=0))
                    changed_images.clear()
        else:
            results.append(FileUpdateResult(path=code_file, changed=False, replacements=0))

        for img in changed_images:
            updated_by_image.setdefault(img, set()).add(code_file)

    # Remove images that were never updated (keep report concise).
    updated_by_image = {k: v for k, v in updated_by_image.items() if v}
    return results, updated_by_image


def _rel(p: Path, root: Path) -> str:
    try:
        return str(p.relative_to(root)).replace("\\", "/")
    except Exception:
        return str(p).replace("\\", "/")


def main(argv: Sequence[str]) -> int:
    ap = argparse.ArgumentParser(description="Convert images under a folder to .webp and update code references safely.")
    ap.add_argument("--target", default="./public/images", help='Target images folder (default: "./public/images")')
    ap.add_argument("--project-root", default=".", help='Project root folder (default: ".")')
    ap.add_argument("--dry-run", action="store_true", help="Preview changes without writing files.")
    ap.add_argument("--quality", type=int, default=85, help="WebP quality (default: 85, recommended 82–88).")
    ap.add_argument("--max-size", type=int, default=1800, help="Max width/height in pixels (default: 1800).")
    ap.add_argument("--backup", action="store_true", help="Create .bak copies before overwriting/deleting.")
    args = ap.parse_args(list(argv))

    project_root = _norm_abs(Path(args.project_root))
    target_dir = _norm_abs((project_root / args.target).resolve() if not Path(args.target).is_absolute() else Path(args.target))
    target_dir = _norm_abs(target_dir)

    if not target_dir.exists() or not target_dir.is_dir():
        print(f"[ERROR] Target folder not found: {target_dir}")
        return 2

    if args.quality < 1 or args.quality > 100:
        print("[ERROR] --quality must be in 1..100")
        return 2

    if args.max_size < 16:
        print("[ERROR] --max-size is too small")
        return 2

    print(f"[INFO] Project root: {_rel(project_root, project_root)} ({project_root})")
    print(f"[INFO] Target dir  : {_rel(target_dir, project_root)}")
    print(f"[INFO] Mode       : {'DRY-RUN' if args.dry_run else 'WRITE'}")
    print(f"[INFO] WebP quality: {args.quality}")
    print(f"[INFO] Max size   : {args.max_size}px")
    print(f"[INFO] Backup     : {'ON' if args.backup else 'OFF'}")
    print("")

    images = sorted(iter_images(target_dir), key=lambda p: str(p).lower())
    if not images:
        print("[INFO] No images found to process.")
        return 0

    print(f"[PLAN] Images to consider: {len(images)}")

    results: List[ConvertResult] = []
    ok_map: Dict[Path, Path] = {}
    failed: List[ConvertResult] = []

    for img in images:
        r = convert_one_image(
            img,
            max_size=args.max_size,
            quality=args.quality,
            dry_run=args.dry_run,
            backup=args.backup,
        )
        results.append(r)
        if r.ok:
            # Only update code references for non-webp sources (since .webp references don't change).
            if r.src.suffix.lower() in {".jpg", ".jpeg", ".png"}:
                ok_map[_norm_abs(r.src)] = _norm_abs(r.dst)
        else:
            failed.append(r)

        # Per-image log.
        if r.ok:
            old_px = f"{r.old_px[0]}x{r.old_px[1]}" if r.old_px else "?"
            new_px = f"{r.new_px[0]}x{r.new_px[1]}" if r.new_px else "?"
            old_b = human_bytes(r.old_bytes)
            new_b = human_bytes(r.new_bytes) if not args.dry_run else "?"
            action = "convert" if r.src.suffix.lower() != ".webp" else "re-encode"
            print(
                f"[OK] {action}: {_rel(r.src, project_root)} -> {_rel(r.dst, project_root)}"
                f" | px {old_px} -> {new_px}"
                f" | size {old_b} -> {new_b}"
                f"{' | resized' if r.resized else ''}"
                f"{' | overwrite' if r.overwritten else ''}"
            )
        else:
            print(f"[ERR] {_rel(r.src, project_root)}: {r.error}")

    print("")
    print(f"[SUMMARY] Converted OK: {sum(1 for r in results if r.ok)} / {len(results)}")
    if failed:
        print(f"[SUMMARY] Failed      : {len(failed)}")
    print(f"[PLAN] Code refs eligible to update (images converted .jpg/.jpeg/.png): {len(ok_map)}")
    print("")

    # Update code references.
    if ok_map:
        file_updates, updated_by_image = update_code_references(
            project_root=project_root,
            target_dir=target_dir,
            successful_src_to_dst=ok_map,
            dry_run=args.dry_run,
            backup=args.backup,
        )

        changed_files = [u for u in file_updates if u.changed and u.replacements > 0]
        total_repls = sum(u.replacements for u in changed_files)

        print(f"[SUMMARY] Code files scanned : {len(file_updates)}")
        print(f"[SUMMARY] Code files updated : {len(changed_files)}")
        print(f"[SUMMARY] Total replacements : {total_repls}")
        if changed_files:
            print("")
            print("[UPDATED FILES]")
            for u in changed_files:
                print(f"- {_rel(u.path, project_root)} ({u.replacements} replacements)")

        if updated_by_image:
            print("")
            print("[MAPPING] image -> code files touched")
            # Print a concise mapping (cap per image).
            for img_src, code_files in sorted(updated_by_image.items(), key=lambda kv: _rel(kv[0], project_root)):
                img_dst = ok_map.get(_norm_abs(img_src))
                print(f"- {_rel(img_src, project_root)} -> {_rel(img_dst, project_root) if img_dst else '?'}")
                for cf in sorted(code_files, key=lambda p: _rel(p, project_root))[:10]:
                    print(f"  - {_rel(cf, project_root)}")
                if len(code_files) > 10:
                    print(f"  - ... and {len(code_files) - 10} more")
    else:
        print("[INFO] No .jpg/.jpeg/.png conversions succeeded, skipping code reference updates.")

    print("")
    if args.dry_run:
        print("[DONE] DRY-RUN completed. Re-run without --dry-run to apply changes.")
    else:
        print("[DONE] Conversion + reference update completed.")
        if failed:
            print("[NOTE] Some images failed; their references were NOT updated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))

