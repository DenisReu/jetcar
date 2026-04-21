# CLAUDE.md — Bugatti Store Clone

## Project Overview
Pixel-perfect clone of https://bugatti.store/ (Official Bugatti Merchandise Shopify store).
Stack: Next.js 16 App Router · React 19 · TypeScript strict · Tailwind CSS v4 · Turbopack

## Design Style
Reference: https://bugatti.store/ + https://www.bugatti.com/
Style: Dark Luxury E-Commerce
Theme: dark
Primary color: `#004BFA` (Bugatti Blue — rgb 0 75 250)
Secondary color: `#ffffff` (buttons, header)
Danger/Sale: `#E11D48`
Font: BugattiText Bold (headings) + BugattiText Regular (body) — custom woff2 in `/public/fonts/`
Cards: border-radius `clamp(1rem, 1.578vw, 1.875rem)` (~16–30px responsive), no shadow, no border
Buttons: full pill (`border-radius: calc(infinity * 1px)`), uppercase, letter-spacing 0.12em
See full spec: `.claude/design-reference.md`

## Color Tokens (from real CSS)
```
--color-bg:          #000000   (page background)
--color-fg:          #ffffff   (text)
--color-highlight:   #004BFA   (accent — prices, CTAs, links)
--color-header-bg:   #ffffff   (sticky white header)
--color-header-fg:   #171717   (header navigation text)
--color-topbar-bg:   #1f1f1f   (announcement bar)
--color-footer-bg:   #1f1f1f   (main footer)
--color-copyright-bg:#171717   (copyright strip)
--color-sale:        #E11D48   (sale badges, discounts)
--color-price:       #004BFA   (product prices)
--color-border:      rgba(255,255,255,0.10)
--color-muted:       #a0a0a0
```

## Typography (from real CSS)
```
--font-heading: "BugattiBold", Inter, sans-serif
  weight: 700 · letter-spacing: -0.03em · line-height: 1

--font-body: "BugattiRegular", Inter, sans-serif
  weight: 400 · line-height: 1.2 · letter-spacing: 0

--font-button: body family · weight: 500 · uppercase · letter-spacing: 0.12em
--font-nav:    body family · weight: 500
```

## Animation Curves (from real CSS)
```
--anim-primary: 0.5s cubic-bezier(0.3, 1, 0.3, 1)
--anim-smooth:  0.7s cubic-bezier(0.7, 0, 0.3, 1)
--anim-fast:    0.3s cubic-bezier(0.7, 0, 0.3, 1)
--anim-short:   0.2s cubic-bezier(0.7, 0, 0.3, 1)
--anim-nav:     0.5s cubic-bezier(0.6, 0, 0.4, 1)
```

## Key Layout Rules
- Max content width: 1900px
- Topbar height: 3rem (48px) / 3.5rem at ≥1536px
- Page grid: 4-col desktop, 2-col mobile, gap 1rem
- No drop shadows anywhere on the site
- No box-shadows on any component
- Hero: 100svh, full-bleed images, crossfade slideshow

## Component Library Classes (globals.css)
```
.btn-bugatti         — base button (inline-flex, uppercase, 0.75rem, 0.12em spacing)
.btn-bugatti-white   — white fill, black text (primary CTA)
.btn-bugatti-outline — transparent, white border (secondary)
.btn-bugatti-blue    — #004BFA fill (newsletter, special CTA)
.marquee-track       — 40s infinite scroll marquee
.product-card        — hover: image scale 1.07
.footer-social-icon  — hover: color #ffffff (CSS-only, server component safe)
.footer-link         — hover: color rgba(255,255,255,0.85)
```

## File Structure (key files)
```
src/
  app/
    layout.tsx          — CartProvider, AnnouncementBar, Header, Footer
    page.tsx            — HeroSlideshow, MarqueeText, FeaturedCollections,
                          ShopTheLook, BestSellers, MarqueeText, CategoryGrid
    globals.css         — design tokens, keyframes, utility classes
  components/
    layout/
      AnnouncementBar.tsx  — 'use client', rotating 3-msg carousel, fixed top
      Header.tsx           — 'use client', sticky, white bg, dropdowns
      Footer.tsx           — server component, blue strip + dark grid + copyright
    sections/
      HeroSlideshow.tsx    — 'use client', 4 slides, crossfade + zoom
      MarqueeText.tsx      — server, blue band, 40s scroll
      FeaturedCollections.tsx — 'use client', 5 tabs, 6 products
      BestSellers.tsx      — server, 8 products
      CategoryGrid.tsx     — server, 4 categories
      ShopTheLook.tsx      — 'use client', split panel, hotspots
    ui/
      NewsletterForm.tsx   — 'use client', blue-themed
  context/
    CartContext.tsx        — cart state provider
public/
  fonts/  BUGATTIText-Bold.woff2, BUGATTIText-Regular.woff2
  images/ favicon.png, logo-text-white.svg
          slideshow/  slide-1.jpg, slide-2.webp, slide-3.jpg
          banners/    20yr-hoodie-chiron.webp, navy-tshirt.webp
          products/   14 product images (.webp)
```

## Important Gotchas
1. **WebP from Shopify CDN** — all product images are WebP even with `.jpg` URLs. Files are stored as `.webp` locally.
2. **Server Components** — Footer/Header cannot use event handlers. Use CSS `:hover` classes in globals.css instead.
3. **Tailwind v4** — uses `@import "tailwindcss"` syntax, NOT `@tailwind base/components/utilities`.
4. **Next.js fonts** — Inter loaded via `next/font/google`; BugattiText loaded via `@font-face` in globals.css.
5. **CartContext** — wraps entire layout; any component using cart state needs `'use client'`.
6. **Topbar offset** — body padding-top = topbar-height (3rem) to account for fixed announcement bar.
