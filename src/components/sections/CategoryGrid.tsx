import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { label: 'TECH', href: '/collections/tech', image: '/images/products/product-a1.webp' },
  { label: 'ELECTRIC SCOOTERS', href: '/collections/electric-scooters', image: '/images/products/lego-chiron.webp' },
  { label: 'CLOTHING', href: '/collections/clothing', image: '/images/products/veyron-hoodie.webp' },
  { label: 'ACCESSORIES', href: '/collections/accessories', image: '/images/products/navy-tshirt.webp' },
];

export default function CategoryGrid() {
  return (
    <section
      style={{ background: '#000000', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Section heading */}
        <h2
          style={{
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            fontSize: 'clamp(2rem, 3vw, 3.5rem)',
            color: '#ffffff',
            marginBottom: '2.5rem',
          }}
        >
          CATEGORIES
        </h2>

        {/* Grid: 4 columns on lg+, 1 column on mobile with horizontal scroll */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 pb-2 lg:pb-0">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-auto flex flex-col"
              style={{ textDecoration: 'none' }}
            >
              {/* Square image container */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '1 / 1' }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 1024px) 80vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>

              {/* Text row below image */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                }}
              >
                <span
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                  }}
                >
                  {cat.label}
                </span>

                {/* Arrow icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
