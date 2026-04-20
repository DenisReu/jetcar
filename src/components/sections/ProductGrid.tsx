import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';
import Link from 'next/link';

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({
  title,
  subtitle,
  products,
  viewAllHref,
  columns = 4,
}: ProductGridProps) {
  const colMap = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-[40px] tracking-[-0.01em] font-light mb-2 font-[Cormorant]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#6b6b6b] text-[12px] tracking-[0.08em] font-[Montserrat] font-light">{subtitle}</p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-[#c8a55a] hover:text-[#dfc07a] text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 hidden sm:flex items-center gap-2.5 font-[Montserrat]"
          >
            View All
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className={`grid ${colMap[columns]} gap-5 lg:gap-7`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile view all */}
      {viewAllHref && (
        <div className="mt-12 text-center sm:hidden">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2.5 text-[#c8a55a] hover:text-[#dfc07a] text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 font-[Montserrat]"
          >
            View All Products
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
