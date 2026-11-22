import { LanguageContext } from './i18n'
import { de } from './content/de'
import { en } from './content/en'

const copies = { de, en }

export default function LanguageProvider({ locale = 'de', children }) {
  const language = copies[locale] ? locale : 'de'

  return (
    <LanguageContext.Provider value={{ locale: language, copy: copies[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}
