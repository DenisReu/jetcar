import Link from 'next/link';
import Image from 'next/image';
import { Collection } from '@/types';

interface CategoryCardProps {
  collection: Collection;
  size?: 'default' | 'large';
}

export default function CategoryCard({ collection, size = 'default' }: CategoryCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative overflow-hidden block"
    >
      <div className={`relative overflow-hidden ${size === 'large' ? 'aspect-[3/4]' : 'aspect-[4/5]'} bg-[#0a0a0a]`}>
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        {/* Layered gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020203]/90 via-[#020203]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020203]/20 to-transparent opacity-50" />

        <div className="absolute bottom-0 inset-x-0 p-5 lg:p-6">
          <p className="text-[10px] text-[#c8a55a]/80 tracking-[0.2em] uppercase mb-1.5 font-[Montserrat] font-light">
            {collection.productCount} Products
          </p>
          <h3 className="text-white text-lg font-light tracking-[0.06em] uppercase mb-2.5 font-[Cormorant] text-[22px]">
            {collection.name}
          </h3>
          <p className="text-[#8a8a8a] text-[11px] tracking-wide mb-4 line-clamp-2 font-[Montserrat] font-light leading-relaxed">
            {collection.description}
          </p>
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#c8a55a] group-hover:text-white transition-colors duration-300 font-[Montserrat] font-medium">
            Shop Now
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        {/* Hover border */}
        <div className="absolute inset-0 border border-white/0 group-hover:border-white/[0.06] transition-colors duration-500" />
      </div>
    </Link>
  );
}
