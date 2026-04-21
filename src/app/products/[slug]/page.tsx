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
    <div style={{ minHeight: '100vh', background: '#000000' }}>
      {/* Breadcrumb */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '1rem clamp(1.5rem,5vw,4rem)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>HOME</Link>
          <span>/</span>
          <Link href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>PRODUCTS</Link>
          <span>/</span>
          <Link href={`/collections/${product.category}`} style={{ color: 'inherit', textDecoration: 'none', textTransform: 'uppercase' }}>
            {product.category.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{product.name}</span>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: 'clamp(2rem,4vw,4rem) clamp(1.5rem,5vw,4rem)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(2rem,5vw,5rem)' }}>
          {/* Images */}
          <div>
            <div
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                background: '#0a0a0a',
              }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
              {/* Badges */}
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {product.isNew && (
                  <span style={{ background: '#ffffff', color: '#000000', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px' }}>
                    NEW
                  </span>
                )}
                {discount && (
                  <span style={{ background: '#E11D48', color: '#ffffff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px' }}>
                    SAVE {discount}%
                  </span>
                )}
              </div>
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginTop: '0.75rem' }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      position: 'relative',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                      background: '#0a0a0a',
                      border: selectedImage === i ? '2px solid #004BFA' : '2px solid transparent',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill sizes="25vw" style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ paddingTop: '0.5rem' }}>
            <p
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              {product.vendor}
            </p>
            <h1
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.5rem,3vw,2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ color: '#004BFA', fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice && (
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '1.25rem', textDecoration: 'line-through' }}>
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
              {discount && (
                <span style={{ background: '#E11D48', color: '#ffffff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px' }}>
                  -{discount}%
                </span>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  {product.variants[0].name}:{' '}
                  <span style={{ color: '#ffffff' }}>{selectedVariant}</span>
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.value)}
                      disabled={!v.inStock}
                      style={{
                        padding: '0.5rem 1.25rem',
                        fontSize: '12px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        border: selectedVariant === v.value
                          ? '1.5px solid #004BFA'
                          : '1.5px solid rgba(255,255,255,0.15)',
                        background: selectedVariant === v.value
                          ? 'rgba(0,75,250,0.1)'
                          : 'transparent',
                        color: v.inStock ? '#ffffff' : 'rgba(255,255,255,0.2)',
                        cursor: v.inStock ? 'pointer' : 'not-allowed',
                        textDecoration: v.inStock ? 'none' : 'line-through',
                        transition: 'all 0.2s',
                      }}
                    >
                      {v.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                QUANTITY
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid rgba(255,255,255,0.15)' }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ width: '2.75rem', height: '2.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /></svg>
                </button>
                <span style={{ width: '3rem', height: '2.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '14px', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ width: '2.75rem', height: '2.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn-bugatti"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  background: product.inStock ? '#004BFA' : 'rgba(255,255,255,0.06)',
                  color: product.inStock ? '#ffffff' : 'rgba(255,255,255,0.3)',
                  borderColor: product.inStock ? '#004BFA' : 'rgba(255,255,255,0.06)',
                  cursor: product.inStock ? 'pointer' : 'not-allowed',
                  borderRadius: 0,
                }}
              >
                {added ? '✓ ADDED TO CART' : product.inStock ? 'ADD TO CART' : 'SOLD OUT'}
              </button>
              <Link
                href="/cart"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 1.25rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
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
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem' }}>
              <h3 style={{ color: '#ffffff', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>
                PRODUCT DETAILS
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.7, letterSpacing: '0.02em' }}>
                {product.description}
              </p>
            </div>

            {/* Meta */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'CATEGORY', value: product.category.replace(/-/g, ' ').toUpperCase() },
                { label: 'VENDOR', value: product.vendor },
                {
                  label: 'AVAILABILITY',
                  value: product.inStock ? 'IN STOCK' : 'OUT OF STOCK',
                  accent: product.inStock,
                },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', minWidth: '6rem' }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '13px', color: item.accent ? '#004BFA' : 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Shipping note */}
            <div
              style={{
                marginTop: '2rem',
                padding: '1rem 1.25rem',
                background: 'rgba(0,75,250,0.06)',
                border: '1px solid rgba(0,75,250,0.2)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
              }}
            >
              <svg width="16" height="16" style={{ color: '#004BFA', flexShrink: 0, marginTop: '2px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
              </svg>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', lineHeight: 1.6 }}>
                Free delivery on orders over £150. Dispatched within 1–3 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: 'clamp(4rem,8vw,8rem)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1.5rem,3vw,2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                }}
              >
                YOU MAY ALSO LIKE
              </h2>
              <Link
                href={`/collections/${product.category}`}
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                className="hidden sm:flex"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                VIEW COLLECTION
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '1rem' }}>
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
