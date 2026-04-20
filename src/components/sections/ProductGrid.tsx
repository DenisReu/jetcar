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
    <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-white text-2xl md:text-3xl tracking-[0.08em] uppercase font-light mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#666] text-sm tracking-wide">{subtitle}</p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-[#c9a84c] hover:text-[#e2c97e] text-[11px] tracking-[0.2em] uppercase font-medium transition-colors hidden sm:flex items-center gap-2"
          >
            View All
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className={`grid ${colMap[columns]} gap-6 lg:gap-8`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile view all */}
      {viewAllHref && (
        <div className="mt-10 text-center sm:hidden">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-[#e2c97e] text-[11px] tracking-[0.2em] uppercase font-medium transition-colors"
          >
            View All Products
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
