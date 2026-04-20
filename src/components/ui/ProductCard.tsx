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
      <div className="relative overflow-hidden bg-[#0a0a0a] aspect-square mb-4">
        <Image
          src={product.images[hovered && product.images[1] ? 1 : 0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover product-card-img"
        />

        {/* Subtle dark overlay on hover */}
        <div className={`absolute inset-0 bg-[#020203]/10 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-white/95 text-[#020203] text-[9px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1 font-[Montserrat]">
              New
            </span>
          )}
          {discount && (
            <span className="bg-[#c8a55a] text-[#020203] text-[9px] tracking-[0.12em] uppercase font-semibold px-2.5 py-1 font-[Montserrat]">
              Save {discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-[#1f1f1f] text-[#6b6b6b] text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 font-[Montserrat]">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick add */}
        <div
          className={`absolute bottom-0 inset-x-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-[#c8a55a] hover:bg-[#dfc07a] disabled:bg-[#1f1f1f] disabled:text-[#4a4a4a] text-[#020203] text-[10px] tracking-[0.2em] uppercase font-semibold py-3.5 transition-colors duration-200 cursor-pointer font-[Montserrat]"
          >
            {added ? '✓ Added' : product.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>

        {/* Hover border glow */}
        <div className={`absolute inset-0 border transition-colors duration-500 pointer-events-none ${
          hovered ? 'border-[#c8a55a]/15' : 'border-transparent'
        }`} />
      </div>

      {/* Info */}
      <div className="space-y-1.5 px-0.5">
        <p className="text-[10px] text-[#4a4a4a] tracking-[0.15em] uppercase font-[Montserrat] font-light">
          {product.vendor}
        </p>
        <h3 className="text-[#e0e0e0] text-[13px] leading-snug group-hover:text-[#c8a55a] transition-colors duration-300 tracking-wide line-clamp-2 font-[Montserrat] font-light">
          {product.name}
        </h3>
        <div className="flex items-center gap-2.5 pt-1">
          <span className="text-white font-medium text-[13px] tracking-wide font-[Montserrat]">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.originalPrice && (
            <span className="text-[#4a4a4a] text-[12px] line-through tracking-wide font-[Montserrat] font-light">
              {formatPrice(product.originalPrice, product.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
