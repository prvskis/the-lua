import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi"
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiStarLine, RiYoutubeFill } from "react-icons/ri"
import { Link } from "react-router-dom"

const CONTACT_PHONE = "099 236 5147"
const CONTACT_PHONE_HREF = "tel:+84992365147"
const CONTACT_EMAIL = "cs@theluatrain.com.vn"
const CONTACT_EMAIL_HREF = "mailto:cs@theluatrain.com.vn"
const CONTACT_ADDRESS = "No 28, Ngo Quyen, Dist 1, Ho Chi Minh City"
const CONTACT_MAP_HREF = "https://www.google.com/maps/search/?api=1&query=28+Ngo+Quyen+District+1+Ho+Chi+Minh+City"

type FooterPopupItem = {
  id: string
  label: string
  title: string
  intro: string
  details: string[]
}

type FooterSiteLink =
  | {
      id: string
      label: string
      to: string
    }
  | FooterPopupItem

type FeedbackLink =
  | {
      href: string
      label: string
      icon: typeof FiMail
      kind: "external"
    }
  | {
      label: string
      icon: typeof RiStarLine
      kind: "rating"
    }

const FOOTER_INFO_LINKS: readonly FooterPopupItem[] = [
  {
    id: "terms",
    label: "General Term Of Use",
    title: "General Terms of Use",
    intro: "A overview of how THE LUA digital experience is presented and how guests may interact with it.",
    details: [
      "This site is designed to present routes, stories, and the design language of THE LUA in a calm editorial format.",
      "Booking and contact forms are treated as expressions of interest rather than instant reservation confirmations.",
    ],
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    intro: "A short summary of how guest information should be handled across contact and booking.",
    details: [
      "Information shared through forms may include contact details and travel preferences so our concierge team can respond thoughtfully.",
      "Guest information should be used with restraint, clarity, and respect for privacy at every stage of the experience.",
    ],
  },
  {
    id: "legal",
    label: "Legal Notice",
    title: "Legal Notice",
    intro: "A brief note on the brand, visuals, editorial materials, and other content displayed across the site.",
    details: [
      "THE LUA name, visual language, and editorial presentation are part of a curated brand system and should not be reused without permission.",
      "Operational information, imagery, and route descriptions may evolve as the guest experience continues to be refined.",
    ],
  },
  {
    id: "cookies",
    label: "Cookie Policy",
    title: "Cookie Policy",
    intro: "A light explanation of how cookies or similar technologies may support performance and user experience.",
    details: [
      "Cookies may be used to support interface consistency, simple analytics, and quality improvements across the site.",
      "Any future consent system should remain transparent, minimal, and aligned with a calm premium experience.",
    ],
  },
] as const

const FOOTER_SITE_LINKS: readonly FooterSiteLink[] = [
  {
    id: "about-us",
    label: "About Us",
    to: "/about",
  },
  {
    id: "the-train",
    label: "The Train",
    to: "/train",
  },
  {
    id: "destinations",
    label: "Destinations",
    to: "/destination",
  },
  {
    id: "career",
    label: "Career",
    title: "Career Information",
    intro: "A quick way to learn how to connect with THE LUA career - regarding our future opportunities.",
    details: [
      "For career interest, guests and candidates may reach out directly to our team via the listed email contact.",
      "As the project evolves, career information can be expanded into a dedicated recruitment flow if needed.",
    ],
  },
] as const

const FOOTER_BOTTOM_POPUPS: readonly FooterPopupItem[] = [
  {
    id: "accessibility",
    label: "Web Accessibility",
    title: "Web Accessibility",
    intro: "A short note on our approach to clarity, navigation, and inclusive interaction.",
    details: [
      "We aim to support readable contrast, visible focus states, and interactions that remain understandable across devices.",
      "Accessibility is an ongoing refinement process and should continue to evolve as the site grows.",
    ],
  },
  {
    id: "sitemap",
    label: "Sitemap",
    title: "Sitemap Overview",
    intro: "A simple guide to the main areas currently available across THE LUA.",
    details: [
      "Primary navigation currently includes Home, About, Destinations, News, and The Train, with shared booking access across the site.",
      "Deep links and section-based navigation are used throughout to keep the experience fluid rather than fragmented.",
    ],
  },
] as const

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/", label: "Facebook", icon: RiFacebookFill },
  { href: "https://www.instagram.com/", label: "Instagram", icon: RiInstagramFill },
  { href: "https://www.youtube.com/", label: "YouTube", icon: RiYoutubeFill },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: RiLinkedinFill },
] as const

const FEEDBACK_LINKS: readonly FeedbackLink[] = [
  { href: "https://mail.google.com/", label: "Email feedback", icon: FiMail, kind: "external" },
  { href: "https://www.instagram.com/", label: "Instagram feedback", icon: RiInstagramFill, kind: "external" },
  { label: "Favorite", icon: RiStarLine, kind: "rating" },
] as const

export function Footer() {
    const [activePopup, setActivePopup] = useState<FooterPopupItem | null>(null)
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
    const [selectedRating, setSelectedRating] = useState(0)
    const [feedbackText, setFeedbackText] = useState("")
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

    useEffect(() => {
      if (!activePopup && !isRatingModalOpen) return

      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setActivePopup(null)
          setIsRatingModalOpen(false)
          setFeedbackSubmitted(false)
        }
      }

      window.addEventListener("keydown", handleKeyDown)

      return () => {
        document.body.style.overflow = previousOverflow
        window.removeEventListener("keydown", handleKeyDown)
      }
    }, [activePopup, isRatingModalOpen])

    return (
      <>
      <footer className="bg-[#232566] font-inter text-[#F4E9D6]">
        <div className="mx-auto px-6 pt-16 lg:px-8 lg:pt-20">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-24 lg:items-start">
            {/* LEFT */}
            <div className="grid max-w-[520px] gap-12 lg:justify-self-end lg:gap-14">
              {/* Contact */}
              <div>
                <h3 className="font-work text-[25px] tracking-[0.005em] font-semibold">Contact</h3>
  
                <div className="mt-2 space-y-4 text-[15px] leading-7 text-[#F4E9D6]/90">
                  <div className="flex items-start gap-4">
                    <FiPhone className="mt-1 w-8 shrink-0 text-[22px] leading-none" aria-hidden="true" />
                    <a href={CONTACT_PHONE_HREF} className="transition hover:opacity-75">
                      {CONTACT_PHONE}
                    </a>
                  </div>

                  <div className="flex items-start gap-4">
                    <FiMail className="mt-1 w-8 shrink-0 text-[22px] leading-none" aria-hidden="true" />
                    <a href={CONTACT_EMAIL_HREF} className="transition hover:opacity-75">
                      {CONTACT_EMAIL}
                    </a>
                  </div>

                  <div className="flex items-start gap-4">
                    <FiMapPin className="mt-1 w-8 shrink-0 text-[22px] leading-none" aria-hidden="true" />
                    <a
                      href={CONTACT_MAP_HREF}
                      target="_blank"
                      rel="noreferrer"
                      className="max-w-[320px] transition hover:opacity-75"
                    >
                      {CONTACT_ADDRESS}
                    </a>
                  </div>
                </div>
              </div>
  
              {/* Links */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-8 text-[15px] leading-7 text-[#F4E9D6]/90">
                <div className="space-y-3">
                  {FOOTER_INFO_LINKS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActivePopup(item)}
                      className="block text-left transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232566]"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
  
                <div className="space-y-3">
                  {FOOTER_SITE_LINKS.map((item) =>
                    "to" in item ? (
                      <Link
                        key={item.id}
                        to={item.to}
                        className="block text-left transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232566]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActivePopup(item)}
                        className="block text-left transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232566]"
                      >
                        {item.label}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
  
            {/* CENTER */}
            <div className="flex items-center justify-center lg:pt-10">
              <Link to="/" aria-label="Go to homepage">
                <img
                  src="/logos/logo-set-light.png"
                  alt="THE LUA"
                  className="h-[160px] mt-20 w-auto object-contain lg:h-[180px]"
                />
              </Link>
            </div>
  
            {/* RIGHT */}
            <div className="grid max-w-[520px] ml-[20px] gap-10 lg:justify-self-start lg:gap-11">
              <div>
                <h3 className="font-work text-[25px] tracking-[0.005em] font-semibold">Follow Us</h3>
                <div className="mt-4 flex items-center gap-6 text-[36px] text-[#F4E9D6]/95">
                  {SOCIAL_LINKS.map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        className="transition hover:opacity-75"
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    )
                  })}
                </div>
              </div>
  
              <div>
                <h3 className="font-work text-[25px] tracking-[0.005em] font-semibold">Share Your Feed Back</h3>
                <div className="mt-5 flex items-center gap-6 text-[36px] text-[#F4E9D6]/95">
                  {FEEDBACK_LINKS.map((item) => {
                    const Icon = item.icon
                    return item.kind === "external" ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        className="transition hover:opacity-75"
                      >
                        <Icon aria-hidden="true" />
                      </a>
                    ) : (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          setIsRatingModalOpen(true)
                          setFeedbackSubmitted(false)
                        }}
                        aria-label={item.label}
                        className="transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232566]"
                      >
                        <Icon aria-hidden="true" />
                      </button>
                    )
                  })}
                </div>
              </div>
  
              <div>
                <h3 className="font-work text-[25px] font-semibold">Newsletter</h3>
                <p className="mt-3 text-[15px] leading-6 text-[#F4E9D6]/85">
                  Elevate your next THE LUA TRAIN experience by receiving our newsletter.
                </p>
  
                <form
                  className="mt-2 flex max-w-[360px] overflow-hidden rounded-tr-[18px] bg-[#F4E9D6]"
                  action={CONTACT_EMAIL_HREF}
                  method="get"
                >
                  <input type="hidden" name="subject" value="Newsletter Signup - THE LUA" />
                  <input
                    type="email"
                    name="body"
                    placeholder="MartinEdwards@gmail.com"
                    className="font-inter h-[44px] min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#8C7C61] outline-none placeholder:text-[#C5B391]"
                  />
                  <button
                    type="submit"
                    className="px-4 text-[12px] font-semibold tracking-[0.18em] text-[#232566] transition hover:bg-[#EBDDCA]"
                  >
                    JOIN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
  
        {/* BOTTOM BAR */}
        <div className="mt-12 border-t border-[#F4E9D6]/55">
          <div className="mx-auto flex max-w-[1000px] flex-col gap-4 px-6 py-5 text-[14px] text-[#F4E9D6]/90 md:flex-row md:items-center md:justify-between lg:px-8">
            <div className="flex items-center gap-8 md:gap-10">
              {FOOTER_BOTTOM_POPUPS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePopup(item)}
                  className="transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232566]"
                >
                  {item.label}
                </button>
              ))}
            </div>
  
            <p className="text-left md:text-right">Bản quyền © 2026 thuộc về THELUA©</p>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {activePopup ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-[#11163F]/52 backdrop-blur-[5px]"
              aria-label="Close information popup"
              onClick={() => setActivePopup(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.article
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-[760px] overflow-hidden rounded-[30px] bg-[#F8F2E8] shadow-[0_36px_90px_rgba(17,22,63,0.28)]"
            >
              <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
                <div className="bg-[linear-gradient(180deg,#272865_0%,#1E1F4B_100%)] px-6 py-8 text-white sm:px-8 lg:px-10">
                  <p className="font-inter text-[11px] tracking-[0.28em] text-[#F5E7D0]/82">FOOTER INFORMATION</p>
                  <h2 className="mt-4 font-inter text-[40px] font-semibold leading-[1.05] tracking-[0.02em] text-[#FFF9F0] sm:text-[48px]">
                    {activePopup.title}
                  </h2>
                  <p className="mt-5 max-w-[320px] font-inter text-[15px] leading-7 text-white/88">
                    {activePopup.intro}
                  </p>
                </div>

                <div className="px-6 py-8 sm:px-8 lg:px-10">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="font-inter text-[11px] tracking-[0.28em] text-[#222458]/55">INFORMATION</p>
                      <p className="mt-3 max-w-[420px] font-inter text-[15px] leading-7 text-[#222458]/76">
                        A concise popup summary, kept inside the current experience instead of sending you to a separate page.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActivePopup(null)}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D8C6A2] text-[#222458] transition-all duration-200 hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                      aria-label="Close information popup"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-8 space-y-4">
                    {activePopup.details.map((detail, index) => (
                      <div
                        key={`${activePopup.id}-${index}`}
                        className="rounded-tr-[28px] border border-[#E2D3B9] bg-white/68 px-5 py-4"
                      >
                        <p className="font-inter text-[15px] leading-7 text-[#222458]/82">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {isRatingModalOpen ? (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center px-4 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-[#11163F]/52 backdrop-blur-[5px]"
              aria-label="Close feedback modal"
              onClick={() => {
                setIsRatingModalOpen(false)
                setFeedbackSubmitted(false)
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.article
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-[720px] overflow-hidden rounded-[30px] bg-[#F8F2E8] shadow-[0_36px_90px_rgba(17,22,63,0.28)]"
            >
              <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
                <div className="bg-[linear-gradient(180deg,#272865_0%,#1E1F4B_100%)] px-6 py-8 text-white sm:px-8 lg:px-10">
                  <p className="font-inter text-[11px] tracking-[0.28em] text-[#F5E7D0]/82">GUEST FEEDBACK</p>
                  <h2 className="mt-4 font-inter text-[40px] font-semibold leading-[1.05] tracking-[0.02em] text-[#FFF9F0] sm:text-[48px]">
                    Share Your Experience
                  </h2>
                  <p className="mt-5 max-w-[320px] font-inter text-[15px] leading-7 text-white/88">
                    Tell us how the digital experience feels to you. A short rating and comment is enough.
                  </p>
                </div>

                <div className="px-6 py-8 sm:px-8 lg:px-10">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="font-inter text-[11px] tracking-[0.28em] text-[#222458]/55">RATING FORM</p>
                      <p className="mt-3 max-w-[420px] font-inter text-[15px] leading-7 text-[#222458]/76">
                        Select a star rating, leave a short note, and submit your feedback preview.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsRatingModalOpen(false)
                        setFeedbackSubmitted(false)
                      }}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D8C6A2] text-[#222458] transition-all duration-200 hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                      aria-label="Close feedback modal"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  {feedbackSubmitted ? (
                    <div className="mt-8 rounded-tr-[28px] border border-[#E2D3B9] bg-white/68 px-5 py-6">
                      <p className="font-inter text-[11px] tracking-[0.28em] text-[#222458]/55">THANK YOU</p>
                      <p className="mt-4 font-inter text-[32px] font-semibold leading-tight tracking-[0.02em] text-[#222458] sm:text-[34px]">
                        Feedback received
                      </p>
                      <p className="mt-4 font-inter text-[15px] leading-7 text-[#222458]/76">
                        Your rating has been recorded in this preview flow. In a live setup, this is where the feedback
                        would be sent to the team.
                      </p>
                    </div>
                  ) : (
                    <form
                      className="mt-8 space-y-6"
                      onSubmit={(event) => {
                        event.preventDefault()
                        setFeedbackSubmitted(true)
                      }}
                    >
                      <div>
                        <p className="font-inter text-[12px] tracking-[0.18em] text-[#222458]/65">RATING</p>
                        <div className="mt-3 flex items-center gap-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setSelectedRating(star)}
                              className="text-[34px] leading-none transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                              style={{ color: star <= selectedRating ? "#D9B07A" : "#CFC2AD" }}
                              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <span className="absolute left-4 top-0 z-10 -translate-y-1/2 bg-[#F8F2E8] px-2 font-inter text-[12px] tracking-[0.08em] text-[#222458]/75">
                          Feedback
                        </span>
                        <textarea
                          value={feedbackText}
                          onChange={(event) => setFeedbackText(event.target.value)}
                          placeholder="Tell us what feels refined, what could be improved, or anything you would love to see next."
                          className="min-h-[150px] w-full resize-none rounded-tr-[28px] border border-[#2E2A67]/55 bg-white/55 px-4 py-4 font-inter text-[14px] text-[#222458] outline-none transition-all duration-200 placeholder:text-[#222458]/35 focus:border-[#2E2A67] focus:bg-white/85 focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F2E8]"
                        />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="submit"
                          className="rounded-tr-[22px] bg-[#232566] px-5 py-3 font-inter text-[12px] font-semibold tracking-[0.18em] text-white transition-all duration-200 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                        >
                          SUBMIT
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsRatingModalOpen(false)
                            setFeedbackSubmitted(false)
                          }}
                          className="rounded-tr-[22px] border border-[#2E2A67]/55 px-5 py-3 font-inter text-[12px] font-semibold tracking-[0.18em] text-[#222458] transition-all duration-200 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                        >
                          CANCEL
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </>
    )
  }