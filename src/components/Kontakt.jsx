import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

const OBJEKTARTEN = ['Wohnung', 'Einfamilienhaus', 'Gewerbe', 'Außenbereich']

const EMPTY_FORM = {
  name: '',
  email: '',
  telefon: '',
  objektart: '',
  flaeche: '',
  nachricht: '',
}

function validate(form) {
  const errors = {}
  if (form.name.trim().length < 2) errors.name = 'Bitte geben Sie Ihren Namen an.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
  }
  if (!form.objektart) errors.objektart = 'Bitte wählen Sie eine Objektart.'
  if (form.nachricht.trim().length < 10) {
    errors.nachricht = 'Bitte beschreiben Sie kurz, was gestrichen werden soll.'
  }
  return errors
}

export default function Kontakt({ selectedService = null }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [dismissedServiceAt, setDismissedServiceAt] = useState(null)
  const successRef = useRef(null)

  const activeService =
    selectedService && selectedService.at !== dismissedServiceAt ? selectedService.name : ''

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus()
  }, [status])

  const handleChange = event => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors(current => {
        const next = { ...current }
        delete next[name]
        return next
      })
    }
  }

  const handleBlur = event => {
    const { name } = event.target
    if (!name || !['name', 'email', 'objektart', 'nachricht'].includes(name)) return
    const fieldErrors = validate(form)
    if (fieldErrors[name]) {
      setErrors(current => ({ ...current, [name]: fieldErrors[name] }))
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      const first = ['name', 'email', 'objektart', 'nachricht'].find(key => nextErrors[key])
      document.getElementById(first)?.focus()
      return
    }

    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1500)
  }

  const describedBy = key => (errors[key] ? `${key}-error` : undefined)

  return (
    <section id="kontakt" className="bg-chalk py-20 sm:py-24 lg:py-28" aria-label="Kontaktformular und Kontaktdaten">
      <div className="container-main">
        <Reveal className="max-w-2xl">
          <p className="kicker">Jetzt anfragen</p>
          <h2 className="section-title mt-3">Was soll gestrichen werden?</h2>
          <p className="section-lede mt-5">
            Kostenloser Kostenvoranschlag. Wir melden uns innerhalb von 24 Stunden.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-ink/50">
            Demo-Formular: Es wird keine Nachricht versendet und nichts gespeichert.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={80}>
            {status === 'sent' ? (
              <div
                className="border border-verdigris/40 bg-paper p-8 sm:p-10"
                role="status"
                aria-live="polite"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-verdigris text-chalk">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </div>
                <h3
                  ref={successRef}
                  tabIndex={-1}
                  className="mt-5 font-display text-2xl font-semibold text-ink outline-none"
                >
                  Vielen Dank. Ihre Anfrage ist angekommen.
                </h3>
                <p className="mt-2 max-w-[44ch] text-ink/70">
                  Wir prüfen die Angaben und melden uns innerhalb eines Werktags mit
                  einem Termin oder einer Rückfrage.
                </p>
                <button
                  type="button"
                  className="btn-ghost mt-6"
                  onClick={() => {
                    setForm(EMPTY_FORM)
                    setErrors({})
                    setStatus(null)
                  }}
                >
                  Weitere Anfrage stellen
                </button>
              </div>
            ) : (
              <form
                id="kontakt-form"
                onSubmit={handleSubmit}
                onBlur={handleBlur}
                noValidate
                className="border border-ink/20 bg-paper p-5 sm:p-8"
              >
                {activeService && (
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-l-4 border-ultramarine bg-ultramarine/5 px-3 py-2.5">
                    <p className="text-sm text-ink">
                      <span className="text-ink/60">Anfrage:</span>{' '}
                      <strong>{activeService}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={() => setDismissedServiceAt(selectedService?.at ?? null)}
                      className="text-xs font-bold text-ultramarine underline underline-offset-4 hover:text-ink"
                    >
                      Entfernen
                    </button>
                  </div>
                )}
                <input type="hidden" name="leistung" value={activeService} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="field-label">
                      Name <span className="text-madder" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Max Mustermann"
                      value={form.name}
                      onChange={handleChange}
                      className="field-input"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={describedBy('name')}
                    />
                    {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="field-label">
                      E-Mail <span className="text-madder" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="max@beispiel.de"
                      value={form.email}
                      onChange={handleChange}
                      className="field-input"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={describedBy('email')}
                    />
                    {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="telefon" className="field-label">Telefon</label>
                    <input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      autoComplete="tel"
                      placeholder="040 – …"
                      value={form.telefon}
                      onChange={handleChange}
                      className="field-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="objektart" className="field-label">
                      Objektart <span className="text-madder" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="objektart"
                      name="objektart"
                      required
                      value={form.objektart}
                      onChange={handleChange}
                      className="field-input cursor-pointer"
                      aria-invalid={Boolean(errors.objektart)}
                      aria-describedby={describedBy('objektart')}
                    >
                      <option value="" disabled>Bitte wählen</option>
                      {OBJEKTARTEN.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                    {errors.objektart && <p id="objektart-error" className="field-error">{errors.objektart}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="flaeche" className="field-label">Fläche in m²</label>
                    <input
                      id="flaeche"
                      name="flaeche"
                      type="number"
                      min="1"
                      inputMode="numeric"
                      placeholder="z. B. 60"
                      value={form.flaeche}
                      onChange={handleChange}
                      className="field-input"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="nachricht" className="field-label">
                      Nachricht <span className="text-madder" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="nachricht"
                      name="nachricht"
                      required
                      rows={5}
                      placeholder="Was soll gestrichen werden? Wann wäre ein guter Termin?"
                      value={form.nachricht}
                      onChange={handleChange}
                      className="field-input resize-y"
                      aria-invalid={Boolean(errors.nachricht)}
                      aria-describedby={describedBy('nachricht')}
                    />
                    {errors.nachricht && <p id="nachricht-error" className="field-error">{errors.nachricht}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                  className="btn-primary mt-6 w-full"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Wird gesendet …
                    </>
                  ) : (
                    'Anfrage absenden'
                  )}
                </button>

                <p className="mt-3 text-center text-xs leading-relaxed text-ink/60">
                  Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zum Zweck
                  der Angebotsbearbeitung zu.
                </p>
              </form>
            )}
          </Reveal>

          <Reveal className="lg:col-span-5" delay={140}>
            <aside className="space-y-6" aria-label="Kontaktdaten">
              <div className="bg-ultramarine p-6 text-white">
                <p className="text-xs font-bold tracking-[0.04em] text-white/90">Telefon</p>
                <a
                  href="tel:04012345467"
                  className="mt-3 block font-display text-[clamp(1.9rem,4vw,2.5rem)] font-semibold leading-none text-white hover:text-saffron"
                >
                  040 – 1234567
                </a>
                <p className="mt-3 text-sm text-white/85">Klicken zum Anrufen. Mo–Fr 7–17 Uhr.</p>
              </div>

              <div className="border-t border-ink/20 pt-5">
                <div className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-verdigris" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="text-sm font-bold text-ink">Adresse</p>
                </div>
                <address className="mt-3 not-italic text-sm leading-relaxed text-ink/75">
                  Malerbetrieb Schmidt<br />
                  Musterstraße 12<br />
                  22113 Hamburg
                </address>
              </div>

              <div className="border-t border-ink/20 pt-5">
                <div className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-verdigris" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <p className="text-sm font-bold text-ink">Öffnungszeiten</p>
                </div>
                <dl className="mt-3 space-y-1.5 text-sm">
                  {[
                    ['Montag – Freitag', '7:00 – 17:00 Uhr'],
                    ['Samstag', '8:00 – 13:00 Uhr'],
                    ['Sonntag', 'Geschlossen'],
                  ].map(([day, time]) => (
                    <div key={day} className="flex justify-between gap-4">
                      <dt className="text-ink/70">{day}</dt>
                      <dd className="text-right font-semibold text-ink">{time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <a
                href="mailto:info@maler-schmidt-altona.de"
                className="flex items-center gap-3 border-t border-ink/20 pt-5 text-sm font-semibold text-ink hover:text-ultramarine"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-verdigris" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="1.5" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                info@maler-schmidt-altona.de
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}


