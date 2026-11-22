import AnimatedWave from './AnimatedWave'
import LanguageSwitch from './LanguageSwitch'
import { useLanguage } from '../i18n'

export default function Footer({ onImpressum }) {
  const { copy } = useLanguage()

  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-chalk/70" aria-label={copy.footer.aria}>
      <AnimatedWave variant="footer" />
      <div className="container-main pb-12 pt-32 sm:pt-36 lg:pb-16 lg:pt-40">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="swatch-bar" aria-hidden="true">
                <span /><span /><span />
              </span>
              <span className="font-display text-lg font-semibold leading-none text-chalk">
                {copy.brand.name}<br />
                <span className="font-normal italic">{copy.brand.sub}</span>
              </span>
            </div>
            <p className="mt-5 max-w-[36ch] text-sm leading-relaxed">
              {copy.footer.description}
            </p>
            <a
              href="tel:04012345467"
              className="mt-5 inline-block whitespace-nowrap font-display text-2xl font-semibold text-saffron hover:text-chalk"
            >
              {copy.nav.phone}
            </a>
          </div>

          <div>
            <h3 className="text-sm font-bold text-chalk">{copy.footer.areasTitle}</h3>
            <ul className="mt-4 space-y-2">
              {copy.footer.areas.map(area => (
                <li key={area} className="text-sm">
                  Hamburg-{area}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-chalk">{copy.footer.linksTitle}</h3>
            <ul className="mt-4 space-y-2">
              {copy.footer.links.map(link => (
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
                  {copy.footer.legal}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-chalk/10 pt-6 text-xs sm:flex-row sm:items-center">
          <p>{copy.footer.rights}</p>
          <div className="flex flex-wrap items-center gap-4">
            <LanguageSwitch tone="chalk" />
            <button
              type="button"
              onClick={onImpressum}
              className="cursor-pointer hover:text-chalk"
            >
              {copy.footer.legal}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

