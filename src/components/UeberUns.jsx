import Reveal from './Reveal'
import { useLanguage } from '../i18n'
import painter from '../assets/about/painter.webp'

const stats = [
  { num: '25+', color: '#2C4BDF' },
  { num: '12', color: '#F3A712' },
  { num: '1.000+', color: '#1F6F61' },
]

export default function UeberUns() {
  const { copy } = useLanguage()

  return (
    <section id="ueber-uns" className="on-dark overflow-hidden bg-ink py-20 sm:py-24 lg:py-28" aria-label={copy.about.aria}>
      <div className="container-main grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <p className="kicker kicker--chalk">{copy.about.kicker}</p>
          <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.02] text-chalk">
            {copy.about.title}
          </h2>

          <div className="mt-6 max-w-[58ch] space-y-4 text-chalk/75">
            {copy.about.paragraphs.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={copy.about.stats[index]}>
                <p className="font-display text-3xl font-semibold text-chalk sm:text-4xl">{stat.num}</p>
                <p className="mt-1 text-xs leading-snug text-chalk/60">{copy.about.stats[index]}</p>
                <span
                  className="mt-3 block h-[3px] w-8"
                  style={{ backgroundColor: stat.color }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={100}>
          <figure className="relative">
            <div className="border-[10px] border-saffron bg-ink sm:border-[12px]">
              <img
                src={painter}
                alt={copy.about.imageAlt}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="absolute inset-x-[10px] bottom-[10px] bg-ink/85 px-3 py-2 text-xs font-semibold text-chalk/80 backdrop-blur-sm sm:inset-x-[12px] sm:bottom-[12px]">
              {copy.about.caption}
            </figcaption>
          </figure>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {copy.about.credentials.map(([title, sub]) => (
              <li key={title} className="flex gap-3 border-t border-chalk/15 pt-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-0.5 shrink-0 text-saffron" aria-hidden="true">
                  <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <span className="block text-sm font-semibold text-chalk/90">{title}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-chalk/60">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
