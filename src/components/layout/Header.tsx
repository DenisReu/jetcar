'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    label: 'ALL PRODUCTS',
    href: '/collections/all',
  },
  {
    label: 'TECH',
    href: '/collections/tech',
    children: [
      { label: 'HEADPHONES', href: '/collections/headphones' },
      { label: 'ELECTRIC SCOOTERS', href: '/collections/electric-scooters' },
    ],
  },
  {
    label: 'MODEL CARS',
    href: '/collections/model-cars',
    children: [
      { label: 'BOLIDE', href: '/collections/bolide' },
      { label: 'DIVO', href: '/collections/divo' },
      { label: 'CHIRON', href: '/collections/chiron' },
      { label: 'MISTRAL', href: '/collections/mistral' },
      { label: 'LEGO', href: '/collections/lego' },
    ],
  },
  {
    label: 'CLOTHING',
    href: '/collections/clothing',
    children: [
      { label: 'HATS', href: '/collections/hats' },
      { label: 'T-SHIRTS & POLOS', href: '/collections/t-shirts' },
      { label: 'SWEATSHIRTS & HOODIES', href: '/collections/sweatshirts-hoodies' },
      { label: 'OUTERWEAR', href: '/collections/outerwear' },
      { label: 'KIDS', href: '/collections/kids' },
      { label: 'BABY', href: '/collections/baby' },
    ],
  },
];

export default function Header() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: '3rem',
    zIndex: 50,
    backgroundColor: '#ffffff',
    borderBottom: scrolled ? '1px solid rgba(23,23,23,0.08)' : '1px solid transparent',
    boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
  };

  return (
    <>
      <header style={headerStyle}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div
            style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
            className="flex items-center justify-between"
          >
            {/* Left: search + hamburger (hamburger mobile only) */}
            <div className="flex items-center gap-3">
              {/* Search icon — always visible */}
              <button
                className="text-[#171717] hover:opacity-60 transition-opacity"
                aria-label="Search"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              {/* Hamburger — mobile only */}
              <button
                className="lg:hidden text-[#171717] hover:opacity-60 transition-opacity"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M3 6H21" />
                  <path d="M3 12H11" />
                  <path d="M3 18H16" />
                </svg>
              </button>
            </div>

            {/* Center: Logo + Desktop Nav */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/" className="flex items-center" aria-label="Bugatti Store home">
                <img
                  src="/images/logo-text-white.svg"
                  alt="Bugatti"
                  style={{
                    filter: 'invert(1)',
                    maxHeight: '21px',
                  }}
                  className="lg:hidden"
                />
                <img
                  src="/images/logo-text-white.svg"
                  alt="Bugatti"
                  style={{
                    filter: 'invert(1)',
                    maxHeight: '41px',
                  }}
                  className="hidden lg:block"
                />
              </Link>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                {navItems.map((item) => (
                  <DesktopNavItem
                    key={item.label}
                    item={item}
                    isActive={activeMenu === item.label}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    onClose={() => setActiveMenu(null)}
                  />
                ))}
              </nav>
            </div>

            {/* Right: Cart */}
            <div className="flex items-center">
              <Link
                href="/cart"
                className="relative text-[#171717] hover:opacity-60 transition-opacity"
                aria-label={`Cart${count > 0 ? `, ${count} items` : ''}`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {count > 0 && (
                  <span
                    className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white"
                    style={{
                      backgroundColor: '#171717',
                      fontSize: '10px',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      lineHeight: 1,
                    }}
                  >
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Dropdown mega menu */}
        {activeMenu && (
          <div
            style={{
              borderTop: '1px solid rgba(23,23,23,0.08)',
              backgroundColor: '#ffffff',
            }}
            onMouseEnter={() => {
              if (timerRef.current) clearTimeout(timerRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1440px] mx-auto px-10 py-6">
              {navItems
                .filter((item) => item.label === activeMenu && item.children)
                .map((item) => (
                  <div key={item.label} className="flex flex-wrap gap-x-8 gap-y-2">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setActiveMenu(null)}
                        style={{
                          color: '#171717',
                          fontSize: '13px',
                          fontWeight: 500,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                        }}
                        className="hover:opacity-60 transition-opacity"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-white overflow-y-auto lg:hidden"
          style={{ top: 'calc(3rem + 72px)' }}
        >
          <nav className="px-6 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                onClose={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function DesktopNavItem({
  item,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: {
  item: NavItem;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      <Link
        href={item.href}
        onClick={onClose}
        style={{
          color: '#171717',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          padding: '0.5rem 0.75rem',
          display: 'block',
          opacity: isActive ? 0.6 : 1,
          transition: 'opacity 0.15s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {item.label}
      </Link>
    </div>
  );
}

function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ borderBottom: '1px solid rgba(23,23,23,0.08)' }}
    >
      <div className="flex items-center justify-between py-4">
        <Link
          href={item.href}
          onClick={onClose}
          style={{
            color: '#171717',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {item.label}
        </Link>
        {item.children && (
          <button
            onClick={() => setOpen((v) => !v)}
            style={{ color: '#171717' }}
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
      {open && item.children && (
        <div className="pb-4 pl-4 flex flex-col gap-3">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              style={{
                color: '#171717',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
              className="hover:opacity-100 transition-opacity"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
