import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n'

export default function Impressum({ onClose }) {
  const { copy } = useLanguage()
  const legal = copy.legal
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const getFocusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="impressum-title"
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto border border-ink/20 bg-chalk p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="kicker">{legal.kicker}</p>
            <h2 id="impressum-title" className="mt-2 font-display text-3xl font-semibold text-ink">
              {legal.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-ink/20 text-ink hover:bg-ink hover:text-chalk"
            aria-label={legal.closeAria}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink/80">
          <section className="border-t border-ink/15 pt-4" aria-label={legal.tmgHeading}>
            <h3 className="font-semibold text-ink">{legal.tmgHeading}</h3>
            <address className="mt-1 not-italic">
              {legal.tmgAddress.map((line, index) => (
                <span key={line}>
                  {index === 0 ? <strong>{line}</strong> : line}
                  {index < legal.tmgAddress.length - 1 && <br />}
                </span>
              ))}
            </address>
          </section>

          <section className="border-t border-ink/15 pt-4" aria-label={legal.contactHeading}>
            <h3 className="font-semibold text-ink">{legal.contactHeading}</h3>
            <p className="mt-1">
              {legal.phone}{' '}
              <a href="tel:04012345467" className="font-semibold text-ultramarine hover:underline">
                {copy.nav.phone}
              </a>
            </p>
            <p>
              {legal.email}{' '}
              <a href="mailto:info@maler-schmidt-altona.de" className="font-semibold text-ultramarine hover:underline">
                info@maler-schmidt-altona.de
              </a>
            </p>
          </section>

          <section className="border-t border-ink/15 pt-4" aria-label={legal.vatHeading}>
            <h3 className="font-semibold text-ink">{legal.vatHeading}</h3>
            <p className="mt-1">
              {legal.vatBody}
              <br />
              <strong>{legal.vatId}</strong>
            </p>
          </section>

          <section className="border-t border-ink/15 pt-4" aria-label={legal.chamberHeading}>
            <h3 className="font-semibold text-ink">{legal.chamberHeading}</h3>
            <p className="mt-1">
              {legal.chamberBody}<br />
              {legal.chamberProfession}
            </p>
          </section>

          <section className="border-t border-ink/15 pt-4" aria-label={legal.disputeHeading}>
            <h3 className="font-semibold text-ink">{legal.disputeHeading}</h3>
            <p className="mt-1">
              {legal.disputeIntro}{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ultramarine hover:underline"
              >
                {legal.disputeLink}
              </a>
            </p>
            <p className="mt-2">
              {legal.disputeBody}
            </p>
          </section>

          <section className="border-t border-ink/15 pt-4" aria-label={legal.privacyHeading}>
            <h3 className="font-semibold text-ink">{legal.privacyHeading}</h3>
            <p className="mt-1">
              {legal.privacyResponsible}
            </p>
            <p className="mt-2">
              {legal.privacyBody}
            </p>
            <p className="mt-2">
              {legal.privacyCookies}
            </p>
            <p className="mt-2">
              {legal.privacyRights}
            </p>
          </section>
        </div>

        <button type="button" onClick={onClose} className="btn-primary mt-6 w-full">
          {legal.close}
        </button>
      </div>
    </div>
  )
}
