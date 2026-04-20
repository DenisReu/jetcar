'use client';

const messages = [
  'FREE DELIVERY ON ORDERS OVER £150',
  'OFFICIAL BUGATTI MERCHANDISE',
  'FREE DELIVERY ON ORDERS OVER €150',
  '10% OFF YOUR FIRST ORDER — SUBSCRIBE TO OUR NEWSLETTER',
  'FREE RETURNS WITHIN 30 DAYS',
  'SECURE CHECKOUT WITH 15+ PAYMENT OPTIONS',
];

export default function AnnouncementBar() {
  const repeated = [...messages, ...messages];

  return (
    <div className="relative bg-[#050506] border-b border-[#1f1f1f] overflow-hidden h-10 flex items-center">
      {/* Subtle gold ambient line at top */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a55a]/20 to-transparent" />

      <div className="marquee-track flex">
        {repeated.map((msg, i) => (
          <span
            key={i}
            className="text-[10px] tracking-[0.22em] text-[#8a8a8a] uppercase px-12 whitespace-nowrap font-[Montserrat] font-light"
          >
            {msg}
            <span className="ml-12 text-[#c8a55a]/60">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
