'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { navItems } from '@/data/products';
import { NavItem } from '@/types';

export default function Header() {
  const { count } = useCart();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#2a2a2a]"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <BugattiLogo />
              <span className="text-white text-[13px] tracking-[0.25em] font-light uppercase hidden sm:block">
                Bugatti Store
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0">
              {navItems.map((item) => (
                <NavMenuItem
                  key={item.label}
                  item={item}
                  isActive={activeMenu === item.label}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="text-[#a0a0a0] hover:text-white transition-colors"
                aria-label="Search"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="text-[#a0a0a0] hover:text-white transition-colors hidden sm:block"
                aria-label="Account"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-[#a0a0a0] hover:text-white transition-colors"
                aria-label="Cart"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#c9a84c] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mega menu backdrop */}
        {activeMenu && (
          <div
            className="absolute inset-x-0 top-full bg-[#0f0f0f] border-b border-[#2a2a2a] shadow-2xl"
            onMouseEnter={() => {
              if (timerRef.current) clearTimeout(timerRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1440px] mx-auto px-10 py-8">
              {navItems
                .filter((item) => item.label === activeMenu && item.children)
                .map((item) => (
                  <div key={item.label}>
                    <p className="text-[11px] text-[#c9a84c] tracking-[0.2em] uppercase mb-4">
                      {item.label}
                    </p>
                    <div className="flex flex-wrap gap-x-10 gap-y-2">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-sm text-[#a0a0a0] hover:text-white transition-colors tracking-wide"
                        >
                          {child.label}
                        </Link>
                      ))}
                      <Link
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="text-sm text-[#c9a84c] hover:text-[#e2c97e] transition-colors tracking-wide font-medium"
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-32 px-4">
          <div className="w-full max-w-2xl">
            <div className="flex items-center border-b border-[#c9a84c] gap-4">
              <svg width="20" height="20" className="text-[#a0a0a0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white text-xl py-4 outline-none placeholder:text-[#555] tracking-wide"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#a0a0a0] hover:text-white transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-[#555] text-sm mt-4 tracking-wider">
              Press Enter to search
            </p>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] pt-[68px] overflow-y-auto lg:hidden">
          <nav className="px-6 py-8">
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

function NavMenuItem({
  item,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: {
  item: NavItem;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      <Link
        href={item.href}
        className={`text-[11px] tracking-[0.16em] uppercase font-medium px-3 py-2 transition-colors block ${
          isActive ? 'text-[#c9a84c]' : 'text-[#a0a0a0] hover:text-white'
        }`}
      >
        {item.label}
      </Link>
      {isActive && item.children && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a84c]" />
      )}
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
    <div className="border-b border-[#1a1a1a]">
      <div className="flex items-center justify-between py-4">
        <Link
          href={item.href}
          onClick={onClose}
          className="text-sm tracking-[0.15em] uppercase text-white font-medium"
        >
          {item.label}
        </Link>
        {item.children && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-[#a0a0a0] p-1"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
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
              className="text-sm text-[#a0a0a0] hover:text-white transition-colors tracking-wide"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function BugattiLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="4" fill="#c9a84c" />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fill="black"
        fontSize="13"
        fontWeight="700"
        fontFamily="Helvetica, Arial, sans-serif"
        letterSpacing="1"
      >
        EB
      </text>
    </svg>
  );
}
