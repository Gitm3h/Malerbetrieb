import { useEffect, useRef, useState } from 'react'
import LanguageSwitch from './LanguageSwitch'
import { useLanguage } from '../i18n'

function Wordmark({ tone = 'chalk', brand }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="swatch-bar" aria-hidden="true">
        <span /><span /><span />
      </span>
      <span className={`font-display text-[1.05rem] font-semibold leading-none ${tone === 'chalk' ? 'text-chalk' : 'text-ink'}`}>
        {brand.name}<br />
        <span className="italic font-normal">{brand.sub}</span>
      </span>
    </span>
  )
}

export default function Navbar() {
  const { copy } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sheetRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousFocus = triggerRef.current
    const previousOverflow = document.body.style.overflow
    const sheet = sheetRef.current
    document.body.style.overflow = 'hidden'

    const getFocusable = () =>
      Array.from(
        sheet?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      )

    const first = getFocusable()[0]
    first?.focus()

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (!focusable.length) return
      const firstEl = focusable[0]
      const lastEl = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [menuOpen])

  const tone = scrolled ? 'ink' : 'chalk'
  const glass = scrolled || menuOpen

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          glass ? 'nav-glass' : 'bg-transparent'
        }`}
      >
        <div className="container-main flex h-16 items-center justify-between gap-6 lg:h-[76px]">
          <a
            href="#hero"
            className="shrink-0"
            aria-label={copy.brand.homeLabel}
          >
            <Wordmark tone={tone} brand={copy.brand} />
          </a>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-7" aria-label={copy.nav.aria}>
            {copy.nav.links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link${scrolled ? '' : ' nav-link--chalk'}`}
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitch tone={scrolled ? 'ink' : 'chalk'} />
            <a href="#kontakt" className="btn-primary ml-1 !min-h-[42px] !px-3 !py-2 !text-xs xl:!px-4 xl:!text-sm">
              {copy.nav.cta}
            </a>
          </nav>

          <button
            ref={triggerRef}
            type="button"
            className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden ${
              scrolled ? 'text-ink' : 'text-chalk'
            }`}
            aria-label={copy.nav.menuOpen}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          ref={sheetRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={copy.nav.sheet}
          className="mobile-sheet fixed inset-0 z-[120] flex flex-col bg-chalk"
        >
          <div className="container-main flex h-16 items-center justify-between">
            <a href="#hero" onClick={() => setMenuOpen(false)} aria-label={copy.brand.homeLabel}>
              <Wordmark tone="ink" brand={copy.brand} />
            </a>
            <button
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink"
              aria-label={copy.nav.menuClose}
              onClick={() => setMenuOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>

          <nav className="container-main flex-1 pt-8" aria-label={copy.nav.mobileAria}>
            <ul className="space-y-1">
              {copy.nav.links.map(link => (
                <li key={link.href} className="border-b border-ink/15">
                  <a
                    href={link.href}
                    data-sheet-link
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 font-display text-[clamp(2rem,9vw,3rem)] font-semibold leading-none text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="container-main space-y-3 pb-10">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-ink/60">{copy.language.label}</span>
              <LanguageSwitch tone="ink" />
            </div>
            <a href="tel:04012345467" className="btn-ghost w-full">
              {copy.nav.phone}
            </a>
            <a href="#kontakt" onClick={() => setMenuOpen(false)} className="btn-primary w-full">
              {copy.nav.freeCta}
            </a>
            <p className="pt-1 text-center text-xs text-ink/60">
              {copy.nav.hours}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

