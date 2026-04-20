'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductsByCollection, collections } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import Image from 'next/image';

interface Props {
  params: Promise<{ category: string }>;
}

const categoryMeta: Record<string, { title: string; description: string; image: string }> = {
  tech: {
    title: 'Tech',
    description: 'Cutting-edge technology products inspired by Bugatti engineering.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80',
  },
  'model-cars': {
    title: 'Model Cars',
    description: 'Precision die-cast models and LEGO collectibles for the discerning enthusiast.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&q=80',
  },
  clothing: {
    title: 'Clothing',
    description: 'Premium apparel crafted for those who live the Bugatti lifestyle.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600&q=80',
  },
  accessories: {
    title: 'Accessories',
    description: 'Elevate every moment with Bugatti accessories.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
  },
  'exclusive-lifestyle': {
    title: 'Exclusive Lifestyle',
    description: 'Rare, limited-edition pieces for the most discerning collectors.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&q=80',
  },
  'archive-sale': {
    title: 'Archive Sale',
    description: 'Selected archive pieces at exceptional prices. While stocks last.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80',
  },
  headphones: {
    title: 'Headphones',
    description: 'Premium audio engineered to Bugatti standards.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80',
  },
  'electric-scooters': {
    title: 'Electric Scooters',
    description: 'Urban mobility redefined with Bugatti performance DNA.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
  },
  lego: {
    title: 'LEGO Bugatti',
    description: 'The official LEGO Technic Bugatti collections.',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1600&q=80',
  },
  champagne: {
    title: 'Champagne',
    description: 'Celebrate in Bugatti style with our exclusive champagne collection.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&q=80',
  },
};

export default function CollectionPage({ params }: Props) {
  const { category } = use(params);
  const collectionProducts = getProductsByCollection(category);
  const meta = categoryMeta[category] ?? {
    title: category.replace(/-/g, ' '),
    description: 'Browse our curated selection.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80',
  };

  const otherCollections = collections.filter((c) => c.slug !== category).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-[#111]">
        <Image
          src={meta.image}
          alt={meta.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-end p-10">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#666] tracking-wide mb-4">
              <Link href="/" className="hover:text-[#a0a0a0] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-[#a0a0a0] transition-colors">Products</Link>
              <span>/</span>
              <span className="text-[#a0a0a0] capitalize">{meta.title}</span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-tight capitalize">
              {meta.title}
            </h1>
            <p className="text-[#a0a0a0] text-sm tracking-wide mt-2">
              {meta.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        {collectionProducts.length > 0 ? (
          <>
            <p className="text-[#555] text-xs tracking-[0.15em] uppercase mb-8">
              {collectionProducts.length} product{collectionProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {collectionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <h3 className="text-white text-lg tracking-wide mb-2">
              Coming Soon
            </h3>
            <p className="text-[#555] text-sm tracking-wide mb-8">
              New products are being added to this collection.
            </p>
            <Link
              href="/products"
              className="text-[#c9a84c] hover:text-[#e2c97e] text-[11px] tracking-[0.2em] uppercase border border-[#c9a84c]/30 hover:border-[#c9a84c] px-8 py-3 transition-all"
            >
              View All Products
            </Link>
          </div>
        )}

        {/* Other collections */}
        {otherCollections.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#1a1a1a]">
            <h2 className="text-white text-2xl tracking-[0.08em] uppercase font-light mb-10">
              Other Collections
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {otherCollections.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.slug}`}
                  className="group relative overflow-hidden aspect-[3/4] bg-[#111]"
                >
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <p className="text-white text-sm tracking-[0.1em] uppercase font-medium group-hover:text-[#c9a84c] transition-colors">
                      {col.name}
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
