import { useEffect, useRef, useState } from 'react'

const WAVE_WIDTH = 1440
const WAVE_STEPS = 192
const WAVE_BASE = 58

function waveY(x) {
  const t = (x / WAVE_WIDTH) * Math.PI * 2
  return (
    WAVE_BASE +
    18 * Math.sin(t + 0.4) +
    8 * Math.sin(t * 2 + 2.1) +
    4 * Math.sin(t * 3 + 4.0)
  )
}

function buildWavePath(layer) {
  const points = []

  for (let i = 0; i <= WAVE_STEPS; i += 1) {
    const x = (i / WAVE_STEPS) * WAVE_WIDTH
    const t = (x / WAVE_WIDTH) * Math.PI * 2
    const midLift = 30 * Math.sin(t * 2 + 0.9) ** 2
    const frontLift = midLift + 28 * Math.sin(t * 3 + 2.4) ** 2
    const lift = layer === 'back' ? 0 : layer === 'middle' ? midLift : frontLift
    const y = waveY(x) + lift
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }

  return `${points.join(' ')} L${WAVE_WIDTH},160 L0,160 Z`
}

const layers = [
  { key: 'back', fill: 'var(--color-cascade-deep)', path: buildWavePath('back') },
  { key: 'middle', fill: 'var(--color-cascade-mid)', path: buildWavePath('middle') },
  { key: 'front', fill: 'var(--color-cascade-pale)', path: buildWavePath('front') },
]

export default function AnimatedWave() {
  const ref = useRef(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      entries => setPaused(!entries[0].isIntersecting),
      { threshold: 0 },
    )
    observer.observe(node)

    const onVisibility = () => {
      if (document.hidden) {
        setPaused(true)
        return
      }
      const rect = node.getBoundingClientRect()
      setPaused(!(rect.top < window.innerHeight && rect.bottom > 0))
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div ref={ref} className={`cascade${paused ? ' is-paused' : ''}`} aria-hidden="true">
      {layers.map(layer => (
        <div key={layer.key} className={`cascade-layer cascade-layer--${layer.key}`}>
          <div className={`cascade-bob cascade-bob--${layer.key}`}>
            <svg viewBox="0 0 2880 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d={layer.path} fill={layer.fill} />
              <path d={layer.path} fill={layer.fill} transform="translate(1440 0)" />
            </svg>
          </div>
        </div>
      ))}
      <div className="cascade-edge" />
    </div>
  )
}
