import Reveal from './Reveal'
import { useLanguage } from '../i18n'

export default function Projekt() {
  const { copy } = useLanguage()
  const project = copy.project

  return (
    <section id="projekt" className="border-t border-ink/15 bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="projekt-title">
      <div className="container-main grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <p className="kicker">{project.kicker}</p>
          <h2 id="projekt-title" className="mt-3 max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.02]">
            {project.title}
          </h2>
          <p className="mt-6 max-w-[54ch] text-ink/70">
            {project.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://github.com/Gitm3h/Malerbetrieb"
              className="btn-primary px-5"
              target="_blank"
              rel="noreferrer"
            >
              {project.repo}
            </a>
            <a href="#kontakt" className="btn-ghost px-5">
              {project.demo}
            </a>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-ink/50">
            {project.disclaimer}
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={100}>
          <div className="border border-ink/20 bg-chalk p-5 sm:p-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-4">
              <h3 className="font-display text-2xl font-semibold">{project.transparency}</h3>
              <span className="text-[0.65rem] font-bold tracking-[0.08em] text-ink/45">{project.ai}</span>
            </div>

            <dl className="mt-2">
              {project.facts.map(([term, text]) => (
                <div key={term} className="grid gap-1 border-b border-ink/10 py-3 last:border-0 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-[0.7rem] font-bold tracking-[0.04em] text-ink/50">{term}</dt>
                  <dd className="text-sm leading-relaxed text-ink/75">{text}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-xs leading-relaxed text-ink/50">
              {project.credits}{' '}
              <a
                href="https://github.com/Gitm3h/Malerbetrieb/blob/main/src/assets/referenzen/CREDITS.md"
                className="underline underline-offset-4 hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                {project.creditLinks[0]}
              </a>
              {' · '}
              <a
                href="https://github.com/Gitm3h/Malerbetrieb/blob/main/src/assets/services/CREDITS.md"
                className="underline underline-offset-4 hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                {project.creditLinks[1]}
              </a>
              {' · '}
              <a
                href="https://github.com/Gitm3h/Malerbetrieb/blob/main/src/assets/about/CREDITS.md"
                className="underline underline-offset-4 hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                {project.creditLinks[2]}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
