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

      {/* Outer wrapper: gives the left/right black margins */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: '2.5rem',
          paddingRight: '2.5rem',
        }}
      >
        <section
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(480px, 82vh, 860px)',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            backgroundColor: '#111',
          }}
          aria-label="Hero slideshow"
        >
          {/* Slides */}
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
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  style={{ objectFit: 'cover' }}
                  className={isActive ? 'hero-img-active' : undefined}
                />
                {/* Bottom gradient for text legibility */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)',
                  }}
                />
              </div>
            );
          })}

          {/* Bottom-left: heading */}
          <div
            style={{
              position: 'absolute',
              bottom: '4rem',
              left: '2.5rem',
              zIndex: 2,
              maxWidth: '14ch',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 5.5rem)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {slide.heading}
            </h1>
          </div>

          {/* Bottom-right: CTA pill button */}
          <div
            style={{
              position: 'absolute',
              bottom: '4.25rem',
              right: '2.5rem',
              zIndex: 2,
            }}
          >
            <Link
              href={slide.cta.href}
              style={{
                display: 'inline-block',
                background: '#ffffff',
                color: '#000000',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.25s ease, color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(255,255,255,0.85)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = '#ffffff';
              }}
            >
              {slide.cta.label}
            </Link>
          </div>

          {/* Bottom navigation row: arrows + dots */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: 0,
              right: 0,
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: '2rem',
              paddingRight: '2rem',
            }}
          >
            {/* Left arrow */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.35)',
                background: 'rgba(0,0,0,0.25)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
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
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    background: i === current ? '#ffffff' : 'rgba(255,255,255,0.35)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={next}
              aria-label="Next slide"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.35)',
                background: 'rgba(0,0,0,0.25)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
