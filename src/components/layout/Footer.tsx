import Link from 'next/link';
import NewsletterForm from '@/components/ui/NewsletterForm';

const footerLinks = {
  'Customer Service': [
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  'Company': [
    { label: 'About Bugatti', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Tax & Duty Info', href: '/tax' },
    { label: 'Scooter Warranty', href: '/warranty' },
  ],
  'Collections': [
    { label: 'Tech', href: '/collections/tech' },
    { label: 'Model Cars', href: '/collections/model-cars' },
    { label: 'Clothing', href: '/collections/clothing' },
    { label: 'Accessories', href: '/collections/accessories' },
    { label: 'Exclusive Lifestyle', href: '/collections/exclusive-lifestyle' },
    { label: 'Archive Sale', href: '/collections/archive-sale' },
  ],
};

const socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4l16 16M4 20L20 4" />
      </svg>
    ),
  },
];

const paymentMethods = ['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE PAY', 'KLARNA'];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1e1e1e] mt-24">
      {/* Newsletter */}
      <div className="border-b border-[#1e1e1e] py-14 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-white text-lg tracking-[0.15em] uppercase font-medium mb-1">
              Join the Bugatti Circle
            </h3>
            <p className="text-[#666] text-sm tracking-wide">
              Subscribe for exclusive offers and be first to know about new arrivals.{' '}
              <span className="text-[#c9a84c]">Get 10% off your first order.</span>
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-[#c9a84c] rounded flex items-center justify-center">
              <span className="text-black text-xs font-bold tracking-widest">EB</span>
            </div>
            <span className="text-white text-xs tracking-[0.25em] uppercase font-light">
              Bugatti Store
            </span>
          </div>
          <p className="text-[#555] text-xs leading-relaxed tracking-wide mb-6">
            Official Bugatti merchandise and lifestyle products.
            <br />Operated by Transparent Global Limited.
          </p>
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-[#555] hover:text-[#c9a84c] transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-white text-[11px] tracking-[0.2em] uppercase font-semibold mb-5">
              {title}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#666] hover:text-[#a0a0a0] text-sm transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a1a1a] px-6 lg:px-10 py-6 max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#444] text-xs tracking-widest">
          © 2026 BUGATTI INTERNATIONAL S.A. All rights reserved.
        </p>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="text-[10px] text-[#555] border border-[#2a2a2a] px-2 py-1 rounded tracking-wider"
            >
              {method}
            </span>
          ))}
        </div>
        <p className="text-[#444] text-xs">
          support@bugatti.store
        </p>
      </div>
    </footer>
  );
}
