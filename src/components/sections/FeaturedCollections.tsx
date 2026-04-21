'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const tabs = ['NEW ITEMS', 'ARCHIVE SALE', 'BOLIDE', 'CHIRON', 'HERITAGE'] as const;
type Tab = (typeof tabs)[number];

const products = [
  {
    title: 'BUGATTI MACARON LOGO T-SHIRT',
    price: '£90.00',
    image: '/images/products/navy-blue-tshirt.jpg',
    href: '/products/bugatti-macaron-logo-t-shirt',
  },
  {
    title: 'BUGATTI CARBON FIBRE PEN',
    price: '£45.00',
    image: '/images/products/tshirt-0003.webp',
    href: '/products/bugatti-carbon-fibre-pen',
  },
  {
    title: 'BUGATTI EB WATER BOTTLE',
    price: '£45.00',
    image: '/images/products/navy-tshirt.webp',
    href: '/products/bugatti-eb-water-bottle',
  },
  {
    title: 'BUGATTI LANYARD PHONE STRAP',
    price: '£25.00',
    image: '/images/products/tshirt-0021.webp',
    href: '/products/bugatti-lanyard-phone-strap',
  },
  {
    title: 'BUGATTI MACARON LOGO CAP',
    price: '£65.00',
    image: '/images/products/light-blue-cap.webp',
    href: '/products/bugatti-macaron-logo-cap',
  },
  {
    title: 'EB CAP',
    price: '£65.00',
    image: '/images/products/navy-cap.webp',
    href: '/products/eb-cap',
  },
];

interface ProductItem {
  title: string;
  price: string;
  image: string;
  href: string;
}

function ProductCard({ product }: { product: ProductItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={product.href}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden aspect-square"
        style={{ backgroundColor: '#0a0a0a', borderRadius: '0.75rem' }}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-in-out"
          style={{ transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
        />

        {/* Quick view button — appears on hover, top-right */}
        <div
          className="absolute top-3 right-3 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(-6px)' }}
        >
          <span
            className="block px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-black bg-white"
            style={{ borderRadius: '9999px' }}
          >
            Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1 px-0.5">
        <p
          className="font-medium uppercase"
          style={{
            fontSize: '13px',
            color: '#ffffff',
            letterSpacing: '0.05em',
            lineHeight: '1.4',
          }}
        >
          {product.title}
        </p>
        <p
          style={{
            fontSize: '14px',
            color: '#004BFA',
            fontWeight: 400,
          }}
        >
          {product.price}
        </p>
      </div>
    </Link>
  );
}

export default function FeaturedCollections() {
  const [activeTab, setActiveTab] = useState<Tab>('NEW ITEMS');

  return (
    <section
      style={{
        backgroundColor: '#000000',
        paddingTop: '100px',
        paddingBottom: '100px',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: '1440px', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
      >
        {/* Section heading */}
        <h2
          className="uppercase"
          style={{
            fontWeight: 700,
            letterSpacing: '-0.03em',
            fontSize: 'clamp(2rem, 3vw, 3.5rem)',
            color: '#ffffff',
            marginBottom: '2.5rem',
          }}
        >
          SHOP COLLECTIONS
        </h2>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2" style={{ marginBottom: '2.5rem' }}>
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="uppercase"
                style={{
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#000000' : 'rgba(255,255,255,0.5)',
                  border: isActive ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '9999px',
                  paddingLeft: '1.25rem',
                  paddingRight: '1.25rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Product grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: '1rem' }}
        >
          {products.map((product) => (
            <ProductCard key={product.href} product={product} />
          ))}
        </div>

        {/* View All button */}
        <div className="flex justify-center" style={{ marginTop: '3.5rem' }}>
          <Link
            href="/products"
            className="uppercase inline-block transition-all duration-300"
            style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              border: '1.5px solid #ffffff',
              borderRadius: 0,
              padding: '0.875rem 2.5rem',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#ffffff';
              (e.currentTarget as HTMLAnchorElement).style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
            }}
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}
