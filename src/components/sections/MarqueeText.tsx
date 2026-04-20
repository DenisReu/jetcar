const items = [
  'OFFICIAL BUGATTI MERCHANDISE',
  'FREE DELIVERY OVER £150',
  'EXCLUSIVE LIFESTYLE PRODUCTS',
  'BUGATTI CERTIFIED',
];

export default function MarqueeText() {
  // Duplicate the items array so the track can loop seamlessly
  const track = [...items, ...items];

  return (
    <div
      style={{
        backgroundColor: '#004BFA',
        height: '3.5rem',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="marquee-track" aria-hidden="false">
        {track.map((item, index) => (
          <span
            key={index}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.25rem',
              paddingRight: '1.25rem',
              color: '#ffffff',
              textTransform: 'uppercase',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
            <span aria-hidden="true" style={{ opacity: 0.7 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
