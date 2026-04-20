import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

const lookProducts = products.slice(0, 3);

export default function ShopTheLook() {
  return (
    <section className="py-24 bg-[#050506] relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c8a55a]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80"
              alt="Shop the look"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020203]/50" />
            <div className="absolute top-6 left-6">
              <span className="bg-[#c8a55a] text-[#020203] text-[9px] tracking-[0.25em] uppercase font-semibold px-4 py-2 font-[Montserrat]">
                Shop the Look
              </span>
            </div>
            {/* Border on hover */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/[0.06] transition-colors duration-500" />
          </div>

          {/* Products */}
          <div>
            <p className="text-[#c8a55a] text-[10px] tracking-[0.35em] uppercase mb-4 font-[Montserrat] font-medium">
              Featured Picks
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-light tracking-[-0.01em] leading-[1.1] mb-3 font-[Cormorant]">
              The Bugatti
            </h2>
            <h2 className="text-[#6b6b6b] text-4xl md:text-5xl font-light tracking-[-0.01em] leading-[1.1] mb-8 font-[Cormorant]">
              Lifestyle Edit
            </h2>
            <p className="text-[#4a4a4a] text-[12px] tracking-wide leading-[1.9] mb-12 max-w-md font-[Montserrat] font-light">
              Curated selections from our latest collections. Each piece embodies
              the Bugatti spirit — uncompromising quality, timeless design, and
              exceptional performance.
            </p>

            <div className="space-y-0">
              {lookProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="flex items-center gap-5 group/item border-b border-[#1f1f1f]/60 py-6 first:pt-0 last:border-0 last:pb-0"
                >
                  <div className="relative w-[72px] h-[72px] shrink-0 overflow-hidden bg-[#0a0a0a]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="72px"
                      className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-[#4a4a4a] tracking-[0.18em] uppercase mb-1 font-[Montserrat]">
                      {product.vendor}
                    </p>
                    <p className="text-[#e0e0e0] text-[13px] tracking-wide group-hover/item:text-[#c8a55a] transition-colors duration-300 truncate font-[Montserrat] font-light">
                      {product.name}
                    </p>
                    <p className="text-[#8a8a8a] text-[12px] mt-1 font-[Montserrat] font-light">
                      {formatPrice(product.price, product.currency)}
                    </p>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-[#4a4a4a] group-hover/item:text-[#c8a55a] transition-all duration-300 group-hover/item:translate-x-1 shrink-0"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-3 mt-12 border border-[#1f1f1f] hover:border-[#c8a55a]/40 text-[#a8a8a8] hover:text-[#c8a55a] text-[10px] tracking-[0.25em] uppercase px-9 py-4.5 transition-all duration-300 font-[Montserrat] font-medium"
            >
              View All Products
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
