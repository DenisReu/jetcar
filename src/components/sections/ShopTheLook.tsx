'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  href: string;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: 'hoodie',
    name: 'BUGATTI 20YR VEYRON - ETTORE EDITION HOODIE',
    price: '£140',
    image: '/images/products/veyron-hoodie.webp',
    href: '/products/bugatti-20yr-veyron-ettore-edition-hoodie',
  },
  {
    id: 'tshirt',
    name: 'BUGATTI 20YR VEYRON - ETTORE EDITION T-SHIRT',
    price: '£80',
    image: '/images/products/veyron-tshirt.webp',
    href: '/products/bugatti-20yr-veyron-ettore-edition-tshirt',
  },
];

interface Hotspot {
  id: string;
  left: string;
  top: string;
  productId: string;
}

const hotspots: Hotspot[] = [
  { id: 'h1', left: '47%', top: '40%', productId: 'hoodie' },
  { id: 'h2', left: '50%', top: '50%', productId: 'tshirt' },
];

export default function ShopTheLook() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const toggleHotspot = (id: string) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
  };

  return (
    <section
      style={{
        background: '#000000',
        paddingTop: '52px',
        paddingBottom: '100px',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Section heading */}
        <h2
          style={{
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            fontSize: 'clamp(2rem, 3vw, 3.5rem)',
            color: '#ffffff',
            marginBottom: '2.5rem',
          }}
        >
          SHOP THE LOOK
        </h2>

        {/*
          Two-column split on desktop:
            - Left (~65%): image with hotspots
            - Right (~35%): product list
          On mobile: stack — products above image
        */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Mobile: product list comes first */}
          <div className="lg:hidden flex flex-col gap-6">
            <ProductList products={featuredProducts} />
          </div>

          {/* Left column: large image with hotspots */}
          <div
            className="relative overflow-hidden flex-shrink-0"
            style={{ flex: '0 0 65%', aspectRatio: '4 / 5' }}
          >
            <Image
              src="/images/banners/20yr-hoodie-chiron.webp"
              alt="Shop the Look — person in blue hoodie in Bugatti"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />

            {/* Dark overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(23,23,23,0.4)',
              }}
            />

            {/* Hotspot buttons */}
            {hotspots.map((hs) => {
              const product = featuredProducts.find((p) => p.id === hs.productId);
              const isActive = activeHotspot === hs.id;

              return (
                <div
                  key={hs.id}
                  style={{
                    position: 'absolute',
                    left: hs.left,
                    top: hs.top,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                >
                  {/* Pulse ring */}
                  <span
                    style={{
                      position: 'absolute',
                      inset: '-6px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.5)',
                      animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                    }}
                  />

                  {/* Bullet */}
                  <button
                    onClick={() => toggleHotspot(hs.id)}
                    aria-label={`View product: ${product?.name ?? ''}`}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'block',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />

                  {/* Tooltip */}
                  {isActive && product && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#ffffff',
                        color: '#000000',
                        padding: '0.75rem',
                        borderRadius: '2px',
                        width: '160px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                        zIndex: 20,
                      }}
                    >
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          marginBottom: '4px',
                          lineHeight: 1.3,
                        }}
                      >
                        {product.name}
                      </p>
                      <p
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#333333',
                        }}
                      >
                        {product.price}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right column: product list — desktop only */}
          <div
            className="hidden lg:flex flex-col justify-center gap-6"
            style={{ flex: '0 0 35%' }}
          >
            <ProductList products={featuredProducts} />
          </div>
        </div>
      </div>

      {/* Keyframe for hotspot pulse ring */}
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

function ProductList({ products }: { products: FeaturedProduct[] }) {
  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1rem',
            borderBottom: '1px solid #1a1a1a',
            paddingBottom: '1.5rem',
          }}
        >
          {/* Product image */}
          <div
            style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              flexShrink: 0,
              overflow: 'hidden',
              background: '#111111',
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          {/* Product info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                lineHeight: 1.4,
                marginBottom: '0.5rem',
              }}
            >
              {product.name}
            </p>
            <p
              style={{
                color: '#a0a0a0',
                fontSize: '13px',
                marginBottom: '0.75rem',
              }}
            >
              {product.price}
            </p>
            <Link
              href={product.href}
              style={{
                display: 'inline-block',
                border: '1px solid #ffffff',
                color: '#ffffff',
                background: 'transparent',
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '6px 14px',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              ADD TO CART
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
