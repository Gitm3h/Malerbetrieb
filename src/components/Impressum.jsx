import { useEffect, useRef } from 'react'

export default function Impressum({ onClose }) {
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
            <p className="kicker">Rechtliches</p>
            <h2 id="impressum-title" className="mt-2 font-display text-3xl font-semibold text-ink">
              Impressum &amp; Datenschutz
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-ink/20 text-ink hover:bg-ink hover:text-chalk"
            aria-label="Impressum schließen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink/80">
          <section className="border-t border-ink/15 pt-4" aria-label="Angaben gemäß § 5 TMG">
            <h3 className="font-semibold text-ink">Angaben gemäß § 5 TMG</h3>
            <address className="mt-1 not-italic">
              <strong>Malerbetrieb Schmidt</strong><br />
              Klaus Schmidt, Malermeister<br />
              Musterstraße 12<br />
              22113 Hamburg
            </address>
          </section>

          <section className="border-t border-ink/15 pt-4" aria-label="Kontakt">
            <h3 className="font-semibold text-ink">Kontakt</h3>
            <p className="mt-1">
              Telefon:{' '}
              <a href="tel:04012345467" className="font-semibold text-ultramarine hover:underline">
                040 – 1234567
              </a>
            </p>
            <p>
              E-Mail:{' '}
              <a href="mailto:info@maler-schmidt-altona.de" className="font-semibold text-ultramarine hover:underline">
                info@maler-schmidt-altona.de
              </a>
            </p>
          </section>

          <section className="border-t border-ink/15 pt-4" aria-label="Umsatzsteuer">
            <h3 className="font-semibold text-ink">Umsatzsteuer-ID</h3>
            <p className="mt-1">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG:
              <br />
              <strong>DE 123456789</strong>
            </p>
          </section>

          <section className="border-t border-ink/15 pt-4" aria-label="Handwerkskammer">
            <h3 className="font-semibold text-ink">Berufsrechtliche Angaben</h3>
            <p className="mt-1">
              Eingetragen bei der <strong>Handwerkskammer Hamburg</strong>.<br />
              Berufsbezeichnung: Malermeister (Deutschland)
            </p>
          </section>

          <section className="border-t border-ink/15 pt-4" aria-label="Streitschlichtung">
            <h3 className="font-semibold text-ink">Streitschlichtung</h3>
            <p className="mt-1">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
              bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ultramarine hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section className="border-t border-ink/15 pt-4" aria-label="Datenschutz">
            <h3 className="font-semibold text-ink">Datenschutz</h3>
            <p className="mt-1">
              Verantwortlich für die Datenverarbeitung ist Malerbetrieb Schmidt,
              Musterstraße 12, 22113 Hamburg, info@maler-schmidt-altona.de.
            </p>
            <p className="mt-2">
              Wir verarbeiten die Angaben aus dem Kontaktformular ausschließlich zur
              Bearbeitung Ihrer Anfrage und zur Erstellung eines Angebots
              (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden nicht an Dritte
              weitergegeben. Sie werden gelöscht, sobald die Anfrage abgeschlossen ist
              und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
            <p className="mt-2">
              Diese Website setzt keine Analyse- oder Marketing-Cookies. Beim Aufruf
              der Seite können technisch notwendige Server-Logdaten anfallen.
            </p>
            <p className="mt-2">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung
              der Verarbeitung, Widerspruch und Datenübertragbarkeit. Wenden Sie sich
              dazu an die oben genannte E-Mail-Adresse.
            </p>
          </section>
        </div>

        <button type="button" onClick={onClose} className="btn-primary mt-6 w-full">
          Schließen
        </button>
      </div>
    </div>
  )
}
