import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

const lookProducts = products.slice(0, 3);

export default function ShopTheLook() {
  return (
    <section className="py-16 bg-[#0d0d0d]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80"
              alt="Shop the look"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            <div className="absolute top-6 left-6">
              <span className="bg-[#c9a84c] text-black text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1.5">
                Shop the Look
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-[#c9a84c] text-[11px] tracking-[0.3em] uppercase mb-3">
              Featured Picks
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-light tracking-tight leading-none mb-6">
              The Bugatti
              <br />
              <span className="text-[#a0a0a0]">Lifestyle Edit</span>
            </h2>
            <p className="text-[#666] text-sm tracking-wide leading-relaxed mb-10">
              Curated selections from our latest collections. Each piece embodies
              the Bugatti spirit — uncompromising quality, timeless design, and
              exceptional performance.
            </p>

            <div className="space-y-6">
              {lookProducts.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="flex items-center gap-5 group border-b border-[#1a1a1a] pb-6 last:border-0 last:pb-0"
                >
                  <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-[#161616]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#555] tracking-[0.15em] uppercase mb-0.5">
                      {product.vendor}
                    </p>
                    <p className="text-white text-sm tracking-wide group-hover:text-[#c9a84c] transition-colors truncate">
                      {product.name}
                    </p>
                    <p className="text-[#a0a0a0] text-sm mt-0.5">
                      {formatPrice(product.price, product.currency)}
                    </p>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-[#555] group-hover:text-[#c9a84c] transition-colors shrink-0"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-3 mt-10 bg-transparent border border-[#2a2a2a] hover:border-[#c9a84c] text-white hover:text-[#c9a84c] text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all"
            >
              View All Products
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
