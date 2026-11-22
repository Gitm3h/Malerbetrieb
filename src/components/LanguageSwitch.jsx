import { useLanguage } from '../i18n'

export default function LanguageSwitch({ tone = 'ink', className = '' }) {
  const { locale, copy } = useLanguage()
  const isGerman = locale === 'de'

  return (
    <div
      className={`language-switch language-switch--${tone}${className ? ` ${className}` : ''}`}
      role="group"
      aria-label={copy.language.label}
    >
      {isGerman ? (
        <span className="language-switch__active" aria-current="page" lang="de">
          {copy.language.de}
        </span>
      ) : (
        <a href="../" hrefLang="de" lang="de" aria-label={copy.language.deLabel}>
          {copy.language.de}
        </a>
      )}
      {isGerman ? (
        <a href="./en/" hrefLang="en" lang="en" aria-label={copy.language.enLabel}>
          {copy.language.en}
        </a>
      ) : (
        <span className="language-switch__active" aria-current="page" lang="en">
          {copy.language.en}
        </span>
      )}
    </div>
  )
}
