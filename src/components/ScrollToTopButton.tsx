import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export function ScrollToTopButton() {
  const [show, setShow] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          key="scroll-to-top"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.94 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-[#E7D5BB]/80 text-[#F6EFE4] shadow-[0_18px_34px_rgba(34,36,88,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_38px_rgba(34,36,88,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
          style={{ backgroundColor: 'rgba(34, 36, 88, 0.9)' }}
          aria-label="Scroll to top"
        >
          <span className="sr-only">Scroll to top</span>
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.25"
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden="true"
          >
            <path d="M5.5 14.5 12 8l6.5 6.5" />
          </svg>
          <span
            className="pointer-events-none absolute inset-1 rounded-full border border-white/10"
            aria-hidden="true"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
