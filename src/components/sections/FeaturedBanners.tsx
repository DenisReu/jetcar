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
  },
  {
    eyebrow: 'New Drop',
    title: 'Spring\nChampagne',
    description: 'Celebrate with our exclusive Carbon Champagne collection.',
    cta: 'Shop Champagne',
    href: '/collections/champagne',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  },
];

export default function FeaturedBanners() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {banners.map((banner) => (
          <Link
            key={banner.title}
            href={banner.href}
            className="group relative overflow-hidden block aspect-[16/9] bg-[#0a0a0a]"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020203]/90 via-[#020203]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020203]/50 to-transparent" />

            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <p className="text-[#c8a55a] text-[10px] tracking-[0.3em] uppercase mb-2.5 font-[Montserrat] font-medium">
                {banner.eyebrow}
              </p>
              <h2 className="text-white text-3xl md:text-4xl lg:text-[42px] font-light tracking-[-0.01em] leading-[1.05] mb-3 whitespace-pre-line font-[Cormorant]">
                {banner.title}
              </h2>
              <p className="text-[#8a8a8a] text-[12px] tracking-wide mb-6 font-[Montserrat] font-light">
                {banner.description}
              </p>
              <span className="inline-flex items-center gap-2.5 text-[10px] tracking-[0.25em] uppercase font-medium text-[#c8a55a] group-hover:text-white transition-colors duration-300 font-[Montserrat]">
                {banner.cta}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Hover glass edge */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/[0.06] transition-colors duration-500" />
          </Link>
        ))}
      </div>
    </section>
  );
}
