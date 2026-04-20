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
    <div className="min-h-screen bg-[#020203]">
      {/* Page header */}
      <div className="relative border-b border-[#1f1f1f] bg-[#050506] py-16">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a55a]/10 to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <p className="text-[#c8a55a] text-[10px] tracking-[0.35em] uppercase mb-3 font-[Montserrat] font-medium">
            Bugatti Store
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.01em] font-[Cormorant]">
            All Products
          </h1>
          <p className="text-[#4a4a4a] text-[12px] tracking-[0.08em] mt-3 font-[Montserrat] font-light">
            {products.length} products
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        {/* Filters bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-12 pb-8 border-b border-[#1f1f1f]/60">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-[10px] tracking-[0.18em] uppercase px-5 py-2.5 transition-all duration-300 border cursor-pointer font-[Montserrat] font-medium ${
                  activeCategory === cat.value
                    ? 'border-[#c8a55a]/60 bg-[#c8a55a]/8 text-[#c8a55a]'
                    : 'border-[#1f1f1f] text-[#4a4a4a] hover:border-[#2a2a2a] hover:text-[#8a8a8a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#c8a55a]/50 text-white text-[12px] pl-9 pr-4 py-2.5 outline-none placeholder:text-[#3a3a3a] transition-colors duration-300 w-full md:w-48 font-[Montserrat] font-light tracking-wide"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4a4a]"
                width="13"
                height="13"
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
              className="bg-[#0a0a0a] border border-[#1f1f1f] text-[#8a8a8a] text-[10px] tracking-[0.12em] px-4 py-2.5 outline-none focus:border-[#c8a55a]/50 transition-colors duration-300 cursor-pointer uppercase font-[Montserrat]"
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
        <p className="text-[#4a4a4a] text-[10px] tracking-[0.2em] uppercase mb-8 font-[Montserrat]">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-7">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <svg
              width="44"
              height="44"
              className="text-[#1f1f1f] mb-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <h3 className="text-white text-xl font-light tracking-wide mb-2 font-[Cormorant]">
              No products found
            </h3>
            <p className="text-[#4a4a4a] text-[12px] tracking-wide mb-10 font-[Montserrat] font-light">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-[#c8a55a] hover:text-[#dfc07a] text-[10px] tracking-[0.25em] uppercase border border-[#c8a55a]/30 hover:border-[#c8a55a] px-9 py-3.5 transition-all duration-300 cursor-pointer font-[Montserrat] font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
