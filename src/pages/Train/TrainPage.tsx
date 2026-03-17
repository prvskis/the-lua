import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { Section } from '@/components/layout/Section'
import { InstagramSection } from '@/components/sections/InstagramSection'
import { TextLineReveal } from '@/components/TextLineReveal'

const NAVY = '#222458'
const GOLD = '#D9B07A'

type TrainFeatureBlockProps = {
  title: string
  description: string[]
  image: string
  imageAlt: string
  reverse?: boolean
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
        THE TRAIN
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

function TrainFeatureBlock({
  title,
  description,
  image,
  imageAlt,
  reverse = false,
}: TrainFeatureBlockProps) {
  return (
    <div
      className={[
        'grid gap-10 lg:items-center lg:gap-14',
        reverse ? 'lg:grid-cols-[1.08fr_0.92fr]' : 'lg:grid-cols-[0.9fr_1.1fr]',
        reverse ? 'lg:[&>*:first-child]:order-2' : '',
      ].join(' ')}
    >
      <div className={['flex', reverse ? 'justify-start' : 'justify-end'].join(' ')}>
        <div className="group w-full max-w-[440px] overflow-hidden rounded-tr-[140px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]"
          />
        </div>
      </div>

      <div className={reverse ? 'lg:pl-8' : ''}>
        <h3
          className="whitespace-pre-line font-regal text-[48px] leading-[0.95] tracking-[0.02em] md:text-[60px] lg:text-[64px]"
          style={{ color: NAVY }}
        >
          {title}
        </h3>
        <div
          className="mt-6 max-w-[620px] space-y-3 font-inter text-[18px] leading-8 tracking-[0.03em] md:text-[19px]"
          style={{ color: `${NAVY}CC` }}
        >
          {description.map((paragraph, index) => (
            <TextLineReveal
              key={`${title}-${index}`}
              as="p"
              text={paragraph}
              className="font-inter text-[18px] leading-8 tracking-[0.03em] md:text-[19px]"
              style={{ color: `${NAVY}CC` }}
              delay={index * 0.12}
              lineDelay={0.08}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StayOnTrackSection() {
  return (
    <Section className="pt-0">
      <div className="mx-auto max-w-[1180px] rounded-tr-[110px] bg-[#F2E6D3] px-7 py-9 sm:px-10 lg:px-12 lg:py-10">
        <h2 className="font-regal text-[42px] leading-none tracking-[0.01em] md:text-[48px]" style={{ color: NAVY }}>
          STAY ON TRACK
        </h2>

        <p className="mt-5 max-w-[760px] font-inter text-[17px] leading-8" style={{ color: `${NAVY}CC` }}>
          Discover the Orient Express newsletter - explore at your leisure and be the first to discover routes,
          inspiring itineraries, and new ways to travel with wonder.
        </p>

        <p className="mt-2 font-inter text-[18px] font-regular" style={{ color: NAVY }}>
          * Required fields
        </p>

        <div className="mt-4 grid gap-5 md:grid-cols-[0.7fr_1.7fr_1.2fr]">
          <NewsletterField
            label="Title"
            placeholder="Select"
            as="select"
            options={['Mr.', 'Mrs.', 'Ms.', 'Mx.']}
          />
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

const featureBlocks: TrainFeatureBlockProps[] = [
  {
    title: 'THE EXPERIENCE CAR',
    image: '/images/train/experience-car.png',
    imageAlt: 'The Experience Car',
    description: [
      'The Experience Carriage is thoughtfully styled around Vietnam’s major festivals, transforming with the seasons to reflect their colors, atmosphere, and emotional spirit.',
      'Each period brings a renewed spatial narrative — from decorative details to sensory elements — creating an evolving cultural setting.',
      'Through curated cuisine, traditional games, and intimate live performances on a small stage, guests are invited into an immersive journey of Vietnamese heritage.',
      'It is not merely a themed space, but a living cultural moment — refined, interactive, and deeply familiar.',
    ],
  },
  {
    title: 'THE DINING CAR',
    image: '/images/train/dining-car.png',
    imageAlt: 'The Dining Car',
    reverse: true,
    description: [
      'The Dining Car draws inspiration from Vietnamese culture and traditional craftsmanship, featuring handcrafted details by local artisans.',
      'Guests experience regional specialties from across Vietnam, with familiar family dishes thoughtfully reimagined at THE LUA’s table.',
      'As the train passes through major provinces, the menu evolves — allowing diners to taste each region’s identity throughout the journey.',
    ],
  },
  {
    title: 'THE SUITES',
    image: '/images/train/suite-1.png',
    imageAlt: 'The Suites',
    description: [
      'The Sleeping Cabin is thoughtfully designed with traditional Vietnamese handicrafts, creating a warm and intimate atmosphere in every detail. Through its layout, materials, and interior elements, guests are introduced to the diverse craft villages found across Vietnam.',
      'THE LUA incorporates traditional silk into the bedding and soft furnishings, enhancing comfort while celebrating heritage. The space becomes more than a place to rest — it is a quiet, tactile experience of Vietnamese craftsmanship.',
    ],
  },
]

export function TrainPage() {
  const { hash } = useLocation()
  const getStaggerDelay = (baseDelay: number, index: number, step = 0.1) =>
    baseDelay + index * step

  useEffect(() => {
    if (hash !== '#immersive-vietnam') return

    const timer = window.setTimeout(() => {
      const section = document.getElementById('immersive-vietnam')
      if (!section) return

      const top = section.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }, 120)

    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <div className="bg-white">
      <section className="relative -mt-16 h-[calc(88vh+4rem)] min-h-[620px] w-full overflow-hidden">
        <img
          src="/images/train/hero.png"
          alt="THE LUA Train Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#11163F]/28" />
      </section>

      <Section>
        <div id="immersive-vietnam">
          <RevealOnScroll delay={0.04}>
            <PageEyebrow />
          </RevealOnScroll>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,530px)_minmax(0,1fr)] lg:items-center lg:gap-10">
            <RevealOnScroll delay={0.08}>
              <div>
              <DisplayTitle>IMMERSIVE VIETNAM</DisplayTitle>

              <div
                className="mt-6 max-w-[620px] space-y-5 font-inter text-[19px] leading-9 tracking-[0.04em]"
                style={{ color: NAVY }}
              >
                <TextLineReveal
                  as="p"
                  text="THE LUA offers an unhurried rail journey through Vietnam, up to 7 days of quiet passage where time slows and landscapes are gently revealed, from North to South, or in reverse."
                  className="font-inter text-[19px] leading-9 tracking-[0.04em]"
                  style={{ color: NAVY }}
                  delay={0}
                  lineDelay={0.08}
                />
                <TextLineReveal
                  as="p"
                  text="Rather than moving endlessly between destinations, life aboard THE LUA is about staying. You settle into a single space while Vietnam unfolds beyond the window: highlands softened by morning mist, coastlines glowing in restrained light, towns and textures passing with quiet continuity."
                  className="font-inter text-[19px] leading-9 tracking-[0.04em]"
                  style={{ color: NAVY }}
                  delay={0.12}
                  lineDelay={0.08}
                />
              </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="flex justify-end" delay={0.14} y={22} amount={0.08} initialScale={0.992}>
              <div className="group w-full max-w-[620px] overflow-hidden rounded-tl-[140px] rounded-tr-[140px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_22px_42px_rgba(34,36,88,0.12)]">
                <img src="/images/train/immersive.png" alt="Immersive Vietnam" className="w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      <section className="py-16 lg:py-20 mb-10">
        <Container>
          <div className="max-w-[980px]">
            <RevealOnScroll delay={0.04}>
              <h2
                className="font-regal text-[42px] leading-none tracking-[0.01em] md:text-[54px] lg:text-[60px]"
                style={{ color: NAVY }}
              >
                INSIDE THE LUA TRAIN
              </h2>
            </RevealOnScroll>

            <div className="mt-10 grid gap-5 lg:h-[640px] lg:grid-cols-[minmax(0,1fr)_255px] lg:items-stretch">
              <RevealOnScroll y={18} amount={0.08} duration={0.65} initialScale={0.994}>
                <div className="group h-full overflow-hidden rounded-tr-[140px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
                  <img src="/images/train/inside-1.png" alt="Inside THE LUA" className="h-full w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]" />
                </div>
              </RevealOnScroll>

              <div className="relative grid h-full grid-rows-2 gap-5">
                <RevealOnScroll y={18} amount={0.08} duration={0.65} delay={0.1} initialScale={0.994}>
                  <div className="group aspect-square h-full overflow-hidden rounded-br-[125px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
                    <img src="/images/train/inside-2.png" alt="Inside THE LUA 2" className="h-full w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]" />
                  </div>
                </RevealOnScroll>

                <RevealOnScroll y={18} amount={0.08} duration={0.65} delay={0.2} initialScale={0.994}>
                  <div className="h-full aspect-square overflow-hidden rounded-tr-[125px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)] group">
                    <img src="/images/train/inside-3.png" alt="Inside THE LUA 3" className="h-full w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]" />
                  </div>
                </RevealOnScroll>

                <span
                  className="absolute -right-[80px] top-1/2 z-10 hidden -translate-y-1/2 text-[50px] leading-none lg:block"
                  style={{ color: GOLD }}
                >
                  ✦
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {featureBlocks.map((block, idx) => (
        <section
          key={block.title}
          className="py-16 lg:py-20"
          style={{ backgroundColor: block.reverse ? '#FFFFFF' : '#F2E6D3' }}
        >
          <Container>
            <RevealOnScroll delay={getStaggerDelay(0.05, idx, 0.08)} y={24} amount={0.1}>
              <TrainFeatureBlock {...block} />
            </RevealOnScroll>
          </Container>
        </section>
      ))}

      <section className="py-14 lg:py-18">
        <Container>
          <div className="relative grid gap-6 lg:grid-cols-[300px_1fr] lg:items-stretch">
            <RevealOnScroll className="h-full" y={18} amount={0.08} duration={0.65} initialScale={0.994}>
              <div className="group h-full overflow-hidden rounded-br-[145px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
                <img src="/images/train/suite-2.png" alt="THE LUA Suite Detail" className="h-full w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]" />
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="h-full" y={18} amount={0.08} duration={0.65} delay={0.12} initialScale={0.994}>
              <div className="group h-full overflow-hidden rounded-bl-[145px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
                <img src="/images/train/suite-3.png" alt="THE LUA Suite Interior" className="h-full w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]" />
              </div>
            </RevealOnScroll>

            <span
              className="pointer-events-none absolute left-[312px] top-[92%] z-10 hidden -translate-x-1/2 -translate-y-1/2 text-[45px] leading-none lg:block"
              style={{ color: GOLD }}
            >
              ✦
            </span>
          </div>
        </Container>
      </section>

      <StayOnTrackSection />

      <InstagramSection />
    </div>
  )
}