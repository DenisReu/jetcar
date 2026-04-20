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
    cta: { label: 'Bugatti Carbon Champagne', href: '/collections/champagne' },
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes zoomOut {
          from { transform: scale(1.07); }
          to   { transform: scale(1.0);  }
        }
        .hero-slide-img-active {
          animation: zoomOut 6s linear forwards;
        }
      `}</style>

      <section
        style={{
          width: '100%',
          height: '100svh',
          overflow: 'hidden',
          position: 'relative',
        }}
        aria-label="Hero slideshow"
      >
        {/* Slides */}
        {slides.map((slide, i) => {
          const isActive = i === current;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.7s ease',
                zIndex: isActive ? 1 : 0,
              }}
              aria-hidden={!isActive}
            >
              {/* Background image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.heading}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    inset: '0',
                  }}
                  className={isActive ? 'hero-slide-img-active' : undefined}
                />
              </div>

              {/* Dark overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.20)',
                  zIndex: 1,
                }}
              />

              {/* Text content overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'clamp(2rem, 5vw, 3rem)',
                  left: 'clamp(1.5rem, 5vw, 4rem)',
                  zIndex: 2,
                }}
              >
                <h2
                  style={{
                    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                    fontWeight: 400,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                    textTransform: 'uppercase',
                    margin: '0 0 1.5rem 0',
                    maxWidth: '20ch',
                  }}
                >
                  {slide.heading}
                </h2>

                <Link
                  href={slide.cta.href}
                  style={{
                    display: 'inline-block',
                    background: '#ffffff',
                    color: '#000000',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    padding: '0.875rem 2.5rem',
                    border: '1.5px solid white',
                    textDecoration: 'none',
                    transition: 'background 0.25s ease, color 0.25s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#000000';
                  }}
                >
                  {slide.cta.label}
                </Link>
              </div>
            </div>
          );
        })}

        {/* Navigation dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          role="tablist"
          aria-label="Slideshow navigation"
        >
          {slides.map((_, i) => {
            const isActive = i === current;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                style={{
                  width: isActive ? '2rem' : '0.5rem',
                  height: '0.25rem',
                  background: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'width 0.4s ease, background 0.4s ease',
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
