# Malerbetrieb Schmidt

Art-directed marketing site for a fictitious Hamburg painting business.
React 19, Vite 8, Tailwind CSS 4.

## Run

```bash
npm install
npm run dev
```

## Build and lint

```bash
npm run lint
npm run build
npm run preview
```

## Structure

- `src/index.css` — pigment-studio tokens, base type, shared primitives, cascade animation, reduced-motion rules
- `src/components/AnimatedWave.jsx` — three-layer SVG wave; pauses off-screen and when the tab is hidden
- `src/components/Hero.jsx` — hero copy, seven-color interactive pigment deck, animated wave
- `src/components/Leistungen.jsx` — duotone service images and paint-chip service rack
- `src/components/Referenzen.jsx` — featured before/after slider, keyboard support, project tabs
- `src/components/UeberUns.jsx` — about section and painter photo
- `src/components/Whoosh.jsx` — full-screen speed-streak effect on navigable link clicks and manual scroll gestures
- `src/components/Kundenstimmen.jsx` — auto-scrolling Google-style review cards, native horizontal scroll, hover pause
- `src/components/Kontakt.jsx` — validated enquiry form with inline errors and success state
- `src/assets/referenzen/` — supplied AI WebP pairs, LQIP manifest, credits
- `src/assets/services/` — duotone service images and credits

## Before/after images

The gallery uses three matched pairs supplied by the client and generated with
Gemini: Wohnzimmer, Schlafzimmer, Küche. Each pair uses the same camera angle.
They are AI illustrations, not completed client projects. The UI labels them
“KI-Illustration”. See `src/assets/referenzen/CREDITS.md`.

## GitHub

Repository: https://github.com/Gitm3h/Malerbetrieb

Pushes to `main` run `.github/workflows/publish.yml`:

1. `npm ci`
2. `npm run build`
3. Push `dist/` to the `gh-pages` branch as an orphan commit.

The workflow cannot push local uncommitted changes. `main` must receive a push first.

One-time GitHub Pages setting: **Settings → Pages → Deploy from a branch → `gh-pages` / root**. The site URL is then:

https://gitm3h.github.io/Malerbetrieb/

`vite.config.js` uses `base: './'` so the same build works on the project Pages subpath and on BrewPage root.

## Contact form

The form validates on blur and submit, then simulates a send. It does not post
to a backend and is intentionally client-only.

## Before a real launch

- Replace the placeholder address, phone number, e-mail, and USt-ID.
- Connect the form to a real endpoint, add spam protection, and store consent.
- Review the Datenschutz text in `Impressum.jsx` with legal counsel.
- Replace the illustrative room pairs and the stock painter photo with real
  project and team photos. Update `CREDITS.md` when replacing them.

## Motion

The cascade is CSS-only: three SVG layers drift together over 30s and bob
out of phase at 11s, 9s, and 13s. It pauses via IntersectionObserver and
`visibilitychange`. All entrance, reveal, and wave motion is disabled under
`prefers-reduced-motion: reduce`.
