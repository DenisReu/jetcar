# Design Reference
Sources:
- https://bugatti.store/ (Shopify e-commerce store — Official Bugatti Merchandise)
- https://www.bugatti.com/ (Corporate brand site — Interbrand rebrand 2022/2024)

Analyzed: 2026-04-21
Data source: Direct CSS extraction from `/tmp/bugatti-theme.css` + `/tmp/bugatti-home.html` (bugatti.store); Interbrand brand documentation + Brandfetch (bugatti.com)

---

## bugatti.store — Complete Design Spec

### Color Palette

| Role | HEX | RGB | Usage |
|------|-----|-----|-------|
| Background | `#000000` | 0 0 0 | Page background |
| Foreground / Text | `#ffffff` | 255 255 255 | All primary text |
| Accent / Highlight | `#004BFA` | 0 75 250 | CTAs, links, active states, price, info |
| Header BG | `#ffffff` | 255 255 255 | Sticky header background |
| Header Text | `#171717` | 23 23 23 | Header navigation text |
| Topbar BG | `#1f1f1f` | 31 31 31 | Announcement bar background |
| Footer BG | `#1f1f1f` | 31 31 31 | Main footer background |
| Copyright BG | `#171717` | 23 23 23 | Bottom copyright bar |
| Button BG | `#ffffff` | 255 255 255 | Primary button fill |
| Button Text | `#000000` | 0 0 0 | Primary button label |
| Price | `#004BFA` | 0 75 250 | Product prices |
| Sale / Discount | `#E11D48` | 225 29 72 | Sale price, sale badge |
| Sale Tag Text | `#ffffff` | 255 255 255 | Text on sale badges |
| Success Text | `#4D7C0F` | 77 124 15 | Positive alerts |
| Success BG | `#F7FEE7` | 247 254 231 | Success alert background |
| Error Text | `#BE123C` | 190 18 60 | Error states |
| Error BG | `#FFF1F2` | 255 241 242 | Error alert background |
| Info Text | `#004BFA` | 0 75 250 | Info alerts |
| Info BG | `#E1E1E1` | 225 225 225 | Info alert background |
| Border | `rgba(255,255,255,0.10)` | — | Subtle borders, dividers |
| Border Dark | `rgba(255,255,255,0.40)` | — | Stronger borders |
| Border Light | `rgba(255,255,255,0.06)` | — | Hairline borders |
| Muted Text | `#a0a0a0` | 160 160 160 | Secondary labels, captions |

### Gradients

- **Hero overlay**: `linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 50%)` — hero slide darkening
- **Section fade**: `rgba(0,0,0,0) → rgba(0,0,0,0.20)` — over hero images

### Typography

**Font Stack:**
- Heading: `"BugattiBold", Inter, sans-serif` (custom woff2: `/fonts/BUGATTIText-Bold.woff2`)
- Body: `"BugattiRegular", Inter, sans-serif` (custom woff2: `/fonts/BUGATTIText-Regular.woff2`)

**Type Scale (resolved from CSS custom props):**
- H0 / Hero: `clamp(4rem, fluid, 5.625rem)` (64–90px) / weight 700 / letter-spacing -0.03em
- H1: `clamp(2.25rem → 3.5rem)` (36–56px responsive) / weight 700
- H2: `clamp(1.5rem → 2.25rem)` (24–36px responsive) / weight 700
- H3: `clamp(1.25rem → 1.875rem)` (20–30px responsive) / weight 700
- H4: `1.125rem` (18px) / weight 700
- Body: `1rem` (16px) / weight 400 / line-height 1.2
- Navigation: `clamp(0.875rem, 0.748rem + 0.317vw, 1.125rem)` / weight 500
- Button: `clamp(0.875rem → 1rem)` / weight 500 / letter-spacing 0.12em / UPPERCASE
- Product title: `clamp(1rem → 1.25rem)` / weight 500
- Caption: `0.75rem` (12px) / weight 400

### Components

#### Cards (Product Cards)
```
border-radius: clamp(1rem, 1.578vw, 1.875rem)  /* ~16–30px responsive */
box-shadow: none
border: none
background: transparent (image fills the card)
padding: 0 (image fills, text below)
aspect-ratio: 1/1 (square product images)
overflow: hidden
```

#### Buttons — Primary (btn-bugatti-white)
```
border-radius: calc(infinity * 1px)  /* full pill */
height: auto (padding-based)
padding: 0.875rem 2rem
background: #ffffff
color: #000000
border: 1.5px solid #ffffff
font-weight: 500
font-size: 0.75rem
letter-spacing: 0.12em
text-transform: uppercase
transition: background 0.3s, color 0.3s
hover → background: transparent; color: #ffffff
```

#### Buttons — Secondary / Outline (btn-bugatti-outline)
```
border-radius: calc(infinity * 1px)  /* full pill */
padding: 0.875rem 2rem
background: transparent
color: #ffffff
border: 1.5px solid rgba(255,255,255,0.4)
font-weight: 500
font-size: 0.75rem
letter-spacing: 0.12em
text-transform: uppercase
hover → background: #ffffff; color: #000000; border-color: #ffffff
```

#### Buttons — Blue (btn-bugatti-blue)
```
background: #004BFA
color: #ffffff
border: 1.5px solid #004BFA
hover → background: #003CC8; border-color: #003CC8
```

#### Inputs / Search
```
border-radius: 0.375rem (6px)
border: 1px solid rgba(255,255,255,0.1)
height: var(--sp-13) = 3.25rem (52px)
padding-inline: 1.625rem
background: rgba(255,255,255,0.06)
color: #ffffff
```

#### Newsletter Input (in blue strip)
```
background: rgba(255,255,255,0.1)
border: 1px solid rgba(255,255,255,0.3)
color: #ffffff
```

#### Navigation — Header
```
type: sticky topbar + sticky header
topbar-height: 3rem (48px) / 3.5rem at ≥1536px
header-height: ~4rem (64px)
header-background: #ffffff
header-text: #171717
header-border: none (shadow-free)
active-color: #004BFA
inactive-color: #171717
dropdown-bg: #ffffff
dropdown-border: rgba(0,0,0,0.1)
logo: SVG (inverted on white header, white on dark)
```

#### Navigation — Topbar (Announcement Bar)
```
background: #1f1f1f
color: #fafafa
height: 3rem
font-size: 0.75rem
letter-spacing: 0.1em
link-color: #004BFA
rotating messages: 3s interval, 0.5s fade transition
```

#### Marquee / Banner Strip
```
background: #004BFA
color: #ffffff
height: 3.5rem
font: uppercase, letter-spacing 0.2em
animation: marquee 40s linear infinite
```

#### Badges / Tags
```
sale badge: background #E11D48; color #ffffff; border-radius 0.25rem; padding 0.2rem 0.5rem; font-size 0.625rem
```

#### Icons
```
style: outline (stroke-based SVG)
stroke-width: 1.5px
size: 20–24px typical
color: currentColor
```

#### Avatars / Images
```
product images: aspect-ratio 1/1, object-fit cover
hero images: 100svh height, object-fit cover
```

### Layout

```
max-content-width: 1900px (--page-width)
topbar-height: 3rem (48px) / 3.5rem at ≥1536px
header-height: ~4rem (64px)
content-padding: clamp(1rem, 5vw, 3rem)
card-gap: 1rem (16px)
section-spacing: clamp(2rem, 5vw, 5rem)
grid: 4-col desktop / 2-col mobile
density: normal
```

### Animations

```css
--animation-nav: 0.5s cubic-bezier(0.6, 0, 0.4, 1)
--animation-primary: 0.5s cubic-bezier(0.3, 1, 0.3, 1)
--animation-smooth: 0.7s cubic-bezier(0.7, 0, 0.3, 1)
--animation-fast: 0.3s cubic-bezier(0.7, 0, 0.3, 1)
--animation-short: 0.2s cubic-bezier(0.7, 0, 0.3, 1)
```

### Style Summary

```
overall: dark luxury e-commerce
theme: dark
icons: outline, stroke 1.5px
complexity: moderate
special:
  - Full pill buttons (border-radius: infinity)
  - BugattiText custom font family (Bold + Regular)
  - Accent blue #004BFA used for prices, links, CTA
  - White header on dark page (inverted section)
  - Marquee strip in brand blue between sections
  - Product images serve as WebP from Shopify CDN (despite .jpg URL extension)
  - Hero: full-viewport crossfade slideshow, zoom-out animation per slide
  - Topbar: rotating 3-message carousel
```

---

## bugatti.com — Design Spec

*Data from: Interbrand rebrand documentation (2022), Brandfetch brand data, public brand guidelines research*

### Color Palette

| Role | HEX | Source | Usage |
|------|-----|--------|-------|
| Background | `#000000` | Confirmed | "Velvet black canvas" — primary page background |
| Text Primary | `#ffffff` | Confirmed | "Showroom white" — all headline/body text |
| Bugatti Blue | `#004CFA` | Brandfetch | Brand accent (French motorsport heritage) |
| Gray / Quiet | `#888888`–`#999999` | Approximate | Muted moments, secondary text |
| EB Macaron Red | `#DB1C30` | Confirmed | Logo jewel emblem, heritage element |
| EB Macaron Black | `#000000` | Confirmed | Logo background |
| EB Macaron White | `#ffffff` | Confirmed | Logo text/border |
| Hairline border | `rgba(255,255,255,0.12)` | Approximate | Minimal dividers only |

### Typography

**Font Family:** Custom Bugatti typefaces (designed by Thomas Huot-Marchand / 205TF)
- `Bugatti Display` — monumental headlines, condensed, ALL-CAPS, inspired by 19th-century Parisian typography
- `Bugatti Monospace` — UI labels, buttons, navigation (technical/engineering character)
- `Bugatti Text Regular` — body copy, descriptions

**Type Scale (from public documentation):**
- Hero/Display: 288px equivalent (monumental, viewport-filling) / ALL-CAPS
- Page title: ~80–120px / Bugatti Display / weight 700
- Section header: ~48–64px / Bugatti Display
- Body: 16px / Bugatti Text Regular / weight 400 / line-height 1.5
- UI Label / Button: 14px / Bugatti Monospace / weight 400 / letter-spacing 0.15em
- Caption: 12px / Bugatti Text Regular

### Components

#### Layout Philosophy (No Traditional Cards)
```
Bugatti.com uses "cinematic chapters" — NOT cards
Each section = full-bleed media + overlaid headline + single CTA
No card borders, no card shadows, no card radius
Content areas: full-width media panels with text overlay
```

#### Buttons
```
style: ghost/outline only
border: 1px solid rgba(255,255,255,0.4) (hairline)
border-radius: 0 (sharp, geometric) OR very slight
background: transparent
color: #ffffff
font: Bugatti Monospace, UPPERCASE, 14px, letter-spacing 0.15em
hover: border-color #ffffff, subtle white fill
```

#### Navigation
```
type: topbar (horizontal navigation)
background: transparent (over hero) → #000000 (on scroll)
text-color: #ffffff
font: Bugatti Monospace
border-bottom: 1px solid rgba(255,255,255,0.12) on scroll
height: ~64–80px
active: underline or accent color #004CFA
```

#### Borders / Dividers
```
ONLY hairline borders: 1px solid rgba(255,255,255,0.12)
NO drop shadows anywhere
NO box-shadows
NO card-style borders
```

### Layout

```
type: full-bleed cinematic sections
max-width: none (truly full-bleed viewport-width)
spacing-scale: 6 discrete values only (minimal)
section-height: 100vh per hero section
content-alignment: bottom-left typical for overlay text
density: spacious (luxury negative space)
```

### Style Summary

```
overall: cinematic dark luxury brand editorial
theme: dark
icons: minimal, outline, thin stroke
complexity: minimal (deceptively simple)
special:
  - No cards — every section is full-bleed media
  - Hairline borders ONLY, zero drop shadows
  - Monumental ALL-CAPS typography (288px scale)
  - 6 discrete spacing values (no arbitrary gaps)
  - Variable font technology
  - Bugatti Blue as ONLY accent on otherwise monochrome palette
  - EB Macaron (jewel logo) given central visual role
  - Chiaroscuro photography with high contrast
```

---

## Shared Design DNA (both sites)

| Property | bugatti.store | bugatti.com |
|----------|--------------|-------------|
| Background | `#000000` | `#000000` |
| Text | `#ffffff` | `#ffffff` |
| Accent Blue | `#004BFA` | `#004CFA` |
| Brand Red | `#E11D48` (sale) | `#DB1C30` (EB logo) |
| Button style | Pill (radius: ∞) | Sharp / ghost |
| Font | BugattiText (Bold+Regular) | Bugatti Display/Mono/Text |
| Cards | Rounded (16–30px) | None (full-bleed) |
| Shadows | None | None |
| Overall | Dark luxury e-commerce | Dark luxury editorial |

---

## Rules for This Project (bugatti.store clone)

**DO:**
- Use `#000000` as page background always
- Use `#004BFA` for all accent interactions (hover, active, price, CTA)
- Use full pill buttons (`border-radius: calc(infinity * 1px)`)
- Use BugattiText-Bold for all headings with `letter-spacing: -0.03em`
- Use `#ffffff` header with `#171717` text (inverted on dark page)
- Keep `#1f1f1f` for topbar and footer backgrounds
- Use `#E11D48` only for sale/discount indicators
- Apply `stroke-width: 1.5` to all SVG icons
- Use 4-column grid on desktop, 2-column on mobile
- Keep animations at Bugatti easing curves (cubic-bezier(0.3, 1, 0.3, 1))
- Use `rgba(255,255,255,0.1)` for subtle borders on dark backgrounds

**DON'T:**
- Don't use drop shadows or box-shadows anywhere
- Don't use border-radius on square buttons (must be pill or sharp)
- Don't use any accent color other than `#004BFA`
- Don't add extra font weights beyond 400 and 700
- Don't use card backgrounds (white boxes on dark bg) — keep cards transparent
- Don't round hero/banner images
- Don't use generic font families (must load BugattiText fonts)
- Don't pad images within cards — let them fill the card fully
- Don't use `letter-spacing` other than 0 on body and -0.03em on headings (except buttons: 0.12em)
