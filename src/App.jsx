import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Leistungen from './components/Leistungen'
import Referenzen from './components/Referenzen'
import UeberUns from './components/UeberUns'
import Kundenstimmen from './components/Kundenstimmen'
import Auszeichnungen from './components/Auszeichnungen'
import Projekt from './components/Projekt'
import Kontakt from './components/Kontakt'
import Footer from './components/Footer'
import Impressum from './components/Impressum'
import Whoosh from './components/Whoosh'

export default function App() {
  const [showImpressum, setShowImpressum] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const selectService = name => {
    setSelectedService(name ? { name, at: Date.now() } : null)
  }

  return (
    <div className="min-h-screen bg-chalk">
      <a href="#main-content" className="skip-link">Zum Inhalt springen</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Leistungen onSelectService={selectService} />
        <Referenzen />
        <UeberUns />
        <Kundenstimmen />
        <Auszeichnungen />
        <Projekt />
        <Kontakt key={selectedService?.at ?? 'neu'} selectedService={selectedService} />
      </main>
      <Footer onImpressum={() => setShowImpressum(true)} />
      {showImpressum && <Impressum onClose={() => setShowImpressum(false)} />}
      <Whoosh />
    </div>
  )
}
