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
    <div className="bg-black border-b border-[#2a2a2a] overflow-hidden h-9 flex items-center">
      <div className="marquee-track flex">
        {repeated.map((msg, i) => (
          <span
            key={i}
            className="text-[11px] tracking-[0.18em] text-[#a0a0a0] uppercase px-10 whitespace-nowrap"
          >
            {msg}
            <span className="ml-10 text-[#c9a84c]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
