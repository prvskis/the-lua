import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { Section } from '@/components/layout/Section'
import { InstagramSection } from '@/components/sections/InstagramSection'
import { TextLineReveal } from '@/components/TextLineReveal'
import { FiMap, FiStar, FiUsers } from 'react-icons/fi'

const NAVY = '#222458'
const PAPER = '#F6EFE4'
const GOLD = '#D9B07A'

type StoryBlockProps = {
  title: string
  description: string[]
  image: string
  reverse?: boolean
}

type TeamMember = {
  name: string
  role: string
  image: string
}

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
        className="absolute left-3 top-0 z-10 -translate-y-[52%] bg-[#E4D8C4] px-2.5 font-inter text-[14px] leading-none md:text-[15px]"
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

function AboutStoryBlock({ title, description, image, reverse = false }: StoryBlockProps) {
  return (
    <div
      className={[
        'grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14',
        reverse ? 'lg:[&>*:first-child]:order-2' : '',
      ].join(' ')}
    >
      <div className={reverse ? 'lg:pl-8' : ''}>
        <h3
          className="mt-4 whitespace-pre-line font-regal text-[56px] leading-[0.95] tracking-[0.02em] md:text-[64px]"
          style={{ color: NAVY }}
        >
          {title}
        </h3>
        <div
          className="mt-6 max-w-[560px] space-y-2 font-inter text-[20px] leading-8 tracking-[0.02em]"
          style={{ color: `${NAVY}CC` }}
        >
          {description.map((paragraph, idx) => (
            <TextLineReveal
              key={paragraph}
              as="p"
              text={paragraph}
              className="font-inter text-[20px] leading-8 tracking-[0.02em]"
              style={{ color: `${NAVY}CC` }}
              delay={idx * 0.12}
              lineDelay={0.08}
            />
          ))}
        </div>
      </div>

      <div className={['flex', reverse ? 'justify-start' : 'justify-end'].join(' ')}>
        <div className="group w-full max-w-[480px] overflow-hidden rounded-tr-[140px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]"
          />
        </div>
      </div>
    </div>
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

function WhyChooseCard({
  title,
  icon,
  shapeClass,
}: {
  title: string
  icon: React.ReactNode
  shapeClass: string
}) {
  return (
    <article
      className={[
        'relative aspect-[1.18/1] overflow-hidden bg-[#E4D8C4] px-5 py-4 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)] md:px-6 md:py-5',
        shapeClass,
      ].join(' ')}
    >
      <div className="flex h-full flex-col items-center justify-center text-center" style={{ color: NAVY }}>
        <div className="mb-6 text-[34px] md:text-[38px]">{icon}</div>
        <h3 className="font-inter text-[12px] tracking-[0.02em] md:text-[13px]" style={{ color: `${NAVY}E0` }}>
          {title}
        </h3>
      </div>
    </article>
  )
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group overflow-hidden text-[#2A2B5E]">
      <div className="overflow-hidden rounded-tr-[140px] bg-black/5 transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
        <img
          src={member.image}
          alt={member.name}
          className="h-[360px] w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]"
        />
      </div>

      <div className="relative rounded-bl-[100px] bg-[#F2E6D3] px-6 pb-8 pt-5 text-center transition-colors duration-300 group-hover:bg-[#F0E2CE]">
        <h3 className="font-inter text-[18px] font-extrabold tracking-[0.01em] md:text-[20px]" style={{ color: NAVY }}>
          {member.name}
        </h3>
        <p className="mt-2 font-inter text-[12px] font-semibold tracking-[0.02em] text-[#2A2B5E]/80 md:text-[13px]">
          {member.role}
        </p>
        <span className="absolute bottom-4 right-5 text-[30px]" style={{ color: GOLD }}>
          ✦
        </span>
      </div>
    </article>
  )
}

export function AboutPage() {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(2)
  const [testimonialStepWidth, setTestimonialStepWidth] = useState(0)
  const [isTestimonialAnimating, setIsTestimonialAnimating] = useState(false)
  const [isTestimonialTransitionEnabled, setIsTestimonialTransitionEnabled] = useState(true)
  const testimonialTrackRef = useRef<HTMLDivElement | null>(null)
  const firstTestimonialRef = useRef<HTMLDivElement | null>(null)
  const getStaggerDelay = (baseDelay: number, index: number, step = 0.1) =>
    baseDelay + index * step

  const storyBlocks: StoryBlockProps[] = [
    {
      title: 'HERITAGE CONCEPT',
      image: '/images/about/story-1.png',
      description: [
        'The Lua is an invitation to experience Vietnam beyond the surface.',
        'Not as a destination, but as a living atmosphere felt through rhythm, texture, memory, and movement.',
        'Vietnam is not only landscapes or heritage sites, it is the quiet hum of a train at dusk, the glow of warm light through a window, and the layered stories carried across generations.',
        'We do not present Vietnam. We immerse you in it.',
      ],
    },
    {
      title: 'DESIGNED AS\nA JOURNEY CULTURE',
      image: '/images/about/story-2.png',
      reverse: true,
      description: [
        'At The Lua, design is not decoration, it is translation.',
        'We translate the spirit of Vietnam into form, proportion, material, and tone. Each detail holds a layer of meaning: movement reflects progress, structure reflects resilience, softness reflects humanity.',
        'Every piece becomes a vessel carrying culture forward without nostalgia, preserving identity without standing still.',
      ],
    },
    {
      title: 'LAYERS OF\nMEANING',
      image: '/images/about/story-3.png',
      description: [
        'The Lua exists in layers.',
        'On the surface, it is refined and minimal. Beneath, it carries narrative and emotion.',
        'At its core, it represents a Vietnam that is evolving, confident, contemporary, yet deeply rooted.',
        'We believe immersion creates connection. And connection creates memory.',
        'The Lua is not about travel alone. It is about moving through Vietnam and allowing Vietnam to move through you.',
      ],
    },
  ]

  const members: TeamMember[] = [
    { name: 'JUHOON', role: 'CEO, Founder', image: '/images/about/team-1.png' },
    { name: 'KRISAN DO', role: 'Business Development Manager', image: '/images/about/team-2.png' },
    { name: 'MARTIN EDWARDS', role: 'Operation Manager', image: '/images/about/team-3.png' },
  ]

  const highlights = [
    {
      title: 'Intimate Concept',
      icon: <FiStar aria-hidden="true" />,
      shapeClass: 'rounded-br-[92px]',
    },
    {
      title: '128 Curated Guests',
      icon: <FiUsers aria-hidden="true" />,
      shapeClass: 'rounded-bl-[92px]',
    },
    {
      title: 'Immersive Vietnam Route',
      icon: <FiMap aria-hidden="true" />,
      shapeClass: 'rounded-tr-[92px]',
    },
    {
      title: '8 Immersive Cars',
      icon: <TrainMiniIcon />,
      shapeClass: 'rounded-tl-[92px]',
    },
  ]

  const testimonials = [
    {
      title: 'AMAZING TRIP IN VIET NAM',
      body:
        'Coming here with my family. I have to say that this is one of the most amazing trip that i have experienced in 2026 and it was a truly memorable journey. The train was comfortable, elegant, and very well organized. The staff were attentive and made us feel welcome throughout the trip. We especially enjoyed watching the scenery together and sharing meals on board. It was relaxing, meaningful, and a beautiful way to experience Vietnam. I would highly recommend The Lua for families looking for a refined yet comfortable journey.',
      name: 'Timothee Chalamet',
      date: '11/3/2026',
      avatar: '/images/home/avatar-1.jpg',
    },
    {
      title: 'VIET NAM IS SO AWSOME',
      body:
        "The food here is so good. I can't stop myself eating all the Vietnamese foods. Wish i had more time to enjoy this amazing trip. The staff is very kind and i really love there humor. They kinda funny and take care of me in a little things. My husband even made a plan for the next trip in THE LUA, he even invited his friends and his co-workers. can’t deny the immersive culture they gave us and we learned a lots about Viet Nam through this trip. I will come back soon to have another amazing trip in THE LUA.",
      name: 'Conan Gray',
      date: '10/2/2026',
      avatar: '/images/home/avatar-2.jpg',
    },
    {
      title: 'A BEAUTIFUL WAY TO SEE VIET NAM',
      body:
        'This journey felt very different from a normal holiday. Everything moved at a gentle pace and gave us time to really enjoy each moment. I loved how the scenery changed through the window during the day, and how peaceful the atmosphere became in the evening. The design of the train was elegant, the service was thoughtful, and every part of the experience felt carefully prepared. It gave us a deeper connection to Viet Nam, not only through the places we passed, but through the food, the stories, and the small details on board. I would absolutely choose THE LUA again.',
      name: 'Lily Collins',
      date: '20/3/2026',
      avatar: '/images/home/avatar-1.jpg',
    },
  ] as const

  const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials]

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

  return (
    <div className="bg-white">
      <section className="relative -mt-16 h-[calc(88vh+4rem)] min-h-[620px] w-full overflow-hidden">
        <img
          src="/images/about/hero.png"
          alt="About THE LUA"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#11163F]/35" />
      </section>

      <Section>
        <div>
          <RevealOnScroll delay={0.04}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-inter text-[18px] tracking-[0.04em] md:text-[22px]">
              <span className="text-[36px] leading-none" style={{ color: GOLD }}>
                ✦
              </span>
              <span className="font-bold" style={{ color: NAVY }}>
                THE LUA TRAIN
              </span>
              <span className="text-[25px] font-light leading-none text-[#232566]/80">|</span>
              <span className="font-normal" style={{ color: NAVY }}>
                ABOUT US
              </span>
            </div>
          </RevealOnScroll>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,530px)_minmax(0,1fr)] lg:items-center lg:gap-10">
            <div>
              <RevealOnScroll delay={0.08}>
                <div>
                <DisplayTitle>IMMERSIVE VIETNAM</DisplayTitle>
                </div>
              </RevealOnScroll>

              <div
                className="mt-6 max-w-[620px] space-y-5 font-inter text-[19px] leading-9 tracking-[0.04em]"
                style={{ color: NAVY }}
              >
                <TextLineReveal
                  as="p"
                  text="THE LUA offers an unhurried rail journey through Vietnam, up to 7 days of quiet passage where time slows and landscapes are gently revealed, from North to South, or in reverse."
                  className="font-inter text-[19px] leading-9 tracking-[0.04em]"
                  style={{ color: NAVY }}
                  delay={0.12}
                  lineDelay={0.09}
                />
                <TextLineReveal
                  as="p"
                  text="Rather than moving endlessly between destinations, life aboard THE LUA is about staying. You settle into a single space while Vietnam unfolds beyond the window, through coastlines, cities, highlands, and subtle details that might otherwise pass unnoticed."
                  className="font-inter text-[19px] leading-9 tracking-[0.04em]"
                  style={{ color: NAVY }}
                  delay={0.2}
                  lineDelay={0.09}
                />
                <TextLineReveal
                  as="p"
                  text="It is a journey designed to be felt as much as seen, where memory, design, cuisine, and atmosphere shape the experience as deeply as the route itself."
                  className="font-inter text-[19px] leading-9 tracking-[0.04em]"
                  style={{ color: NAVY }}
                  delay={0.28}
                  lineDelay={0.09}
                />
              </div>
            </div>

            <RevealOnScroll className="flex justify-end" delay={0.14} y={22} amount={0.08} initialScale={0.992}>
              <div className="group w-full max-w-[620px] overflow-hidden rounded-tl-[140px] rounded-tr-[140px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_22px_42px_rgba(34,36,88,0.12)]">
                <img
                  src="/images/about/immersive.png"
                  alt="Immersive Vietnam"
                  className="w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      <section className="py-16 lg:py-20" style={{ backgroundColor: PAPER }}>
        <Container>
          <RevealOnScroll delay={0.04}>
            <DisplayTitle center>THE STORY</DisplayTitle>
          </RevealOnScroll>
          <TextLineReveal
            as="p"
            text="THE LUA offers an unhurried rail journey through Vietnam, up to 7 days of quiet passage where time slows and landscapes are gently revealed, from North to South, or in reverse."
            className="mx-auto mt-5 max-w-[700px] text-center font-inter text-[19px] leading-8 tracking-[0.04em]"
            style={{ color: `${NAVY}B3` }}
            delay={0.08}
            lineDelay={0.09}
          />

          <div className="mt-14 space-y-24 lg:space-y-28">
            {storyBlocks.map((block, idx) => (
              <RevealOnScroll key={block.title} delay={getStaggerDelay(0.08, idx, 0.12)} y={28} amount={0.12}>
                <AboutStoryBlock {...block} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <Section className="pt-0">
        <div className="mx-auto max-w-[980px] rounded-tr-[110px] bg-[#E4D8C4] px-7 py-9 sm:px-10 lg:px-12 lg:py-10">
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

      <Section>
        <RevealOnScroll delay={0.04} y={0} duration={0.55} initialScale={0.985}>
          <div className="text-center">
            <div className="mt-[-80px] text-[36px]" style={{ color: GOLD }}>
              ✦
            </div>
            <DisplayTitle center className="mt-6 text-[44px] md:text-[58px]">
              WHY CHOOSE US <span className="font-inter font-light">?</span>
            </DisplayTitle>
            <TextLineReveal
              as="p"
              text="Discover a deeper way to experience Vietnam — where culture is lived, not displayed, and every journey is crafted to immerse you in its heritage, rhythm, and spirit."
              className="mx-auto mt-2 max-w-[680px] font-inter text-[18px] leading-[1.8] tracking-[0.04em]"
              style={{ color: `${NAVY}B3` }}
              delay={0.08}
              lineDelay={0.08}
            />
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid gap-8 lg:grid-cols-[500px_1fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <RevealOnScroll className="h-full" delay={0.1} y={0} amount={0.08} duration={0.55} initialScale={0.97}>
              <div className="group h-full overflow-hidden rounded-tr-[140px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
                <img src="/images/about/why-1.png" alt="The Lua experience 1" className="h-full w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]" />
              </div>
            </RevealOnScroll>
            <RevealOnScroll className="h-full" delay={0.2} y={0} amount={0.08} duration={0.55} initialScale={0.97}>
              <div className="group h-full overflow-hidden rounded-tl-[140px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
                <img src="/images/about/why-2.png" alt="The Lua experience 2" className="h-full w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]" />
              </div>
            </RevealOnScroll>
            <RevealOnScroll className="col-span-2 h-full" delay={0.3} y={0} amount={0.08} duration={0.6} initialScale={0.97}>
              <div className="group h-full overflow-hidden rounded-tr-[140px] bg-black/5 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(34,36,88,0.12)]">
                <img src="/images/about/why-3.png" alt="The Lua experience 3" className="h-full w-full object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.03]" />
              </div>
            </RevealOnScroll>
          </div>

          <div className="flex justify-center lg:justify-center">
            <div className="grid w-full max-w-[440px] gap-4 md:grid-cols-2">
              {highlights.map((item, idx) => (
                <RevealOnScroll
                  key={item.title}
                  delay={getStaggerDelay(0.18, idx, 0.1)}
                  y={0}
                  amount={0.08}
                  duration={0.55}
                  initialScale={0.965}
                >
                  <WhyChooseCard
                    title={item.title}
                    icon={item.icon}
                    shapeClass={item.shapeClass}
                  />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <section className="py-16 lg:py-20">
        <Container>
          <RevealOnScroll delay={0.04}>
            <div className="text-center">
              <div className="mb-10 mt-[-80px] text-[36px]" style={{ color: GOLD }}>
                ✦
              </div>
              <DisplayTitle center>MEET OUR TEAM</DisplayTitle>
            </div>
            <TextLineReveal
              as="p"
              text="THE LUA offers an unhurried rail journey through Vietnam, up to 7 days of quiet passage where time slows and landscapes are"
              className="mx-auto mt-5 max-w-[640px] text-center font-inter text-[18px] leading-8 tracking-[0.04em]"
              style={{ color: `${NAVY}B3` }}
              delay={0.08}
              lineDelay={0.08}
            />
          </RevealOnScroll>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member, idx) => (
              <RevealOnScroll
                key={member.name}
                delay={getStaggerDelay(0.08, idx, 0.1)}
                y={20}
                amount={0.08}
                initialScale={0.992}
              >
                <TeamCard member={member} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS (static version trước, sau nâng lên carousel) */}
      {/* TESTIMONIALS */}
      <section className="py-14 mb-10" style={{ backgroundColor: PAPER }}>
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <motion.div {...({
            initial: { opacity: 0, y: 28 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.18 },
            transition: {
              duration: 1,
              delay: 0.04,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
          })}>
            <DisplayTitle center>A COLLECTION OF FIVE-STAR MOMENTS</DisplayTitle>
          </motion.div>

          {/* BAND with texture behind cards */}
          <div className="relative mt-8">
            {/* texture band (height follows cards via absolute inset) */}
            <div
              className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/images/home/texture-pattern.png')",
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
                    <article className="relative flex min-h-full w-full flex-col rounded-[6px] border border-black/10 bg-white px-10 py-8 shadow-[0_16px_40px_rgba(34,36,88,0.06)] transition-[box-shadow,border-color] duration-300 hover:border-[#D9B07A]/35 hover:shadow-[0_24px_50px_rgba(34,36,88,0.1)]">
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

                        <h3 className="mt-2 font-inter text-[22px] font-extrabold tracking-[0.02em] text-black/80">
                          {t.title}
                        </h3>

                        <p className="mt-1 font-inter text-[15px] leading-6 text-black/65">
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
                          <div className="text-[16px] font-semibold text-black/55">{t.name}</div>
                          <div className="text-[14px] text-black/30">{t.date}</div>
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
          <motion.div className="mt-12 flex items-center justify-center gap-5 text-[#2A2B5E]/60" {...({
            initial: { opacity: 0, y: 28 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.18 },
            transition: {
              duration: 1,
              delay: 0.22,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
          })}>
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

    </div>
  )
}