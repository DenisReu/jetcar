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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4l16 16M4 20L20 4" />
      </svg>
    ),
  },
];

const paymentMethods = ['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE PAY', 'GOOGLE PAY', 'KLARNA', 'SHOP PAY'];

export default function Footer() {
  return (
    <footer className="bg-[#050506] border-t border-[#1f1f1f] mt-0 relative">
      {/* Top gold line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a55a]/20 to-transparent" />

      {/* Newsletter */}
      <div className="border-b border-[#1f1f1f]/60 py-16 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-white text-2xl md:text-3xl tracking-[0.04em] font-light mb-3 font-[Cormorant]">
              Join the Bugatti Circle
            </h3>
            <p className="text-[#6b6b6b] text-[12px] tracking-[0.06em] font-[Montserrat] font-light leading-relaxed">
              Subscribe for exclusive offers and be first to know about new arrivals.{' '}
              <span className="text-[#c8a55a]">Get 10% off your first order.</span>
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full border border-[#c8a55a]/30 flex items-center justify-center">
              <span className="text-[#c8a55a] text-[10px] font-bold tracking-[0.15em] font-[Montserrat]">EB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-[10px] tracking-[0.35em] uppercase font-light font-[Montserrat]">
                Bugatti
              </span>
              <span className="text-[#4a4a4a] text-[8px] tracking-[0.3em] uppercase font-[Montserrat]">
                Store
              </span>
            </div>
          </div>
          <p className="text-[#4a4a4a] text-[11px] leading-[1.8] tracking-wide mb-8 font-[Montserrat] font-light">
            Official Bugatti merchandise and lifestyle products.
            <br />Operated by Transparent Global Limited.
          </p>
          <div className="flex gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-[#4a4a4a] hover:text-[#c8a55a] transition-colors duration-300 cursor-pointer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-[#8a8a8a] text-[10px] tracking-[0.25em] uppercase font-medium mb-6 font-[Montserrat]">
              {title}
            </h4>
            <ul className="space-y-3.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#4a4a4a] hover:text-[#a8a8a8] text-[12px] transition-colors duration-200 tracking-wide font-[Montserrat] font-light"
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
      <div className="border-t border-[#1f1f1f]/40 px-6 lg:px-12 py-7 max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <p className="text-[#3a3a3a] text-[10px] tracking-[0.15em] font-[Montserrat] font-light">
          © 2026 BUGATTI INTERNATIONAL S.A. All rights reserved.
        </p>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="text-[9px] text-[#4a4a4a] border border-[#1f1f1f] px-2.5 py-1 rounded-sm tracking-[0.1em] font-[Montserrat]"
            >
              {method}
            </span>
          ))}
        </div>
        <p className="text-[#3a3a3a] text-[10px] tracking-wide font-[Montserrat] font-light">
          support@bugatti.store
        </p>
      </div>
    </footer>
  );
}
