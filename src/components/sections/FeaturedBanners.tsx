import Link from 'next/link';
import Image from 'next/image';

const banners = [
  {
    eyebrow: 'Limited Edition',
    title: '20 Years\nof Veyron',
    description: 'Two decades of the car that redefined speed.',
    cta: 'Explore',
    href: '/collections/artwork',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&q=80',
    dark: true,
  },
  {
    eyebrow: 'New Drop',
    title: 'Spring\nChampagne',
    description: 'Celebrate with our exclusive Carbon Champagne collection.',
    cta: 'Shop Champagne',
    href: '/collections/champagne',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    dark: false,
  },
];

export default function FeaturedBanners() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <Link
            key={banner.title}
            href={banner.href}
            className="group relative overflow-hidden block aspect-[16/9] bg-[#111]"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className={`absolute inset-0 ${
                banner.dark
                  ? 'bg-gradient-to-r from-black/80 to-black/30'
                  : 'bg-gradient-to-r from-black/70 to-black/20'
              }`}
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <p className="text-[#c9a84c] text-[11px] tracking-[0.25em] uppercase mb-2">
                {banner.eyebrow}
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-light tracking-tight leading-none mb-3 whitespace-pre-line">
                {banner.title}
              </h2>
              <p className="text-[#a0a0a0] text-sm tracking-wide mb-5">
                {banner.description}
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-bold text-[#c9a84c] group-hover:text-white transition-colors">
                {banner.cta}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
