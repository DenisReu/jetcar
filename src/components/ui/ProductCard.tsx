'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice, calcDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const discount =
    product.originalPrice
      ? calcDiscount(product.originalPrice, product.price)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`product-card group block ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#111] aspect-square mb-4">
        <Image
          src={product.images[hovered && product.images[1] ? 1 : 0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover product-card-img"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-white text-black text-[10px] tracking-[0.15em] uppercase font-bold px-2 py-0.5">
              New
            </span>
          )}
          {discount && (
            <span className="bg-[#c9a84c] text-black text-[10px] tracking-[0.1em] uppercase font-bold px-2 py-0.5">
              Save {discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-[#222] text-[#666] text-[10px] tracking-[0.1em] uppercase px-2 py-0.5">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick add */}
        <div
          className={`absolute bottom-0 inset-x-0 transition-transform duration-300 ${
            hovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-[#c9a84c] hover:bg-[#e2c97e] disabled:bg-[#333] disabled:text-[#555] text-black text-[11px] tracking-[0.18em] uppercase font-bold py-3.5 transition-colors"
          >
            {added ? '✓ Added' : product.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1 px-0.5">
        <p className="text-[11px] text-[#666] tracking-[0.12em] uppercase">
          {product.vendor}
        </p>
        <h3 className="text-white text-sm leading-snug group-hover:text-[#c9a84c] transition-colors tracking-wide line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-white font-medium text-sm tracking-wide">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.originalPrice && (
            <span className="text-[#555] text-sm line-through tracking-wide">
              {formatPrice(product.originalPrice, product.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
