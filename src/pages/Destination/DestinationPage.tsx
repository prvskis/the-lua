import type { ReactNode } from 'react'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { InstagramSection } from '@/components/sections/InstagramSection'

const NAVY = '#222458'
const GOLD = '#D9B07A'

type Journey = {
  title: string
  route: string
  tripType: string
  duration: string
  description: string
  image: string
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
          <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-[18px] text-[#D2AF7A] md:text-[22px]">
            ▼
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

function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <article className="text-[#2A2B5E]">
      <div className="overflow-hidden rounded-tr-[140px] bg-black/5">
        <img src={journey.image} alt={journey.title} className="w-full object-cover" />
      </div>

      <h3 className="mt-6 font-inter text-[20px] font-extrabold tracking-[0em]" style={{ color: NAVY }}>
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

      <div className="flex items-center py-2 font-inter text-[14px]" style={{ color: NAVY }}>
        <span>{journey.tripType}</span>
        <span className="mx-6 inline-flex items-center justify-center rounded-lg">
          <TrainMiniIcon />
        </span>
        <span>{journey.duration}</span>
      </div>

      <div className="h-px w-full bg-black/70" />

      <p className="mt-2 font-inter text-[14px] leading-9 text-black">{journey.description}</p>

      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          className="font-inter text-[17px] tracking-[0.01em] underline underline-offset-8 decoration-[#2A2B5E]/50 hover:text-[#2A2B5E]"
          style={{ color: NAVY }}
        >
          View more
        </button>

        <button
          type="button"
          className="rounded-tr-[20px] bg-[#1E1F4B] px-6 py-1.5 text-[20px] tracking-[0.1em] text-white hover:opacity-95"
        >
          BOOK
        </button>
      </div>
    </article>
  )
}

function FilterSelect({
  label,
  value = 'See all',
}: {
  label: string
  value?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-inter text-[12px] text-[#232566]/80">{label}</label>
      <button
        type="button"
        className="flex h-[40px] items-center justify-between rounded-tr-[22px] border border-[#8F84A8] bg-transparent px-4 font-inter text-[13px] text-[#232566]/80"
      >
        <span>{value}</span>
        <span className="text-[#C5A874]">⌄</span>
      </button>
    </div>
  )
}

function StayOnTrackSection() {
  return (
    <Section className="pt-0">
      <div className="mx-auto max-w-[980px] rounded-tr-[110px] bg-[#F2E6D3] px-7 py-9 sm:px-10 lg:px-12 lg:py-10">
        <h2 className="font-regal text-[42px] leading-none tracking-[0.01em] md:text-[48px]" style={{ color: NAVY }}>
          STAY ON TRACK
        </h2>

        <p className="mt-5 max-w-[760px] font-inter text-[17px] leading-8" style={{ color: `${NAVY}CC` }}>
          Discover the Orient Express newsletter - explore at your leisure and be the first to discover upcoming
          routes, inspiring itineraries, and new ways to travel with wonder.
        </p>

        <p className="mt-2 font-inter text-[18px] font-regular" style={{ color: NAVY }}>
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
          <div className="max-w-[640px] py-10 lg:py-[60px]">
            <p className="font-regal text-[50px] leading-9 tracking-[0.01em]">
              SPECIAL SPRING OFFER <br />
              EARLY BIRD SPRING OFFER
              <span className="mx-3 font-inter text-[50px] font-regular tracking-[0.02em]">10%</span>
            </p>

            <div className="mt-6 space-y-2 font-inter text-[20px] text-white/80">
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

            <button className="mt-8 rounded-2xl bg-[#EFE3D1] px-6 py-4 font-inter text-[16px] font-bold tracking-[0.01em]" style={{ color: NAVY }}>
              BOOK
            </button>
          </div>
        </Container>
      </div>
    </section>
  )
}

export function DestinationPage() {
  const journeys: Journey[] = [
    {
      title: 'FROM HA NOI TO HO CHI MINH',
      route: 'Ha Noi • Hoi An • Da Nang • Ho Chi Minh city',
      tripType: 'One way',
      duration: '6 days 7 nights',
      description: 'Set off on a six-day, seven-night on way journey from Ha Noi to Ho Chi Minh city',
      image: '/images/destination/journey-1.png',
    },
    {
      title: 'FROM HO CHI MINH TO HA NOI',
      route: 'Ho Chi Minh city • Da Nang • Hoi An • Ha Noi',
      tripType: 'One way',
      duration: '6 days 7 nights',
      description: 'Set off on a six-day, seven-night on way journey from Ho Chi Minh to Ha Noi capital',
      image: '/images/destination/journey-2.png',
    },
    {
      title: 'FROM HA NOI TO LAN HA',
      route: 'Ha Noi • Ha Long • Lan Ha',
      tripType: 'One way',
      duration: '3 days 2 nights',
      description: 'Set off on a three-day, two-night on way journey from Ha Noi to Lan Ha',
      image: '/images/destination/journey-3.png',
    },
    {
      title: 'FROM HCM TO QUANG NAM',
      route: 'HCM • Nha Trang • Da Nang • Quang Nam',
      tripType: 'One way',
      duration: '4 days 5 nights',
      description: 'Set off on a three-day, two-night on way journey from Ho Chi Minh to Quang Nam',
      image: '/images/destination/journey-4.png',
    },
    {
      title: 'FROM DA NANG TO HUE',
      route: 'Da Nang • Hoi An • Hue',
      tripType: 'One way',
      duration: '2 days 1 nights',
      description: 'Set off on a two-day, one-night on way journey from Da Nang to Hue',
      image: '/images/destination/journey-5.png',
    },
    {
      title: 'FROM HA NOI TO NINH BINH',
      route: 'Ha Noi • Phu Ly • Ninh Binh',
      tripType: 'One way',
      duration: '3 days 2 nights',
      description: 'Set off on a three-day, two-night on way journey from Ha Noi to Ninh Binh',
      image: '/images/destination/journey-6.png',
    },
    {
      title: 'FROM HO CHI MINH TO DA NANG',
      route: 'Ho Chi Minh City • Nha Trang • Da Nang',
      tripType: 'One way',
      duration: '4 days 5 nights',
      description: 'Set off on a six-day, seven-night on way journey from Ho Chi Minh to Da Nang',
      image: '/images/destination/journey-7.png',
    },
    {
      title: 'FROM HA NOI TO SAPA',
      route: 'Ho Chi Minh city • Da Nang • Hoi An • Ha Noi',
      tripType: 'One way',
      duration: '2 days 1 nights',
      description: 'Set off on a two-day, one-night on way journey from Ha Noi to Sapa',
      image: '/images/destination/journey-8.png',
    },
  ]

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
          <PageEyebrow />

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,530px)_minmax(0,1fr)] lg:items-center lg:gap-10">
            <div>
              <DisplayTitle>ITINERARY</DisplayTitle>

              <p className="font-inter text-[25px] font-bold" style={{ color: NAVY }}>
                Immersive Rail Journey Across Vietnam
              </p>
              <div
                className="mt-4 max-w-[620px] space-y-5 font-inter text-[19px] leading-9 tracking-[0.04em]"
                style={{ color: NAVY }}
              >
                <p>
                  THE LUA presents an 8-day, 7-night curated rail journey through Vietnam, connecting the timeless
                  elegance of Hanoi with the vibrant energy of Ho Chi Minh City.
                </p>
                <p>
                  Traveling in refined comfort, guests move seamlessly across heritage cities, coastal landscapes, and
                  cultural landmarks, experiencing the country through a lens of depth, design, and discovery.
                </p>
                <p>
                  Unpack once and let Vietnam unfold beyond your window — where every mile is shaped by culture,
                  craftsmanship, and quiet sophistication.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="w-full max-w-[620px] overflow-hidden rounded-tr-[140px] bg-black/5">
                <img src="/images/destination/intinerary.png" alt="Destinations intro" className="w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <section>
        <Container>
          <div className="relative mx-auto mt-12 max-w-[1100px]">
            <div className="relative min-h-[700px] lg:min-h-[750px]">
              <div className="relative z-0 flex justify-center lg:absolute lg:left-0 lg:top-0 lg:w-[68%] lg:justify-start">
                <img src="/images/destination/map.png" alt="Vietnam map" className="w-full max-w-[800px] object-contain" />
              </div>

              <div className="lg:absolute lg:right-0 lg:w-[47%] lg:top-[75px]">
                <h3 className="mb-6 text-center font-inter text-[20px] font-bold uppercase tracking-[0.02em] lg:text-left lg:text-[22px]" style={{ color: NAVY }}>
                  OUR JOURNEYS
                </h3>

                <div className="overflow-hidden rounded-[22px] bg-[#F3E6CF] shadow-[0_10px_30px_rgba(34,36,88,0.08)]">
                  <table className="w-full text-left font-inter text-[14px] text-[#232566]">
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
          </div>
        </Container>
      </section>

      <OfferBanner />

      <Section>
        <div className="text-center">
          <DisplayTitle center className="mt-6">
            THE JOURNEY
          </DisplayTitle>
          <p
            className="mx-auto mt-5 max-w-[700px] font-inter text-[18px] leading-8 tracking-[0.04em]"
            style={{ color: `${NAVY}B3` }}
          >
            THE LUA offers an unhurried rail journey through Vietnam, up to 7 days of quiet passage where time slows
            and landscapes are gently revealed, from North to South, or in reverse.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[1120px] bg-[#F2E6D3] px-5 py-5">
          <div className="grid gap-4 md:grid-cols-6">
            <FilterSelect label="Overnight" value="DAYTRIPS" />
            <FilterSelect label="Type" />
            <FilterSelect label="Departure city" />
            <FilterSelect label="Arrival city" />
            <FilterSelect label="Departure date" value="Departure date" />
            <FilterSelect label="Duration" />
          </div>

          <div className="mt-3 flex justify-end font-inter text-[12px] text-[#232566]/70">× Reset</div>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {journeys.map((journey) => (
            <JourneyCard key={journey.title} journey={journey} />
          ))}
        </div>
      </Section>

      <StayOnTrackSection />

      <InstagramSection />
    </div>
  )
}