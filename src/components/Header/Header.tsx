import { NavLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { NAV_ITEMS } from '@/constants/nav'

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        {/* Left: Menu */}
        <button
          type="button"
          className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] text-black/70 hover:text-black"
        >
          <span className="text-base leading-none">≡</span>
          MENU
        </button>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.28em] text-black/60">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [
                  'transition hover:text-black',
                  isActive ? 'text-black underline underline-offset-8 decoration-black/40' : '',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Lang + Book */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-[11px] tracking-[0.22em] text-black/60 hover:text-black"
          >
            EN ▾
          </button>

          <button
            type="button"
            className="rounded-full bg-[#1E1F4B] px-4 py-2 text-[11px] tracking-[0.22em] text-white hover:opacity-95"
          >
            BOOK
          </button>
        </div>
      </Container>
    </header>
  )
}

