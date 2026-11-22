import { useEffect, useRef } from 'react'

const badges = [
  {
    overline: 'Seit 1998',
    title: 'Meisterbetrieb',
    sub: 'Maler-Innung Hamburg',
    color: '#F3A712',
    text: '#082527',
  },
  {
    overline: 'Kundenstimmen',
    title: '5,0 Sterne',
    sub: '27 Bewertungen',
    color: '#1F6F61',
    text: '#FFFFFF',
  },
  {
    overline: 'Auszeichnung',
    title: 'Top 2025',
    sub: 'Hamburger Handwerk',
    color: '#B02A4A',
    text: '#FFFFFF',
  },
  {
    overline: 'Eigenes Team',
    title: '12 Fachkräfte',
    sub: 'Keine Subunternehmer',
    color: '#2C4BDF',
    text: '#FFFFFF',
  },
  {
    overline: 'Seit 1998',
    title: '1.000+',
    sub: 'abgeschlossene Projekte',
    color: '#E76F51',
    text: '#082527',
  },
  {
    overline: 'Material',
    title: 'Low-VOC',
    sub: 'emissionsarm arbeiten',
    color: '#A7CFC9',
    text: '#082527',
  },
]

function Seal({ color, text }) {
  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-current/30 sm:h-14 sm:w-14"
      style={{ backgroundColor: color, color: text }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M16 3.5 19 9l6.2 1-4.4 4.5 1 6.2-5.8-2.9-5.8 2.9 1-6.2L6.8 10 13 9l3-5.5Z" strokeLinejoin="round" />
        <path d="m11.5 22 .8 6.5L16 26l3.7 2.5.8-6.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function Badge({ badge, hidden = false }) {
  return (
    <article
      className="reward-badge flex w-[min(78vw,18rem)] shrink-0 items-center gap-4 border border-ink/15 bg-paper px-4 py-3"
      aria-hidden={hidden || undefined}
    >
      <Seal color={badge.color} text={badge.text} />
      <span className="min-w-0">
        <span className="block text-[0.6rem] font-bold tracking-[0.05em] text-ink/45">{badge.overline}</span>
        <span className="mt-1 block font-display text-lg font-semibold leading-none">{badge.title}</span>
        <span className="mt-2 block text-xs leading-snug text-ink/60">{badge.sub}</span>
      </span>
    </article>
  )
}

export default function Auszeichnungen() {
  const viewportRef = useRef(null)
  const pausedRef = useRef(false)
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, pointerId: null })

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const half = viewport.scrollWidth / 2
    viewport.scrollLeft = half

    let frame = 0
    let last = performance.now()

    const tick = now => {
      const delta = Math.min(now - last, 64)
      last = now

      if (!pausedRef.current && !dragRef.current.active) {
        viewport.scrollLeft -= delta * 0.045

        if (viewport.scrollLeft <= 0) {
          viewport.scrollLeft += half
        }
      }

      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const pause = () => { pausedRef.current = true }
  const resume = () => { pausedRef.current = false }

  const onPointerDown = event => {
    pause()

    if (event.pointerType !== 'mouse' || event.button !== 0) return

    const viewport = viewportRef.current
    if (!viewport) return

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScroll: viewport.scrollLeft,
      pointerId: event.pointerId,
    }
    viewport.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = event => {
    const drag = dragRef.current
    const viewport = viewportRef.current
    if (!drag.active || !viewport || event.pointerId !== drag.pointerId) return

    event.preventDefault()
    viewport.scrollLeft = drag.startScroll - (event.clientX - drag.startX)
  }

  const clearPointer = event => {
    const drag = dragRef.current
    const viewport = viewportRef.current

    if (drag.active && viewport) {
      viewport.releasePointerCapture?.(event.pointerId)
    }

    dragRef.current = { active: false, startX: 0, startScroll: 0, pointerId: null }
  }

  const onPointerUp = event => {
    clearPointer(event)
    pausedRef.current = event.pointerType === 'mouse'
  }

  const onPointerCancel = event => {
    clearPointer(event)
    resume()
  }

  const onPointerLeave = event => {
    clearPointer(event)
    resume()
  }

  return (
    <section
      id="auszeichnungen"
      className="overflow-hidden border-y border-ink/10 bg-chalk-2 py-14 sm:py-16"
      aria-labelledby="auszeichnungen-title"
    >
      <div className="container-main flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker">Fiktive Auszeichnungen</p>
          <h2 id="auszeichnungen-title" className="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[1.02]">
            Was uns auszeichnet.
          </h2>
        </div>
        <p className="max-w-[34ch] text-xs leading-relaxed text-ink/50">
          Beispielhafte Siegel für dieses Portfolio-Projekt. Keine echten Awards.
        </p>
      </div>

      <div
        ref={viewportRef}
        className="rewards-marquee mt-8"
        role="region"
        tabIndex={0}
        aria-label="Fiktive Auszeichnungen – seitlich scrollbar"
        onPointerEnter={pause}
        onPointerLeave={onPointerLeave}
        onFocus={pause}
        onBlur={resume}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div className="rewards-track">
          <div className="rewards-group">
            {badges.map(badge => (
              <Badge key={badge.title} badge={badge} />
            ))}
          </div>
          <div className="rewards-group" aria-hidden="true">
            {badges.map(badge => (
              <Badge key={`${badge.title}-copy`} badge={badge} hidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
