'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Tech', value: 'tech' },
  { label: 'Model Cars', value: 'model-cars' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Exclusive Lifestyle', value: 'exclusive-lifestyle' },
];

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

export default function AllProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
        break;
    }

    return list;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b border-[#1a1a1a] bg-[#0d0d0d] py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.3em] uppercase mb-2">
            Bugatti Store
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-light tracking-tight">
            All Products
          </h1>
          <p className="text-[#666] text-sm tracking-wide mt-3">
            {products.length} products
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        {/* Filters bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-10 pb-8 border-b border-[#1a1a1a]">
          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-[11px] tracking-[0.15em] uppercase px-4 py-2 transition-colors border ${
                  activeCategory === cat.value
                    ? 'border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]'
                    : 'border-[#2a2a2a] text-[#666] hover:border-[#444] hover:text-[#a0a0a0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right side: search + sort */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#111] border border-[#2a2a2a] focus:border-[#c9a84c] text-white text-sm pl-9 pr-4 py-2.5 outline-none placeholder:text-[#444] transition-colors w-full md:w-48 rounded-none"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#111] border border-[#2a2a2a] text-[#a0a0a0] text-[11px] tracking-wide px-4 py-2.5 outline-none focus:border-[#c9a84c] transition-colors cursor-pointer uppercase"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-[#555] text-xs tracking-[0.15em] uppercase mb-8">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <svg
              width="48"
              height="48"
              className="text-[#333] mb-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <h3 className="text-white text-lg tracking-wide mb-2">
              No products found
            </h3>
            <p className="text-[#555] text-sm tracking-wide mb-8">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-[#c9a84c] hover:text-[#e2c97e] text-[11px] tracking-[0.2em] uppercase border border-[#c9a84c]/30 hover:border-[#c9a84c] px-8 py-3 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
