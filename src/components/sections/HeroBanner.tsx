'use client';

import { useState, useEffect } from 'react';
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
    align: 'left',
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
    align: 'right',
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
    align: 'left',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setTransitioning(false);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    if (index === current) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 300);
  };

  const slide = slides[current];

  return (
    <section className="relative w-full h-[92vh] min-h-[580px] max-h-[860px] overflow-hidden bg-black">
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          transitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-16 flex items-end pb-20">
        <div
          className={`max-w-xl transition-all duration-500 ${
            transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          } ${slide.align === 'right' ? 'ml-auto text-right' : ''}`}
        >
          <p className="text-[#c9a84c] text-[11px] tracking-[0.3em] uppercase mb-4">
            {slide.eyebrow}
          </p>
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none mb-6 whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="text-[#b0b0b0] text-sm md:text-base leading-relaxed tracking-wide mb-8 max-w-sm">
            {slide.subtitle}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href={slide.ctaHref}
              className="bg-[#c9a84c] hover:bg-[#e2c97e] text-black text-[11px] tracking-[0.2em] uppercase font-bold px-9 py-4 transition-colors inline-block"
            >
              {slide.cta}
            </Link>
            <Link
              href="/products"
              className="text-white border border-white/40 hover:border-white text-[11px] tracking-[0.2em] uppercase px-9 py-4 transition-colors inline-block"
            >
              All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 ${
              i === current
                ? 'w-8 h-[3px] bg-[#c9a84c]'
                : 'w-3 h-[3px] bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 left-6 lg:left-16 flex items-center gap-3">
        <span className="text-[#c9a84c] text-sm font-medium">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className="w-16 h-[1px] bg-[#333]">
          <span
            className="block h-full bg-[#c9a84c] transition-all duration-300"
            style={{ width: `${((current + 1) / slides.length) * 100}%` }}
          />
        </span>
        <span className="text-[#555] text-sm">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
