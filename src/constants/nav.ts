export type NavItem = {
  to: string
  label: string
  behavior?: 'scroll-bottom'
}

export const NAV_ITEMS = [
  { to: '/', label: 'HOME' },
  { to: '/train', label: 'SERVICES' },
  { to: '/destination', label: 'DESTINATION' },
  { to: '/news', label: 'NEWS' },
  { to: '/about', label: 'ABOUT' },
  { to: '/contact', label: 'CONTACT', behavior: 'scroll-bottom' },
] as const satisfies readonly NavItem[]

