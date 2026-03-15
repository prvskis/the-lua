import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function RevealOnScroll({
  children,
  delay = 0,
  y = 24,
  amount = 0.16,
  duration = 0.7,
  initialScale = 1,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  amount?: number
  duration?: number
  initialScale?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, scale: initialScale }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: initialScale }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
