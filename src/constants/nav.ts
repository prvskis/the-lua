export type NavItem = {
  to: string
  label: string
  behavior?: 'scroll-bottom'
}

export const NAV_ITEMS = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/destination', label: 'DESTINATION' },
  { to: '/news', label: 'NEWS' },
  { to: '/train', label: 'THE TRAIN' },
  { to: '/contact', label: 'CONTACT', behavior: 'scroll-bottom' },
] as const satisfies readonly NavItem[]

