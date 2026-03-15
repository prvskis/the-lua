import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { InstagramSection } from '@/components/sections/InstagramSection'

const NAVY = '#222458'
const GOLD = '#D9B07A'

type NewsItem = {
  date: string
  title: string
  excerpt: string
  image: string
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
        NEWS
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

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex h-full flex-col text-[#2A2B5E]">
      <div className="overflow-hidden rounded-tr-[140px] bg-black/5 transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
        <img
          src={item.image}
          alt={item.title}
          className="w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]"
        />
      </div>

      <p
        className="mt-4 font-inter text-[13px] tracking-[0.02em]"
        style={{ color: `${NAVY}B3` }}
      >
        {item.date}
      </p>

      <h3
        className="mt-1 max-w-[320px] font-inter text-[18px] font-extrabold leading-[1.45] tracking-[0.01em]"
        style={{ color: NAVY }}
      >
        {item.title}
      </h3>

      <p
        className="mt-2 max-w-[320px] flex-1 font-inter text-[14px] leading-[2.2] tracking-[0.015em]"
        style={{ color: `${NAVY}CC` }}
      >
        {item.excerpt}
      </p>

      <button
        type="button"
        className="mt-3 w-fit font-inter text-[15px] font-semibold tracking-[0.01em] underline underline-offset-4 decoration-[#2A2B5E]/50 transition-all duration-300 hover:text-[#2A2B5E] hover:decoration-[#2A2B5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
        style={{ color: NAVY }}
      >
        Discover
      </button>
    </article>
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

export function NewsPage() {
  const getStaggerDelay = (baseDelay: number, index: number, step = 0.1) =>
    baseDelay + index * step

  const newsItems: NewsItem[] = [
    {
      date: 'February 2026',
      title: 'Redefining Cultural Travel in Modern Vietnam',
      excerpt:
        'Industry experts highlight how The Lua moves beyond conventional luxury, positioning itself as a brand built on depth, identity, and immersive storytelling.',
      image: '/images/news/news-1.png',
    },
    {
      date: 'February 2026',
      title: 'An Immersive Journey Through Festive Vietnam',
      excerpt:
        'As the festive season approaches, The Lua creates a space where travelers can experience Vietnam’s traditions in an intimate and meaningful way.',
      image: '/images/news/news-2.png',
    },
    {
      date: 'January 2026',
      title: 'Designing Heritage Through Contemporary Train Travel',
      excerpt:
        'The Lua unveils its curated routes, blending railway journeys with authentic cultural narratives across Vietnam.',
      image: '/images/news/news-3.png',
    },
    {
      date: 'January 2026',
      title: 'Train & Culture Reimagined by The Lua Experience',
      excerpt:
        'Exploring the visual language and design philosophy that transforms traditional Vietnamese values into a refined, immersive train experience.',
      image: '/images/news/news-4.png',
    },
    {
      date: 'January 2026',
      title: 'From Rice to Silk: The Meaning of THE LUA',
      excerpt:
        'An in-depth look at how The Lua draws inspiration from lúa, lụa, and lửa to shape a brand rooted in Vietnamese civilization and modern expression.',
      image: '/images/news/news-5.png',
    },
    {
      date: 'January 2026',
      title: 'The Lua Officially Launches the Immersive Vietnam Experience',
      excerpt:
        'The Lua officially launches its concept of Immersive Vietnam, redefining train travel as a layered cultural experience that connects movement with heritage.',
      image: '/images/news/news-6.png',
    },
  ]

  return (
    <div className="bg-white">
      <section className="relative -mt-16 h-[calc(88vh+4rem)] min-h-[620px] w-full overflow-hidden">
        <img
          src="/images/news/hero.png"
          alt="THE LUA News Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#11163F]/30" />
      </section>

      <section className="pb-16 pt-6 lg:pb-20 lg:pt-8">
        <Container>
          <RevealOnScroll className="mb-10" delay={0.04}>
            <PageEyebrow />
          </RevealOnScroll>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {newsItems.map((item, idx) => (
              <RevealOnScroll
                key={item.title}
                delay={getStaggerDelay(0.08, idx, 0.08)}
                y={22}
                amount={0.06}
                duration={0.65}
                initialScale={0.992}
              >
                <NewsCard item={item} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <StayOnTrackSection />

      <InstagramSection />
    </div>
  )
}