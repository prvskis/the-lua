import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useBookingModal } from '@/components/booking/BookingModalProvider'
import { ImageFrame } from '@/components/ImageFrame'
import { Container } from '@/components/layout/Container'
import { TextLineReveal } from '@/components/TextLineReveal'
import { Section } from '@/components/layout/Section'
import { InstagramSection } from '@/components/sections/InstagramSection'

const NAVY = '#222458'
const PAPER = '#F6EFE4'
const GOLD = '#F2E6D3'

const HERO_SLIDES = [
  { kind: 'video', src: '/videos/hero-1.mp4' },
  { kind: 'image', src: '/images/home/hero-2.webp', alt: 'THE LUA Hero 2' },
  { kind: 'image', src: '/images/home/hero-3.webp', alt: 'THE LUA Hero 3' },
] as const

const INSIDE_GALLERY_IMAGES = [
  { src: '/images/home/inside-1.webp', alt: 'Inside 1' },
  { src: '/images/home/inside-2.webp', alt: 'Inside 2' },
  { src: '/images/home/inside-3.webp', alt: 'Inside 3' },
  { src: '/images/home/inside-4.webp', alt: 'Inside 4' },
  { src: '/images/home/inside-5.webp', alt: 'Inside 5' },
  { src: '/images/home/inside-7.webp', alt: 'Inside 7' },
  { src: '/images/home/inside-8.webp', alt: 'Inside 8' },
  { src: '/images/home/inside-9.webp', alt: 'Inside 9' },
  { src: '/images/home/inside-10.webp', alt: 'Inside 10' },
] as const

const LOOPED_INSIDE_GALLERY_IMAGES = [...INSIDE_GALLERY_IMAGES, ...INSIDE_GALLERY_IMAGES]

function DisplayTitle({
  children,
  center,
  className = '',
}: {
  children: React.ReactNode
  center?: boolean
  className?: string
}) {
  return (
    <h2
      className={[
        'font-regal text-[64px] leading-none tracking-[0.01px]',
        center ? 'text-center' : '',
        className,
      ].join(' ')}
      style={{ color: NAVY }}
    >
      {children}
    </h2>
  )
}

function RevealOnScroll({
  children,
  delay = 0,
  y = 28,
  amount = 0.18,
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

type TripCard = {
  img: string
  title: string
  route: string
  metaLeft: string
  metaRight: string
  desc: string
  shape: 'left' | 'mid' | 'right'
}

function TripCardView({
  c,
  onBook,
  onViewMore,
}: {
  c: TripCard
  onBook: (card: TripCard) => void
  onViewMore: () => void
}) {
  // quarter circle top-right (đúng vibe)
  const imgRadius =
    c.shape === 'left'
      ? 'rounded-tr-[140px]' // bạn có thể tăng 160 nếu muốn
      : c.shape === 'mid'
        ? 'rounded-tr-[140px]'
        : 'rounded-tr-[140px]'

  return (
    <article className="group text-[#2A2B5E]">
      {/* IMAGE */}
      <ImageFrame
        src={c.img}
        alt={c.title}
        ratio="aspect-[1.02/1]"
        className={`overflow-hidden bg-black/5 ${imgRadius} transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]`}
        imageClassName="transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]"
      />

      {/* TITLE */}
      <h3 className="font-inter text-[21px] font-extrabold tracking-[0.01em] mt-6" style={{ color: NAVY }}>
        {c.title}
      </h3>

      {/* ROUTE */}
      <p className="font-inter font-[400] mt-3 text-[15px] tracking-[0.01em]" style={{ color: NAVY }}>
        {c.route.split('✦').map((segment, idx, arr) => (
          <span key={`${c.title}-${idx}`}>
            {segment.trim()}
            {idx < arr.length - 1 && <span className="mx-0.5 text-[#D9B07A]">✦</span>}
          </span>
        ))}
      </p>

      {/* divider line under route */}
      <div className="mt-4 h-px w-full bg-black/70" />

      {/* META ROW (two sides + center icon) */}
      <div className="font-inter font-[400] flex items-center py-2 text-[15px]" style={{ color: NAVY }}>
        <span>{c.metaLeft}</span>

        <span className="inline-flex items-center mx-6 justify-center rounded-lg">
          <img src="/icons/train.svg" alt="" className="h-7 w-7 object-contain" aria-hidden="true" />
        </span>

        <span>{c.metaRight}</span>
      </div>

      {/* divider line under meta */}
      <div className="h-px w-full bg-black/70" />

      {/* DESC */}
      <p className="font-inter font-[400] mt-2 text-[15px] leading-9 text-navy">
        {c.desc}
      </p>

      {/* ACTIONS */}
      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onViewMore}
          className="font-inter text-[15px] tracking-[0.01em] underline underline-offset-8 decoration-[#2A2B5E]/50 transition-all duration-300 hover:text-[#2A2B5E] hover:decoration-[#2A2B5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
          style={{ color: NAVY }}
        >
          View more
        </button>

        <button
          type="button"
          onClick={() => onBook(c)}
          className="group/book relative overflow-hidden rounded-tr-[20px] border border-transparent bg-[#1E1F4B] px-5 py-1.5 text-[16px] font-semibold tracking-[0.1em] text-white transition-all duration-300 hover:border-[#2A2B5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
        >
          <span className="relative z-10 transition-opacity duration-300 group-hover/book:opacity-0">BOOK</span>
          <span className="absolute inset-0 scale-x-0 origin-left bg-white transition-transform duration-300 group-hover/book:scale-x-100" aria-hidden />
          <span className="absolute inset-0 z-20 flex items-center justify-center text-[#2A2B5E] opacity-0 transition-opacity duration-300 group-hover/book:opacity-100" aria-hidden>
            BOOK
          </span>
        </button>
      </div>
    </article>
  )
}

export function HomePage() {
  const navigate = useNavigate()
  const { openBookingModal } = useBookingModal()
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [insideGalleryIndex, setInsideGalleryIndex] = useState(0)
  const [insideGalleryStepWidth, setInsideGalleryStepWidth] = useState(0)
  const [insideGalleryTransitionEnabled, setInsideGalleryTransitionEnabled] = useState(true)
  const [isInsideGalleryAnimating, setIsInsideGalleryAnimating] = useState(false)
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(2)
  const [testimonialStepWidth, setTestimonialStepWidth] = useState(0)
  const [isTestimonialAnimating, setIsTestimonialAnimating] = useState(false)
  const [isTestimonialTransitionEnabled, setIsTestimonialTransitionEnabled] = useState(true)
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)
  const immersiveSectionRef = useRef<HTMLDivElement | null>(null)
  const insideGalleryTrackRef = useRef<HTMLDivElement | null>(null)
  const firstInsideGallerySlideRef = useRef<HTMLDivElement | null>(null)
  const insideGallerySectionRef = useRef<HTMLDivElement | null>(null)
  const testimonialTrackRef = useRef<HTMLDivElement | null>(null)
  const firstTestimonialRef = useRef<HTMLDivElement | null>(null)
  const isInsideGalleryInView = useInView(insideGallerySectionRef, { once: true, amount: 0.08 })

  const getRevealProps = (delay = 0) =>
    ({
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.18 },
      transition: {
        duration: 1,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    })

  const getStaggerDelay = (baseDelay: number, index: number, step = 0.08) =>
    baseDelay + index * step

  const handleTripBooking = (trip: TripCard) => {
    openBookingModal({
      origin: 'Home immersive destinations',
      preferredJourney: trip.title,
      route: trip.route.replaceAll('✦', ' - '),
      travelWindow: trip.metaRight,
    })
  }

  const testimonials = [
    {
      title: 'AMAZING TRIP IN VIET NAM',
      body:
        'Coming here with my family. I have to say that this is one of the most amazing trip that i have experienced in 2026 and it was a truly memorable journey. The train was comfortable, elegant, and very well organized. The staff were attentive and made us feel welcome throughout the trip. We especially enjoyed watching the scenery together and sharing meals on board. It was relaxing, meaningful, and a beautiful way to experience Vietnam. I would highly recommend The Lua for families looking for a refined yet comfortable journey.',
      name: 'Timothee Chalamet',
      date: '11/3/2026',
      avatar: '/images/home/avatar-1.webp',
    },
    {
      title: 'VIET NAM IS SO AWSOME',
      body:
        "The food here is so good. I can't stop myself eating all the Vietnamese foods. Wish i had more time to enjoy this amazing trip. The staff is very kind and i really love there humor. They kinda funny and take care of me in a little things. My husband even made a plan for the next trip in THE LUA, he even invited his friends and his co-workers. can’t deny the immersive culture they gave us and we learned a lots about Viet Nam through this trip. I will come back soon to have another amazing trip in THE LUA.",
      name: 'Conan Gray',
      date: '10/2/2026',
      avatar: '/images/home/avatar-2.webp',
    },
    {
      title: 'A BEAUTIFUL WAY TO SEE VIET NAM',
      body:
        'This journey felt very different from a normal holiday. Everything moved at a gentle pace and gave us time to really enjoy each moment. I loved how the scenery changed through the window during the day, and how peaceful the atmosphere became in the evening. The design of the train was elegant, the service was thoughtful, and every part of the experience felt carefully prepared. It gave us a deeper connection to Viet Nam, not only through the places we passed, but through the food, the stories, and the small details on board. I would absolutely choose THE LUA again.',
      name: 'Lily Collins',
      date: '20/3/2026',
      avatar: '/images/home/avatar-1.webp',
    },
  ] as const

  const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  const goToHeroSlide = (idx: number) => {
    const next = ((idx % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length
    setActiveHeroSlide(next)
  }

  const goNextHeroSlide = () => setActiveHeroSlide((i) => (i + 1) % HERO_SLIDES.length)
  const scrollToImmersiveSection = () =>
    immersiveSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const goToNextTestimonial = () => {
    if (isTestimonialAnimating || !testimonialStepWidth) return
    setIsTestimonialAnimating(true)
    setActiveTestimonialIndex((prev) => prev + 1)
  }
  const goToPreviousTestimonial = () => {
    if (isTestimonialAnimating || !testimonialStepWidth) return
    setIsTestimonialAnimating(true)
    setActiveTestimonialIndex((prev) => prev - 1)
  }
  const goToTestimonial = (idx: number) => {
    if (isTestimonialAnimating || !testimonialStepWidth) return

    const normalized = activeTestimonialIndex % testimonials.length
    if (idx === normalized) return

    setIsTestimonialAnimating(true)
    setActiveTestimonialIndex(testimonials.length + idx)
  }

  const handleInsideGalleryNext = () => {
    if (isInsideGalleryAnimating || !insideGalleryStepWidth) return
    setIsInsideGalleryAnimating(true)
    setInsideGalleryIndex((prev) => prev + 1)
  }

  useEffect(() => {
    const active = HERO_SLIDES[activeHeroSlide]
    const v = heroVideoRef.current

    if (active.kind === 'video') {
      if (v) {
        v.currentTime = 0
        const p = v.play()
        if (p && typeof (p as Promise<void>).catch === 'function') {
          ;(p as Promise<void>).catch(() => {})
        }
      }
      return
    }

    // Ensure video stops when not active
    if (v && !v.paused) v.pause()

    const t = window.setTimeout(goNextHeroSlide, 7000)
    return () => window.clearTimeout(t)
  }, [activeHeroSlide])

  useLayoutEffect(() => {
    const measureInsideGallery = () => {
      if (!insideGalleryTrackRef.current || !firstInsideGallerySlideRef.current) return

      const slides = insideGalleryTrackRef.current.children
      const firstSlide = slides[0] as HTMLElement | undefined
      const secondSlide = slides[1] as HTMLElement | undefined

      if (firstSlide && secondSlide) {
        setInsideGalleryStepWidth(secondSlide.offsetLeft - firstSlide.offsetLeft)
        return
      }

      setInsideGalleryStepWidth(firstInsideGallerySlideRef.current.getBoundingClientRect().width)
    }

    measureInsideGallery()

    window.addEventListener('resize', measureInsideGallery)

    return () => window.removeEventListener('resize', measureInsideGallery)
  }, [])

  useLayoutEffect(() => {
    const measure = () => {
      if (!testimonialTrackRef.current || !firstTestimonialRef.current) return

      const styles = window.getComputedStyle(testimonialTrackRef.current)
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '0')
      const width = firstTestimonialRef.current.getBoundingClientRect().width
      setTestimonialStepWidth(width + gap)
    }

    measure()
    window.addEventListener('resize', measure)

    return () => window.removeEventListener('resize', measure)
  }, [])

  const handleInsideGalleryTransitionEnd = () => {
    if (insideGalleryIndex < INSIDE_GALLERY_IMAGES.length) {
      setIsInsideGalleryAnimating(false)
      return
    }

    setInsideGalleryTransitionEnabled(false)
    setInsideGalleryIndex(0)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setInsideGalleryTransitionEnabled(true)
        setIsInsideGalleryAnimating(false)
      })
    })
  }

  const handleTestimonialTransitionEnd = () => {
    const total = testimonials.length

    if (activeTestimonialIndex >= total * 2 || activeTestimonialIndex < total) {
      setIsTestimonialTransitionEnabled(false)
      setActiveTestimonialIndex((prev) => {
        if (prev >= total * 2) return prev - total
        if (prev < total) return prev + total
        return prev
      })

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTestimonialTransitionEnabled(true)
          setIsTestimonialAnimating(false)
        })
      })

      return
    }

    setIsTestimonialAnimating(false)
  }

  const trips: TripCard[] = [
    {
      img: '/images/home/explore-1.webp',
      title: 'FROM HA NOI TO HO CHI MINH',
      route: 'Ha Noi ✦ Hoi An ✦ Da Nang ✦ Ho Chi Minh city',
      metaLeft: 'One way',
      metaRight: '6 days 7 nights',
      desc: 'Set off on a six-day, seven-night on way journey from Ha Noi to Ho Chi Minh city',
      shape: 'left',
    },
    {
      img: '/images/home/explore-2.webp',
      title: 'FROM HO CHI MINH TO HA NOI',
      route: 'Ho Chi Minh city ✦ Da Nang ✦ Hoi An ✦ Ha Noi',
      metaLeft: 'One way',
      metaRight: '6 days 7 nights',
      desc: 'Set off on a six-day, seven-night on way journey from Ho Chi Minh to Ha Noi capital',
      shape: 'mid',
    },
    {
      img: '/images/home/explore-3.webp',
      title: 'FROM HA NOI TO LAN HA',
      route: 'Ha Noi ✦ Ha Long ✦ Lan Ha',
      metaLeft: 'One way',
      metaRight: '6 days 7 nights',
      desc: 'Set off on a six-day, seven-night on way journey from Ha Noi to Lan Ha',
      shape: 'right',
    },
  ]

  return (
    <div>
      {/* HERO */}
      <section className="relative -mt-16 h-[calc(92vh+4rem)] min-h-[calc(640px+4rem)] w-full overflow-hidden">
        {/* Slide 1: video */}
        <div
          className={[
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            activeHeroSlide === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none',
          ].join(' ')}
          aria-hidden={activeHeroSlide !== 0}
        >
          <video
            ref={heroVideoRef}
            className="absolute inset-0 block h-full w-full object-cover"
            style={{ scale: 1.15 }}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={() => {
              if (activeHeroSlide === 0) goNextHeroSlide()
            }}
            aria-hidden="true"
          >
            <source src="/videos/hero-1.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Slide 2: image */}
        <div
          className={[
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            activeHeroSlide === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none',
          ].join(' ')}
          aria-hidden={activeHeroSlide !== 1}
        >
          <img
            src="/images/home/hero-2.webp"
            alt="THE LUA Hero 2"
            className="absolute inset-0 block h-full w-full object-cover"
            style={{ scale: 1.15 }}
          />
        </div>

        {/* Slide 3: image */}
        <div
          className={[
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            activeHeroSlide === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none',
          ].join(' ')}
          aria-hidden={activeHeroSlide !== 2}
        >
          <img
            src="/images/home/hero-3.webp"
            alt="THE LUA Hero 3"
            className="absolute inset-0 block h-full w-full object-cover"
            style={{ scale: 1.15 }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#11163F]/18 via-transparent to-[#11163F]/34" />

        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-end pb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Indicators */}
          <div className="mb-3 flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToHeroSlide(idx)}
                className={[
                  'h-[3px] rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                  idx === activeHeroSlide ? 'w-24 bg-white/90' : 'w-16 bg-white/40 hover:w-20 hover:bg-white/55',
                ].join(' ')}
                aria-label={`Go to hero slide ${idx + 1}`}
                aria-current={idx === activeHeroSlide}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToImmersiveSection}
            className="group mt-2 flex flex-col items-center text-white/85 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span className="font-inter text-[18px] font-regular tracking-[1em]">SCROLL TO DISCOVER</span>
            <span className="mt-2 text-white/75 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
        </motion.div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <motion.div {...getRevealProps(0.04)}>
            <DisplayTitle center>WHAT&apos;S INSIDE</DisplayTitle>
            <p className="font-inter font-[400] mx-auto mt-4 max-w-[800px] text-center text-[24px] leading-8 text-[#2A2B5E]/70 tracking-[0.06em]" style={{ color: NAVY }}>
              An immersive journey through Vietnam's culture, movement, <br />
              and living heritage.
            </p>
          </motion.div>
        </div>

        <div ref={insideGallerySectionRef} className="relative left-1/2 mt-12 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1800px] overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={isInsideGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  ref={insideGalleryTrackRef}
                  className="flex gap-6"
                  style={{
                    transform: `translateX(-${insideGalleryIndex * insideGalleryStepWidth}px)`,
                    transition: insideGalleryTransitionEnabled
                      ? 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)'
                      : 'none',
                  }}
                  onTransitionEnd={handleInsideGalleryTransitionEnd}
                >
                  {LOOPED_INSIDE_GALLERY_IMAGES.map((image, idx) => (
                    <motion.div
                      key={`${image.src}-${idx}`}
                      ref={idx === 0 ? firstInsideGallerySlideRef : undefined}
                      className="group shrink-0 basis-[80%] sm:basis-[calc((100%_-_1.5rem)/2)] md:basis-[calc((100%_-_6rem)/5)]"
                      initial={{ opacity: 0, y: 26 }}
                      animate={isInsideGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.18 + (idx % INSIDE_GALLERY_IMAGES.length) * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <ImageFrame
                        src={image.src}
                        alt={image.alt}
                        ratio="aspect-[1/1.5]"
                        className="rounded-tr-[140px] bg-black/5 shadow-[0_18px_40px_rgba(34,36,88,0.06)] transition-shadow duration-300 group-hover:shadow-[0_22px_42px_rgba(34,36,88,0.1)]"
                        imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={handleInsideGalleryNext}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={isInsideGalleryInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
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
      </section>

      {/* IMMERSIVE VIETNAM */}
      <Section className="bg-[#F6EFE4]">
        <div
          ref={immersiveSectionRef}
          className="grid lg:grid-cols-[0.95fr_0.95fr] lg:items-start"
        >
          <div>
            <motion.div {...getRevealProps(0.02)}>
              <DisplayTitle>IMMERSIVE VIETNAM</DisplayTitle>

              <p
                className="font-inter text-[24px] font-semibold"
                style={{ color: NAVY }}
              >
                VIETNAM TRAIN AND IMMERSIVE CULTURE
              </p>

            </motion.div>

            <div className="mt-3 space-y-5 max-w-[500px] tracking-[0.04em] font-inter font-[400] text-[16px] leading-9" style={{ color: NAVY }}>
              <TextLineReveal
                as="p"
                text="From North to South, THE LUA redefines the art of travel through a moving cultural experience shaped by light, craft, cuisine, and landscape."
                className="tracking-[0.04em] font-inter font-[400] text-[16px] leading-9"
                style={{ color: NAVY }}
                delay={0.08}
                lineDelay={0.09}
              />

              <TextLineReveal
                as="p"
                text="Step aboard a journey where every detail is intentionally composed — where handcrafted materials meet contemporary design, where regional flavors unfold with the changing scenery, and where each window becomes a cinematic frame of Vietnam in motion."
                className="tracking-[0.04em] font-inter font-[400] text-[16px] leading-9"
                style={{ color: NAVY }}
                delay={0.16}
                lineDelay={0.09}
              />
            </div>
          </div>

          <div className="flex flex-col items-end">
            <motion.div
              className="origin-top-right overflow-hidden rounded-tr-[140px] bg-black/5 shadow-[0_30px_60px_rgba(34,36,88,0.08)] transition-transform duration-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 2.5,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
            >
              <img
                src="/images/home/immersive.webp"
                alt="Immersive"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03] max-h-[600px] max-w-[400]"
              />
            </motion.div>

            <motion.div className="mt-5" {...getRevealProps(0.18)}>
              <button
                type="button"
                onClick={() => navigate('/about#the-story')}
                className="group relative overflow-hidden rounded-none rounded-tr-[20px] border border-[#2A2B5E] bg-transparent px-5 py-2 text-[16px] font-semibold tracking-[0.06em] text-[#2A2B5E] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(34,36,88,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
              >
                <span className="relative z-10">
                  SEE MORE
                </span>
                <span className="absolute inset-0 scale-x-0 origin-left bg-[#2A2B5E] transition-transform duration-300 group-hover:scale-x-100" />
                <span className="absolute inset-0 z-20 flex items-center justify-center text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  SEE MORE
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </Section>            

      {/* EXPLORE THE IMMERSIVE */}
      <Section>
        <motion.div className="flex flex-col gap-4" {...getRevealProps(0.05)}>
          <p className="font-inter text-[24px] font-bold tracking-[0.01em]" style={{ color: NAVY }}>
            EXPLORE THE IMMERSIVE DESTINATIONS
          </p>
          <p className="font-inter font-[400] text-[16px] leading-8 text-[#2A2B5E]/70 tracking-[0.06em]" style={{ color: NAVY }}>
            Rooted in the immersive of classic rail travel and shaped <br />
            by contemporary comfort
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {trips.map((t, idx) => (
            <RevealOnScroll
              key={t.title}
              delay={getStaggerDelay(0.1, idx, 0.12)}
              y={28}
              amount={0.05}
              duration={0.7}
              initialScale={0.988}
            >
              <TripCardView
                c={t}
                onBook={handleTripBooking}
                onViewMore={() => navigate('/train#immersive-vietnam')}
              />
            </RevealOnScroll>
          ))}
        </div>

        <motion.div className="mt-10 flex justify-end" {...getRevealProps(0.12)}>
          <button
            type="button"
            onClick={() => navigate('/destination#the-journey')}
            className="group relative overflow-hidden rounded-tr-[20px] border border-[#2A2B5E] px-5 py-1.5 text-[16px] font-semibold tracking-[0.18em] text-[#2A2B5E] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(34,36,88,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
          >
            <span className="relative z-10">SEE ALL</span>

            <span className="absolute inset-0 scale-x-0 origin-left bg-[#2A2B5E] transition-transform duration-300 group-hover:scale-x-100" />

            <span className="absolute inset-0 z-20 flex items-center justify-center text-white opacity-0 transition group-hover:opacity-100">
              SEE ALL
            </span>
          </button>
        </motion.div>
      </Section>

      {/* OFFER BANNER */}
      <section>
        <div
          className="
            w-full
            text-white
            overflow-hidden
            bg-no-repeat
            bg-center
            bg-cover
            mb-40
          "
          style={{
            backgroundImage: "url('/images/home/background-offer.webp')",
            transform: 'scale(1.003)',
          }}
        >
          <Container>
            <div className="max-w-[640px] py-10 transition-transform duration-500 lg:py-[60px]">
              <p className="font-regal text-[50px] tracking-[0.01em] leading-9">
                SPECIAL SPRING OFFER <br />
                EARLY BIRD SPRING OFFER
                <span className="mx-3 font-inter text-[54px] font-bold tracking-[0.02em]">
                  10%
                </span>
              </p>

              <div className="mt-6 space-y-2 font-inter text-[16px] text-white/80">
                <p>
                  <strong className="font-bold text-white">Travel Period:</strong> January 2026 - March 2026
                </p>
                <p>
                  <strong className="font-bold text-white">Validity For Booking From</strong> now until 10 February 2026
                </p>
                <p>
                  <strong className="font-bold text-white">Apply code:</strong> NY24673
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    origin: 'Home special spring offer',
                    preferredJourney: 'Special Spring Offer',
                    travelWindow: 'January 2026 - March 2026',
                  })
                }
                className="group relative mt-8 overflow-hidden rounded-tr-[20px] border-1.5 border-transparent px-5 py-1.5 text-[16px] font-semibold tracking-[0.05em] transition-all duration-300 hover:border-[#F2E6D3] hover:shadow-[0_0_0_1px_rgba(242,230,211,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2E6D3] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{ backgroundColor: GOLD, color: NAVY, borderColor: GOLD }}
              >
                <span className="relative z-10 transition-opacity duration-300 group-hover:opacity-0" style={{ color: NAVY }}>BOOK</span>
                <span className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ backgroundColor: NAVY }} aria-hidden />
                <span className="absolute inset-0 z-20 flex items-center justify-center text-[#F2E6D3] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                  BOOK
                </span>
              </button>
            </div>
          </Container>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14 mb-10" style={{ backgroundColor: PAPER }}>
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <motion.div {...getRevealProps(0.04)}>
            <DisplayTitle center>A COLLECTION OF FIVE-STAR MOMENTS</DisplayTitle>
          </motion.div>

          {/* BAND with texture behind cards */}
          <div className="relative mt-8">
            {/* texture band (height follows cards via absolute inset) */}
            <div
              className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/images/home/texture-pattern.webp')",
                backgroundSize: '100% 100%',
                opacity: 1,
              }}
            />

            <div className="relative overflow-hidden">
              <div
                ref={testimonialTrackRef}
                className="relative flex items-stretch gap-10 h-full"
                style={{
                  transform: `translateX(-${activeTestimonialIndex * testimonialStepWidth}px)`,
                  transition: isTestimonialTransitionEnabled
                    ? 'transform 780ms cubic-bezier(0.22, 1, 0.36, 1)'
                    : 'none',
                }}
                onTransitionEnd={handleTestimonialTransitionEnd}
              >
                {loopedTestimonials.map((t, idx) => (
                  <div
                    key={`${t.title}-${idx}`}
                    ref={idx === 0 ? firstTestimonialRef : undefined}
                    className="flex shrink-0 basis-full items-stretch lg:basis-[calc((100%_-_2.5rem)/2)]"
                  >
                    <article className="relative flex min-h-full w-full flex-col rounded-[6px] border border-black/10 bg-white px-6 py-8 shadow-[0_16px_40px_rgba(34,36,88,0.06)] transition-[box-shadow,border-color] duration-300 hover:border-[#D9B07A]/35 hover:shadow-[0_24px_50px_rgba(34,36,88,0.1)]">
                      <div className="flex-1">
                        {/* stars */}
                        <div className="mb-6 flex items-center gap-2 text-[#D9B07A]" aria-label="5 out of 5 stars">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              viewBox="0 0 24 24"
                              className="h-6 w-6"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M12 3.5c.3 0 .6.18.74.46l2.47 5.13 5.66.82c.66.1.93.91.45 1.38l-4.1 3.99.97 5.63c.11.66-.58 1.16-1.17.85L12 19.8l-5.02 2.64c-.59.31-1.28-.19-1.17-.85l.97-5.63-4.1-3.99c-.48-.47-.21-1.28.45-1.38l5.66-.82 2.47-5.13c.14-.28.44-.46.74-.46z"/>
                            </svg>
                          ))}
                        </div>

                        <h3 className="mt-2 font-inter text-[24px] font-extrabold tracking-[0.02em] text-navy/80">
                          {t.title}
                        </h3>

                        <p className="mt-1 font-inter text-[16px] leading-6 text-navy/65">
                          {t.body}
                        </p>
                      </div>

                      {/* author */}
                      <div className="mt-8 flex items-center gap-4">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-black/10">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        </div>
                        <div>
                          <div className="text-[15px] font-semibold text-navy/55">{t.name}</div>
                          <div className="text-[14px] text-navy/30">{t.date}</div>
                        </div>
                      </div>

                      {/* small diamond decoration bottom-right */}
                      <div className="pointer-events-none absolute bottom-4 right-6 text-[30px] text-[#D9B07A]">
                        ✦
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* controls */}
          <motion.div className="mt-12 flex items-center justify-center gap-5 text-[#2A2B5E]/60" {...getRevealProps(0.22)}>
            <button
              type="button"
              onClick={goToPreviousTestimonial}
              className="text-3xl leading-none transition-all duration-300 hover:scale-110 hover:text-[#2A2B5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
              aria-label="Previous"
            >
              ‹
            </button>

            <div className="flex items-center gap-3 mt-2">
              {testimonials.map((testimonial, idx) => (
                <button
                  key={testimonial.title}
                  type="button"
                  onClick={() => goToTestimonial(idx)}
                  className={[
                    'h-3 w-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2',
                    idx === activeTestimonialIndex % testimonials.length
                      ? 'scale-110 bg-[#2A2B5E]'
                      : 'bg-[#D9B07A]/45 hover:bg-[#D9B07A]/70',
                  ].join(' ')}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-current={idx === activeTestimonialIndex % testimonials.length}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNextTestimonial}
              className="text-3xl leading-none transition-all duration-300 hover:scale-110 hover:text-[#2A2B5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
              aria-label="Next"
            >
              ›
            </button>
          </motion.div>
        </div>
      </section>

      <InstagramSection />

      {/* TEXTURE DIVIDER */}
      <div className="mb-20 w-full bg-white py-8">
        <div className="w-full overflow-hidden" aria-hidden="true">
          <img
            src="/images/home/texture-section.webp"
            alt=""
            className="h-full w-full object-cover transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  )
}