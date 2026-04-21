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

  const discount = product.originalPrice
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
      <div
        className="relative overflow-hidden aspect-square mb-3"
        style={{ background: '#0a0a0a', borderRadius: 'clamp(0.625rem,1.053vw,1.25rem)' }}
      >
        <Image
          src={product.images[hovered && product.images[1] ? 1 : 0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover product-card-img"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span
              style={{
                background: '#ffffff',
                color: '#000000',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '2px 8px',
              }}
            >
              NEW
            </span>
          )}
          {discount && (
            <span
              style={{
                background: '#E11D48',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '2px 8px',
              }}
            >
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#a0a0a0',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '2px 8px',
              }}
            >
              SOLD OUT
            </span>
          )}
        </div>

        {/* Quick add overlay */}
        <div
          className={`absolute bottom-0 inset-x-0 transition-transform duration-300 ${
            hovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={{
              width: '100%',
              background: product.inStock ? '#004BFA' : 'rgba(255,255,255,0.1)',
              color: product.inStock ? '#ffffff' : '#a0a0a0',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.875rem',
              border: 'none',
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
          >
            {added ? '✓ ADDED' : product.inStock ? 'ADD TO CART' : 'SOLD OUT'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '0 2px' }}>
        <p
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          {product.vendor}
        </p>
        <h3
          style={{
            fontSize: '13px',
            color: '#ffffff',
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '6px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '14px', color: '#004BFA', fontWeight: 500 }}>
            {formatPrice(product.price, product.currency)}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>
              {formatPrice(product.originalPrice, product.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
