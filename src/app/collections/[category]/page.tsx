'use client';

import { use } from 'react';
import Link from 'next/link';
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
    <div className="min-h-screen bg-[#020203]">
      {/* Hero banner */}
      <div className="relative h-72 md:h-96 overflow-hidden bg-[#0a0a0a]">
        <Image
          src={meta.image}
          alt={meta.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 img-overlay-left" />
        <div className="absolute inset-0 img-overlay-bottom" />
        <div className="absolute inset-0 flex items-end p-8 lg:p-14">
          <div>
            <div className="flex items-center gap-2.5 text-[11px] text-[#6b6b6b] tracking-wide mb-5 font-[Montserrat] font-light">
              <Link href="/" className="hover:text-[#8a8a8a] transition-colors duration-200">Home</Link>
              <span className="text-[#2a2a2a]">/</span>
              <Link href="/products" className="hover:text-[#8a8a8a] transition-colors duration-200">Products</Link>
              <span className="text-[#2a2a2a]">/</span>
              <span className="text-[#a8a8a8] capitalize">{meta.title}</span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.01em] capitalize font-[Cormorant]">
              {meta.title}
            </h1>
            <p className="text-[#8a8a8a] text-[13px] tracking-wide mt-3 font-[Montserrat] font-light">
              {meta.description}
            </p>
          </div>
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#020203] to-transparent pointer-events-none" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-14">
        {collectionProducts.length > 0 ? (
          <>
            <p className="text-[#4a4a4a] text-[10px] tracking-[0.2em] uppercase mb-10 font-[Montserrat]">
              {collectionProducts.length} product{collectionProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-7">
              {collectionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <h3 className="text-white text-2xl font-light tracking-wide mb-3 font-[Cormorant]">
              Coming Soon
            </h3>
            <p className="text-[#4a4a4a] text-[12px] tracking-wide mb-10 font-[Montserrat] font-light">
              New products are being added to this collection.
            </p>
            <Link
              href="/products"
              className="text-[#c8a55a] hover:text-[#dfc07a] text-[10px] tracking-[0.25em] uppercase border border-[#c8a55a]/30 hover:border-[#c8a55a] px-9 py-3.5 transition-all duration-300 font-[Montserrat] font-medium"
            >
              View All Products
            </Link>
          </div>
        )}

        {/* Other collections */}
        {otherCollections.length > 0 && (
          <div className="mt-28">
            <div className="section-divider mb-16" />
            <h2 className="text-white text-3xl font-light tracking-[-0.01em] mb-12 font-[Cormorant]">
              Other Collections
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {otherCollections.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.slug}`}
                  className="group relative overflow-hidden aspect-[3/4] bg-[#0a0a0a]"
                >
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020203]/90 via-[#020203]/30 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <p className="text-white text-[14px] tracking-[0.08em] uppercase font-light group-hover:text-[#c8a55a] transition-colors duration-300 font-[Cormorant] text-lg">
                      {col.name}
                    </p>
                  </div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/[0.06] transition-colors duration-500" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
