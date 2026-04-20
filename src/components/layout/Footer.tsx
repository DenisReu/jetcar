import Link from 'next/link';
import NewsletterForm from '@/components/ui/NewsletterForm';

const footerLinks: Record<string, { label: string; href: string }[]> = {
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
    <footer>
      {/* Newsletter strip */}
      <div
        style={{
          background: '#004BFA',
          padding: '3rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            color: '#ffffff',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            letterSpacing: '0.2em',
            fontWeight: 500,
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          JOIN THE BUGATTI CIRCLE
        </h3>
        <p
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
          }}
        >
          Subscribe for exclusive offers and be first to know about new arrivals.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NewsletterForm />
        </div>
      </div>

      {/* Main footer grid */}
      <div
        style={{
          background: '#1f1f1f',
          padding: '3.5rem 2.5rem',
        }}
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-10"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-text-white.svg"
              alt="Bugatti Store"
              style={{ maxHeight: '28px', maxWidth: '140px', filter: 'none', marginBottom: '1rem' }}
            />
            <p
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.75rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
              }}
            >
              Official Bugatti merchandise and lifestyle products. Operated by Transparent Global Limited.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="footer-social-icon"
                  style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link"
                      style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div
        style={{
          background: '#171717',
          padding: '1rem 2.5rem',
        }}
      >
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.05em' }}>
            © 2026 BUGATTI INTERNATIONAL S.A. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {paymentMethods.map((method) => (
              <span
                key={method}
                style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '2px',
                  letterSpacing: '0.05em',
                }}
              >
                {method}
              </span>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>
            support@bugatti.store
          </p>
        </div>
      </div>
    </footer>
  );
}
