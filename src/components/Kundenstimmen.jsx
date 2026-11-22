import { useEffect, useRef } from 'react'
import Reveal from './Reveal'
import { useLanguage } from '../i18n'

const reviewColors = ['#1F6F61', '#2C4BDF', '#B02A4A', '#F3A712', '#1F6F61', '#2C4BDF']

function Stars({ label }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-saffron" aria-hidden="true">
          <path d="m10 1.7 2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.32l-4.94 2.6.94-5.51-4-3.9 5.53-.8L10 1.7Z" />
        </svg>
      ))}
    </span>
  )
}

function ReviewCard({ review, copy, hidden = false }) {
  return (
    <article
      className="review-card flex w-[min(82vw,21rem)] shrink-0 flex-col border border-ink/15 bg-paper p-5 sm:p-6"
      aria-hidden={hidden || undefined}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold text-chalk"
            style={{ backgroundColor: review.color }}
            aria-hidden="true"
          >
            {review.name.charAt(0)}
          </span>
          <span>
            <span className="block text-sm font-bold text-ink">{review.name}</span>
            <span className="mt-0.5 block text-[0.68rem] font-semibold tracking-[0.04em] text-ink/55">
              {review.meta}
            </span>
          </span>
        </div>
        <span className="text-xl font-semibold leading-none text-ink/25" aria-hidden="true">G</span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Stars label={copy.reviews.stars} />
        <span className="text-[0.68rem] text-ink/50">{review.date}</span>
      </div>

      <p className="mt-4 text-[0.88rem] leading-relaxed text-ink/75">
        “{review.text}”
      </p>
    </article>
  )
}

export default function Kundenstimmen() {
  const { copy } = useLanguage()
  const reviews = copy.reviews.items.map((review, index) => ({ ...review, color: reviewColors[index] }))
  const viewportRef = useRef(null)
  const pausedRef = useRef(false)
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, pointerId: null })

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let last = performance.now()

    const tick = now => {
      const delta = Math.min(now - last, 64)
      last = now

      if (!pausedRef.current && !dragRef.current.active) {
        viewport.scrollLeft += delta * 0.045
        const half = viewport.scrollWidth / 2

        if (half > 0 && viewport.scrollLeft >= half) {
          viewport.scrollLeft -= half
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
      id="bewertungen"
      className="overflow-hidden bg-chalk py-16 sm:py-20 lg:py-24"
      aria-labelledby="bewertungen-title"
    >
      <div className="container-main">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="kicker">{copy.reviews.kicker}</p>
            <h2 id="bewertungen-title" className="mt-3 font-display text-[clamp(2rem,4.5vw,3.3rem)] font-semibold leading-[1.02]">
              {copy.reviews.title}
            </h2>
          </div>

          <div className="flex items-center gap-4 border-l-2 border-saffron pl-4">
            <span className="font-display text-4xl font-semibold leading-none">{copy.reviews.rating}</span>
            <span>
              <Stars label={copy.reviews.stars} />
              <span className="mt-1.5 block text-xs text-ink/60">{copy.reviews.count}</span>
            </span>
          </div>
        </Reveal>
      </div>

      <div
        ref={viewportRef}
        className="review-marquee mt-10 sm:mt-12"
        role="region"
        tabIndex={0}
        aria-label={copy.reviews.region}
        onPointerEnter={pause}
        onPointerLeave={onPointerLeave}
        onFocus={pause}
        onBlur={resume}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div className="review-track">
          <div className="review-group">
            {reviews.map(review => (
              <ReviewCard key={review.name} review={review} copy={copy} />
            ))}
          </div>
          <div className="review-group" aria-hidden="true">
            {reviews.map(review => (
              <ReviewCard key={`${review.name}-copy`} review={review} copy={copy} hidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
