# Malerbetrieb Schmidt — Art-Directed Redesign Specification

Status: implemented and deployed  
Last updated: 2026-11-22  
Scope: full-site visual and interaction redesign of `maler-schmidt-app`, German and English content  
Non-goals: backend/contact-form delivery, CMS, e-commerce, real client photography

Living document: update this file whenever a section, interaction, asset, or deployment detail changes.

---

## 1. Brief and design intent

Malerbetrieb Schmidt is a fictitious Hamburg-Altona painting business. The current site is competent but visually generic: cream background, orange primary, teal secondary, rounded white cards, uniform soft shadows, and a static wave at the hero edge. It reads as a local-trade template rather than a business whose product is color and finish.

The redesign treats the site as a **pigment studio**: a deep petrol-ink stage on which paint colors, swatch cards, and sample boards are the structure. The work should feel authored by someone who mixes color for a living, not decorated with paint-splatter clip art.

Primary job of the site: turn a visitor's vague renovation need into a contact request.  
Secondary job: make the quality of the work legible through color, finish, and before/after evidence.

Resolved decisions from the client:

1. Full-site coherent redesign; content and section order stay.
2. Visual direction: pigment studio — deep ink-teal stage, luminous paint colors, expressive display type.
3. Before/after images: matched pairs built from free-license room photos. Same photograph, dull/aged grade for “before”, fresh painted grade for “after”. Clearly labelled as illustrative.
4. Moving color split: hero bottom edge; three blue-green layers — deep teal, ocean blue, pale mist — drifting together with an out-of-phase vertical bob.

---

## 2. Design plan

### 2.1 Color system

Core palette, six named values:

| Token | Hex | Role |
|---|---|---|
| `--ink` Petrol Ink | `#082527` | Hero, about, footer, body text on light |
| `--ink-2` Deep Petrol | `#0E3437` | Raised dark surfaces, nav glass tint |
| `--chalk` Chalk | `#F2EFE6` | Main light page ground |
| `--chalk-2` Limewash | `#E6E0D2` | Secondary light ground, form fields |
| `--ultramarine` Ultramarine | `#2C4BDF` | Primary brand accent, focus rings, links |
| `--saffron` Saffron | `#F3A712` | Primary CTA, highlights, active state |

Supporting paint-chip colors, used as structural color fields, not decoration:

| Token | Hex | Paired text | Use |
|---|---|---|---|
| `--verdigris` Verdigris | `#1F6F61` | white | Service chip, secondary CTA |
| `--madder` Madder | `#B02A4A` | white | Service chip, error/accent detail |
| `--mist` Pale Mist | `#A7CFC9` | `--ink` | Service chip, quiet panels |

Wave cascade tokens:

| Token | Hex | Layer |
|---|---|---|
| `--cascade-deep` | `#0B3A3D` | Back layer, slowest |
| `--cascade-mid` | `#1C7285` | Middle layer |
| `--cascade-pale` | `#A7CFC9` | Front layer, fastest |

Rules:

- No warm cream `#FAF3E0` + terracotta `#E85D04` pairing. The old orange/cream combination is retired.
- Accent color is assigned by function: saffron = action, ultramarine = focus/links, verdigris and madder = pigment identity and service chips.
- Text on pigment fields is chosen per chip (white on verdigris/madder/ultramarine, ink on saffron/mist) and must meet WCAG AA at its rendered size.
- Gradients are allowed only inside the wave and subtle paint-field texture; no decorative gradient washes behind cards.
- No pure black (`#000`) and no tinted near-black used as a generic “premium” background. Petrol Ink is a deliberate brand color.

### 2.2 Typography

| Role | Family | Treatment |
|---|---|---|
| Display / headings | **Fraunces** (variable serif) | Weights 400–800, optical size follow viewport; tight leading (0.98–1.08); normal roman, with italic only for whole display lines, never for a single word inside a heading |
| Body / UI | **Karla** (variable grotesque) | 400/500/600/700; 1.06 rem base; 1.65 line-height; slightly warm, good German umlaut legibility |
| Numerals and technical labels | Karla tabular numbers | Hex values, statistics, project indices |

Type scale, fluid:

| Level | Size | Line-height |
|---|---|---|
| Hero display | `clamp(3.2rem, 8vw, 7rem)` | 0.96 |
| Section heading | `clamp(2.2rem, 4.8vw, 4rem)` | 1.02 |
| Subheading | `clamp(1.25rem, 2vw, 1.6rem)` | 1.25 |
| Body | `1.0625rem` | 1.65 |
| UI / small | `0.875rem` | 1.45 |
| Micro / legal | `0.75rem` | 1.5 |

Constraints:

- Body line length 58–68 characters; serif display lines may be longer but not full-bleed.
- No all-caps eyebrow above every section. Section kickers are sentence case, set in Karla 600, with a 8px pigment dot; they name the content (“Unsere Farbkarte”, “Beispielhafte Wirkung”), not a meta-label.
- No numbered markers unless the content is genuinely sequential. The services and projects are not a sequence, so no 01/02/03.
- No monospace face for small labels, no middle-dot meta strings, no appended arrow glyph on buttons.
- One display family plus one body family only.

### 2.3 Layout concept

Page order stays: Hero → Leistungen → Referenzen → Über uns → Kundenstimmen → Auszeichnungen → Projekt → Kontakt → Footer.

Desktop hero, 12-column grid, content max 1200px:

```
┌──────────────────────────────────────────────────────────────┐
│  Malerbetrieb Schmidt        Leistungen  Referenzen  …  CTA  │
│                                                              │
│  Malerbetrieb Schmidt · Altona                               │
│                                                              │
│  Farbe, die den               ╱▛▀▀▀▜╲   ULTRAmarin           │
│  Raum verändert.              ╱▛▀▀▀▜╲   SAFRAN              │
│                               ╱▛▀▀▀▜╲   VERDIGRIS           │
│  Innenanstrich, Fassade …                                    │
│  [Kostenlos anfragen]  [040 – 1234567]                       │
│                                                              │
│  ≈≈≈ deep teal · ocean · pale mist, three moving layers ≈≈≈  │
└──────────────────────────────────────────────────────────────┘
```

Mobile hero:

```
┌──────────────────────────┐
│ Schmidt            ☰     │
│                          │
│ Malerbetrieb Schmidt     │
│ Farbe, die den           │
│ Raum verändert.          │
│ [Anfragen] [Anrufen]     │
│                          │
│ ███  ███  ███  swatches  │
│  ≈ three moving waves ≈  │
└──────────────────────────┘
```

Section layout principles:

- **Hero**: 7/5 split. Left = copy and CTAs. Right = seven-color pigment deck fanned like a magician's spread: cards share a bottom pivot and run from −27° to +27° on desktop. Center card sits on top. Idle every ~5s: deck closes to a lifted stack, reorders, then re-fans. Hovering a card draws it up; leaving returns it. Reduced motion freezes the deck. On mobile the same fan is scaled down with a 7.5° step.
- **Leistungen**: no four identical rounded cards. A “Farbkarte” rack of four tall pigment chips, each 1/4 width on desktop, 2×2 on tablet, horizontal snap strip on mobile. Each chip has an assigned pigment, a line icon, a 4:3 duotone service image, the service name set large, and a short description. Hover/focus lifts the chip 6px and reveals a thin rule; no uniform card shadow.
- **Referenzen**: one large featured before/after slider instead of two small side-by-side sliders. A row of three case chips above the board switches the active example. The sample board has a caption bar with project name, district, scope, a “KI-Illustration” tag, and a paint swatch. The comparison is the section's hero.
- **Über uns**: dark petrol section. 6/6 split: painter-at-work photo in a saffron frame on the right; specific proof copy and three statistics set as swatch labels on the left. No stamp, no generic three-up stat cards.
- **Kontakt**: chalk ground. Form in a single open panel with 1px ink rules between rows, large labels, no rounded input pills. Contact details in the sidebar as stacked paint-chip blocks. Primary submit is saffron with ink text.
- **Footer**: petrol, quiet, three columns, no all-caps headings.
- **Navbar**: transparent over the dark hero; on scroll becomes `chalk/92` glass with a bottom hairline. Logo is a small three-swatch bar plus “Malerbetrieb Schmidt” in Karla, not a rounded orange “S” tile.
- **Impressum**: keep the modal behaviour; restyle to chalk panel, Fraunces title, visible focus, body scroll lock preserved.

Alignment: left-aligned content throughout. Only the “Referenzen” section header may be centred if the featured board remains visually anchored; default is left. No justified text.

### 2.4 Design principles

1. **Color is structure.** Pigment fields carry services, projects, and statistics. Color is not a wash behind white cards.
2. **One loud moment.** The moving wave is the only large continuous animation. Everything else is quiet, typographic, and still until the visitor acts.
3. **Paint-sample materiality.** Square corners, thin rules, paper/paint texture, and real hex values. Avoid the rounded-card SaaS kit.
4. **Trade credibility over art-school posturing.** Plain German or English, real numbers, clear next steps. No manifesto copy.
5. **Accessible by construction.** Contrast, focus, keyboard, and reduced motion are part of the design, not a later pass.

### 2.5 Review against the generic default

Before coding, the plan was checked against the common generated-page cluster:

- **Warm cream + high-contrast serif + terracotta**: rejected. The current site already sits there. New ground is petrol ink and chalk, with pigment accents and no terracotta.
- **Near-black + one acid accent**: rejected. Petrol Ink is a color, and saffron is paired with ultramarine and a full pigment set.
- **Broadsheet hairline layout**: partially borrowed for rules and large type, but broken by full-color chips and a moving wave, so it does not read as newspaper pastiche.
- **SaaS card kit**: rejected. Services are color fields, not identical white cards; radius is near-zero; shadows are rare and directional.
- **Template chrome**: rejected. No all-caps eyebrows, no 01/02/03, no middle-dot meta strings, no monospace labels, no arrow-suffixed links.
- **Uniform fade-up on every section**: rejected. One orchestrated hero entrance, then a small number of scroll reveals for section headers and the featured board only.

What changed after review:

- The first palette draft kept cream as the main ground. Changed to chalk only for light sections, with petrol ink as the dominant first impression.
- The first hero draft used a large stock interior photo. Changed to a pigment deck, because stock photography made it look like every other painter site and buried the color identity.
- The first services draft used four rounded cards with icons. Changed to a paint-chip rack, which gives the colors a job.
- The first motion draft animated every section on scroll. Reduced to the wave plus one hero sequence and a few reveal-once headers.

### 2.6 Localization

- Two static routes share one component tree: `/` is German, `/en/` is English.
- All visible copy lives in `src/content/de.js` and `src/content/en.js`; components never hardcode user-facing strings.
- `src/main.jsx` reads `data-locale` from `#root`, wraps the app in `LanguageProvider`, and sets `<html lang>`.
- Every page has a language switch in the desktop nav, the mobile sheet, and the footer. Active language is a non-focusable `span`; the other language is a link with `hrefLang`.
- Switch links are route-relative: German uses `./en/`, English uses `../`. This works at a domain root and under the GitHub Pages project path.
- No runtime translation library. No client-side language detection; the URL is the source of truth.

---

## 3. Section specification

### 3.1 Navbar

- Fixed top, height 64px mobile / 76px desktop.
- Transparent over hero; after 40px scroll, chalk glass with `backdrop-filter: blur(14px) saturate(150%)`, hairline `rgba(8,37,39,.14)`.
- Left: three 6×18px vertical swatches (ultramarine, saffron, verdigris) + wordmark.
- Desktop links: Leistungen, Referenzen, Über uns, Projekt; 15px Karla 500; hover underline drawn from left, 180ms.
- Language switch: compact DE/EN bordered control after the CTA, anchored to the nav’s right edge. Its position does not change between German and English. Active language is filled ink; inactive is a link. Repeated in the mobile sheet and footer, also right-anchored.
- CTA: “Anfragen”, saffron background, ink text, 10px radius (the only rounded button), no shadow. Same target as the old Kontakt link; Kontakt is not duplicated in the nav.
- Mobile: full-screen sheet from the top, chalk ground, Fraunces links at `clamp(2rem, 9vw, 3rem)`, contact CTA at the bottom. Body scroll locked, Escape closes, focus returns to the trigger, focus trapped inside the sheet.

### 3.2 Hero

- Min-height `100svh`; petrol ink ground with a very subtle paper grain overlay (SVG turbulence at 0.035 opacity) and a soft radial deep-petrol light from the right.
- Kicker: “Portfolio-Demo” link + “Malerbetrieb Schmidt · Hamburg-Altona” in Karla 500, mist color. The badge links to the Projekt section.
- H1: “Farbe, die den Raum verändert.” Fraunces 600, chalk, display scale, max 10ch per line on desktop. “Raum” may be italic as a whole line treatment only if the line break supports it; no single-word color accent.
- Subline: “Innenanstrich, Fassade und Lack – sauber ausgeführt von 12 Fachkräften in Altona. Seit 1998.” Max 46ch.
- CTAs: saffron “Kostenlos anfragen” and a ghost “040 – 1234567” with a thin chalk border.
- Trust line: three plain statements separated by spacing, not bullets-with-arrows: “25+ Jahre Erfahrung”, “Meisterbetrieb”, “Kostenloser Kostenvoranschlag”.
- Pigment deck: seven panels, 224×296px desktop, fanned around a bottom pivot from −27° to +27°; labels Ultramarin 2C4BDF, Safran F3A712, Verdigris 1F6F61, Madder B02A4A, Kreide F2EFE6, Koralle E76F51, Mint A7CFC9. Center card sits on top. Idle shuffle closes the fan, reorders, and reopens. Hover draws a card up. Panel texture is a low-opacity CSS roller-streak overlay, not a gradient.
- Entrance choreography, once per page load: kicker at 0ms, H1 at 80ms, subline at 160ms, CTAs at 240ms, deck at 400ms. Transform `translateY(18px)` to `0`, opacity 0→1, 620ms, `cubic-bezier(.2,.7,.2,1)`. Never replay on scroll.
- Bottom wave: see section 4.

### 3.3 Leistungen

Section ground: chalk. Kicker “Unsere Farbkarte”. H2 “Vier Arbeiten. Vier Farben.” Introduction max 55ch.

Four chips:

| Service | Pigment | Text |
|---|---|---|
| Innenanstrich | Ultramarine `#2C4BDF` | Wände, Decken, Treppenhäuser – sauber abgeklebt, termingerecht fertig. |
| Fassadenanstrich | Verdigris `#1F6F61` | Schutz vor Regen, Frost und Schimmel – mit Anstrich, der hält. |
| Lackierarbeiten | Madder `#B02A4A` | Türen, Fenster, Heizkörper – glatt lackiert, ohne Läufer. |
| Bodenbeschichtung | Saffron `#F3A712` | Epoxid, Versiegelung, Farbgestaltung – für Garage, Keller, Gewerbe. |

- Desktop layout: four columns from 1280px; two columns from 640–1279px; horizontal snap strip below 640px. Each card has a 4:3 duotone service image in its pigment, then a color field with icon, rule, title, and description. Square corners, 1px border, icon 20px inside a 36px ink square, service name Fraunces 600 at 1.3–1.45rem, description Karla 0.9–0.93rem.
- Images are free-license stock, duotoned in the service pigment, and labelled illustrative in the credits. They are not presented as completed client work.
- White text on ultramarine, verdigris, madder; ink text on saffron.
- Hover: `translateY(-6px)`, the 1px rule grows to 3px; 200ms. Focus-visible: 2px ink outline with 3px offset. The whole chip is the link to `#kontakt`, with the service name in the accessible label.
- Clicking a chip stores the chosen service and preselects it in the contact form. The form shows a removable “Anfrage: …” chip and a hidden `leistung` field.
- No bottom “Alle Leistungen anfragen” link. The four chips and the contact CTA are enough.

### 3.4 Referenzen

Section ground: limewash `#E6E0D2`, with a thin ink top rule. Kicker “Beispielhafte Wirkung”. H2 “Vorher. Nachher. So wirkt Farbe.” Intro: “Ziehen Sie den Regler. Links der alte Zustand, rechts das Ergebnis.”

Featured sample board:

- Max width 1040px, 16:9 on desktop, 4:3 on mobile, square corners, 1px ink border, 8px chalk matte border around the image.
- The before/after slider fills the board.
- Handle: 48px saffron circle with ink chevrons; 2px chalk divider line; 44px hit area before scaling.
- Labels: “Vorher” bottom-left on ink/75 with chalk text; “Nachher” bottom-right on chalk/90 with ink text. Sentence case, 0.7rem, letter-spacing 0.04em.
- Case chips above the board: three chips in each example's pigment, one active (filled) and two outline. Clicking swaps the image pair with a 220ms crossfade. Active chip has `aria-pressed="true"`. The group is labelled “Beispiel wählen”.
- Caption bar: project name, district, scope, a “KI-Illustration” tag, and a paint swatch with hex. Examples: “Wohnzimmer, Altona | Wände | Salbeigrün `#9FB3A1`”; “Schlafzimmer, Ottensen | Wände | Taubenblau `#7E9DB5`”; “Küche, Bahrenfeld | Wände, Fliesen und Küchenfronten | Kreideweiß `#EFE7D6`”.
- Below the board: “KI-generierte Illustration – keine abgeschlossenen Kundenprojekte. Die gezeigten Räume sind keine realen Aufträge.” Always visible.
- First interaction hint: when the board enters the viewport, the handle travels once from 50% to 62% and back over 1.4s, then stops. Cancelled by pointerdown, keyboard focus, or reduced motion.
- Slider behaviour:
  - Pointer drag anywhere on the board.
  - Keyboard: Left/Right arrows ±2%, Shift+Arrow ±10%, Home/End 0/100.
  - `role="slider"`, `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow`, `aria-label` including the project name.
  - `touch-action: pan-y` so vertical page scroll still works.
  - Pointer capture, no text selection, no image dragging.
- No auto-advancing carousel. No autoplay between projects.

### 3.5 Über uns

- Petrol ink ground, chalk text. 6/6 split.
- Kicker “Wer wir sind”. H2 “Seit 1998: eigene Fachkräfte, keine Subunternehmer.” Fraunces 600.
- Copy: retain the facts (Klaus Schmidt, 12 eigene Fachkräfte, Meisterbetrieb, Maler-Innung Hamburg, Markenprodukte, Termine, saubere Baustelle), tightened to two paragraphs.
- Statistics row: 25+ Jahre, 12 Fachkräfte, 1.000+ Projekte. Each is a small chalk-on-petrol label with a 3px pigment underline (ultramarine, saffron, verdigris). No boxes, no cards.
- Photo: free-license painter-at-work image inside a saffron frame and a visible “Symbolbild – Maler bei der Arbeit” caption. No stamp or badge square; the frame stays clean. The photo is illustrative, not Klaus Schmidt or a real employee; keep the alt text honest. No color filters that misrepresent a real person.
- Trust badges: two compact rows with line icons, not glass cards. “Meisterbetrieb — staatlich geprüfter Malermeister”, “Handwerkskammer Hamburg — eingetragenes Mitglied”.

### 3.6 Kundenstimmen

- Chalk ground, between Über uns and Kontakt. Kicker “Fiktive Google-Rezensionen”. H2 “Nach dem Anstrich bleibt der Eindruck.” Summary block: `5,0`, five saffron stars, “aus 27 Bewertungen”.
- Six imaginary Google-style reviews in paper cards: initial avatar, name, room/district, relative date, five stars, quote, muted `G` mark. Cards are illustrative, not real reviews.
- The strip loops seamlessly with a duplicated card set. Horizontal scroll is native: touch swipe, trackpad, keyboard arrows when the region is focused, and mouse drag. The scrollbar is hidden.
- Auto-scroll runs continuously at about 45px/s. Hover or focus pauses it; leave or blur resumes. Manual scroll works while paused and after.
- One row, cards `min(82vw, 21rem)` wide, edge mask, dark text on paper. No helper sentence under the strip.
- The scroll region is focusable with `aria-label="Kundenbewertungen – seitlich scrollbar"`. The duplicate card set is `aria-hidden`.
- Reduced motion: auto-scroll off, duplicate set hidden, manual scroll only.

### 3.7 Auszeichnungen

- Chalk-2 ground, directly under Kundenstimmen. Kicker “Fiktive Auszeichnungen”. H2 “Was uns auszeichnet.” Note: “Beispielhafte Siegel für dieses Portfolio-Projekt. Keine echten Awards.”
- Six badge cards: Meisterbetrieb, 5,0 Sterne, Top 2025, 12 Fachkräfte, 1.000+, Low-VOC. Each has a circular seal, overline, title, and subline.
- Duplicated badge set loops continuously **rightward**, opposite the reviews. Hover pauses. Edge mask softens entry/exit.
- Horizontal scroll is native: touch swipe, trackpad, keyboard arrows when focused, and mouse drag. The scrollbar is hidden.
- Reduced motion: auto-scroll off, duplicate hidden, manual horizontal scroll.
- Badges are fictional and are also listed as invented in the Projekt transparency panel.

### 3.8 Projekt

- Paper ground, bordered top, between Kundenstimmen and Kontakt. Kicker “Portfolio-Projekt”. H2 “Ein fiktives Unternehmen. Ein echtes Frontend-Projekt.”
- Copy states clearly that Malerbetrieb Schmidt is fictional and that the page is portfolio work for frontend, UI, and motion design.
- Buttons: Repository ansehen (GitHub, new tab) and Demo-Anfrage (`#kontakt`).
- Transparency panel on chalk: `Projekt`, `Unternehmen`, `Design, Code, Texte`, `Raumbilder`, `Weitere Bilder`, `Formular`.
- AI disclosure: design/code/copy produced with DeepSeek Harness; requirements, selection, and approvals by Gitm3h. Room images generated with Gemini. Reviews invented. Service/team photos Unsplash/Pexels. Form is demo-only.
- Link to the three credit files. No real client, address, phone, or testimonials are claimed.

### 3.9 Kontakt

- Chalk ground. Kicker “Jetzt anfragen”. H2 “Was soll gestrichen werden?” Intro: “Kostenloser Kostenvoranschlag. Wir melden uns innerhalb von 24 Stunden.” Small note: “Demo-Formular: Es wird keine Nachricht versendet und nichts gespeichert.”
- Form panel: white-ish `#FBF9F3` with 1px ink rule, no shadow, no 2xl radius. 8px radius maximum.
- Fields: Name*, E-Mail*, Telefon, Objektart*, Fläche in m², Nachricht*. Objektart options: Wohnung, Einfamilienhaus, Gewerbe, Außenbereich. Labels above fields, Karla 600 0.9rem, required asterisk in madder.
- When a service chip was clicked, a removable “Anfrage: …” chip appears above the fields and a hidden `leistung` field carries the choice. New selections remount the form cleanly; “Entfernen” hides the chip.
- Inputs: 0 radius, 1px ink/25 bottom and side border, 14px padding, focus ring 2px ultramarine with 2px offset. Inline validation after blur, error text in madder with an icon; `aria-describedby`.
- Submit: full-width saffron, ink text, 10px radius, spinner in ink; sending state disables and sets `aria-busy`.
- Success state replaces the form with a chalk panel, verdigris check, and “Vielen Dank. Ihre Anfrage ist angekommen.” Focus moves to the success heading.
- Sidebar: phone block in ultramarine with chalk text; address, opening hours, and email as open blocks separated by rules, not four rounded cards.
- Keep the existing simulated send; do not invent a backend.

### 3.10 Footer and Impressum

- Footer petrol ink, chalk/70 text. Mirrored cascade at the top edge; content starts below it. Wordmark, one-sentence description, phone.
- Columns: Einzugsgebiet (Altona, Ottensen, Bahrenfeld, Othmarschen, Nienstedten), Schnellzugriff (including Projekt), Impressum & Datenschutz.
- No all-caps column headings; Karla 600, sentence case.
- Bottom bar: “© 2026 Malerbetrieb Schmidt · Portfolio-Demo · fiktives Unternehmen.” and “Impressum & Datenschutz”.
- Impressum modal contains both Impressum and Datenschutz sections. It inherits the new tokens, keeps Escape, backdrop click, body scroll lock, and the close button; focus trapping and returning focus to the opener are required.

---

## 4. Moving color split (hero + footer wave)

### 4.1 Visual

Three stacked SVG wave bands at the hero's bottom edge, all blue-green, blending into the next chalk section:

- Back layer: `--cascade-deep` `#0B3A3D`, tallest amplitude, lowest opacity (0.9), slowest.
- Middle layer: `--cascade-mid` `#1C7285`, medium amplitude, full opacity.
- Front layer: `--cascade-pale` `#A7CFC9`, smallest amplitude, full opacity, ends in a straight chalk edge below.
- The front layer fades into the next chalk section through a bottom gradient. No hard 1px hairline; no visible seam.

Height: `clamp(72px, 10vw, 160px)`. The layers overlap so the colors read as a cascade, not three separate stripes. The wave shape must be a smooth hand-painted curve, not a symmetrical sine.

### 4.2 Motion

- The three layers share one master curve. The middle and front layers add non-negative lifts that fall to zero at tangent contact points. This gives the wave visible contact/overlap points without the sharp notch that appears when independent wave paths cross.
- Because the lifts never go negative, the layers never cross. Because each lift has zero slope where it reaches zero, the contact points stay smooth.
- Each layer also has a slow vertical bob. Back `0 → 9px` over 11s, middle `9px → 0` over 9s, front `3px → 12px` over 13s, all `ease-in-out alternate`. The layers rise and fall out of phase like water, while the contact points stay smooth because the horizontal shape is unchanged.
- Each layer is a 200% wide SVG tile with a duplicated path, translated from `0` to `-50%` and looped.
- All three layers use the same 30s horizontal duration and direction. They move together, so the contact points travel with the silhouette.
- Easing: linear for the loop (constant drift), no bounce.
- Use `transform: translate3d()` only. No animated SVG path `d`, no layout-affecting property, no JS animation loop.
- Pause all wave layers when the hero is off-screen using an IntersectionObserver toggling a class. Also pause on `document.hidden` via the `visibilitychange` event.
- Reduced motion: `@media (prefers-reduced-motion: reduce)` sets `animation: none` and shows the same static three-layer composition.
- No parallax tied to scroll. No mouse-follow distortion. The wave is the one continuous motion on the page.

### 4.3 Performance

- SVG paths inline in a dedicated `AnimatedWave` component; no image requests.
- `will-change: transform` on the three animated wrappers only, removed when paused.
- The wave container is `aria-hidden="true"` and `pointer-events: none`.
- Target: no frame drops on a 2019-era laptop at 1440×900; no long tasks during page load from the wave.

### 4.4 Footer mirror

- The footer repeats the same master curve and 30s drift at the top edge, vertically inverted.
- Filled area sits above the wave line: pale front, mid behind, deep back, then ink below.
- The pale front layer uses a chalk-to-pale gradient at the top; the chalk stop covers the 18px overscan so the visible top edge is chalk, then fades. No separate overlay.
- Height `clamp(90px, 10vw, 150px)`. A chalk seam cap hides the SVG anti-alias line.
- Same pause-on-offscreen and reduced-motion rules. No second independent motion system.

---

## 5. Before/after images

### 5.1 Source

- Client supplied six AI-generated images made with Gemini: three matched pairs at 1408×768, same camera angle.
- Wohnzimmer: peeling white walls before, fresh sage walls after.
- Schlafzimmer: white walls before, taubenblau walls after.
- Küche: yellowed walls, old tiles, worn fronts before; cream walls, new tiles/floor, refreshed fronts after.
- Files live in `maler-schmidt-app/src/assets/referenzen/`. They are AI illustrations, not real client projects. No stock license applies.

### 5.2 Pipeline

1. Convert each supplied JPEG to WebP at 1408×768 for desktop and 800×436 for mobile.
2. Create a 32×18 LQIP for each before image.
3. Write `lqip.json` with dimensions and blur placeholders.
4. No masks, recolouring, or synthetic grading. The supplied pairs are used as delivered.

### 5.3 Honesty and accessibility

- Visible note: “KI-generierte Illustration – keine abgeschlossenen Kundenprojekte. Die gezeigten Räume sind keine realen Aufträge.”
- Caption tag: “KI-Illustration”.
- Alt text describes each room and the change, e.g. “Wohnzimmer mit abblätternder Wandfarbe vor dem Anstrich” / “… mit frisch gestrichenen salbeigrünen Wänden”.
- Credit note in `CREDITS.md` states Gemini generation and client supply.
- Do not name a real client or real address. District names are illustrative.

---

## 6. Motion and responsiveness

### 6.1 Motion budget

- Hero entrance: one sequence, once per load.
- Wave: continuous ambient motion.
- Hero pigment deck: idle close/reorder/re-fan every ~5s on all viewports; hover pauses and draws a card.
- Reviews: continuous auto-scroll at about 45px/s; hover/focus pauses; native manual scroll always works.
- Awards: continuous rightward drift, opposite the reviews; hover pauses. Disabled under reduced motion.
- Link whoosh: 680ms speed-streak overlay on navigable link clicks and once per manual scroll gesture. A link click suppresses the scroll trigger for 1s.
- Section headers: a 420ms opacity/translate reveal once, triggered at 15% visibility, only for the section kicker+heading, not every child.
- Featured board: one interaction hint per page load.
- Hover/focus transitions: 160–220ms, color/transform only.
- No scroll-jacking, no cursor followers, no tilt cards, no animated counters.
- Every animation is disabled or reduced under `prefers-reduced-motion: reduce`. The site must be complete and legible with motion off.

### 6.2 Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Single column; hero deck keeps the same fan with a 7.5° step; services horizontal snap strip; reviews one scrollable row; wave 72–96px; board 4:3; nav sheet full screen |
| 640–767px | Services 2 columns; hero fan unchanged; reviews one row; form fields 2 columns |
| 768–1023px | Hero 1 column with fan below copy; services 2 columns; about stacks copy then portrait; reviews one row; form 2 columns |
| 1024–1279px | Hero 7/5; services 2 columns; references board 16:9; about 2 columns |
| ≥ 1280px | Content max 1200px; services 4 columns; hero deck 430px wide with 9° fan step |

Hard requirements:

- No horizontal overflow at 320px, 375px, 768px, 1024px, 1440px, 1920px.
- Fluid type and wave height, no fixed pixel heights on text blocks.
- Tap targets ≥ 44×44px.
- `100svh` for the hero, with `100vh` fallback.
- Sticky nav must not cover anchor targets; `scroll-margin-top` on all sections.

---

## 7. Technical plan

### 7.1 Stack and dependencies

- Keep React 19 + Vite 8 + Tailwind CSS 4.
- No new runtime dependencies. Animated wave and reveals use CSS and IntersectionObserver. No Framer Motion, no GSAP, no carousel library.
- Fonts: Fraunces + Karla from Google Fonts, `display=swap`, preconnect kept. Update `index.html`.
- Keep oxlint clean.

### 7.2 Files

| File | Work |
|---|---|
| `maler-schmidt-app/index.html` | Font links, theme-color, description/OG copy aligned with new positioning |
| `maler-schmidt-app/src/index.css` | Replace `@theme` tokens; base typography; components; wave keyframes; reveal utilities; reduced-motion block |
| `maler-schmidt-app/src/App.jsx` | Section order unchanged; no structural rewrite |
| `maler-schmidt-app/src/components/Navbar.jsx` | New wordmark, glass on scroll, full-screen mobile sheet with focus trap |
| `maler-schmidt-app/src/components/Hero.jsx` | New copy, pigment deck, entrance sequence, insert `AnimatedWave` |
| `maler-schmidt-app/src/components/AnimatedWave.jsx` | New: three inline SVG layers, visibility pause |
| `maler-schmidt-app/src/components/Leistungen.jsx` | Paint-chip rack; stores the chosen service and links to contact |
| `maler-schmidt-app/src/components/Referenzen.jsx` | Featured slider, case chips above board, keyboard/pointer support, hint, KI-Illustration badge |
| `maler-schmidt-app/src/components/Projekt.jsx` | Fictional-business and AI-usage disclosure section |
| `maler-schmidt-app/src/components/Kundenstimmen.jsx` | Six illustrative Google-style reviews, auto-scrolling native scroll strip, hidden scrollbar, hover/focus pause |
| `maler-schmidt-app/src/components/Auszeichnungen.jsx` | Six fictional award badges, rightward loop opposite reviews, hover pause |
| `maler-schmidt-app/src/components/Whoosh.jsx` | Full-screen speed-streak transition on navigable link clicks and manual scroll gestures |
| `maler-schmidt-app/.github/workflows/publish.yml` | Build and push `dist/` to `gh-pages` on every push to `main`; point Pages at it |
| `maler-schmidt-app/docs/*` | Portfolio preview screenshots used by the GitHub README |
| `maler-schmidt-app/src/components/UeberUns.jsx` | Specific proof copy, painter photo with symbol caption, swatch stats |
| `maler-schmidt-app/src/components/Kontakt.jsx` | Restyled form, validation, service preselection, success focus, sidebar blocks |
| `maler-schmidt-app/src/components/Footer.jsx` | New type and layout |
| `maler-schmidt-app/src/components/Impressum.jsx` | Token restyle, Impressum + Datenschutz, focus trap, restore focus |
| `maler-schmidt-app/src/components/Reveal.jsx` | New small wrapper/hook for one-time header reveal |
| `maler-schmidt-app/src/assets/referenzen/*` | Client-supplied Gemini pairs, WebP variants, LQIP, credits |
| `maler-schmidt-app/src/assets/about/*` | Painter photo and credits |
| `maler-schmidt-app/src/assets/services/*` | Duotone service images and credits |
| `maler-schmidt-app/README.md` | Run, build, asset, and launch notes |

Class names: use semantic component classes in `index.css` for shared primitives (`.chip`, `.btn`, `.field`, `.section-rule`) and Tailwind utilities for layout. Avoid a long chain of conflicting utility overrides. Define component styles in `@layer components` and keep section-specific overrides scoped by section class.

### 7.3 Data model

`services` array gains `pigment` (token name), `hex`, `textOnPigment`, and a one-line `promise`.  
`projects` array:

```js
{
  id: 'wohnzimmer',
  label: 'Wohnzimmer',
  district: 'Altona',
  scope: 'Wände und Decke',
  pigment: 'verdigris',
  paintHex: '#D9C7A3',
  paintName: 'Kalkfarbe',
  before: { src, width, height, blur, alt },
  after:  { src, width, height, blur, alt },
  credit: 'Photo: … / Unsplash'
}
```

No CMS, no API calls, no state persistence.

---

## 8. Copy direction

Voice: plain, specific, calm. Short sentences. No exclamation marks. No “Ihr Traumzuhause” clichés. No “Wir sind leidenschaftlich”.

Proposed key copy:

- Hero H1: “Farbe, die den Raum verändert.”
- Hero sub: “Innenanstrich, Fassade und Lack – sauber ausgeführt von 12 Fachkräften in Altona. Seit 1998.”
- Services kicker: “Unsere Farbkarte”
- Services H2: “Vier Arbeiten. Vier Farben.”
- References kicker: “Beispielhafte Wirkung”
- References H2: “Vorher. Nachher. So wirkt Farbe.”
- About H2: “Seit 1998: eigene Fachkräfte, keine Subunternehmer.”
- Contact H2: “Was soll gestrichen werden?”
- CTA labels stay literal: “Kostenlos anfragen”, “Anfrage absenden”, “Jetzt anrufen”.

German and English. No untranslated UI microcopy. German uses “Sie”, not “du”. English uses plain, professional US spelling. Paint names and hex values are localized where the color name changes: Kreide → Chalk, Safran → Saffron, Koralle → Coral.

---

## 9. Accessibility acceptance criteria

- Keyboard reachable: nav, mobile sheet, all service chips, case tabs, slider, review strip, form, modal.
- Visible focus ring: 2px ultramarine, 2px offset, on every interactive element; never removed without a replacement.
- Slider fully operable by keyboard and announces value changes.
- Review strip is focusable and scrolls by keyboard; duplicate review cards are hidden from assistive tech; auto-scroll pauses on focus.
- Hero deck is decorative (`aria-hidden`); its shuffle and draw effects are nonessential.
- Mobile menu traps focus, closes on Escape, returns focus to the hamburger.
- Modal traps focus, closes on Escape/backdrop, returns focus to the Impressum link.
- Form errors: inline, text-based, linked with `aria-describedby`; success announced via `role="status"` or focus move.
- Contrast: all body text ≥ 4.5:1; large display text ≥ 3:1; UI borders ≥ 3:1 where they carry meaning.
- Images have meaningful alt text; decorative wave, textures, swatches, and whoosh are `aria-hidden`.
- Logical heading order: one `h1`, one `h2` per section.
- `prefers-reduced-motion` disables wave, entrance, reveal, hint, deck shuffle, review auto-scroll, and whoosh motion.
- Zoom to 200% does not clip or overlap content.

---

## 10. Performance and quality gates

- No new runtime dependencies; production JS should stay near the current bundle size.
- Local WebP images, `loading="lazy"` below the fold, explicit width/height, LQIP background.
- Fonts: two families, three weights maximum used in practice, preconnect, `display=swap`.
- No CLS from the hero deck, wave, or image boards (reserve aspect ratios).
- Wave animation stays compositor-only; verify no layout shift and no jank on scroll.
- `npm run lint` and `npm run build` pass.
- Manual QA at 320, 375, 768, 1024, 1440, 1920px in Chromium and Firefox.
- Keyboard-only pass of the full page.
- Reduced-motion pass.
- Contrast spot-check of every pigment/text pair.

---

## 11. Implementation phases

1. **Foundations**: tokens, fonts, base type, buttons, focus styles, grain texture.
2. **Hero + wave**: copy, seven-color fan deck, entrance, `AnimatedWave`, responsive fan.
3. **Services + about**: duotone image chips, dark section, stats, portrait.
4. **Image assets**: supplied Gemini pairs converted to WebP, LQIP, dimensions, credits.
5. **References**: featured slider, tabs, keyboard, hint, caption, AI-illustration label.
6. **Contact, nav, footer, modal**: forms, validation, focus management, mobile sheet, single Anfragen nav link.
7. **Reviews + motion**: Kundenstimmen strip, native scroll, hover/focus pause, deck shuffle, link/scroll whoosh.
8. **QA + deploy**: responsive, keyboard, reduced motion, contrast, lint/build, BrewPage update.

Definition of done: all acceptance criteria in sections 9–10 pass; the wave moves in three blended blue-green layers; the gallery contains three matched, locally hosted, honestly labelled AI before/after pairs; the review strip scrolls manually and pauses on hover/focus; no placeholder stock URLs remain.

---

## 12. Open items

- BrewPage publication is live but still unclaimed by the new account. Current expiry: 2026-12-22. Claim it to keep it long-term.
- GitHub Pages source is set by the publish workflow to `gh-pages` / root. If the token lacks permission, set it once in repository settings.
- Replace placeholder address, phone, e-mail, and USt-ID before launch.
- Connect the contact form to a real endpoint and add spam protection.
- Review the Datenschutz text with legal counsel.

---

## 13. Current deployment

- Host: BrewPage, static ZIP upload, unlisted subdomain.
- Public URL: `https://my-nuzl291ofg.brewpage.app/`.
- Build: `npm run build`; upload contents of `dist/` as ZIP.
- Update endpoint: `PUT https://brewpage.app/api/sites/my/YzBslUq60a` with `X-Owner-Token`.
- Owner token, manage URL, expiry, and file count live in `deploy-info.md`; keep that file private.
- No backend. The form remains client-only and simulates success.

### GitHub mirror

- Repository: `https://github.com/Gitm3h/Malerbetrieb`.
- Workflow `.github/workflows/publish.yml` runs on every push to `main`.
- It builds with `npm ci && npm run build` and force-pushes the output to an orphan `gh-pages` branch.
- It then attempts to set GitHub Pages source to `gh-pages` / root via `PUT /repos/{owner}/{repo}/pages` and requests a new Pages build via `POST /repos/{owner}/{repo}/pages/builds`. If the token cannot change settings, the step warns and the manual setting remains.
- It does not push local changes. A local commit must be pushed to `main` first.
- `vite.config.js` uses `base: './'` so both BrewPage root and the GitHub Pages project subpath load assets.
- GitHub Pages still needs the one-time `gh-pages` / root source switch if the workflow's settings call is rejected. Expected URL: `https://gitm3h.github.io/Malerbetrieb/`.
