'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    eyebrow: '20 Years of Veyron',
    title: 'A Legacy\nReborn',
    subtitle:
      'Celebrate two decades of the car that changed everything. Discover the limited commemorative collection.',
    cta: 'Shop Collection',
    ctaHref: '/collections/exclusive-lifestyle',
    image:
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=85',
    align: 'left' as const,
  },
  {
    id: 2,
    eyebrow: 'New Arrival',
    title: 'The New\nLEGO Bugatti',
    subtitle:
      '3,599 pieces of pure engineering wonder. The official LEGO Technic Bugatti Chiron is here.',
    cta: 'Shop LEGO',
    ctaHref: '/collections/lego',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85',
    align: 'right' as const,
  },
  {
    id: 3,
    eyebrow: 'Celebrate Spring',
    title: 'Carbon\nChampagne',
    subtitle:
      'Toast the season in style. The exclusive carbon fibre champagne collection is now available.',
    cta: 'Discover Now',
    ctaHref: '/collections/champagne',
    image:
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&q=85',
    align: 'left' as const,
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (index === current || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 400);
  }, [current, transitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setTransitioning(false);
      }, 400);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[94vh] min-h-[600px] max-h-[900px] overflow-hidden bg-[#020203]">
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 img-overlay-left" />
        <div className="absolute inset-0 img-overlay-bottom" />
        {/* Film grain texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-16 flex items-end pb-24">
        <div
          className={`max-w-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            transitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
          } ${slide.align === 'right' ? 'ml-auto text-right' : ''}`}
        >
          <p className="text-[#c8a55a] text-[10px] tracking-[0.4em] uppercase mb-5 font-[Montserrat] font-medium">
            {slide.eyebrow}
          </p>
          <h1 className="text-white text-5xl md:text-6xl lg:text-[80px] font-light tracking-[-0.02em] leading-[0.95] mb-7 whitespace-pre-line font-[Cormorant]">
            {slide.title}
          </h1>
          <p className="text-[#9a9a9a] text-[13px] md:text-[14px] leading-[1.8] tracking-wide mb-10 max-w-md font-[Montserrat] font-light">
            {slide.subtitle}
          </p>
          <div className={`flex items-center gap-4 flex-wrap ${slide.align === 'right' ? 'justify-end' : ''}`}>
            <Link
              href={slide.ctaHref}
              className="btn-luxury bg-[#c8a55a] hover:bg-[#dfc07a] text-[#020203] text-[10px] tracking-[0.25em] uppercase font-semibold px-10 py-4.5 inline-block font-[Montserrat]"
            >
              {slide.cta}
            </Link>
            <Link
              href="/products"
              className="text-white/70 border border-white/15 hover:border-white/40 hover:text-white text-[10px] tracking-[0.25em] uppercase px-10 py-4.5 transition-all duration-300 inline-block font-[Montserrat] font-medium"
            >
              All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 right-10 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-500 cursor-pointer ${
              i === current
                ? 'w-10 h-[2px] bg-[#c8a55a]'
                : 'w-3 h-[2px] bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 left-6 lg:left-16 flex items-center gap-4">
        <span className="text-[#c8a55a] text-[13px] font-light font-[Montserrat]">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className="w-20 h-[1px] bg-[#2a2a2a] relative overflow-hidden">
          <span
            className="block h-full bg-gradient-to-r from-[#c8a55a] to-[#c8a55a]/40 transition-all duration-700"
            style={{ width: `${((current + 1) / slides.length) * 100}%` }}
          />
        </span>
        <span className="text-[#4a4a4a] text-[13px] font-light font-[Montserrat]">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#020203] to-transparent pointer-events-none" />
    </section>
  );
}
