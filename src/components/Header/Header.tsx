import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Container } from "@/components/layout/Container"
import { NAV_ITEMS } from "@/constants/nav"

const NAVY = "#1E1F4B"

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        [
          "group relative transition",
          isActive ? "text-black font-semibold" : "text-black/70 hover:text-black",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <span className="relative inline-block">
          {label}
          <span
            className={[
              "absolute left-1/2 -bottom-1 h-px -translate-x-1/2 bg-black transition-all duration-300",
              isActive ? "w-full" : "w-0 group-hover:w-full",
            ].join(" ")}
          />
        </span>
      )}
    </NavLink>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const mid = Math.ceil(NAV_ITEMS.length / 2)
  const leftNav = NAV_ITEMS.slice(0, mid)
  const rightNav = NAV_ITEMS.slice(mid)

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm"
          : "bg-gradient-to-b from-white/85 via-white/40 to-white/0 backdrop-blur-sm py-10",
      ].join(" ")}
    >
      <Container
        className={[
          "grid items-center transition-all duration-500 max-w-[1400px]",
          "grid-cols-[auto_1fr_auto_1fr_auto]",
          scrolled ? "h-16" : "h-24",
        ].join(" ")}
      >
        {/* MENU */}
        <button className="flex items-center gap-2 text-[12px] tracking-[0.22em] text-black/70">
          <span className="text-lg">≡</span>
          MENU
        </button>

        {/* LEFT NAV */}
        <nav
          className={[
            "flex items-center justify-end transition-all duration-500",
            scrolled ? "gap-8 text-[12px]" : "gap-10 text-[14px]",
            "tracking-[0.28em]",
          ].join(" ")}
        >
          {leftNav.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        {/* LOGO */}
        <div className="flex justify-center px-20">
          <img
            src="/logos/logo-set.png"
            alt="THE LUA"
            className={[
              "transition-all duration-500",
              scrolled ? "h-12" : "h-20",
            ].join(" ")}
          />
        </div>

        {/* RIGHT NAV */}
        <nav
          className={[
            "flex items-center justify-start transition-all duration-500",
            scrolled ? "gap-8 text-[12px]" : "gap-10 text-[14px]",
            "tracking-[0.28em]",
          ].join(" ")}
        >
          {rightNav.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 justify-end">
          <button className="text-[11px] tracking-[0.22em] text-black/60">
            EN ^
          </button>

          <button
            className="rounded-lg px-5 py-2 text-[11px] tracking-[0.22em] text-white transition hover:opacity-95"
            style={{ backgroundColor: NAVY }}
          >
            BOOK
          </button>
        </div>
      </Container>
    </header>
  )
}