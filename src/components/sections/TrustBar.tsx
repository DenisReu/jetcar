const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: 'Free Delivery',
    desc: 'On orders over £150 / €150',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Official Merchandise',
    desc: '100% authentic Bugatti products',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
    ),
    title: 'Free Returns',
    desc: 'Hassle-free 30-day returns',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <path d="M1 10h22" />
      </svg>
    ),
    title: 'Secure Checkout',
    desc: '15+ payment methods accepted',
  },
];

export default function TrustBar() {
  return (
    <section className="relative bg-[#050506] py-12">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#1f1f1f] to-transparent" />
      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#1f1f1f] to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((f, i) => (
            <div key={f.title} className="flex items-start gap-4 group">
              <div className="text-[#c8a55a]/70 group-hover:text-[#c8a55a] shrink-0 mt-0.5 transition-colors duration-300">
                {f.icon}
              </div>
              <div>
                <p className="text-white text-[12px] font-medium tracking-[0.08em] mb-1 font-[Montserrat]">
                  {f.title}
                </p>
                <p className="text-[#4a4a4a] text-[11px] tracking-wide font-[Montserrat] font-light">
                  {f.desc}
                </p>
              </div>
              {/* Vertical separator (except last) */}
              {i < features.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-[#1f1f1f]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
