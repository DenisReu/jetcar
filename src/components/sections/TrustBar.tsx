const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: 'Free Delivery',
    desc: 'On orders over £150 / €150',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Official Merchandise',
    desc: '100% authentic Bugatti products',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
    ),
    title: 'Free Returns',
    desc: 'Hassle-free 30-day returns',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
    <section className="bg-[#0d0d0d] border-y border-[#1a1a1a] py-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="text-[#c9a84c] shrink-0 mt-0.5">{f.icon}</div>
              <div>
                <p className="text-white text-sm font-medium tracking-wide mb-0.5">
                  {f.title}
                </p>
                <p className="text-[#555] text-xs tracking-wide">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
