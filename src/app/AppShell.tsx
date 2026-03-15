import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { ScrollToTopButton } from '@/components/ScrollToTopButton'

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

export function AppShell() {
  const { pathname } = useLocation()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-white text-black">
      <ScrollToTopOnRouteChange />
      <Header />
      <ScrollToTopButton />
      <main className="pt-16">
        <AnimatePresence mode="wait" initial={false}>
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
  )
}
