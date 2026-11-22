import { useCallback, useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import lqip from '../assets/referenzen/lqip.json'
import wohnzimmerBefore from '../assets/referenzen/case-wohnzimmer-before.webp'
import wohnzimmerAfter from '../assets/referenzen/case-wohnzimmer-after.webp'
import wohnzimmerBefore800 from '../assets/referenzen/case-wohnzimmer-before-800.webp'
import wohnzimmerAfter800 from '../assets/referenzen/case-wohnzimmer-after-800.webp'
import schlafzimmerBefore from '../assets/referenzen/case-schlafzimmer-before.webp'
import schlafzimmerAfter from '../assets/referenzen/case-schlafzimmer-after.webp'
import schlafzimmerBefore800 from '../assets/referenzen/case-schlafzimmer-before-800.webp'
import schlafzimmerAfter800 from '../assets/referenzen/case-schlafzimmer-after-800.webp'
import kuecheBefore from '../assets/referenzen/case-kueche-before.webp'
import kuecheAfter from '../assets/referenzen/case-kueche-after-v2.webp'
import kuecheBefore800 from '../assets/referenzen/case-kueche-before-800.webp'
import kuecheAfter800 from '../assets/referenzen/case-kueche-after-v2-800.webp'

const projects = [
  {
    id: 'wohnzimmer',
    label: 'Wohnzimmer',
    district: 'Altona',
    scope: 'Wände',
    pigment: '#1F6F61',
    paintName: 'Salbeigrün',
    paintHex: '#9FB3A1',
    before: wohnzimmerBefore,
    before800: wohnzimmerBefore800,
    after: wohnzimmerAfter,
    after800: wohnzimmerAfter800,
    beforeAlt: 'Wohnzimmer mit abblätternder weißer Wandfarbe vor dem Anstrich',
    afterAlt: 'Dasselbe Wohnzimmer mit frisch gestrichenen salbeigrünen Wänden',
  },
  {
    id: 'schlafzimmer',
    label: 'Schlafzimmer',
    district: 'Ottensen',
    scope: 'Wände',
    pigment: '#2C4BDF',
    paintName: 'Taubenblau',
    paintHex: '#7E9DB5',
    before: schlafzimmerBefore,
    before800: schlafzimmerBefore800,
    after: schlafzimmerAfter,
    after800: schlafzimmerAfter800,
    beforeAlt: 'Schlafzimmer mit weißen Wänden vor dem Anstrich',
    afterAlt: 'Dasselbe Schlafzimmer mit frisch gestrichenen taubenblauen Wänden',
  },
  {
    id: 'kueche',
    label: 'Küche',
    district: 'Bahrenfeld',
    scope: 'Wände, Fliesen und Küchenfronten',
    pigment: '#B02A4A',
    paintName: 'Kreideweiß',
    paintHex: '#EFE7D6',
    before: kuecheBefore,
    before800: kuecheBefore800,
    after: kuecheAfter,
    after800: kuecheAfter800,
    beforeAlt: 'Küche mit vergilbten Wänden, alten Fliesen und abgenutzten Fronten',
    afterAlt: 'Dieselbe Küche mit frisch gestrichenen Wänden, neuen Fliesen und aufgearbeiteten Fronten',
  },
]

function BeforeAfter({ project, position, setPosition, stopHint, onInteract }) {
  const boardRef = useRef(null)

  const positionFromClientX = useCallback(clientX => {
    const rect = boardRef.current?.getBoundingClientRect()
    if (!rect) return 50
    const raw = ((clientX - rect.left) / rect.width) * 100
    return Math.max(0, Math.min(100, raw))
  }, [])

  const onPointerDown = event => {
    if (event.button !== 0 && event.pointerType === 'mouse') return
    stopHint()
    onInteract()
    event.currentTarget.setPointerCapture?.(event.pointerId)
    setPosition(positionFromClientX(event.clientX))
  }

  const onPointerMove = event => {
    if (!event.currentTarget.hasPointerCapture?.(event.pointerId)) return
    setPosition(positionFromClientX(event.clientX))
  }

  const onKeyDown = event => {
    const step = event.shiftKey ? 10 : 2
    let next = null

    if (event.key === 'ArrowLeft') next = position - step
    if (event.key === 'ArrowRight') next = position + step
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = 100

    if (next !== null) {
      event.preventDefault()
      stopHint()
      onInteract()
      setPosition(Math.max(0, Math.min(100, next)))
    }
  }

  return (
    <div
      ref={boardRef}
      className="ba-slider aspect-[4/3] w-full sm:aspect-[16/9]"
      style={{ backgroundImage: `url(${lqip[project.id].lqip})`, backgroundSize: 'cover' }}
      role="slider"
      tabIndex={0}
      aria-label={`Vorher-Nachher-Vergleich ${project.label}: ${project.beforeAlt}. Nachher: ${project.afterAlt}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-valuetext={`${Math.round(position)} Prozent Vorher, ${100 - Math.round(position)} Prozent Nachher`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onKeyDown={onKeyDown}
      onFocus={stopHint}
    >
      <img
        src={project.before}
        srcSet={`${project.before800} 800w, ${project.before} 1600w`}
        sizes="(max-width: 1024px) 100vw, 1040px"
        width={1408}
        height={768}
        alt={project.beforeAlt}
        draggable={false}
        fetchPriority="low"
      />

      <div className="ba-after" style={{ clipPath: `inset(0 0 0 ${position}%)` }} aria-hidden="true">
        <img
          src={project.after}
          srcSet={`${project.after800} 800w, ${project.after} 1600w`}
          sizes="(max-width: 1024px) 100vw, 1040px"
          width={1408}
          height={768}
          alt=""
          draggable={false}
          loading="lazy"
        />
        <span className="ba-label ba-label--after">Nachher</span>
      </div>

      <span className="ba-label ba-label--before">Vorher</span>

      <div className="ba-divider" style={{ left: `${position}%` }} aria-hidden="true" />
      <div className="ba-handle" style={{ left: `${position}%` }} aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="10 7 5 12 10 17" />
          <polyline points="14 7 19 12 14 17" />
        </svg>
      </div>
    </div>
  )
}

export default function Referenzen() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const [position, setPosition] = useState(50)
  const hintDone = useRef(false)
  const hintFrame = useRef(null)

  const active = projects.find(project => project.id === activeId) ?? projects[0]

  const stopHint = useCallback(() => {
    hintDone.current = true
    if (hintFrame.current) {
      cancelAnimationFrame(hintFrame.current)
      hintFrame.current = null
    }
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || hintDone.current) return

    const node = document.querySelector('[data-ba-board]')
    if (!node) return

    let started = false
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting || started) return
        started = true
        observer.disconnect()
        const start = performance.now()
        const tick = now => {
          if (hintDone.current) return
          const t = Math.min(1, (now - start) / 1400)
          setPosition(50 + Math.sin(t * Math.PI) * 12)
          if (t < 1) hintFrame.current = requestAnimationFrame(tick)
        }
        hintFrame.current = requestAnimationFrame(tick)
      },
      { threshold: 0.45 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (hintFrame.current) cancelAnimationFrame(hintFrame.current)
    }
  }, [])

  const selectProject = id => {
    stopHint()
    setActiveId(id)
    setPosition(50)
  }

  return (
    <section id="referenzen" className="bg-chalk-2 py-20 sm:py-24 lg:py-28" aria-label="Referenzen – Vorher und Nachher">
      <div className="container-main">
        <Reveal className="max-w-3xl">
          <p className="kicker">Beispielhafte Wirkung</p>
          <h2 className="section-title mt-3">Vorher. Nachher.<br />So wirkt Farbe.</h2>
          <p className="section-lede mt-5">
            Ziehen Sie den Regler oder nutzen Sie die Pfeiltasten. Links der alte
            Zustand, rechts das Ergebnis.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Beispiel wählen">
          <span className="mr-1 text-xs font-semibold text-ink/60">Beispiele</span>
          {projects.map(project => {
            const isActive = project.id === active.id
            return (
              <button
                key={project.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectProject(project.id)}
                className={`inline-flex min-h-[44px] items-center gap-2 border px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-ink bg-ink text-chalk'
                    : 'border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-chalk'
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: project.pigment }}
                  aria-hidden="true"
                />
                {project.label}
              </button>
            )
          })}
        </div>

        <Reveal className="mt-5" delay={80}>
          <div data-ba-board className="mx-auto max-w-[1040px] border border-ink/20 bg-chalk p-2 sm:p-3">
            <div key={active.id} className="ba-fade">
              <BeforeAfter
                project={active}
                position={position}
                setPosition={setPosition}
                stopHint={stopHint}
                onInteract={() => { hintDone.current = true }}
              />
            </div>

            <div className="flex flex-wrap items-end justify-between gap-3 px-2 pb-1 pt-4 sm:px-3">
              <div>
                <p className="font-display text-xl font-semibold leading-tight text-ink">
                  {active.label}, {active.district}
                </p>
                <p className="mt-1 text-sm text-ink/70">{active.scope}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-ink/70">
                <span className="border border-ink/25 px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.04em] text-ink/60">
                  KI-Illustration
                </span>
                <span
                  className="h-3.5 w-3.5 border border-ink/25"
                  style={{ backgroundColor: active.pigment }}
                  aria-hidden="true"
                />
                <span>
                  {active.paintName} <span className="font-semibold text-ink/85">{active.paintHex}</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-[1040px] text-xs leading-relaxed text-ink/60">
          KI-generierte Illustration – keine abgeschlossenen Kundenprojekte.
          Die gezeigten Räume sind keine realen Aufträge.
        </p>
      </div>
    </section>
  )
}

