import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBookingModal } from '@/components/booking/BookingModalProvider'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { Section } from '@/components/layout/Section'
import { InstagramSection } from '@/components/sections/InstagramSection'
import { TextLineReveal } from '@/components/TextLineReveal'
import { FiChevronDown } from 'react-icons/fi'

const NAVY = '#222458'
const GOLD = '#D9B07A'

type Journey = {
  title: string
  route: string
  tripType: string
  experienceType: string
  departureDate: string
  duration: string
  description: string
  image: string
}

function getRouteEndpoints(route: string) {
  const segments = route.split('•').map((segment) => segment.trim())
  return {
    departureCity: segments[0] ?? '',
    arrivalCity: segments[segments.length - 1] ?? '',
  }
}

function getNightLabel(duration: string) {
  const match = duration.match(/(\d+)\s*nights?/i)
  if (!match) return 'See all'

  const nightCount = Number.parseInt(match[1], 10)
  return `${nightCount} ${nightCount === 1 ? 'night' : 'nights'}`
}

function DisplayTitle({
  children,
  center,
  className = '',
}: {
  children: ReactNode
  center?: boolean
  className?: string
}) {
  return (
    <h2
      className={[
        'font-regal text-[44px] leading-none tracking-[0.01em] md:text-[56px] lg:text-[64px]',
        center ? 'text-center' : '',
        className,
      ].join(' ')}
      style={{ color: NAVY }}
    >
      {children}
    </h2>
  )
}

function PageEyebrow() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-inter text-[18px] tracking-[0.04em] md:text-[22px]">
      <span className="text-[36px] leading-none" style={{ color: GOLD }}>
        ✦
      </span>
      <span className="font-bold" style={{ color: NAVY }}>
        THE LUA TRAIN
      </span>
      <span className="text-[25px] font-light leading-none text-[#232566]/80">|</span>
      <span className="font-normal" style={{ color: NAVY }}>
        THE DESTINATIONS
      </span>
    </div>
  )
}

function NewsletterField({
  label,
  placeholder,
  type = 'text',
  as = 'input',
  options = [],
  className = '',
}: {
  label: string
  placeholder: string
  type?: string
  as?: 'input' | 'select'
  options?: string[]
  className?: string
}) {
  return (
    <label className={['relative block', className].join(' ')}>
      <span
        className="absolute left-3 top-0 z-10 -translate-y-[52%] bg-[#F2E6D3] px-2.5 font-inter text-[14px] leading-none md:text-[15px]"
        style={{ color: NAVY }}
      >
        {label}
      </span>

      {as === 'select' ? (
        <div className="relative">
          <select
            defaultValue=""
            className="h-[40px] w-full appearance-none rounded-tr-[28px] border-[1px] border-[#2E2A67] bg-transparent px-5 pr-14 font-inter text-[15px] text-[#6D6387] outline-none placeholder:text-[#B6AEBD] md:h-[44px] md:text-[16px]"
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-6 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#D2AF7A]">
            <FiChevronDown className="h-[18px] w-[18px] md:h-[22px] md:w-[22px]" strokeWidth={2.5} aria-hidden />
          </span>
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="h-[40px] w-full rounded-tr-[28px] border-[1px] border-[#2E2A67] bg-transparent px-5 font-inter text-[15px] text-[#6D6387] outline-none placeholder:text-[#B6AEBD] md:h-[44px] md:text-[16px]"
        />
      )}
    </label>
  )
}

function TrainMiniIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-10 w-10"
    >
      <rect x="6" y="6" width="36" height="36" rx="8" />
      <rect x="12" y="12" width="10" height="12" rx="2" />
      <rect x="26" y="12" width="10" height="12" rx="2" />
      <circle cx="16" cy="34" r="2" />
      <circle cx="32" cy="34" r="2" />
    </svg>
  )
}

function JourneyCard({
  journey,
  onBook,
  onViewMore,
}: {
  journey: Journey
  onBook: (journey: Journey) => void
  onViewMore: () => void
}) {
  return (
    <article className="group text-[#2A2B5E]">
      <div className="overflow-hidden rounded-tr-[140px] bg-black/5 transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
        <img
          src={journey.image}
          alt={journey.title}
          className="w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]"
        />
      </div>

      <h3 className="mt-6 font-inter text-[18px] font-extrabold tracking-[0em] md:text-[20px]" style={{ color: NAVY }}>
        {journey.title}
      </h3>

      <p className="mt-3 font-inter text-[14px] tracking-[0.01em]" style={{ color: NAVY }}>
        {journey.route.split('•').map((segment, idx, arr) => (
          <span key={`${journey.title}-${idx}`}>
            {segment.trim()}
            {idx < arr.length - 1 && <span className="mx-1 text-[#D9B07A]">✦</span>}
          </span>
        ))}
      </p>

      <div className="mt-4 h-px w-full bg-black/70" />

      <div className="flex items-center py-2 font-inter text-[16px]" style={{ color: NAVY }}>
        <span>{journey.tripType}</span>
        <span className="mx-6 inline-flex items-center justify-center rounded-lg">
          <TrainMiniIcon />
        </span>
        <span>{journey.duration}</span>
      </div>

      <div className="h-px w-full bg-black/70" />

      <p className="mt-2 font-inter text-[16px] leading-9 text-black">{journey.description}</p>

      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onViewMore}
          className="font-inter text-[16px] tracking-[0.01em] underline underline-offset-8 decoration-[#2A2B5E]/50 transition-all duration-300 hover:text-[#2A2B5E] hover:decoration-[#2A2B5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
          style={{ color: NAVY }}
        >
          View more
        </button>

        <button
          type="button"
          onClick={() => onBook(journey)}
          className="group/book relative overflow-hidden rounded-tr-[20px] border border-transparent bg-[#1E1F4B] px-6 py-1.5 text-[16px] font-semibold tracking-[0.1em] text-white transition-all duration-300 hover:border-[#2A2B5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
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

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-inter text-[14px] text-[#232566]/80 md:text-[15px]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-[40px] w-full appearance-none rounded-tr-[22px] border border-[#8F84A8] bg-transparent px-4 pr-10 font-inter text-[15px] text-[#232566]/80 transition-all duration-300 hover:border-[#2A2B5E]/60 hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2 md:text-[16px]"
        >
          {options.map((option) => (
            <option key={`${label}-${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#C5A874]">
          <FiChevronDown className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </span>
      </div>
    </div>
  )
}

function StayOnTrackSection() {
  return (
    <Section className="pt-0">
      <div className="mx-auto max-w-[1180px] rounded-tr-[110px] bg-[#F2E6D3] px-7 py-9 sm:px-10 lg:px-12 lg:py-10">
        <h2 className="font-regal text-[42px] leading-none tracking-[0.01em] md:text-[64px]" style={{ color: NAVY }}>
          STAY ON TRACK
        </h2>

        <p className="mt-5 max-w-[760px] font-inter text-[16px] leading-8" style={{ color: `${NAVY}CC` }}>
          Discover the Orient Express newsletter - explore at your leisure and be the first to discover upcoming
          routes, inspiring itineraries, and new ways to travel with wonder.
        </p>

        <p className="mt-2 font-inter text-[16px] font-regular" style={{ color: NAVY }}>
          * Required fields
        </p>

        <div className="mt-4 grid gap-5 md:grid-cols-[0.7fr_1.7fr_1.2fr]">
          <NewsletterField label="Title" placeholder="Select" as="select" options={['Mr.', 'Mrs.', 'Ms.', 'Mx.']} />
          <NewsletterField label="First name *" placeholder="Martin" />
          <NewsletterField label="Last name *" placeholder="Edwards" />
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-[1.65fr_1.1fr]">
          <NewsletterField label="Your emails *" placeholder="MartinEdwards@gmail.com" type="email" />
          <NewsletterField
            label="Your country *"
            placeholder="Select country"
            as="select"
            options={['Vietnam', 'United Kingdom', 'France', 'Singapore']}
          />
        </div>
      </div>
    </Section>
  )
}

function OfferBanner() {
  const { openBookingModal } = useBookingModal()

  return (
    <section>
      <div
        className="w-full overflow-hidden bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: "url('/images/home/background-offer.png')",
          transform: 'scale(1.003)',
        }}
      >
        <Container>
          <RevealOnScroll delay={0.06} y={18} amount={0.08} duration={0.6}>
            <div className="max-w-[640px] py-10 transition-transform duration-500 lg:py-[60px]">
              <p className="font-regal text-[50px] leading-9 tracking-[0.01em]">
                SPECIAL SPRING OFFER <br />
                EARLY BIRD SPRING OFFER
                <span className="mx-3 font-inter text-[50px] font-regular tracking-[0.02em]">10%</span>
              </p>

              <div className="mt-6 space-y-2 font-inter text-[16px] text-white/80">
                <p>
                  <strong className="font-bold text-white">Travel Period:</strong> January 2026 - March 2026
                </p>
                <p>
                  <strong className="font-bold text-white">Validity For Booking From</strong> now until 10 February
                  2026
                </p>
                <p>
                  <strong className="font-bold text-white">Apply code:</strong> NY24673
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    origin: 'Destination special spring offer',
                    preferredJourney: 'Special Spring Offer',
                    travelWindow: 'January 2026 - March 2026',
                  })
                }
                className="group relative mt-8 overflow-hidden rounded-tr-[20px] border border-transparent px-5 py-2 font-inter text-[16px] font-semibold tracking-[0.22em] transition-all duration-300 hover:border-[#222458] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2E6D3] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{ backgroundColor: '#F2E6D3', color: NAVY }}
              >
                <span className="relative z-10 transition-opacity duration-300 group-hover:opacity-0" style={{ color: NAVY }}>BOOK</span>
                <span className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ backgroundColor: NAVY }} aria-hidden />
                <span className="absolute inset-0 z-20 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                  BOOK
                </span>
              </button>
            </div>
          </RevealOnScroll>
        </Container>
      </div>
    </section>
  )
}

export function DestinationPage() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const { openBookingModal } = useBookingModal()
  const [overnightFilter, setOvernightFilter] = useState('See all')
  const [typeFilter, setTypeFilter] = useState('See all')
  const [departureCityFilter, setDepartureCityFilter] = useState('See all')
  const [arrivalCityFilter, setArrivalCityFilter] = useState('See all')
  const [departureDateFilter, setDepartureDateFilter] = useState('See all')
  const [durationFilter, setDurationFilter] = useState('See all')
  const getStaggerDelay = (baseDelay: number, index: number, step = 0.08) =>
    baseDelay + index * step

  const journeys: Journey[] = [
    {
      title: 'FROM HA NOI TO HO CHI MINH',
      route: 'Ha Noi • Hoi An • Da Nang • Ho Chi Minh city',
      tripType: 'One way',
      experienceType: 'Signature Journey',
      departureDate: 'January 2026',
      duration: '6 days 7 nights',
      description: 'Set off on a six-day, seven-night on way journey from Ha Noi to Ho Chi Minh city',
      image: '/images/destination/journey-1.png',
    },
    {
      title: 'FROM HO CHI MINH TO HA NOI',
      route: 'Ho Chi Minh city • Da Nang • Hoi An • Ha Noi',
      tripType: 'One way',
      experienceType: 'Signature Journey',
      departureDate: 'February 2026',
      duration: '6 days 7 nights',
      description: 'Set off on a six-day, seven-night on way journey from Ho Chi Minh to Ha Noi capital',
      image: '/images/destination/journey-2.png',
    },
    {
      title: 'FROM HA NOI TO LAN HA',
      route: 'Ha Noi • Ha Long • Lan Ha',
      tripType: 'One way',
      experienceType: 'Northern Retreat',
      departureDate: 'January 2026',
      duration: '3 days 2 nights',
      description: 'Set off on a three-day, two-night on way journey from Ha Noi to Lan Ha',
      image: '/images/destination/journey-3.png',
    },
    {
      title: 'FROM HCM TO QUANG NAM',
      route: 'HCM • Nha Trang • Da Nang • Quang Nam',
      tripType: 'One way',
      experienceType: 'Coastal Escape',
      departureDate: 'March 2026',
      duration: '4 days 5 nights',
      description: 'Set off on a three-day, two-night on way journey from Ho Chi Minh to Quang Nam',
      image: '/images/destination/journey-4.png',
    },
    {
      title: 'FROM DA NANG TO HUE',
      route: 'Da Nang • Hoi An • Hue',
      tripType: 'One way',
      experienceType: 'Heritage Passage',
      departureDate: 'February 2026',
      duration: '2 days 1 nights',
      description: 'Set off on a two-day, one-night on way journey from Da Nang to Hue',
      image: '/images/destination/journey-5.png',
    },
    {
      title: 'FROM HA NOI TO NINH BINH',
      route: 'Ha Noi • Phu Ly • Ninh Binh',
      tripType: 'One way',
      experienceType: 'Cultural Escape',
      departureDate: 'March 2026',
      duration: '3 days 2 nights',
      description: 'Set off on a three-day, two-night on way journey from Ha Noi to Ninh Binh',
      image: '/images/destination/journey-6.png',
    },
    {
      title: 'FROM HO CHI MINH TO DA NANG',
      route: 'Ho Chi Minh City • Nha Trang • Da Nang',
      tripType: 'One way',
      experienceType: 'Coastal Escape',
      departureDate: 'April 2026',
      duration: '4 days 5 nights',
      description: 'Set off on a six-day, seven-night on way journey from Ho Chi Minh to Da Nang',
      image: '/images/destination/journey-7.png',
    },
    {
      title: 'FROM HA NOI TO SAPA',
      route: 'Ho Chi Minh city • Da Nang • Hoi An • Ha Noi',
      tripType: 'One way',
      experienceType: 'Mountain Escape',
      departureDate: 'April 2026',
      duration: '2 days 1 nights',
      description: 'Set off on a two-day, one-night on way journey from Ha Noi to Sapa',
      image: '/images/destination/journey-8.png',
    },
  ]

  useEffect(() => {
    if (hash !== '#the-journey') return

    const timer = window.setTimeout(() => {
      const section = document.getElementById('the-journey')
      if (!section) return

      const top = section.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }, 120)

    return () => window.clearTimeout(timer)
  }, [hash])

  const handleJourneyBooking = (journey: Journey) => {
    openBookingModal({
      origin: 'Destination journey card',
      preferredJourney: journey.title,
      route: journey.route.replaceAll('•', ' - '),
      travelWindow: journey.duration,
    })
  }

  const overnightOptions = useMemo(
    () => ['See all', ...Array.from(new Set(journeys.map((journey) => getNightLabel(journey.duration))))],
    [journeys],
  )
  const typeOptions = useMemo(
    () => ['See all', ...Array.from(new Set(journeys.map((journey) => journey.experienceType)))],
    [journeys],
  )
  const departureCityOptions = useMemo(
    () => ['See all', ...Array.from(new Set(journeys.map((journey) => getRouteEndpoints(journey.route).departureCity)))],
    [journeys],
  )
  const arrivalCityOptions = useMemo(
    () => ['See all', ...Array.from(new Set(journeys.map((journey) => getRouteEndpoints(journey.route).arrivalCity)))],
    [journeys],
  )
  const departureDateOptions = useMemo(
    () => ['See all', ...Array.from(new Set(journeys.map((journey) => journey.departureDate)))],
    [journeys],
  )
  const durationOptions = useMemo(
    () => ['See all', ...Array.from(new Set(journeys.map((journey) => journey.duration)))],
    [journeys],
  )

  const filteredJourneys = useMemo(
    () =>
      journeys.filter((journey) => {
        const { departureCity, arrivalCity } = getRouteEndpoints(journey.route)

        return (
          (overnightFilter === 'See all' || getNightLabel(journey.duration) === overnightFilter) &&
          (typeFilter === 'See all' || journey.experienceType === typeFilter) &&
          (departureCityFilter === 'See all' || departureCity === departureCityFilter) &&
          (arrivalCityFilter === 'See all' || arrivalCity === arrivalCityFilter) &&
          (departureDateFilter === 'See all' || journey.departureDate === departureDateFilter) &&
          (durationFilter === 'See all' || journey.duration === durationFilter)
        )
      }),
    [arrivalCityFilter, departureCityFilter, departureDateFilter, durationFilter, journeys, overnightFilter, typeFilter],
  )

  const resetFilters = () => {
    setOvernightFilter('See all')
    setTypeFilter('See all')
    setDepartureCityFilter('See all')
    setArrivalCityFilter('See all')
    setDepartureDateFilter('See all')
    setDurationFilter('See all')
  }

  return (
    <div className="bg-white">
      <section className="relative -mt-16 h-[calc(88vh+4rem)] min-h-[620px] w-full overflow-hidden">
        <img
          src="/images/destination/hero.png"
          alt="THE LUA Destinations Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#11163F]/30" />
      </section>

      <Section>
        <div>
          <RevealOnScroll delay={0.04}>
            <PageEyebrow />
          </RevealOnScroll>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,530px)_minmax(0,1fr)] lg:items-center lg:gap-10">
            <RevealOnScroll delay={0.08}>
              <div>
              <DisplayTitle>ITINERARY</DisplayTitle>

              <p className="font-inter text-[24px] font-bold" style={{ color: NAVY }}>
                Immersive Rail Journey Across Vietnam
              </p>
              <div
                className="mt-4 max-w-[500px] space-y-5 font-inter text-[16px] leading-9 tracking-[0.04em]"
                style={{ color: NAVY }}
              >
                <TextLineReveal
                  as="p"
                  text="THE LUA presents an 8-day, 7-night curated rail journey through Vietnam, connecting the timeless elegance of Hanoi with the vibrant energy of Ho Chi Minh City."
                  className="font-inter text-[16px] leading-9 tracking-[0.04em]"
                  style={{ color: NAVY }}
                  delay={0}
                  lineDelay={0.08}
                />
                <TextLineReveal
                  as="p"
                  text="Traveling in refined comfort, guests move seamlessly across heritage cities, coastal landscapes, and cultural landmarks, experiencing the country through a lens of depth, design, and discovery."
                  className="font-inter text-[16px] leading-9 tracking-[0.04em]"
                  style={{ color: NAVY }}
                  delay={0.12}
                  lineDelay={0.08}
                />
                <TextLineReveal
                  as="p"
                  text="Unpack once and let Vietnam unfold beyond your window — where every mile is shaped by culture, craftsmanship, and quiet sophistication."
                  className="font-inter text-[16px] leading-9 tracking-[0.04em]"
                  style={{ color: NAVY }}
                  delay={0.24}
                  lineDelay={0.08}
                />
              </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="flex justify-end" delay={0.14} y={22} amount={0.08} initialScale={0.992}>
              <div className="group w-full max-w-[620px] overflow-hidden rounded-tr-[140px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_22px_42px_rgba(34,36,88,0.12)]">
                <img src="/images/destination/intinerary.png" alt="Destinations intro" className="w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      <section>
        <Container>
          <RevealOnScroll className="relative mx-auto mt-12 max-w-[1100px]" delay={0.06} y={24} amount={0.08}>
            <div className="relative min-h-[700px] lg:min-h-[750px]">
              <div className="relative z-0 flex justify-center lg:absolute lg:left-0 lg:top-0 lg:w-[68%] lg:justify-start">
                <img src="/images/destination/map.png" alt="Vietnam map" className="w-full max-w-[800px] object-contain" />
              </div>

              <div className="lg:absolute lg:right-0 lg:w-[47%] lg:top-[75px]">
                <h3 className="mb-6 text-center font-inter text-[24px] font-bold uppercase tracking-[0.02em] lg:text-left" style={{ color: NAVY }}>
                  OUR JOURNEYS
                </h3>

                <div className="overflow-hidden rounded-[22px] bg-[#F3E6CF] shadow-[0_10px_30px_rgba(34,36,88,0.08)]">
                  <table className="w-full text-left font-inter text-[16px] text-[#232566]">
                    <thead>
                      <tr className="border-b border-[#D8C6A2]">
                        <th className="px-5 py-4 font-bold">ITINERARY</th>
                        <th className="px-4 py-4 text-center font-bold">Day</th>
                        <th className="px-4 py-4 text-center font-bold">Night</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['FROM HA NOI TO HO CHI MINH', '7', '6'],
                        ['FROM HO CHI MINH TO HA NOI', '7', '6'],
                        ['FROM HO CHI MINH TO QUANG NAM', '5', '4'],
                        ['FROM HO CHI MINH TO DA NANG', '5', '4'],
                        ['FROM HA NOI TO LAN HA', '3', '2'],
                        ['FROM HA NOI TO NINH BINH', '3', '2'],
                        ['FROM DA NANG TO HOI AN', '2', '1'],
                        ['FROM HA NOI TO SAPA', '2', '1'],
                      ].map((row) => (
                        <tr key={row[0]} className="border-b border-[#D8C6A2] last:border-b-0">
                          <td className="px-5 py-3">{row[0]}</td>
                          <td className="px-4 py-3 text-center">{row[1]}</td>
                          <td className="px-4 py-3 text-center">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <OfferBanner />

      <Section>
        <div id="the-journey">
          <RevealOnScroll delay={0.04}>
            <div className="text-center">
              <DisplayTitle center className="mt-6">
                THE JOURNEY
              </DisplayTitle>
              <TextLineReveal
                as="p"
                text="THE LUA offers an unhurried rail journey through Vietnam, up to 7 days of quiet passage where time slows and landscapes are gently revealed, from North to South, or in reverse."
                className="mx-auto mt-5 max-w-[700px] font-inter text-[16px] leading-8 tracking-[0.04em]"
                style={{ color: `${NAVY}B3` }}
                delay={0.04}
                lineDelay={0.08}
              />
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mx-auto mt-10 max-w-[1120px] bg-[#F2E6D3] px-5 py-5" delay={0.08} y={20} amount={0.08}>
          <div className="grid gap-4 md:grid-cols-6">
            <FilterSelect label="Overnight" value={overnightFilter} options={overnightOptions} onChange={setOvernightFilter} />
            <FilterSelect label="Type" value={typeFilter} options={typeOptions} onChange={setTypeFilter} />
            <FilterSelect
              label="Departure city"
              value={departureCityFilter}
              options={departureCityOptions}
              onChange={setDepartureCityFilter}
            />
            <FilterSelect
              label="Arrival city"
              value={arrivalCityFilter}
              options={arrivalCityOptions}
              onChange={setArrivalCityFilter}
            />
            <FilterSelect
              label="Departure date"
              value={departureDateFilter}
              options={departureDateOptions}
              onChange={setDepartureDateFilter}
            />
            <FilterSelect label="Duration" value={durationFilter} options={durationOptions} onChange={setDurationFilter} />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="font-inter text-[14px] text-[#232566]/70 md:text-[15px]">{filteredJourneys.length} journeys found</p>
            <button
              type="button"
              onClick={resetFilters}
              className="font-inter text-[14px] text-[#232566]/70 underline underline-offset-4 transition hover:text-[#232566] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2 md:text-[15px]"
            >
              × Reset
            </button>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {filteredJourneys.map((journey, idx) => (
            <RevealOnScroll
              key={journey.title}
              delay={getStaggerDelay(0.08, idx, 0.06)}
              y={18}
              amount={0.05}
              duration={0.65}
              initialScale={0.994}
            >
              <JourneyCard
                journey={journey}
                onBook={handleJourneyBooking}
                onViewMore={() => navigate('/train#immersive-vietnam')}
              />
            </RevealOnScroll>
          ))}
        </div>

        {filteredJourneys.length === 0 ? (
          <div className="mt-10 rounded-tr-[38px] border border-[#D8C6A2] bg-[#F8F2E8] px-6 py-7 text-center">
            <p className="font-inter text-[24px] font-semibold tracking-[0.04em]" style={{ color: NAVY }}>
              No journeys match the current filters.
            </p>
            <p className="mt-3 font-inter text-[16px] leading-7" style={{ color: `${NAVY}B3` }}>
              Refine your selections or reset the filters to explore the full collection again.
            </p>
          </div>
        ) : null}
      </Section>

      <StayOnTrackSection />

      <InstagramSection />
    </div>
  )
}