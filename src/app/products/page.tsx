'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';

const categories = [
  { label: 'ALL', value: 'all' },
  { label: 'TECH', value: 'tech' },
  { label: 'MODEL CARS', value: 'model-cars' },
  { label: 'CLOTHING', value: 'clothing' },
  { label: 'ACCESSORIES', value: 'accessories' },
  { label: 'EXCLUSIVE LIFESTYLE', value: 'exclusive-lifestyle' },
];

const sortOptions = [
  { label: 'FEATURED', value: 'featured' },
  { label: 'PRICE: LOW–HIGH', value: 'price-asc' },
  { label: 'PRICE: HIGH–LOW', value: 'price-desc' },
  { label: 'NEWEST', value: 'newest' },
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
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'newest': list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew)); break;
    }
    return list;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <div style={{ minHeight: '100vh', background: '#000000' }}>
      {/* Page header */}
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
              marginBottom: '0.75rem',
            }}
          >
            ALL PRODUCTS
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', letterSpacing: '0.1em' }}>
            {products.length} products
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '2.5rem clamp(1.5rem,5vw,4rem)',
        }}
      >
        {/* Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            marginBottom: '3rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Category pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  style={{
                    background: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? '#000000' : 'rgba(255,255,255,0.5)',
                    border: isActive ? '1px solid #ffffff' : '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '9999px',
                    padding: '0.4rem 1rem',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search + sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  fontSize: '13px',
                  padding: '0.625rem 1rem 0.625rem 2.5rem',
                  outline: 'none',
                  width: '220px',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#004BFA')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <svg
                style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                padding: '0.625rem 1rem',
                outline: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} style={{ background: '#111' }}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <p
          style={{
            color: 'rgba(255,255,255,0.25)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '1rem' }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" style={{ marginBottom: '1.5rem' }}>
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              NO PRODUCTS FOUND
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginBottom: '2.5rem' }}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="btn-bugatti btn-bugatti-outline"
              style={{ borderRadius: 0 }}
            >
              CLEAR FILTERS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
