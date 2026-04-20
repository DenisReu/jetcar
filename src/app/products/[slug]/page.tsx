'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice, calcDiscount } from '@/lib/utils';
import ProductCard from '@/components/ui/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]?.value
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const discount = product.originalPrice
    ? calcDiscount(product.originalPrice, product.price)
    : null;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020203]">
      {/* Breadcrumb */}
      <div className="border-b border-[#1f1f1f]/60 bg-[#050506] py-4 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2.5 text-[11px] text-[#4a4a4a] tracking-wide font-[Montserrat] font-light">
          <Link href="/" className="hover:text-[#8a8a8a] transition-colors duration-200">Home</Link>
          <span className="text-[#2a2a2a]">/</span>
          <Link href="/products" className="hover:text-[#8a8a8a] transition-colors duration-200">Products</Link>
          <span className="text-[#2a2a2a]">/</span>
          <Link
            href={`/collections/${product.category}`}
            className="hover:text-[#8a8a8a] transition-colors duration-200 capitalize"
          >
            {product.category.replace('-', ' ')}
          </Link>
          <span className="text-[#2a2a2a]">/</span>
          <span className="text-[#8a8a8a]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-24">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden bg-[#0a0a0a]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-white/95 text-[#020203] text-[9px] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 font-[Montserrat]">
                  New
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 bg-[#c8a55a] text-[#020203] text-[10px] tracking-[0.12em] uppercase font-semibold px-3 py-1.5 font-[Montserrat]">
                  Save {discount}%
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square overflow-hidden bg-[#0a0a0a] border transition-colors duration-300 cursor-pointer ${
                      selectedImage === i
                        ? 'border-[#c8a55a]/60'
                        : 'border-[#1f1f1f] hover:border-[#2a2a2a]'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:pt-6">
            <p className="text-[10px] text-[#c8a55a] tracking-[0.3em] uppercase mb-4 font-[Montserrat] font-medium">
              {product.vendor}
            </p>
            <h1 className="text-white text-3xl md:text-4xl lg:text-[42px] font-light tracking-[-0.01em] leading-[1.15] mb-6 font-[Cormorant]">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-10">
              <span className="text-white text-2xl font-light tracking-wide font-[Cormorant]">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice && (
                <span className="text-[#4a4a4a] text-lg line-through tracking-wide font-[Cormorant]">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
              {discount && (
                <span className="text-[#c8a55a] text-[11px] font-medium font-[Montserrat] tracking-wide">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-10">
                <p className="text-[10px] text-[#6b6b6b] tracking-[0.25em] uppercase mb-3 font-[Montserrat]">
                  {product.variants[0].name}:{' '}
                  <span className="text-white">{selectedVariant}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.value)}
                      disabled={!v.inStock}
                      className={`px-5 py-2.5 text-[12px] tracking-wide border transition-all duration-300 cursor-pointer font-[Montserrat] font-light ${
                        selectedVariant === v.value
                          ? 'border-[#c8a55a]/60 bg-[#c8a55a]/8 text-white'
                          : v.inStock
                          ? 'border-[#1f1f1f] text-[#8a8a8a] hover:border-[#2a2a2a]'
                          : 'border-[#1f1f1f]/50 text-[#2a2a2a] cursor-not-allowed line-through'
                      }`}
                    >
                      {v.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-10">
              <p className="text-[10px] text-[#6b6b6b] tracking-[0.25em] uppercase mb-3 font-[Montserrat]">
                Quantity
              </p>
              <div className="flex items-center gap-0 w-fit border border-[#1f1f1f]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-[#6b6b6b] hover:text-white hover:bg-[#0f0f0f] transition-colors duration-200 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className="w-14 h-12 flex items-center justify-center text-white text-[13px] border-x border-[#1f1f1f] font-[Montserrat] font-light">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center text-[#6b6b6b] hover:text-white hover:bg-[#0f0f0f] transition-colors duration-200 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-4 mb-12">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-luxury bg-[#c8a55a] hover:bg-[#dfc07a] disabled:bg-[#1f1f1f] disabled:text-[#4a4a4a] text-[#020203] text-[10px] tracking-[0.25em] uppercase font-semibold py-4.5 transition-colors duration-300 cursor-pointer font-[Montserrat]"
              >
                {added
                  ? '✓ Added to Cart'
                  : product.inStock
                  ? 'Add to Cart'
                  : 'Sold Out'}
              </button>
              <Link
                href="/cart"
                className="border border-[#1f1f1f] hover:border-[#2a2a2a] text-[#6b6b6b] hover:text-white px-5 flex items-center justify-center transition-colors duration-300"
                aria-label="View cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </Link>
            </div>

            {/* Description */}
            <div className="border-t border-[#1f1f1f]/60 pt-10">
              <h3 className="text-[#8a8a8a] text-[10px] tracking-[0.25em] uppercase mb-5 font-[Montserrat] font-medium">
                Product Details
              </h3>
              <p className="text-[#6b6b6b] text-[13px] leading-[1.9] tracking-wide font-[Montserrat] font-light">
                {product.description}
              </p>
            </div>

            {/* Meta */}
            <div className="mt-10 space-y-4 border-t border-[#1f1f1f]/60 pt-10">
              {[
                { label: 'Category', value: product.category.replace('-', ' ') },
                { label: 'Vendor', value: product.vendor },
                {
                  label: 'Availability',
                  value: product.inStock ? 'In Stock' : 'Out of Stock',
                  gold: product.inStock,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-5">
                  <span className="text-[10px] text-[#4a4a4a] tracking-[0.2em] uppercase w-28 font-[Montserrat]">
                    {item.label}
                  </span>
                  <span
                    className={`text-[13px] tracking-wide capitalize font-[Montserrat] font-light ${
                      item.gold ? 'text-[#c8a55a]' : 'text-[#8a8a8a]'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Shipping note */}
            <div className="mt-10 p-5 glass-card flex items-start gap-4">
              <svg
                width="16"
                height="16"
                className="text-[#c8a55a]/70 shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
              </svg>
              <p className="text-[#4a4a4a] text-[11px] leading-[1.7] tracking-wide font-[Montserrat] font-light">
                Free delivery on orders over £150 / €150. Orders dispatched within
                1–3 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-28">
            <div className="section-divider mb-20" />
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-white text-3xl md:text-4xl font-light tracking-[-0.01em] font-[Cormorant]">
                You May Also Like
              </h2>
              <Link
                href={`/collections/${product.category}`}
                className="text-[#c8a55a] hover:text-[#dfc07a] text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 hidden sm:flex items-center gap-2.5 font-[Montserrat]"
              >
                View Collection
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
