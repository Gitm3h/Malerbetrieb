import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LanguageProvider from './LanguageProvider'

const root = document.getElementById('root')
const locale = root?.dataset.locale === 'en' ? 'en' : 'de'

document.documentElement.lang = locale

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <LanguageProvider locale={locale}>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
