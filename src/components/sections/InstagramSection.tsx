import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/layout/Section'

const NAVY = '#222458'
const INSTAGRAM_KEYS = ['ig-1', 'ig-2', 'ig-3', 'ig-4', 'ig-5'] as const
const LOOPED_INSTAGRAM_KEYS = [...INSTAGRAM_KEYS, ...INSTAGRAM_KEYS]

function RevealOnScroll({
  children,
  delay = 0,
  y = 20,
  amount = 0.12,
  duration = 0.6,
  initialScale = 0.992,
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

export function InstagramSection() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const firstSlideRef = useRef<HTMLDivElement | null>(null)
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [stepWidth, setStepWidth] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.08 })

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !firstSlideRef.current) return

      const styles = window.getComputedStyle(trackRef.current)
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '0')
      const width = firstSlideRef.current.getBoundingClientRect().width
      setStepWidth(width + gap)
    }

    measure()
    window.addEventListener('resize', measure)

    return () => window.removeEventListener('resize', measure)
  }, [])

  const handleNext = () => {
    if (isAnimating || !stepWidth) return
    setIsAnimating(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const handleTransitionEnd = () => {
    if (currentIndex < INSTAGRAM_KEYS.length) {
      setIsAnimating(false)
      return
    }

    setTransitionEnabled(false)
    setCurrentIndex(0)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionEnabled(true)
        setIsAnimating(false)
      })
    })
  }

  return (
    <Section>
      <RevealOnScroll delay={0.04} y={18} amount={0.08} duration={0.55}>
        <div className="mt-[-70px] text-center">
          <div className="mx-auto flex max-w-[620px] items-center justify-center gap-4 text-black/30">
            <span className="mt-[2px] inline-block h-px w-40 bg-black/20" />
            <span className="text-[40px] text-[#D9B07A]">✦</span>
            <span className="mt-[2px] inline-block h-px w-40 bg-black/20" />
          </div>

          <p className="font-inter text-[30px] font-bold tracking-[0.06em]" style={{ color: NAVY }}>
            INSTAGRAM
          </p>
          <h2 className="font-regal text-[45px] leading-none tracking-[0.01em] md:text-[50px]" style={{ color: NAVY }}>
            <span className="font-inter">@</span>THELUATRAIN
          </h2>

          <button className="group inline-flex items-center gap-2 text-[16px] tracking-[0.12em] text-[#2A2B5E]/70 transition-colors hover:text-[#2A2B5E]">
            follow us
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span className="absolute mt-6 block h-px w-0 bg-[#D9B07A] transition-all duration-300 group-hover:w-[90px]" />
          </button>
        </div>
      </RevealOnScroll>

      <div ref={galleryRef} className="relative left-1/2 mt-8 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1800px] overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              ref={trackRef}
              className="flex gap-4"
              style={{
                transform: `translateX(-${currentIndex * stepWidth}px)`,
                transition: transitionEnabled ? 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {LOOPED_INSTAGRAM_KEYS.map((k, idx) => (
                <motion.div
                  key={`${k}-${idx}`}
                  ref={idx === 0 ? firstSlideRef : undefined}
                  className="shrink-0 basis-[80%] overflow-hidden sm:basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-4rem)/5)]"
                  initial={{ opacity: 0, y: 26 }}
                  animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.18 + (idx % INSTAGRAM_KEYS.length) * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <img
                    src={`/images/home/${k}.jpg`}
                    alt={k}
                    className="h-full w-full object-cover transition-[filter] duration-300 ease-out hover:brightness-[1.03]"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>

        <motion.button
          type="button"
          onClick={handleNext}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={isGalleryInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
          aria-label="Next"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px] text-[#222458]"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.25"
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden="true"
          >
            <path d="M9.5 5.5 16 12l-6.5 6.5" />
          </svg>
        </motion.button>
      </div>
    </Section>
  )
}
