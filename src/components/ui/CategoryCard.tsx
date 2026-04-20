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
      <div className={`relative overflow-hidden ${size === 'large' ? 'aspect-[3/4]' : 'aspect-[4/5]'} bg-[#111]`}>
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 inset-x-0 p-6">
          <p className="text-[11px] text-[#c9a84c] tracking-[0.2em] uppercase mb-1">
            {collection.productCount} Products
          </p>
          <h3 className="text-white text-xl font-medium tracking-[0.1em] uppercase mb-3">
            {collection.name}
          </h3>
          <p className="text-[#a0a0a0] text-xs tracking-wide mb-4 line-clamp-2">
            {collection.description}
          </p>
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#c9a84c] group-hover:text-white transition-colors font-medium">
            Shop Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
