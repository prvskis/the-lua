import { Section } from '@/components/layout/Section'

const NAVY = '#222458'

export function InstagramSection() {
  return (
    <Section>
      <div className="mt-[-70px] text-center">
        <div className="mx-auto flex max-w-[620px] items-center justify-center gap-4 text-black/30">
          <span className="mt-[2px] inline-block h-px w-40 bg-black/20" />
          <span className="text-[40px] text-[#D9B07A]">✦</span>
          <span className="mt-[2px] inline-block h-px w-40 bg-black/20" />
        </div>

        <p className="font-inter text-[30px] font-bold tracking-[0.06em]" style={{ color: NAVY }}>
          INSTAGRAM
        </p>
        <h2 className="font-regal text-[45px] leading-none tracking-[0.01em] md:text-[50px]" style={{ color: NAVY }}>
          <span className="font-inter">@</span>THELUATRAIN
        </h2>

        <button className="group inline-flex items-center gap-2 text-[16px] tracking-[0.12em] text-[#2A2B5E]/70 transition-colors hover:text-[#2A2B5E]">
          follow us
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          <span className="absolute mt-6 block h-px w-0 bg-[#D9B07A] transition-all duration-300 group-hover:w-[90px]" />
        </button>
      </div>

      <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1800px] gap-4 md:grid-cols-5">
          {['ig-1', 'ig-2', 'ig-3', 'ig-4', 'ig-5'].map((k) => (
            <div key={k} className="overflow-hidden">
              <img src={`/images/home/${k}.jpg`} alt={k} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-sm"
          aria-label="Next"
        >
          →
        </button>
      </div>
    </Section>
  )
}
