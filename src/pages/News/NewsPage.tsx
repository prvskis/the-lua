import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageFrame } from '@/components/ImageFrame'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { InstagramSection } from '@/components/sections/InstagramSection'
import { FiChevronDown } from 'react-icons/fi'

const NAVY = '#222458'
const GOLD = '#D9B07A'

type NewsItem = {
  date: string
  title: string
  excerpt: string
  image: string
  content: string[]
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

function NewsCard({ item, onDiscover }: { item: NewsItem; onDiscover: (item: NewsItem) => void }) {
  return (
    <article className="group flex h-full flex-col text-[#2A2B5E]">
      <ImageFrame
        src={item.image}
        alt={item.title}
        ratio="aspect-[1.02/1]"
        className="rounded-tr-[140px] bg-black/5 transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]"
        imageClassName="transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]"
      />

      <p
        className="mt-4 font-inter text-[13px] tracking-[0.02em]"
        style={{ color: `${NAVY}B3` }}
      >
        {item.date}
      </p>

      <h3
        className="mt-1 max-w-[320px] font-inter text-[18px] font-extrabold leading-[1.45] tracking-[0.01em] md:text-[20px]"
        style={{ color: NAVY }}
      >
        {item.title}
      </h3>

      <p
        className="mt-2 max-w-[320px] flex-1 font-inter text-[16px] leading-[2.2] tracking-[0.015em]"
        style={{ color: `${NAVY}CC` }}
      >
        {item.excerpt}
      </p>

      <button
        type="button"
        onClick={() => onDiscover(item)}
        className="mt-3 w-fit font-inter text-[16px] font-semibold tracking-[0.01em] underline underline-offset-4 decoration-[#2A2B5E]/50 transition-all duration-300 hover:text-[#2A2B5E] hover:decoration-[#2A2B5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
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

export function NewsPage() {
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null)
  const getStaggerDelay = (baseDelay: number, index: number, step = 0.1) =>
    baseDelay + index * step

  const newsItems: NewsItem[] = [
    {
      date: 'February 2026',
      title: 'Redefining Cultural Travel in Modern Vietnam',
      excerpt:
        'Industry experts highlight how The Lua moves beyond conventional luxury, positioning itself as a brand built on depth, identity, and immersive storytelling.',
      image: '/images/news/news-1.png',
      content: [
        'The Lua is increasingly being recognized as a new expression of cultural travel in Vietnam, one that shifts the conversation away from conventional notions of luxury and toward meaning, rhythm, and identity.',
        'Rather than presenting travel as a checklist of destinations, the concept frames the journey itself as the destination, where landscapes, cuisine, design, and atmosphere unfold together as one continuous narrative.',
        'This approach positions The Lua as a hospitality experience shaped by depth and memory, inviting guests to discover Vietnam through a slower, more immersive lens.',
      ],
    },
    {
      date: 'February 2026',
      title: 'An Immersive Journey Through Festive Vietnam',
      excerpt:
        'As the festive season approaches, The Lua creates a space where travelers can experience Vietnam’s traditions in an intimate and meaningful way.',
      image: '/images/news/news-2.png',
      content: [
        'Seasonal programming aboard The Lua allows festive traditions to be experienced as atmosphere rather than spectacle, with design, music, cuisine, and storytelling woven into the guest journey.',
        'Instead of staging culture at a distance, the train creates a setting where traditions feel close, tactile, and intimate, allowing travelers to encounter celebration as a living part of the voyage.',
        'The result is a holiday experience that feels both refined and emotionally grounded in Vietnam’s cultural rhythms.',
      ],
    },
    {
      date: 'January 2026',
      title: 'Designing Heritage Through Contemporary Train Travel',
      excerpt:
        'The Lua unveils its curated routes, blending railway journeys with authentic cultural narratives across Vietnam.',
      image: '/images/news/news-3.png',
      content: [
        'Through its route planning and onboard curation, The Lua explores how contemporary rail travel can become a vessel for heritage rather than simply a mode of transportation.',
        'Craftsmanship, material language, and regional storytelling shape the guest experience, allowing tradition to be interpreted with confidence and modern restraint.',
        'Each departure becomes an invitation to move through Vietnam while understanding more of the stories carried within its landscapes.',
      ],
    },
    {
      date: 'January 2026',
      title: 'Train & Culture Reimagined by The Lua Experience',
      excerpt:
        'Exploring the visual language and design philosophy that transforms traditional Vietnamese values into a refined, immersive train experience.',
      image: '/images/news/news-4.png',
      content: [
        'The Lua’s visual identity is informed by a dialogue between refinement and familiarity, where Vietnamese references are translated into spatial rhythm, proportion, and atmosphere.',
        'Rather than relying on nostalgia, the project seeks to reinterpret traditional values in a way that feels current, cinematic, and quietly luxurious.',
        'This design philosophy allows culture to be felt through mood and detail, not only through direct symbolism.',
      ],
    },
    {
      date: 'January 2026',
      title: 'From Rice to Silk: The Meaning of THE LUA',
      excerpt:
        'An in-depth look at how The Lua draws inspiration from lúa, lụa, and lửa to shape a brand rooted in Vietnamese civilization and modern expression.',
      image: '/images/news/news-5.png',
      content: [
        'The name THE LUA draws from layered Vietnamese references, evoking grain, silk, and flame as symbols of nourishment, refinement, and inner vitality.',
        'Together, these meanings shape a brand language that feels rooted in the country’s cultural memory while remaining forward-looking in expression.',
        'This layered symbolism becomes a foundation for how the train is named, designed, and emotionally positioned within the hospitality landscape.',
      ],
    },
    {
      date: 'January 2026',
      title: 'The Lua Officially Launches the Immersive Vietnam Experience',
      excerpt:
        'The Lua officially launches its concept of Immersive Vietnam, redefining train travel as a layered cultural experience that connects movement with heritage.',
      image: '/images/news/news-6.png',
      content: [
        'With the launch of Immersive Vietnam, The Lua formalizes its ambition to redefine train travel as a cultural experience rather than a purely logistical one.',
        'The concept brings together movement, design, cuisine, storytelling, and regional context into a single guest journey that feels composed from beginning to end.',
        'It marks the beginning of a brand narrative in which every route is intended to reveal Vietnam slowly, elegantly, and with emotional depth.',
      ],
    },
  ]

  useEffect(() => {
    if (!selectedNewsItem) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedNewsItem(null)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedNewsItem])

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
                <NewsCard item={item} onDiscover={setSelectedNewsItem} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <StayOnTrackSection />

      <InstagramSection />

      <AnimatePresence>
        {selectedNewsItem ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-[#11163F]/50 backdrop-blur-[5px]"
              aria-label="Close news detail"
              onClick={() => setSelectedNewsItem(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.article
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.985 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-h-[90vh] w-full max-w-[920px] overflow-hidden rounded-[30px] bg-[#F8F2E8] shadow-[0_36px_90px_rgba(17,22,63,0.28)]"
            >
              <div className="grid max-h-[90vh] lg:grid-cols-[0.9fr_1.1fr]">
                <div className="bg-[#232566] p-6 sm:p-8 lg:p-10">
                  <p className="font-inter text-[11px] tracking-[0.28em] text-[#F5E7D0]/80">NEWS FEATURE</p>
                  <h2 className="mt-4 font-regal text-[42px] leading-[0.95] text-[#FFF9F0] md:text-[48px]">
                    {selectedNewsItem.title}
                  </h2>
                  <p className="mt-5 font-inter text-[16px] tracking-[0.12em] text-white/70">{selectedNewsItem.date}</p>
                  <p className="mt-5 max-w-[360px] font-inter text-[16px] leading-7 text-white/80">
                    {selectedNewsItem.excerpt}
                  </p>

                  <div className="mt-8 overflow-hidden rounded-tr-[140px] bg-black/10">
                    <img src={selectedNewsItem.image} alt={selectedNewsItem.title} className="h-full w-full object-cover" />
                  </div>
                </div>

                <div className="overflow-y-auto p-6 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="font-inter text-[11px] tracking-[0.28em] text-[#222458]/55">EDITORIAL DETAIL</p>
                      <p className="mt-3 max-w-[420px] font-inter text-[16px] leading-7 text-[#222458]/76">
                        A closer look at the story behind this announcement, written in the same refined tone as the
                        rest of THE LUA experience.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedNewsItem(null)}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D8C6A2] text-[#222458] transition-all duration-200 hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                      aria-label="Close news detail"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-8 space-y-5">
                    {selectedNewsItem.content.map((paragraph, index) => (
                      <p
                        key={`${selectedNewsItem.title}-${index}`}
                        className="font-inter text-[16px] leading-8 tracking-[0.01em]"
                        style={{ color: `${NAVY}CC` }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}