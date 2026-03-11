export function Footer() {
    return (
      <footer className="bg-[#232566] font-inter text-[#F4E9D6]">
        <div className="mx-auto px-6 pt-16 lg:px-8 lg:pt-20">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-24 lg:items-start">
            {/* LEFT */}
            <div className="grid max-w-[520px] gap-12 lg:justify-self-end lg:gap-14">
              {/* Contact */}
              <div>
                <h3 className="font-work text-[20px] font-semibold">Contact</h3>
  
                <div className="mt-8 space-y-6 text-[15px] leading-7 text-[#F4E9D6]/90">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-[20px] leading-none">⌕</span>
                    <div className="space-y-2">
                      <p>099 236 5147</p>
                      <p>cs@THELUATRAIN.com.vn</p>
                    </div>
                  </div>
  
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-[20px] leading-none">◉</span>
                    <p className="max-w-[320px]">No 28, Ngo Quyen, Dis 1, Ho Chi Minh</p>
                  </div>
                </div>
              </div>
  
              {/* Links */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-8 text-[15px] leading-7 text-[#F4E9D6]/90">
                <div className="space-y-3">
                  <a href="#" className="block transition hover:opacity-75">
                    General Term Of Use
                  </a>
                  <a href="#" className="block transition hover:opacity-75">
                    Privacy Policy
                  </a>
                  <a href="#" className="block transition hover:opacity-75">
                    Legal Notice
                  </a>
                  <a href="#" className="block transition hover:opacity-75">
                    Cookie Policy
                  </a>
                </div>
  
                <div className="space-y-3">
                  <a href="#" className="block transition hover:opacity-75">
                    About Us
                  </a>
                  <a href="#" className="block transition hover:opacity-75">
                    The Train
                  </a>
                  <a href="#" className="block transition hover:opacity-75">
                    Destinations
                  </a>
                  <a href="#" className="block transition hover:opacity-75">
                    Career
                  </a>
                </div>
              </div>
            </div>
  
            {/* CENTER */}
            <div className="flex items-center justify-center lg:pt-10">
              <img
                src="/logos/logo-set-light.png"
                alt="THE LUA"
                className="h-[140px] mt-20 w-auto object-contain lg:h-[165px]"
              />
            </div>
  
            {/* RIGHT */}
            <div className="grid max-w-[520px] ml-[20px] gap-10 lg:justify-self-start lg:gap-11">
              <div>
                <h3 className="font-work text-[20px] font-semibold">Follow Us</h3>
                <div className="mt-5 flex items-center gap-6 text-[27px] text-[#F4E9D6]/95">
                  <a href="#" aria-label="Facebook" className="transition hover:opacity-75">
                    f
                  </a>
                  <a href="#" aria-label="Instagram" className="transition hover:opacity-75">
                    ◉
                  </a>
                  <a href="#" aria-label="YouTube" className="transition hover:opacity-75">
                    ▷
                  </a>
                  <a href="#" aria-label="LinkedIn" className="transition hover:opacity-75">
                    in
                  </a>
                </div>
              </div>
  
              <div>
                <h3 className="font-work text-[20px] font-semibold">Share Your Feed Back</h3>
                <div className="mt-5 flex items-center gap-6 text-[27px] text-[#F4E9D6]/95">
                  <a href="#" aria-label="Facebook" className="transition hover:opacity-75">
                    f
                  </a>
                  <a href="#" aria-label="Instagram" className="transition hover:opacity-75">
                    ◉
                  </a>
                  <a href="#" aria-label="Favorite" className="transition hover:opacity-75">
                    ☆
                  </a>
                </div>
              </div>
  
              <div>
                <h3 className="font-work text-[20px] font-semibold">Share Your Feed Back</h3>
                <p className="mt-3 text-[15px] leading-6 text-[#F4E9D6]/85">
                  Elevate your next THE LUA TRAIN by recceiving our newletter.
                </p>
  
                <div className="mt-2 overflow-hidden w-[300px] rounded-tr-[18px] bg-[#F4E9D6]">
                  <input
                    type="email"
                    placeholder="MartinEdwards@gmail.com"
                    className="font-inter h-[44px] bg-transparent px-4 text-[15px] text-[#8C7C61] outline-none placeholder:text-[#C5B391]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* BOTTOM BAR */}
        <div className="mt-12 border-t border-[#F4E9D6]/55">
          <div className="mx-auto flex max-w-[1000px] flex-col gap-4 px-6 py-5 text-[14px] text-[#F4E9D6]/90 md:flex-row md:items-center md:justify-between lg:px-8">
            <div className="flex items-center gap-8 md:gap-10">
              <a href="#" className="transition hover:opacity-75">
                Web Accessibility
              </a>
              <a href="#" className="transition hover:opacity-75">
                Sitemap
              </a>
            </div>
  
            <p className="text-left md:text-right">Bản quyền © 2026 thuộc về THELUA©</p>
          </div>
        </div>
      </footer>
    )
  }