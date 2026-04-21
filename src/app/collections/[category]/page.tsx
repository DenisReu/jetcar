'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProductsByCollection, collections } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';

interface Props {
  params: Promise<{ category: string }>;
}

const categoryMeta: Record<string, { title: string; description: string; image: string }> = {
  tech: {
    title: 'TECH',
    description: 'Cutting-edge technology products inspired by Bugatti engineering.',
    image: '/images/products/product-a1.webp',
  },
  'model-cars': {
    title: 'MODEL CARS',
    description: 'Precision die-cast models and LEGO collectibles for the discerning enthusiast.',
    image: '/images/products/bolide-model.webp',
  },
  clothing: {
    title: 'CLOTHING',
    description: 'Premium apparel crafted for those who live the Bugatti lifestyle.',
    image: '/images/products/veyron-hoodie.webp',
  },
  accessories: {
    title: 'ACCESSORIES',
    description: 'Elevate every moment with Bugatti accessories.',
    image: '/images/products/duffle-bag.webp',
  },
  'exclusive-lifestyle': {
    title: 'EXCLUSIVE LIFESTYLE',
    description: 'Rare, limited-edition pieces for the most discerning collectors.',
    image: '/images/products/lego-chiron.webp',
  },
  'archive-sale': {
    title: 'ARCHIVE SALE',
    description: 'Selected archive pieces at exceptional prices. While stocks last.',
    image: '/images/products/tshirt-0021.webp',
  },
  headphones: {
    title: 'HEADPHONES',
    description: 'Premium audio engineered to Bugatti standards.',
    image: '/images/products/product-a1.webp',
  },
  'electric-scooters': {
    title: 'ELECTRIC SCOOTERS',
    description: 'Urban mobility redefined with Bugatti performance DNA.',
    image: '/images/products/lego-chiron.webp',
  },
  lego: {
    title: 'LEGO BUGATTI',
    description: 'The official LEGO Technic Bugatti collections.',
    image: '/images/products/lego-chiron.webp',
  },
  champagne: {
    title: 'CHAMPAGNE',
    description: 'Celebrate in Bugatti style with our exclusive champagne collection.',
    image: '/images/products/navy-tshirt.webp',
  },
  kids: {
    title: 'KIDS',
    description: 'Bugatti style for the next generation.',
    image: '/images/products/kids-jacket.webp',
  },
};

export default function CollectionPage({ params }: Props) {
  const { category } = use(params);
  const collectionProducts = getProductsByCollection(category);
  const meta = categoryMeta[category] ?? {
    title: category.replace(/-/g, ' ').toUpperCase(),
    description: 'Browse our curated selection.',
    image: '/images/products/veyron-hoodie.webp',
  };

  const otherCollections = collections.filter((c) => c.slug !== category).slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', background: '#000000' }}>
      {/* Hero banner */}
      <div style={{ position: 'relative', height: 'clamp(16rem,30vw,24rem)', overflow: 'hidden', background: '#0a0a0a' }}>
        <Image
          src={meta.image}
          alt={meta.title}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3))' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(1.5rem,4vw,3.5rem) clamp(1.5rem,5vw,4rem)',
          }}
        >
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>HOME</Link>
            <span>/</span>
            <Link href="/products" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>PRODUCTS</Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{meta.title}</span>
          </div>
          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2rem,5vw,4.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: '0.75rem',
            }}
          >
            {meta.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', maxWidth: '50ch' }}>
            {meta.description}
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
        {collectionProducts.length > 0 ? (
          <>
            <p
              style={{
                color: 'rgba(255,255,255,0.25)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '2rem',
              }}
            >
              {collectionProducts.length} product{collectionProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '1rem' }}>
              {collectionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8rem 1rem',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.5rem,3vw,2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              COMING SOON
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px', marginBottom: '2.5rem' }}>
              New products are being added to this collection.
            </p>
            <Link href="/products" className="btn-bugatti btn-bugatti-outline" style={{ borderRadius: 0 }}>
              VIEW ALL PRODUCTS
            </Link>
          </div>
        )}

        {/* Other collections */}
        {otherCollections.length > 0 && (
          <div
            style={{
              marginTop: '6rem',
              paddingTop: '4rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h2
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.5rem,3vw,2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                marginBottom: '2rem',
              }}
            >
              OTHER COLLECTIONS
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '1rem' }}>
              {otherCollections.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.slug}`}
                  className="group"
                  style={{
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden',
                    aspectRatio: '3 / 4',
                    background: '#0a0a0a',
                    textDecoration: 'none',
                  }}
                >
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="25vw"
                    style={{ objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.7,0,0.3,1)' }}
                    className="group-hover:scale-105"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem' }}>
                    <p
                      style={{
                        color: '#ffffff',
                        fontSize: '13px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        transition: 'color 0.2s',
                      }}
                    >
                      {col.name.toUpperCase()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
