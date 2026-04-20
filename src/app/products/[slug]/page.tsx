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
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#1a1a1a] bg-[#0d0d0d] py-4 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs text-[#555] tracking-wide">
          <Link href="/" className="hover:text-[#a0a0a0] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#a0a0a0] transition-colors">Products</Link>
          <span>/</span>
          <Link
            href={`/collections/${product.category}`}
            className="hover:text-[#a0a0a0] transition-colors capitalize"
          >
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-[#a0a0a0]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden bg-[#111]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-white text-black text-[10px] tracking-[0.15em] uppercase font-bold px-3 py-1">
                  New
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 bg-[#c9a84c] text-black text-[11px] tracking-[0.1em] uppercase font-bold px-3 py-1">
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
                    className={`relative aspect-square overflow-hidden bg-[#111] border-2 transition-colors ${
                      selectedImage === i
                        ? 'border-[#c9a84c]'
                        : 'border-transparent hover:border-[#333]'
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
          <div className="lg:pt-4">
            <p className="text-[11px] text-[#c9a84c] tracking-[0.25em] uppercase mb-3">
              {product.vendor}
            </p>
            <h1 className="text-white text-3xl md:text-4xl font-light tracking-tight leading-tight mb-5">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white text-2xl font-medium tracking-wide">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice && (
                <span className="text-[#555] text-lg line-through tracking-wide">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
              {discount && (
                <span className="text-[#c9a84c] text-sm font-medium">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <p className="text-[11px] text-[#666] tracking-[0.2em] uppercase mb-3">
                  {product.variants[0].name}:{' '}
                  <span className="text-white">{selectedVariant}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.value)}
                      disabled={!v.inStock}
                      className={`px-4 py-2 text-sm tracking-wide border transition-colors ${
                        selectedVariant === v.value
                          ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-white'
                          : v.inStock
                          ? 'border-[#2a2a2a] text-[#a0a0a0] hover:border-[#444]'
                          : 'border-[#1a1a1a] text-[#333] cursor-not-allowed line-through'
                      }`}
                    >
                      {v.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-[11px] text-[#666] tracking-[0.2em] uppercase mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-0 w-fit border border-[#2a2a2a]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-[#a0a0a0] hover:text-white hover:bg-[#161616] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className="w-12 h-11 flex items-center justify-center text-white text-sm border-x border-[#2a2a2a]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-[#a0a0a0] hover:text-white hover:bg-[#161616] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-[#c9a84c] hover:bg-[#e2c97e] disabled:bg-[#222] disabled:text-[#555] text-black text-[11px] tracking-[0.2em] uppercase font-bold py-4 transition-colors"
              >
                {added
                  ? '✓ Added to Cart'
                  : product.inStock
                  ? 'Add to Cart'
                  : 'Sold Out'}
              </button>
              <Link
                href="/cart"
                className="border border-[#2a2a2a] hover:border-[#555] text-[#a0a0a0] hover:text-white px-5 flex items-center justify-center transition-colors"
                aria-label="View cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </Link>
            </div>

            {/* Description */}
            <div className="border-t border-[#1a1a1a] pt-8">
              <h3 className="text-white text-[11px] tracking-[0.2em] uppercase mb-4">
                Product Details
              </h3>
              <p className="text-[#a0a0a0] text-sm leading-relaxed tracking-wide">
                {product.description}
              </p>
            </div>

            {/* Meta */}
            <div className="mt-8 space-y-3 border-t border-[#1a1a1a] pt-8">
              {[
                { label: 'Category', value: product.category.replace('-', ' ') },
                { label: 'Vendor', value: product.vendor },
                {
                  label: 'Availability',
                  value: product.inStock ? 'In Stock' : 'Out of Stock',
                  gold: product.inStock,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-[11px] text-[#555] tracking-[0.15em] uppercase w-24">
                    {item.label}
                  </span>
                  <span
                    className={`text-sm tracking-wide capitalize ${
                      item.gold ? 'text-[#c9a84c]' : 'text-[#a0a0a0]'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Shipping note */}
            <div className="mt-8 p-4 bg-[#0d0d0d] border border-[#1a1a1a] flex items-start gap-3">
              <svg
                width="16"
                height="16"
                className="text-[#c9a84c] shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
              </svg>
              <p className="text-[#666] text-xs leading-relaxed tracking-wide">
                Free delivery on orders over £150 / €150. Orders dispatched within
                1–3 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-white text-2xl tracking-[0.08em] uppercase font-light">
                You May Also Like
              </h2>
              <Link
                href={`/collections/${product.category}`}
                className="text-[#c9a84c] hover:text-[#e2c97e] text-[11px] tracking-[0.2em] uppercase font-medium transition-colors hidden sm:flex items-center gap-2"
              >
                View Collection
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
