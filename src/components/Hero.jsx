import { useEffect, useState } from 'react'
import AnimatedWave from './AnimatedWave'

const pigments = [
  { name: 'Ultramarin', hex: '2C4BDF', color: '#2C4BDF', text: '#FFFFFF' },
  { name: 'Safran', hex: 'F3A712', color: '#F3A712', text: '#082527' },
  { name: 'Verdigris', hex: '1F6F61', color: '#1F6F61', text: '#FFFFFF' },
  { name: 'Madder', hex: 'B02A4A', color: '#B02A4A', text: '#FFFFFF' },
  { name: 'Kreide', hex: 'F2EFE6', color: '#F2EFE6', text: '#082527' },
  { name: 'Koralle', hex: 'E76F51', color: '#E76F51', text: '#082527' },
  { name: 'Mist', hex: 'A7CFC9', color: '#A7CFC9', text: '#082527' },
]

const trust = ['25+ Jahre Erfahrung', 'Meisterbetrieb', 'Kostenloser Kostenvoranschlag']

function useDeckMotion() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(!reducedMotion.matches)

    update()
    reducedMotion.addEventListener?.('change', update)

    return () => reducedMotion.removeEventListener?.('change', update)
  }, [])

  return enabled
}

export default function Hero() {
  const [order, setOrder] = useState(() => pigments.map((_, index) => index))
  const [hovered, setHovered] = useState(null)
  const [shuffling, setShuffling] = useState(false)
  const deckMotion = useDeckMotion()

  useEffect(() => {
    if (!deckMotion || hovered !== null) return

    const timers = []
    const later = (fn, delay) => timers.push(window.setTimeout(fn, delay))

    const shuffle = () => {
      setShuffling(true)

      later(() => {
        setOrder(previous => [...previous.slice(1), previous[0]])
        later(() => {
          setShuffling(false)
          later(shuffle, 4300)
        }, 260)
      }, 520)
    }

    later(shuffle, 4600)

    return () => {
      timers.forEach(timer => window.clearTimeout(timer))
      setShuffling(false)
    }
  }, [deckMotion, hovered])

  return (
    <section
      id="hero"
      className="hero-shell grain on-dark relative flex min-h-svh items-center overflow-hidden pb-32 pt-24 sm:pb-40 lg:pb-44"
      aria-label="Malerbetrieb Schmidt – Willkommen"
    >
      <div className="container-main relative z-10 grid w-full items-center gap-12 pt-8 lg:grid-cols-12 lg:gap-8 lg:pt-4">
        <div className="lg:col-span-7">
          <p className="hero-enter mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-mist">
            <a
              href="#projekt"
              className="border border-mist/40 px-2 py-1 text-[0.62rem] tracking-[0.05em] transition-colors hover:border-chalk hover:bg-chalk hover:text-ink"
            >
              Portfolio-Demo
            </a>
            <span>Malerbetrieb Schmidt · Hamburg-Altona</span>
          </p>

          <h1 className="hero-title hero-enter hero-enter-1">
            Farbe, die<br />den Raum<br />verändert.
          </h1>

          <p className="hero-sub hero-enter hero-enter-2 mt-7">
            Innenanstrich, Fassade und Lack – sauber ausgeführt von 12 Fachkräften
            in Altona. Seit 1998.
          </p>

          <div className="hero-enter hero-enter-3 mt-9 flex flex-wrap gap-3">
            <a href="#kontakt" className="btn-primary px-6">
              Kostenlos anfragen
            </a>
            <a href="tel:04012345467" className="btn-ghost btn-ghost--chalk whitespace-nowrap px-6">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.47 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9A16 16 0 0 0 15 16.09l1.09-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              040 – 1234567
            </a>
          </div>

          <ul className="hero-enter hero-enter-4 mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-chalk/15 pt-5 text-sm text-chalk/70">
            {trust.map(item => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-saffron" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-enter hero-enter-5 lg:col-span-5">
          <div className={`pigment-deck mx-auto lg:mx-0 lg:ml-auto${shuffling ? ' is-shuffling' : ''}`} aria-hidden="true">
            {order.map((pigmentIndex, deckIndex) => {
              const pigment = pigments[pigmentIndex]
              const isDrawn = hovered === pigmentIndex

              return (
                <div
                  key={pigment.name}
                  className={`pigment-panel${isDrawn ? ' is-drawn' : ''}`}
                  style={{
                    '--deck-i': deckIndex,
                    backgroundColor: pigment.color,
                    color: pigment.text,
                    zIndex: isDrawn ? 60 : 30 - Math.abs(deckIndex - 3),
                  }}
                  onPointerEnter={event => {
                    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
                      setHovered(pigmentIndex)
                    }
                  }}
                  onPointerLeave={() => setHovered(null)}
                >
                  <span className="paint-name">{pigment.name}</span>
                  <span className="paint-hex">{pigment.hex}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <AnimatedWave />
    </section>
  )
}

