import Reveal from './Reveal'
import innenImg from '../assets/services/generated/innen.webp'
import fassadeImg from '../assets/services/generated/fassade.webp'
import lackImg from '../assets/services/generated/lack.webp'
import bodenImg from '../assets/services/generated/boden.webp'

const services = [
  {
    id: 'innenanstrich',
    title: 'Innenanstrich',
    desc: 'Wände, Decken, Treppenhäuser – sauber abgeklebt und termingerecht fertig.',
    color: '#2C4BDF',
    text: '#FFFFFF',
    image: innenImg,
    alt: 'Farbroller auf einer frisch gestrichenen Wand',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="6" y="7" width="36" height="27" rx="2" stroke="currentColor" strokeWidth="2.4" />
        <path d="M12 41h24M18 34v7M30 34v7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M14 20h20M14 26h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      </svg>
    ),
  },
  {
    id: 'fassadenanstrich',
    title: 'Fassadenanstrich',
    desc: 'Schutz vor Regen, Frost und Schimmel – mit einem Anstrich, der hält.',
    color: '#1F6F61',
    text: '#FFFFFF',
    image: fassadeImg,
    alt: 'Hausfassade mit frisch gestrichener Wand',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 6 6 20v22h12V32h12v10h12V20L24 6Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <rect x="20" y="25" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M32 12l5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      </svg>
    ),
  },
  {
    id: 'lackierarbeiten',
    title: 'Lackierarbeiten',
    desc: 'Türen, Fenster, Heizkörper – glatt lackiert, ohne Läufer und Nasen.',
    color: '#B02A4A',
    text: '#FFFFFF',
    image: lackImg,
    alt: 'Pinsel, Farbwanne und Farbdosen für Lackierarbeiten',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="m14 36-6 6M14 36l20-20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="m34 16 4-4a3 3 0 0 0-4-4l-4 4 4 4Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <circle cx="10" cy="41" r="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M22 10 38 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'bodenbeschichtung',
    title: 'Bodenbeschichtung',
    desc: 'Epoxid, Versiegelung, Farbgestaltung – für Garage, Keller und Gewerbe.',
    color: '#F3A712',
    text: '#082527',
    image: bodenImg,
    alt: 'Glänzend beschichteter Hallenboden',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="6" y="30" width="36" height="10" rx="1.5" stroke="currentColor" strokeWidth="2.4" />
        <path d="M6 34h36" stroke="currentColor" strokeWidth="2.4" />
        <path d="M12 30V14M36 30V14M12 14h24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M18 14v-4a2 2 0 0 1 4 0v4M26 14v-4a2 2 0 0 1 4 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      </svg>
    ),
  },
]

export default function Leistungen({ onSelectService = () => {} }) {
  return (
    <section id="leistungen" className="bg-chalk py-20 sm:py-24 lg:py-28" aria-label="Unsere Leistungen">
      <div className="container-main">
        <Reveal className="max-w-2xl">
          <p className="kicker">Unsere Farbkarte</p>
          <h2 className="section-title mt-3">Vier Arbeiten.<br />Vier Farben.</h2>
          <p className="section-lede mt-5">
            Jede Leistung hat ihren eigenen Charakter. Klicken Sie auf eine
            Leistung, wenn Sie dazu ein Angebot möchten.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
            {services.map(service => (
              <div key={service.id} className="h-full w-[80vw] shrink-0 snap-start sm:w-auto sm:min-w-0">
                <a
                  href="#kontakt"
                  onClick={() => onSelectService(service.title)}
                  className="service-chip paint-field h-full"
                  style={{ backgroundColor: service.color, color: service.text }}
                  aria-label={`${service.title} anfragen`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.alt}
                      width={1000}
                      height={750}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, rgba(8,37,39,0.3) 0%, rgba(8,37,39,0) 34%, ${service.color} 100%)`,
                      }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
                      <span className="flex h-9 w-9 items-center justify-center bg-ink/80 text-chalk [&>svg]:h-5 [&>svg]:w-5">
                        {service.icon}
                      </span>
                      <span className="bg-chalk/90 px-2 py-1 text-[0.62rem] font-bold tracking-[0.04em] text-ink">
                        {service.color.replace('#', '')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="chip-rule mb-5" />
                    <h3 className="font-display text-[1.3rem] font-semibold leading-[1.08] sm:text-[1.45rem]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[0.9rem] leading-relaxed opacity-90 sm:text-[0.93rem]">
                      {service.desc}
                    </p>
                    <span className="mt-5 inline-block text-[0.78rem] font-bold underline underline-offset-4 opacity-90">
                      Anfragen
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
