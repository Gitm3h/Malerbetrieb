import AnimatedWave from './AnimatedWave'

const serviceAreas = ['Altona', 'Ottensen', 'Bahrenfeld', 'Othmarschen', 'Nienstedten']

const links = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Referenzen', href: '#referenzen' },
  { label: 'Über uns', href: '#ueber-uns' },
  { label: 'Projekt', href: '#projekt' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Footer({ onImpressum }) {
  return (
    <footer className="on-dark relative overflow-hidden border-t-2 border-chalk bg-ink text-chalk/70" aria-label="Seitenfuß">
      <AnimatedWave variant="footer" />
      <div className="footer-seam" aria-hidden="true" />
      <div className="container-main pb-12 pt-32 sm:pt-36 lg:pb-16 lg:pt-40">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="swatch-bar" aria-hidden="true">
                <span /><span /><span />
              </span>
              <span className="font-display text-lg font-semibold leading-none text-chalk">
                Malerbetrieb<br />
                <span className="font-normal italic">Schmidt</span>
              </span>
            </div>
            <p className="mt-5 max-w-[36ch] text-sm leading-relaxed">
              Innenanstrich, Fassade und Lack in Hamburg-Altona. Meisterbetrieb
              seit 1998.
            </p>
            <a
              href="tel:04012345467"
              className="mt-5 inline-block whitespace-nowrap font-display text-2xl font-semibold text-saffron hover:text-chalk"
            >
              040 – 1234567
            </a>
          </div>

          <div>
            <h3 className="text-sm font-bold text-chalk">Einzugsgebiet</h3>
            <ul className="mt-4 space-y-2">
              {serviceAreas.map(area => (
                <li key={area} className="text-sm">
                  Hamburg-{area}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-chalk">Schnellzugriff</h3>
            <ul className="mt-4 space-y-2">
              {links.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-chalk">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onImpressum}
                  className="cursor-pointer text-sm hover:text-chalk"
                >
                  Impressum &amp; Datenschutz
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-chalk/10 pt-6 text-xs sm:flex-row sm:items-center">
          <p>© 2026 Malerbetrieb Schmidt · Portfolio-Demo · fiktives Unternehmen.</p>
          <button
            type="button"
            onClick={onImpressum}
            className="cursor-pointer hover:text-chalk"
          >
            Impressum &amp; Datenschutz
          </button>
        </div>
      </div>
    </footer>
  )
}

