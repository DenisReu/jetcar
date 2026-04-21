'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const recommended = products
    .filter((p) => !items.some((i) => i.product.id === p.id))
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#000000' }}>
        <div
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <h1
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.5rem,5vw,5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              YOUR CART
            </h1>
          </div>
        </div>

        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)',
            textAlign: 'center',
          }}
        >
          <svg
            width="64" height="64" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.12)" strokeWidth="1"
            style={{ margin: '0 auto 2rem' }}
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <h2
            style={{
              color: '#ffffff',
              fontSize: 'clamp(1.5rem,3vw,2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            YOUR CART IS EMPTY
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px', marginBottom: '3rem' }}>
            Discover our exclusive collections and add something special.
          </p>
          <Link href="/products" className="btn-bugatti btn-bugatti-white" style={{ borderRadius: 0 }}>
            CONTINUE SHOPPING
          </Link>

          {recommended.length > 0 && (
            <div style={{ marginTop: '6rem', textAlign: 'left' }}>
              <h3
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1.5rem,3vw,2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '2rem',
                }}
              >
                YOU MIGHT LIKE
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '1rem' }}>
                {recommended.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const shipping = total >= 150 ? 0 : 9.99;
  const orderTotal = total + shipping;

  return (
    <div style={{ minHeight: '100vh', background: '#000000' }}>
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.5rem,5vw,5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}
          >
            YOUR CART
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', letterSpacing: '0.1em' }}>
            {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '3rem clamp(1.5rem,5vw,4rem)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '3rem' }}>
          {/* Cart items */}
          <div className="lg:col-span-2">
            {/* Header row */}
            <div
              className="hidden md:grid"
              style={{
                gridTemplateColumns: '1fr auto auto auto',
                gap: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              <span>PRODUCT</span>
              <span style={{ width: '6rem', textAlign: 'center' }}>PRICE</span>
              <span style={{ width: '7rem', textAlign: 'center' }}>QTY</span>
              <span style={{ width: '5rem', textAlign: 'right' }}>TOTAL</span>
            </div>

            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '1rem',
                  padding: '2rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  alignItems: 'center',
                }}
                className="md:grid"
              >
                <div
                  className="md:grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto auto',
                    gap: '1.5rem',
                    alignItems: 'center',
                  }}
                >
                  {/* Product */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <Link
                      href={`/products/${item.product.slug}`}
                      style={{
                        position: 'relative',
                        width: '5rem',
                        height: '5rem',
                        flexShrink: 0,
                        overflow: 'hidden',
                        background: '#0a0a0a',
                        display: 'block',
                      }}
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        style={{ objectFit: 'cover' }}
                      />
                    </Link>
                    <div>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {item.product.vendor}
                      </p>
                      <Link
                        href={`/products/${item.product.slug}`}
                        style={{ color: '#ffffff', fontSize: '13px', letterSpacing: '0.04em', fontWeight: 500, textTransform: 'uppercase', textDecoration: 'none', display: 'block', marginBottom: '4px' }}
                      >
                        {item.product.name}
                      </Link>
                      {item.variant && (
                        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>
                          {item.variant}
                        </p>
                      )}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'rgba(255,255,255,0.3)',
                          fontSize: '11px',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          padding: 0,
                          marginTop: '6px',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ width: '6rem', textAlign: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                      {formatPrice(item.product.price, item.product.currency)}
                    </span>
                  </div>

                  {/* Qty */}
                  <div style={{ width: '7rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{ width: '2.25rem', height: '2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /></svg>
                      </button>
                      <span style={{ width: '2.5rem', height: '2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '14px', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{ width: '2.25rem', height: '2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div style={{ width: '5rem', textAlign: 'right' }}>
                    <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500 }}>
                      {formatPrice(item.product.price * item.quantity, item.product.currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link
                href="/products"
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                CONTINUE SHOPPING
              </Link>
              <button
                onClick={clearCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
              >
                CLEAR CART
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '2rem',
                position: 'sticky',
                top: 'calc(3rem + 4rem + 1rem)',
              }}
            >
              <h2
                style={{
                  color: '#ffffff',
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '2rem',
                }}
              >
                ORDER SUMMARY
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Subtotal</span>
                  <span style={{ color: '#ffffff', fontSize: '14px' }}>{formatPrice(total)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#004BFA' : '#ffffff', fontSize: '14px' }}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {total < 150 && (
                  <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>
                    Add {formatPrice(150 - total)} more for free shipping
                  </p>
                )}
              </div>

              {/* Promo */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex' }}>
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRight: 'none',
                      color: '#ffffff',
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      padding: '0.75rem 1rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#004BFA')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                  <button
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  >
                    APPLY
                  </button>
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#ffffff', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>TOTAL</span>
                  <span style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {formatPrice(orderTotal)}
                  </span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', marginTop: '4px', textAlign: 'right' }}>
                  Including taxes
                </p>
              </div>

              <button
                className="btn-bugatti btn-bugatti-white"
                style={{ width: '100%', borderRadius: 0, justifyContent: 'center' }}
              >
                PROCEED TO CHECKOUT
              </button>

              {/* Payment icons */}
              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE PAY'].map((m) => (
                  <span
                    key={m}
                    style={{
                      fontSize: '9px',
                      color: 'rgba(255,255,255,0.3)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '3px 6px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
