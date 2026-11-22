import { useCallback, useEffect, useRef, useState } from 'react'

export default function Whoosh() {
  const [whoosh, setWhoosh] = useState(0)
  const countRef = useRef(0)
  const timerRef = useRef(null)
  const suppressScrollUntilRef = useRef(0)

  const fireWhoosh = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    countRef.current += 1
    setWhoosh(countRef.current)

    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setWhoosh(0), 700)
  }, [])

  useEffect(() => {
    const onClick = event => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return

      const link = event.target.closest('a[href]')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return

      suppressScrollUntilRef.current = performance.now() + 1000
      fireWhoosh()
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [fireWhoosh])

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    let lastY = window.scrollY
    let gestureOpen = false
    let carried = 0
    let idleTimer = 0

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY
      lastY = y
      carried += delta

      if (Math.abs(carried) < 8) return

      if (performance.now() < suppressScrollUntilRef.current) {
        carried = 0
        return
      }

      if (!gestureOpen) {
        gestureOpen = true
        carried = 0
        fireWhoosh()
      }

      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        gestureOpen = false
        carried = 0
      }, 320)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(idleTimer)
    }
  }, [fireWhoosh])

  return (
    <div
      key={whoosh}
      className={`whoosh${whoosh ? ' is-active' : ''}`}
      aria-hidden="true"
    >
      <span className="whoosh-streak whoosh-streak--a" />
      <span className="whoosh-streak whoosh-streak--b" />
      <span className="whoosh-glow" />
    </div>
  )
}

