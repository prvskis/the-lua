import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type BookingModalPayload = {
  origin?: string
  preferredJourney?: string
  route?: string
  travelWindow?: string
  cabinType?: string
}

type BookingFormState = {
  title: string
  fullName: string
  email: string
  phone: string
  preferredJourney: string
  route: string
  travelWindow: string
  guests: string
  cabinType: string
  notes: string
  origin: string
}

type BookingModalContextValue = {
  openBookingModal: (payload?: BookingModalPayload) => void
  closeBookingModal: () => void
}

const NAVY = '#222458'
const PAPER = '#F6EFE4'
const GOLD = '#D9B07A'

const defaultFormState: BookingFormState = {
  title: 'Mr.',
  fullName: '',
  email: '',
  phone: '',
  preferredJourney: '',
  route: '',
  travelWindow: '',
  guests: '2 Guests',
  cabinType: '',
  notes: '',
  origin: '',
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null)

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="absolute left-4 top-0 z-10 -translate-y-1/2 bg-[#F8F2E8] px-2 font-inter text-[12px] tracking-[0.08em] text-[#222458]/75">
      {children}
    </span>
  )
}

function FieldShell({ children }: { children: ReactNode }) {
  return <label className="relative block">{children}</label>
}

function inputClassName(extraClassName = '') {
  return [
    'w-full rounded-tr-[28px] border border-[#2E2A67]/55 bg-white/55 px-4 py-3 font-inter text-[14px] text-[#222458] outline-none transition-all duration-200 placeholder:text-[#222458]/35',
    'focus:border-[#2E2A67] focus:bg-white/85 focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F2E8]',
    extraClassName,
  ].join(' ')
}

function BookingModal({
  isOpen,
  form,
  submitted,
  onClose,
  onChange,
  onSubmit,
  onReset,
}: {
  isOpen: boolean
  form: BookingFormState
  submitted: boolean
  onClose: () => void
  onChange: <K extends keyof BookingFormState>(field: K, value: BookingFormState[K]) => void
  onSubmit: () => void
  onReset: () => void
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-[#11163F]/48 backdrop-blur-[6px]"
            aria-label="Close booking modal"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[min(92vh,920px)] w-full max-w-[1040px] overflow-hidden rounded-[30px] bg-[#F8F2E8] shadow-[0_36px_90px_rgba(17,22,63,0.28)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <div className="grid max-h-[min(92vh,920px)] lg:grid-cols-[0.9fr_1.1fr]">
              <div
                className="relative overflow-hidden px-6 py-7 sm:px-8 lg:px-10 lg:py-10"
                style={{
                  background: 'linear-gradient(180deg, #272865 0%, #1E1F4B 100%)',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at top left, rgba(217,176,122,0.16) 0%, rgba(217,176,122,0) 34%), radial-gradient(circle at bottom right, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 30%)',
                  }}
                />

                <div className="relative z-10">
                  <p className="font-inter text-[11px] tracking-[0.34em] text-[#F5E7D0]">BOOKING ENQUIRY</p>
                  <h2
                    id="booking-modal-title"
                    className="mt-4 max-w-[280px] font-regal text-[42px] leading-[0.95] text-[#FFF9F0] sm:text-[52px]"
                  >
                    Reserve Your Journey
                  </h2>
                  <p className="mt-5 max-w-[420px] font-inter text-[15px] leading-7 text-white/90">
                    Share your preferred itinerary and contact details. Our concierge team will follow up with
                    availability, cabin options, and the next steps for your reservation.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="rounded-tr-[36px] bg-white/[0.06] px-5 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-sm">
                      <p className="font-inter text-[11px] tracking-[0.22em] text-[#F5E7D0]/75">JOURNEY INTEREST</p>
                      <p className="mt-2 font-inter text-[17px] font-semibold text-[#FFF9F0]">
                        {form.preferredJourney || 'Tailored journey consultation'}
                      </p>
                    </div>

                    <div className="rounded-tr-[36px] bg-white/[0.06] px-5 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-sm">
                      <p className="font-inter text-[11px] tracking-[0.22em] text-[#F5E7D0]/75">TRAVEL ROUTE</p>
                      <p className="mt-2 font-inter text-[15px] leading-7 text-white/90">
                        {form.route || 'To be discussed with our booking concierge'}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-tr-[30px] bg-white/[0.06] px-5 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-sm">
                        <p className="font-inter text-[11px] tracking-[0.22em] text-[#F5E7D0]/75">TRAVEL WINDOW</p>
                        <p className="mt-2 font-inter text-[15px] leading-7 text-white/90">
                          {form.travelWindow || 'Flexible dates'}
                        </p>
                      </div>

                      <div className="rounded-tr-[30px] bg-white/[0.06] px-5 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-sm">
                        <p className="font-inter text-[11px] tracking-[0.22em] text-[#F5E7D0]/75">PREFERRED CABIN</p>
                        <p className="mt-2 font-inter text-[15px] leading-7 text-white/90">
                          {form.cabinType || 'Open to recommendation'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex items-center gap-3 text-white/80">
                    <span className="text-[22px]" style={{ color: GOLD }}>
                      ✦
                    </span>
                    <p className="font-inter text-[12px] tracking-[0.14em]">
                      Refined booking support, presented in the same quiet luxury as the journey itself.
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto px-6 py-7 sm:px-8 lg:px-10 lg:py-10" style={{ backgroundColor: PAPER }}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-inter text-[11px] tracking-[0.28em] text-[#222458]/55">CONCIERGE FORM</p>
                    <p className="mt-3 max-w-[420px] font-inter text-[15px] leading-7 text-[#222458]/72">
                      Leave your details below and we will prepare a tailored follow-up. This modal is a front-end
                      enquiry flow only, so no data is being sent yet.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D8C6A2] text-[#222458] transition-all duration-200 hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                    aria-label="Close booking modal"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {submitted ? (
                  <div className="mt-10 rounded-tr-[44px] border border-[#DEC9A5] bg-white/65 px-6 py-7 shadow-[0_20px_45px_rgba(34,36,88,0.08)] sm:px-8">
                    <p className="font-inter text-[11px] tracking-[0.28em] text-[#222458]/55">ENQUIRY PREVIEW</p>
                    <h3 className="mt-4 font-regal text-[36px] leading-none" style={{ color: NAVY }}>
                      Thank You
                    </h3>
                    <p className="mt-4 max-w-[480px] font-inter text-[15px] leading-7 text-[#222458]/78">
                      Your booking enquiry has been prepared successfully. In a live setup, this is where the details
                      would be sent to the concierge team for follow-up.
                    </p>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-tr-[28px] border border-[#E7D5BB] bg-[#F8F2E8] px-4 py-4">
                        <p className="font-inter text-[11px] tracking-[0.2em] text-[#222458]/52">CONTACT</p>
                        <p className="mt-2 font-inter text-[15px] text-[#222458]">{form.fullName || 'Guest name'}</p>
                        <p className="mt-1 font-inter text-[14px] text-[#222458]/72">{form.email || 'Email address'}</p>
                      </div>
                      <div className="rounded-tr-[28px] border border-[#E7D5BB] bg-[#F8F2E8] px-4 py-4">
                        <p className="font-inter text-[11px] tracking-[0.2em] text-[#222458]/52">REQUEST</p>
                        <p className="mt-2 font-inter text-[15px] text-[#222458]">
                          {form.preferredJourney || 'Tailored consultation'}
                        </p>
                        <p className="mt-1 font-inter text-[14px] text-[#222458]/72">{form.guests}</p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={onReset}
                        className="rounded-tr-[22px] border border-[#2E2A67] px-5 py-3 font-inter text-[12px] font-semibold tracking-[0.18em] text-[#222458] transition-all duration-200 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                      >
                        EDIT DETAILS
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-tr-[22px] px-5 py-3 font-inter text-[12px] font-semibold tracking-[0.18em] text-white transition-all duration-200 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                        style={{ backgroundColor: NAVY }}
                      >
                        CLOSE
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    className="mt-8 space-y-5"
                    onSubmit={(event) => {
                      event.preventDefault()
                      onSubmit()
                    }}
                  >
                    <div className="grid gap-5 sm:grid-cols-[150px_1fr]">
                      <FieldShell>
                        <FieldLabel>Title</FieldLabel>
                        <select
                          value={form.title}
                          onChange={(event) => onChange('title', event.target.value)}
                          className={inputClassName('appearance-none pr-10')}
                        >
                          <option>Mr.</option>
                          <option>Mrs.</option>
                          <option>Ms.</option>
                          <option>Mx.</option>
                        </select>
                      </FieldShell>

                      <FieldShell>
                        <FieldLabel>Full name</FieldLabel>
                        <input
                          value={form.fullName}
                          onChange={(event) => onChange('fullName', event.target.value)}
                          placeholder="Martin Edwards"
                          className={inputClassName()}
                        />
                      </FieldShell>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FieldShell>
                        <FieldLabel>Email</FieldLabel>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(event) => onChange('email', event.target.value)}
                          placeholder="martinedwards@email.com"
                          className={inputClassName()}
                        />
                      </FieldShell>

                      <FieldShell>
                        <FieldLabel>Phone</FieldLabel>
                        <input
                          value={form.phone}
                          onChange={(event) => onChange('phone', event.target.value)}
                          placeholder="+84 000 000 000"
                          className={inputClassName()}
                        />
                      </FieldShell>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FieldShell>
                        <FieldLabel>Preferred journey</FieldLabel>
                        <input
                          value={form.preferredJourney}
                          onChange={(event) => onChange('preferredJourney', event.target.value)}
                          placeholder="From Ha Noi to Ho Chi Minh"
                          className={inputClassName()}
                        />
                      </FieldShell>

                      <FieldShell>
                        <FieldLabel>Travel route</FieldLabel>
                        <input
                          value={form.route}
                          onChange={(event) => onChange('route', event.target.value)}
                          placeholder="Ha Noi - Hoi An - Da Nang - Ho Chi Minh City"
                          className={inputClassName()}
                        />
                      </FieldShell>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                      <FieldShell>
                        <FieldLabel>Travel window</FieldLabel>
                        <input
                          value={form.travelWindow}
                          onChange={(event) => onChange('travelWindow', event.target.value)}
                          placeholder="January 2026"
                          className={inputClassName()}
                        />
                      </FieldShell>

                      <FieldShell>
                        <FieldLabel>Guests</FieldLabel>
                        <select
                          value={form.guests}
                          onChange={(event) => onChange('guests', event.target.value)}
                          className={inputClassName('appearance-none')}
                        >
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>3 Guests</option>
                          <option>4 Guests</option>
                          <option>5+ Guests</option>
                        </select>
                      </FieldShell>

                      <FieldShell>
                        <FieldLabel>Cabin type</FieldLabel>
                        <select
                          value={form.cabinType}
                          onChange={(event) => onChange('cabinType', event.target.value)}
                          className={inputClassName('appearance-none')}
                        >
                          <option value="">Open to recommendation</option>
                          <option>Deluxe Cabin</option>
                          <option>Premium Suite</option>
                          <option>Signature Suite</option>
                          <option>Private Charter</option>
                        </select>
                      </FieldShell>
                    </div>

                    <FieldShell>
                      <FieldLabel>Additional notes</FieldLabel>
                      <textarea
                        value={form.notes}
                        onChange={(event) => onChange('notes', event.target.value)}
                        placeholder="Share preferred dates, celebration details, or anything our concierge should know."
                        className={inputClassName('min-h-[132px] resize-none')}
                      />
                    </FieldShell>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="rounded-tr-[24px] px-6 py-3 font-inter text-[12px] font-semibold tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(34,36,88,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                        style={{ backgroundColor: NAVY }}
                      >
                        SEND ENQUIRY
                      </button>

                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-tr-[24px] border border-[#2E2A67]/55 px-6 py-3 font-inter text-[12px] font-semibold tracking-[0.2em] text-[#222458] transition-all duration-200 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9B07A] focus-visible:ring-offset-2"
                      >
                        NOT NOW
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<BookingFormState>(defaultFormState)

  const closeBookingModal = useCallback(() => {
    setIsOpen(false)
    setSubmitted(false)
  }, [])

  const openBookingModal = useCallback((payload?: BookingModalPayload) => {
    setSubmitted(false)
    setForm({
      ...defaultFormState,
      preferredJourney: payload?.preferredJourney ?? '',
      route: payload?.route ?? '',
      travelWindow: payload?.travelWindow ?? '',
      cabinType: payload?.cabinType ?? '',
      origin: payload?.origin ?? '',
    })
    setIsOpen(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeBookingModal()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeBookingModal, isOpen])

  const contextValue = useMemo(
    () => ({
      openBookingModal,
      closeBookingModal,
    }),
    [closeBookingModal, openBookingModal],
  )

  return (
    <BookingModalContext.Provider value={contextValue}>
      {children}
      <BookingModal
        isOpen={isOpen}
        form={form}
        submitted={submitted}
        onClose={closeBookingModal}
        onChange={(field, value) => {
          setForm((previous) => ({
            ...previous,
            [field]: value,
          }))
        }}
        onSubmit={() => setSubmitted(true)}
        onReset={() => setSubmitted(false)}
      />
    </BookingModalContext.Provider>
  )
}

export function useBookingModal() {
  const context = useContext(BookingModalContext)

  if (!context) {
    throw new Error('useBookingModal must be used within BookingModalProvider')
  }

  return context
}
