import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

const NAVY = '#222458'
const PAPER = '#F6EFE4'

const HERO_SLIDES = [
  { kind: 'video', src: '/videos/hero-1.mp4' },
  { kind: 'image', src: '/images/home/hero-2.png', alt: 'THE LUA Hero 2' },
  { kind: 'image', src: '/images/home/hero-3.png', alt: 'THE LUA Hero 3' },
] as const

function PrimaryButton({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center rounded-md px-8 py-3 text-[13px] tracking-[0.2em] text-white',
        className,
      ].join(' ')}
      style={{ backgroundColor: NAVY }}
    >
      {children}
    </button>
  )
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
        'font-regal text-[65px] leading-none tracking-[0.01px]',
        center ? 'text-center' : '',
        className,
      ].join(' ')}
      style={{ color: NAVY }}
    >
      {children}
    </h2>
  )
}

function ScrollToTopFab() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#EFE3D1] text-black/70 shadow-sm hover:text-black"
      aria-label="Scroll to top"
    >
      ↑
    </button>
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

function TripCardView({ c }: { c: TripCard }) {
  // quarter circle top-right (đúng vibe)
  const imgRadius =
    c.shape === 'left'
      ? 'rounded-tr-[140px]' // bạn có thể tăng 160 nếu muốn
      : c.shape === 'mid'
        ? 'rounded-tr-[140px]'
        : 'rounded-tr-[140px]'

  return (
    <article className="text-[#2A2B5E]">
      {/* IMAGE */}
      <div className={`overflow-hidden bg-black/5 ${imgRadius}`}>
        <img
          src={c.img}
          alt={c.title}
          className="w-full object-cover"
        />
      </div>

      {/* TITLE */}
      <h3 className="font-inter text-[20px] font-extrabold tracking-[0.01em] mt-6" style={{ color: NAVY }}>
        {c.title}
      </h3>

      {/* ROUTE */}
      <p className="font-inter font-[400] mt-3 text-[14px] tracking-[0.01em]" style={{ color: NAVY }}>
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
      <div className="font-inter font-[400] flex items-center py-2 text-[14px]" style={{ color: NAVY }}>
        <span>{c.metaLeft}</span>

        <span className="inline-flex items-center mx-6 justify-center rounded-lg">
          <img src="/icons/train.svg" alt="" className="h-7 w-7 object-contain" aria-hidden="true" />
        </span>

        <span>{c.metaRight}</span>
      </div>

      {/* divider line under meta */}
      <div className="h-px w-full bg-black/70" />

      {/* DESC */}
      <p className="font-inter font-[400] mt-2 text-[14px] leading-9 text-black">
        {c.desc}
      </p>

      {/* ACTIONS */}
      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          className="'font-inter font-[400] text-[17px] tracking-[0.01em] underline underline-offset-8 decoration-[#2A2B5E]/50 hover:text-[#2A2B5E]" style={{ color: NAVY }}
        >
          View more
        </button>

        <button
          type="button"
          className="bg-[#1E1F4B] text-[20px] py-1.5 px-6 tracking-[0.1em] text-white
                     rounded-tr-[20px] hover:opacity-95"
        >
          BOOK
        </button>
      </div>
    </article>
  )
}

export function HomePage() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)

  const goToHeroSlide = (idx: number) => {
    const next = ((idx % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length
    setActiveHeroSlide(next)
  }

  const goNextHeroSlide = () => setActiveHeroSlide((i) => (i + 1) % HERO_SLIDES.length)

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

  const trips: TripCard[] = [
    {
      img: '/images/home/explore-1.jpg',
      title: 'FROM HA NOI TO HO CHI MINH',
      route: 'Ha Noi ✦ Hoi An ✦ Da Nang ✦ Ho Chi Minh city',
      metaLeft: 'One way',
      metaRight: '6 days 7 nights',
      desc: 'Set off on a six-day, seven-night on way journey from Ha Noi to Ho Chi Minh city',
      shape: 'left',
    },
    {
      img: '/images/home/explore-2.jpg',
      title: 'FROM HO CHI MINH TO HA NOI',
      route: 'Ho Chi Minh city ✦ Da Nang ✦ Hoi An ✦ Ha Noi',
      metaLeft: 'One way',
      metaRight: '6 days 7 nights',
      desc: 'Set off on a six-day, seven-night on way journey from Ho Chi Minh to Ha Noi capital',
      shape: 'mid',
    },
    {
      img: '/images/home/explore-3.jpg',
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
      <ScrollToTopFab />

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
            src="/images/home/hero-2.png"
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
            src="/images/home/hero-3.png"
            alt="THE LUA Hero 3"
            className="absolute inset-0 block h-full w-full object-cover"
            style={{ scale: 1.15 }}
          />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-14">
          {/* Indicators */}
          <div className="mb-3 flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToHeroSlide(idx)}
                className={[
                  'h-[3px] w-20 rounded-full transition-all duration-300',
                  idx === activeHeroSlide ? 'bg-white/90' : 'bg-white/40 hover:bg-white/55',
                ].join(' ')}
                aria-label={`Go to hero slide ${idx + 1}`}
                aria-current={idx === activeHeroSlide}
              />
            ))}
          </div>

          <div className="flex items-center">
            <span className="font-inter text-[18px] font-regular tracking-[1em] text-white/85">SCROLL TO DISCOVER</span>
          </div>
          <div className="mt-2 text-white/75" aria-hidden="true">
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
          </div>
        </div>
      </section>

      {/* IMMERSIVE VIETNAM */}
      <Section>
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <DisplayTitle>IMMERSIVE VIETNAM</DisplayTitle>

            <p
              className="font-inter text-[25px] font-bold"
              style={{ color: NAVY }}
            >
              Viet Nam Train And Immersive Culture
            </p>

            <div className="mx-auto flex max-w-[620px] items-center gap-6 text-black/30">
              <span className="text-[#D8B387] text-[40px]">✦</span>
              <span className="inline-block h-[1px] w-[430px] bg-[#D8B387] mt-[3.5px]" />
            </div>

            <div className="mt-3 space-y-5 tracking-[0.04em] font-inter font-[400] text-[20px] leading-9" style={{ color: NAVY }}>
              <p>
                From North to South, THE LUA redefines the art of travel through a moving cultural
                experience shaped by light, craft, cuisine, and landscape.
              </p>

              <p>
                Step aboard a journey where every detail is intentionally composed — where handcrafted
                materials meet contemporary design, where regional flavors unfold with the changing
                scenery, and where each window becomes a cinematic frame of Vietnam in motion.
              </p>

              <p>
                Every moment is a departure from the ordinary: an immersion into the textures,
                stories, and quiet beauty of a nation seen slowly and felt deeply.
              </p>

              <p>Come aboard, travel gently, and be moved.</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="origin-top-right overflow-hidden rounded-tr-[160px] bg-black/5 scale-95">
              <img
                src="/images/home/immersive.jpg"
                alt="Immersive"
                className="object-cover"
              />
            </div>

            <div>
              <PrimaryButton className="rounded-none rounded-tr-[20px] py-2 text-[16px] tracking-[0.06em]">
                SEE MORE
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT'S INSIDE */}
      <section className="py-16" style={{ backgroundColor: PAPER }}>
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <DisplayTitle center>WHAT&apos;S INSIDE</DisplayTitle>
          <p className="font-inter font-[400] mx-auto mt-4 max-w-[720px] text-center text-[20px] leading-8 text-[#2A2B5E]/70 tracking-[0.06em]" style={{ color: NAVY }}>
            An immersive journey through Vietnam's culture, movement, <br />
            and living heritage.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { src: '/images/home/inside-1.jpg', alt: 'Inside 1', radius: 'rounded-tr-[160px]' },
              { src: '/images/home/inside-2.jpg', alt: 'Inside 2', radius: 'rounded-tr-[160px]' },
              { src: '/images/home/inside-3.jpg', alt: 'Inside 3', radius: 'rounded-tr-[160px]' },
            ].map((i, idx) => (
              <div
                key={idx}
                className={`overflow-hidden bg-black/5 ${i.radius} rounded-tr-2xl`}
              >
                <img src={i.src} alt={i.alt} className="w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE THE IMMERSIVE */}
      <Section>
        <div className="flex flex-col gap-4">
          <p className="font-inter text-[24px] font-bold tracking-[0.01em]" style={{ color: NAVY }}>
            EXPLORE THE IMMERSIVE DESTINATIONS
          </p>
          <p className="font-inter font-[400] text-[20px] leading-8 text-[#2A2B5E]/70 tracking-[0.06em]" style={{ color: NAVY }}>
            Rooted in the immersive of classic rail travel and shaped <br />
            by contemporary comfort
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {trips.map((t) => (
            <TripCardView key={t.title} c={t} />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <PrimaryButton className="rounded-none rounded-tr-[20px] py-2 text-[16px] tracking-[0.06em]">SEE ALL</PrimaryButton>
        </div>
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
            backgroundImage: "url('/images/home/background-offer.png')",
            transform: 'scale(1.003)',
          }}
        >
          <Container>
            <div className="max-w-[640px] py-10 lg:py-[60px]">
            <p className="font-regal text-[50px] tracking-[0.01em] leading-9">
              SPECIAL SPRING OFFER <br />
              EARLY BIRD SPRING OFFER
              <span className="mx-3 font-inter text-[50px] font-regular tracking-[0.02em]">
                10%
              </span>
            </p>

            

            <div className="mt-6 space-y-2 font-inter text-[20px] text-white/80">
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

            <button className="font-inter text-[16px] font-bold tracking-[0.01em] mt-8 rounded-2xl bg-[#EFE3D1] px-6 py-4" style={{ color: NAVY }}>
              BOOK
            </button>
            </div>
          </Container>
        </div>
      </section>

      {/* TESTIMONIALS (static version trước, sau nâng lên carousel) */}
      {/* TESTIMONIALS */}
      <section className="py-14" style={{ backgroundColor: PAPER }}>
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <DisplayTitle center>A COLLECTION OF FIVE-STAR MOMENTS</DisplayTitle>

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

            <div className="relative grid items-stretch gap-10 lg:grid-cols-2 h-full">
              {[
                {
                  title: 'AMAZING TRIP IN VIET NAM',
                  body:
                    "Coming here with my family. I have to say that this is one of the most amazing trip that i have experienced in 2026 and it was a truly memorable journey. The train was comfortable, elegant, and very well organized. The staff were attentive and made us feel welcome throughout the trip. We especially enjoyed watching the scenery together and sharing meals on board. It was relaxing, meaningful, and a beautiful way to experience Vietnam. I would highly recommend The Lua for families looking for a refined yet comfortable journey.",
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
              ].map((t) => (
                <article
                  key={t.title}
                  className="relative flex flex-col rounded-[6px] border border-black/10 bg-white px-10 py-8"
                >
                  <div className="flex-1">
                    {/* stars */}
                    <div className="flex items-center gap-2 mb-5 text-[#D9B07A]" aria-label="5 out of 5 stars">
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
                  <div className="mt-10 flex items-center gap-4 mt-auto">
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
                  <div className="pointer-events-none absolute text-[30px] bottom-4 right-6 text-[#D9B07A]">
                    ✦
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* controls */}
          <div className="mt-12 flex items-center justify-center gap-5 text-[#2A2B5E]/60">
            <button
              type="button"
              className="text-3xl leading-none hover:text-[#2A2B5E]"
              aria-label="Previous"
            >
              ‹
            </button>

            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-[#D9B07A]/70" />
              <span className="h-3 w-3 rounded-full bg-[#2A2B5E]" />
              <span className="h-3 w-3 rounded-full bg-[#D9B07A]/40" />
            </div>

            <button
              type="button"
              className="text-3xl leading-none hover:text-[#2A2B5E]"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <Section>
        <div className="text-center mt-[-70px]">
          <div className="mx-auto flex max-w-[620px] items-center gap-4 justify-center text-black/30">
            <span className="inline-block h-px w-40 mt-[2px] bg-black/20" />
            <span className="text-[#D9B07A] text-[40px]">✦</span>
            <span className="inline-block h-px w-40 mt-[2px] bg-black/20" />
          </div>

          <p className="font-inter text-[30px] font-bold tracking-[0.06em]" style={{ color: NAVY }}>
            INSTAGRAM
          </p>
          <DisplayTitle center className="text-[45px] md:text-[50px]">
            <span className="font-inter">@</span>THELUATRAIN
          </DisplayTitle>

          <button
            className="group inline-flex items-center gap-2 text-[16px] tracking-[0.12em] text-[#2A2B5E]/70 transition-colors hover:text-[#2A2B5E]"
          >
            follow us

            {/* arrow */}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

            {/* underline animation */}
            <span className="absolute mt-6 block h-px w-0 bg-[#D9B07A] transition-all duration-300 group-hover:w-[90px]" />
          </button>
        </div>

        <div className="relative mt-8 left-1/2 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1800px] gap-4 md:grid-cols-5">
            {['ig-1', 'ig-2', 'ig-3', 'ig-4', 'ig-5'].map((k) => (
              <div
                key={k}
                className="overflow-hidden"
              >
                <img src={`/images/home/${k}.jpg`} alt={k} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-sm"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </Section>

      {/* TEXTURE DIVIDER */}
      <div className="w-full bg-white py-8">
        <div className="w-full overflow-hidden" aria-hidden="true">
          <img
            src="/images/home/texture-section.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}