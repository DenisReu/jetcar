# Design Reference — Bugatti Store Clone

> Source: https://bugatti.store/ (Shopify theme, extracted from live HTML/CSS)
> Supplementary: https://www.bugatti.com/ (brand identity research)
> Last updated: 2026-04-20

---

## 1. bugatti.store — Complete Design Spec

### 1.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#000000` | Page background |
| `--color-fg` | `#FFFFFF` | Body text |
| `--color-highlight` | `#004BFA` | Blue accent, CTAs, price, active states |
| `--color-btn-bg` | `#FFFFFF` | Primary button background |
| `--color-btn-text` | `#000000` | Primary button text |
| `--color-header-bg` | `#FFFFFF` | Header/nav background |
| `--color-header-fg` | `#171717` | Header text, icons |
| `--color-topbar-bg` | `#1F1F1F` | Announcement bar background |
| `--color-topbar-fg` | `#FAFAFA` | Announcement bar text |
| `--color-footer-bg` | `#1F1F1F` | Footer main section background |
| `--color-copyright-bg` | `#171717` | Footer copyright bar background |
| `--color-price` | `#004BFA` | Product price (blue) |
| `--color-sale` | `#E11D48` | Sale / discounted price |
| `--color-success` | `#4D7C0F` | Success messages |
| `--color-error` | `#BE123C` | Error messages |
| `--color-muted` | `#A0A0A0` | Secondary text |
| `--color-placeholder` | `#E1E1E1` | Input placeholder |
| `--color-border` | `rgba(255,255,255,0.10)` | Subtle borders |
| `--color-border-dark` | `rgba(255,255,255,0.40)` | Visible borders |
| `--color-border-light` | `rgba(255,255,255,0.06)` | Ghost borders |

### 1.2 Typography

| Element | Font | Weight | Size | Letter-spacing | Transform |
|---------|------|--------|------|----------------|-----------|
| Headings (H1–H3) | BugattiText | 700 | varies (`clamp`) | `-0.03em` | UPPERCASE |
| Body | BugattiText / Inter | 400 | `0.875rem–1rem` | `0` | none |
| Labels / tags | BugattiText / Inter | 500 | `0.625rem–0.75rem` | `0.12em–0.18em` | UPPERCASE |
| Buttons | Inter | 500 | `0.75rem` | `0.12em` | UPPERCASE |
| Footer section titles | Inter | 600 | `10px` | `0.18em` | UPPERCASE |
| Footer links | Inter | 400 | `14px` | `0.05em` | none |
| Copyright | Inter | 400 | `10px` | `0.05em` | none |
| Price | BugattiText | 700 | `1rem–1.25rem` | `0` | none |

**Font stacks:**
```css
font-family: 'BugattiText', 'Inter', sans-serif;   /* headings / brand elements */
font-family: var(--font-inter), 'Inter', sans-serif; /* UI / small text */
```

### 1.3 Spacing Scale

Based on `--sp-*` tokens (mirrors Shopify theme):
- `--sp-1`: `0.25rem` (4px)
- `--sp-2`: `0.5rem` (8px)
- `--sp-3`: `0.75rem` (12px)
- `--sp-4`: `1rem` (16px)
- `--sp-6`: `1.5rem` (24px)
- `--sp-8`: `2rem` (32px)
- `--sp-10`: `2.5rem` (40px)
- `--sp-12`: `3rem` (48px)
- `--sp-16`: `4rem` (64px)
- `--sp-20`: `5rem` (80px)
- `--sp-24`: `6rem` (96px)

### 1.4 Border Radius

| Component | Value |
|-----------|-------|
| Pill buttons | `3.75rem` (60px) |
| Product cards | `clamp(0.625rem, 1.053vw, 1.25rem)` |
| Input fields | `0.375rem` |
| Payment badges | `2px` |
| Tags / chips | `3.75rem` |

### 1.5 Animation Curves

```css
--anim-primary: 0.5s cubic-bezier(0.3, 1, 0.3, 1);   /* hero slides, primary transitions */
--anim-smooth:  0.7s cubic-bezier(0.7, 0, 0.3, 1);   /* image hover scale */
--anim-fast:    0.3s cubic-bezier(0.7, 0, 0.3, 1);   /* button hover, quick */
--anim-short:   0.2s cubic-bezier(0.7, 0, 0.3, 1);   /* micro-interactions */
--anim-nav:     0.5s cubic-bezier(0.6, 0, 0.4, 1);   /* nav drawer / dropdown */
```

### 1.6 Layout

| Token | Value |
|-------|-------|
| Max page width | `1900px` |
| Content max-width | `1440px` |
| Topbar height | `3rem` (desktop: `3.5rem` at ≥1536px) |
| Header height (scrolled) | `4rem` |
| Section padding (x) | `clamp(1.5rem, 5vw, 4rem)` |
| Section padding (y) | `clamp(3rem, 6vw, 5rem)` |
| Grid gap (products) | `1rem` |
| Product grid | 4 cols desktop / 2 cols mobile |

### 1.7 Component Specs

#### Announcement Bar
- Fixed at top, `z-index: 50`, `height: 3rem`
- Background: `#1F1F1F`, text: `#FAFAFA`
- 3 rotating messages, 3s interval, 0.5s opacity fade
- Accent links: `#004BFA`

#### Header / Navbar
- Sticky at `top: 3rem`, `z-index: 40`
- Background: `#FFFFFF`, text: `#171717`
- 3-column layout: [search + hamburger] | [logo + desktop nav] | [cart]
- Logo: SVG, max-height `28px`, inverted to dark on white background
- Nav items: `10px`, `0.15em` letter-spacing, UPPERCASE
- Active state: `#004BFA` text
- Dropdowns: 120ms hover debounce, slide-in animation
- Cart count badge: `#004BFA` dot

#### Product Cards
- Aspect ratio: `3/4` (portrait)
- Hover: image scale `1.07`, transition `0.7s cubic-bezier(0.7, 0, 0.3, 1)`
- Product name: white, `0.875rem`, medium weight
- Price: `#004BFA`, `1rem`, bold
- Overlay "QUICK ADD" button on hover

#### Hero Slideshow
- Full viewport height (`100svh`)
- 4 slides, crossfade 0.7s opacity
- Active slide: `@keyframes zoomOut` (scale 1.1→1.0 over 6s)
- Overlay: `rgba(0,0,0,0.20)`
- Nav dots: active `2rem×0.25rem` white pill, inactive `0.5rem×0.25rem` at 40% opacity
- Content: `bottom: clamp(2rem,5vw,3rem)`, `left: clamp(1.5rem,5vw,4rem)`

#### Marquee Text Band
- Background: `#004BFA`
- Height: `3.5rem`
- Items: UPPERCASE, `0.75rem`, `0.2em` letter-spacing, white
- Animation: `40s linear infinite`

#### Footer
- Newsletter strip: `#004BFA` background
- Main grid: `#1F1F1F`, `padding: 3.5rem 2.5rem`
- Copyright bar: `#171717`, `padding: 1rem 2.5rem`
- 4-column grid: brand col (2→1 on desktop) + 3 link columns
- Social icon hover: `color: #ffffff`
- Link hover: `color: rgba(255,255,255,0.85)`

---

## 2. bugatti.com — Brand Identity Reference

> Source: Bugatti brand guidelines, Interbrand rebrand 2022, public CSS research

### 2.1 Color Palette

| Role | Hex | Notes |
|------|-----|-------|
| Background | `#000000` | Pure black, cinematic |
| Text | `#FFFFFF` | Pure white |
| Bugatti Blue | `#004BFA` | Same blue as bugatti.store (unified brand) |
| Logo Red | `#DB1C30` | EB shield emblem red |
| Logo Black | `#000000` | EB shield outline |
| Neutral | `#161616` | Card / section backgrounds |
| Subtle | `rgba(255,255,255,0.08)` | Dividers, ghost elements |

### 2.2 Typography

| Element | Font | Notes |
|---------|------|-------|
| Display headings | Bugatti Display | Proprietary, serif-influenced, ultra-thin |
| Code / mono | Bugatti Monospace | Technical specs, numbers |
| Body / UI | Bugatti Text Regular | Same as bugatti.store `BugattiText` |
| Numerics | Bugatti Monospace | Price, speed stats, year callouts |

**Design character:** Extreme negative space, cinematic scale, full-bleed photography, monochrome with sparse blue accents.

### 2.3 Design Language

- **Minimal, monochrome dominant** — color used sparingly as emphasis
- **Cinematic scale** — full-bleed hero images, 100vw sections
- **Technical precision** — hairline borders (1px), tight letter-spacing, exact grid
- **Luxury restraint** — no gradients, no drop shadows, no texture overlays
- **Motion: slow & intentional** — long eases (0.8s–1.2s), parallax, reveal-on-scroll

---

## 3. Shared Design System (bugatti.store ↔ bugatti.com)

| Property | Value |
|----------|-------|
| Brand blue | `#004BFA` |
| Background | `#000000` |
| Foreground | `#FFFFFF` |
| Typographic family | BugattiText (Regular + Bold) |
| Button style | Uppercase, letter-spaced, border-based |
| Icon stroke | `1.5px` |
| Motion language | Slow, purposeful cubic-bezier eases |
| Grid philosophy | Full-bleed imagery + constrained content (max 1440px) |
| Logo mark | EB oval shield (red/black) + BUGATTI wordmark (white on dark) |

---

## 4. Screenshots Reference

Local screenshots captured during QA:
- `docs/design-references/clone-desktop-1440.jpg` — Full-page desktop
- `docs/design-references/qa-hero.jpg` — Hero slideshow
- `docs/design-references/qa-bestsellers.jpg` — Best Sellers section
- `docs/design-references/qa-products.jpg` — Product grid
- `docs/design-references/qa-footer.jpg` — Footer
- `docs/design-references/qa-stl.jpg` — Shop the Look
- `docs/design-references/qa-mobile-top.jpg` — Mobile viewport
