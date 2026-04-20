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
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-[#050506]/98 backdrop-blur-xl border-[#1f1f1f] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-[#050506]/90 backdrop-blur-sm border-[#1f1f1f]/50'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-[#a8a8a8] hover:text-white p-2 transition-colors cursor-pointer"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-[#c8a55a]/40 flex items-center justify-center group-hover:border-[#c8a55a] transition-colors duration-300">
                  <span className="text-[#c8a55a] text-[11px] font-bold tracking-[0.15em] font-[Montserrat]">
                    EB
                  </span>
                </div>
                <div className="absolute inset-0 rounded-full bg-[#c8a55a]/5 group-hover:bg-[#c8a55a]/10 transition-colors duration-300" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-white text-[11px] tracking-[0.35em] font-light uppercase font-[Montserrat]">
                  Bugatti
                </span>
                <span className="text-[#6b6b6b] text-[9px] tracking-[0.3em] uppercase font-[Montserrat]">
                  Store
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
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
            <div className="flex items-center gap-5">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="text-[#6b6b6b] hover:text-[#c8a55a] transition-colors duration-300 cursor-pointer"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              <Link
                href="/account"
                className="text-[#6b6b6b] hover:text-[#c8a55a] transition-colors duration-300 hidden sm:block"
                aria-label="Account"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>

              <Link
                href="/cart"
                className="relative text-[#6b6b6b] hover:text-[#c8a55a] transition-colors duration-300"
                aria-label="Cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#c8a55a] text-[#020203] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-[Montserrat]">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        {activeMenu && (
          <div
            className="absolute inset-x-0 top-full bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-[#1f1f1f] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            onMouseEnter={() => {
              if (timerRef.current) clearTimeout(timerRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1440px] mx-auto px-12 py-10">
              {navItems
                .filter((item) => item.label === activeMenu && item.children)
                .map((item) => (
                  <div key={item.label} className="fade-in">
                    <p className="text-[10px] text-[#c8a55a] tracking-[0.3em] uppercase mb-5 font-[Montserrat] font-medium">
                      {item.label}
                    </p>
                    <div className="flex flex-wrap gap-x-12 gap-y-3">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveMenu(null)}
                          className="text-[13px] text-[#8a8a8a] hover:text-white transition-colors duration-200 tracking-wide font-[Montserrat] font-light"
                        >
                          {child.label}
                        </Link>
                      ))}
                      <Link
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="text-[13px] text-[#c8a55a] hover:text-[#dfc07a] transition-colors duration-200 tracking-wide font-[Montserrat] font-medium"
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
        <div className="fixed inset-0 z-[60] bg-[#020203]/90 backdrop-blur-xl flex items-start justify-center pt-40 px-4">
          <div className="w-full max-w-2xl fade-in-up">
            <p className="text-[10px] text-[#c8a55a] tracking-[0.3em] uppercase mb-6 font-[Montserrat]">
              Search
            </p>
            <div className="flex items-center border-b border-[#2a2a2a] focus-within:border-[#c8a55a] transition-colors gap-4">
              <svg width="18" height="18" className="text-[#6b6b6b] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white text-2xl py-5 outline-none placeholder:text-[#3a3a3a] tracking-wide font-[Cormorant] font-light"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#6b6b6b] hover:text-white transition-colors cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-[#4a4a4a] text-[11px] mt-5 tracking-[0.15em] font-[Montserrat] font-light">
              Press Enter to search · Esc to close
            </p>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] bg-[#020203] pt-[72px] overflow-y-auto lg:hidden">
          <nav className="px-6 py-10">
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
        className={`text-[10px] tracking-[0.2em] uppercase font-medium px-4 py-2.5 transition-colors duration-300 block font-[Montserrat] ${
          isActive ? 'text-[#c8a55a]' : 'text-[#8a8a8a] hover:text-white'
        }`}
      >
        {item.label}
      </Link>
      {isActive && item.children && (
        <div className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-[#c8a55a] to-[#c8a55a]/40" />
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
    <div className="border-b border-[#1f1f1f]/60">
      <div className="flex items-center justify-between py-5">
        <Link
          href={item.href}
          onClick={onClose}
          className="text-[12px] tracking-[0.2em] uppercase text-white font-medium font-[Montserrat]"
        >
          {item.label}
        </Link>
        {item.children && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-[#6b6b6b] p-2 cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
      {open && item.children && (
        <div className="pb-5 pl-5 flex flex-col gap-4">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="text-[12px] text-[#8a8a8a] hover:text-[#c8a55a] transition-colors tracking-wide font-[Montserrat] font-light"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
