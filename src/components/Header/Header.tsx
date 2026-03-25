import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { NavLink, useLocation } from "react-router-dom"
import { useBookingModal } from "@/components/booking/BookingModalProvider"
import { FiChevronDown } from "react-icons/fi"
import { Container } from "@/components/layout/Container"
import { NAV_ITEMS, type NavItem as NavItemData } from "@/constants/nav"

const NAVY = "#1E1F4B"

type MenuShortcut = {
  id: string
  label: string
  description: string
  action?: "scroll-top" | "scroll-bottom"
}

const MENU_SHORTCUTS: readonly MenuShortcut[] = [
  {
    id: "journey-highlights",
    label: "JOURNEY HIGHLIGHTS",
    description: "Signature route, scenery, and slow-luxury moments onboard.",
  },
  {
    id: "suites-cabins",
    label: "SUITES & CABINS",
    description: "Private rooms, amenities, and the comfort of each stay.",
  },
  {
    id: "dining-on-board",
    label: "DINING ON BOARD",
    description: "Seasonal menus, lounge service, and refined train dining.",
  },
  {
    id: "contact-concierge",
    label: "CONTACT CONCIERGE",
    description: "Jump to the contact area at the bottom of this page.",
    action: "scroll-bottom",
  },
  {
    id: "back-to-top",
    label: "BACK TO TOP",
    description: "Return to the top of the current page.",
    action: "scroll-top",
  },
] as const

function scrollToPageBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  })
}

function scrollToPageTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

function handleMenuShortcut(action?: MenuShortcut["action"]) {
  if (action === "scroll-bottom") {
    scrollToPageBottom()
  }

  if (action === "scroll-top") {
    scrollToPageTop()
  }
}

function NavLabel({
  label,
  active = false,
}: {
  label: string
  active?: boolean
}) {
  return (
    <span className="relative inline-grid whitespace-nowrap">
      <span className="invisible pointer-events-none font-semibold">{label}</span>
      <span className={["absolute inset-0", active ? "font-semibold" : ""].join(" ")}>{label}</span>
    </span>
  )
}

function NavItem({ to, label, behavior }: NavItemData) {
  if (behavior === "scroll-bottom") {
    return (
      <button
        type="button"
        onClick={scrollToPageBottom}
        className="group relative text-black/70 transition hover:text-black"
      >
        <span className="relative inline-block">
          <NavLabel label={label} />
          <span className="absolute left-1/2 -bottom-1 h-px w-0 -translate-x-1/2 bg-black transition-all duration-300 group-hover:w-full" />
        </span>
      </button>
    )
  }

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
          <NavLabel label={label} active={isActive} />
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const { openBookingModal } = useBookingModal()
  const prefersReducedMotion = useReducedMotion()
  const { pathname } = useLocation()
  const menuRef = useRef<HTMLDivElement | null>(null)
  const languageMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setLanguageMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen && !languageMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        setLanguageMenuOpen(false)
      }
    }

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (!menuRef.current?.contains(target)) {
        setMenuOpen(false)
      }
      if (!languageMenuRef.current?.contains(target)) {
        setLanguageMenuOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("mousedown", onPointerDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("mousedown", onPointerDown)
    }
  }, [languageMenuOpen, menuOpen])

  const mid = Math.ceil(NAV_ITEMS.length / 2)
  const leftNav = NAV_ITEMS.slice(0, mid)
  const rightNav = NAV_ITEMS.slice(mid)

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm"
          : "bg-gradient-to-b from-white/80 via-white/40 to-white/0 backdrop-blur-sm py-10",
      ].join(" ")}
    >
      <Container
        className={[
          "grid items-center transition-all duration-500 max-w-[1400px]",
          "grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
          scrolled ? "h-16" : "h-24",
        ].join(" ")}
      >
        <div className="flex min-w-0 items-center justify-start gap-10 lg:gap-[100px]">
          {/* MENU */}
          <div ref={menuRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 text-[12px] tracking-[0.22em] text-black/70 transition hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-controls="site-menu-panel"
            >
              <span className="text-lg">≡</span>
              MENU
            </button>

            <AnimatePresence>
              {menuOpen ? (
                <motion.div
                  id="site-menu-panel"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-full z-[60] mt-4 w-[320px] overflow-hidden rounded-[18px] border border-[#E7D5BB]/90 bg-[#F8F2E8] p-2 shadow-[0_20px_50px_rgba(17,22,63,0.18)]"
                  role="menu"
                  aria-label="Site menu"
                >
                  <div className="border-b border-[#E7D5BB]/80 px-4 pb-3 pt-2">
                    <p className="font-inter text-[11px] tracking-[0.28em] text-[#222458]/55">
                      QUICK ACCESS
                    </p>
                  </div>

                  <div className="grid gap-1 pt-2">
                    {MENU_SHORTCUTS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        disabled={!item.action}
                        onClick={() => {
                          if (!item.action) return
                          setMenuOpen(false)
                          window.setTimeout(() => handleMenuShortcut(item.action), 80)
                        }}
                        className={[
                          "flex items-start justify-between gap-4 rounded-[12px] px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2",
                          item.action
                            ? "hover:bg-white/85"
                            : "cursor-not-allowed opacity-55",
                        ].join(" ")}
                        role="menuitem"
                        aria-disabled={!item.action}
                      >
                        <span className="min-w-0">
                          <span className="block font-inter text-[12px] tracking-[0.18em] text-[#222458]">
                            {item.label}
                          </span>
                          <span className="mt-1 block font-inter text-[12px] leading-5 text-[#222458]/62">
                            {item.description}
                          </span>
                        </span>

                        <span className="pt-0.5 font-inter text-[10px] tracking-[0.18em] text-[#D9B07A]">
                          {item.action ? "OPEN" : "SOON"}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* LEFT NAV */}
          <nav
            className={[
              "flex min-w-0 items-center justify-end transition-all duration-500",
              scrolled ? "gap-8 text-[12px]" : "gap-10 text-[14px]",
              "tracking-[0.28em]",
            ].join(" ")}
          >
            {leftNav.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
        </div>

        {/* LOGO */}
        <div className="flex justify-center px-8 lg:px-10">
          <div
            className={[
              "relative overflow-hidden transition-all duration-500",
              scrolled ? "h-12 w-[188px]" : "h-[100px] w-[188px]",
            ].join(" ")}
          >
            <img
              src="/logos/logo-set.png"
              alt="THE LUA"
              className={[
                "absolute left-1/2 top-0 max-w-none -translate-x-1/2 object-contain transition-all duration-500",
                scrolled ? "translate-y-[1px] w-[40px]" : "translate-y-0  w-[55px]",
              ].join(" ")}
            />
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-end gap-5 lg:gap-[100px]">
          {/* RIGHT NAV */}
          <nav
            className={[
              "flex min-w-0 items-center justify-start transition-all duration-500",
              scrolled ? "gap-8 text-[12px]" : "gap-10 text-[14px]",
              "tracking-[0.28em]",
            ].join(" ")}
          >
            {rightNav.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="shrink-0 flex items-center gap-4 justify-end">
            <div ref={languageMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setLanguageMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 text-[11px] tracking-[0.22em] text-black/60 transition hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                aria-haspopup="menu"
                aria-expanded={languageMenuOpen}
                aria-controls="language-menu-panel"
              >
                EN
                <FiChevronDown
                  className={["h-3.5 w-3.5 transition-transform duration-200", languageMenuOpen ? "rotate-180" : ""].join(" ")}
                  strokeWidth={2.5}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {languageMenuOpen ? (
                  <motion.div
                    id="language-menu-panel"
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-full z-[60] mt-4 w-[220px] overflow-hidden rounded-[18px] border border-[#E7D5BB]/90 bg-[#F8F2E8] p-2 shadow-[0_20px_50px_rgba(17,22,63,0.18)]"
                    role="menu"
                    aria-label="Language selector"
                  >
                    <div className="border-b border-[#E7D5BB]/80 px-4 pb-3 pt-2">
                      <p className="font-inter text-[11px] tracking-[0.28em] text-[#222458]/55">
                        LANGUAGE
                      </p>
                    </div>

                    <div className="grid gap-1 pt-2">
                      {[
                        { code: "EN", label: "English", active: true },
                        { code: "VI", label: "Vietnamese" },
                        { code: "FR", label: "French" },
                        { code: "JP", label: "Japanese" },
                      ].map((language) => (
                        <button
                          key={language.code}
                          type="button"
                          disabled={!language.active}
                          onClick={() => setLanguageMenuOpen(false)}
                          className={[
                            "flex items-center justify-between rounded-[12px] px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2",
                            language.active
                              ? "bg-white/90 shadow-[0_8px_18px_rgba(34,36,88,0.08)]"
                              : "cursor-not-allowed opacity-55",
                          ].join(" ")}
                          role="menuitem"
                          aria-disabled={!language.active}
                        >
                          <span>
                            <span className="block font-inter text-[12px] tracking-[0.18em] text-[#222458]">
                              {language.code}
                            </span>
                            <span className="mt-1 block font-inter text-[12px] leading-5 text-[#222458]/62">
                              {language.label}
                            </span>
                          </span>

                          <span className="font-inter text-[10px] tracking-[0.18em] text-[#D9B07A]">
                            {language.active ? "CURRENT" : "SOON"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() =>
                openBookingModal({
                  origin: `Header booking button (${pathname})`,
                })
              }
              className="font-inter group relative overflow-hidden rounded-tr-[20px] border border-transparent px-5 py-1.5 text-[16px] font-semibold tracking-[0.1em] text-white transition-all duration-300 hover:border-[#2A2B5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
              style={{ backgroundColor: NAVY }}
            >
              <span className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">BOOK</span>
              <span className="absolute inset-0 scale-x-0 origin-left bg-white transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
              <span className="absolute inset-0 z-20 flex items-center justify-center text-[#2A2B5E] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                BOOK
              </span>
            </button>
          </div>
        </div>
      </Container>

    </header>
  )
}