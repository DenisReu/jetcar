'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  image: string;
  heading: string;
  cta: {
    label: string;
    href: string;
  };
}

const slides: Slide[] = [
  {
    image: '/images/slideshow/slide-1.jpg',
    heading: '20 YEARS OF VEYRON',
    cta: { label: 'Explore', href: '/collections/clothing' },
  },
  {
    image: '/images/slideshow/slide-2.webp',
    heading: 'CELEBRATE THE START OF SPRING',
    cta: { label: 'Shop Now', href: '/collections/champagne' },
  },
  {
    image: '/images/slideshow/slide-3.jpg',
    heading: 'THE NEW LEGO BUGATTI',
    cta: { label: "Let's Build!", href: '/collections/lego' },
  },
  {
    image: '/images/slideshow/slide-1.jpg',
    heading: 'EXPLORE THE BUGATTI UNIVERSE',
    cta: { label: 'Shop Now', href: '/collections/sale' },
  },
];

const INTERVAL_MS = 6000;

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <>
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1.0);  }
        }
        .hero-img-active {
          animation: heroZoom 6s linear forwards;
        }
      `}</style>

      {/* Full-width section — no inset, no border-radius */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(480px, 82vh, 860px)',
          overflow: 'hidden',
          backgroundColor: '#111',
        }}
        aria-label="Hero slideshow"
      >
        {/* Slides — full-bleed images */}
        {slides.map((s, i) => {
          const isActive = i === current;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.8s ease',
                zIndex: isActive ? 1 : 0,
              }}
              aria-hidden={!isActive}
            >
              <Image
                src={s.image}
                alt={s.heading}
                fill
                priority={i === 0}
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                className={isActive ? 'hero-img-active' : undefined}
              />
              {/* Bottom gradient for text legibility */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 40%, transparent 65%)',
                }}
              />
            </div>
          );
        })}

        {/* Content overlay — page-width padded container, pinned to bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: '3rem',
            paddingRight: '3rem',
            paddingBottom: '2.75rem',
          }}
        >
          {/* Heading + CTA row: stacked on mobile, side-by-side on desktop */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem',
              marginBottom: '1.75rem',
            }}
          >
            {/* Heading */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 5.5rem)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                textTransform: 'uppercase',
                margin: 0,
                maxWidth: '14ch',
              }}
            >
              {slide.heading}
            </h1>

            {/* CTA pill button */}
            <Link
              href={slide.cta.href}
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#ffffff',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                padding: '0.875rem 2rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.35)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'background 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.15)';
              }}
            >
              {slide.cta.label}
            </Link>
          </div>

          {/* Navigation row: left arrow — dots — right arrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            role="group"
            aria-label="Slideshow navigation"
          >
            {/* Left arrow — long style */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '4px 0',
                display: 'flex',
                alignItems: 'center',
                opacity: 0.8,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.8'; }}
            >
              <svg width="48" height="16" viewBox="0 0 48 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="47" y1="8" x2="1" y2="8" />
                <polyline points="8,1 1,8 8,15" />
              </svg>
            </button>

            {/* Dots */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              role="tablist"
              aria-label="Slides"
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === current ? '1.75rem' : '0.5rem',
                    height: '0.5rem',
                    borderRadius: '9999px',
                    background: i === current ? '#ffffff' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.35s ease',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Right arrow — long style */}
            <button
              onClick={next}
              aria-label="Next slide"
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '4px 0',
                display: 'flex',
                alignItems: 'center',
                opacity: 0.8,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.8'; }}
            >
              <svg width="48" height="16" viewBox="0 0 48 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="1" y1="8" x2="47" y2="8" />
                <polyline points="40,1 47,8 40,15" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
