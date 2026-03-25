import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Header } from '@/components/Header/Header'
import { BookingModalProvider } from '@/components/booking/BookingModalProvider'
import { Footer } from '@/components/Footer/Footer'
import { ScrollToTopButton } from '@/components/ScrollToTopButton'

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return

    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export function AppShell() {
  const { pathname } = useLocation()
  const prefersReducedMotion = useReducedMotion()

  return (
    <BookingModalProvider>
      <div className="min-h-screen bg-white text-navy">
        <ScrollToTopOnRouteChange />
        <Header />
        <ScrollToTopButton />
        <main className="pt-16">
          <AnimatePresence mode="wait" initial={!prefersReducedMotion}>
            <motion.div
              key={pathname}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </BookingModalProvider>
  )
}
