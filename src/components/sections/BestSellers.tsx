import Link from 'next/link';
import Image from 'next/image';

const products = [
  { title: 'BUGATTI 20YR VEYRON - ETTORE EDITION HOODIE', price: '£140.00', image: '/images/products/veyron-hoodie.webp', href: '/products/bugatti-20yr-veyron-ettore-edition-hoodie' },
  { title: 'BUGATTI 20YR VEYRON - ETTORE EDITION T-SHIRT', price: '£80.00', image: '/images/products/veyron-tshirt.webp', href: '/products/bugatti-20yr-veyron-ettore-edition' },
  { title: 'BUGATTI DUFFLE BAG', price: '£130.00', image: '/images/products/duffle-bag.webp', href: '/products/bugatti-duffle-bag' },
  { title: 'ABSTRACT GRAPHIC OVERSIZED SWEATSHIRT', price: '£140.00', image: '/images/products/black-sweatshirt.webp', href: '/products/abstract-graphic-sweatshirt' },
  { title: 'BUGATTI BOLIDE SCALE MODEL 1:18 YELLOW', price: '£84.00', image: '/images/products/bolide-model.webp', href: '/products/bugatti-bolide-scale-model' },
  { title: 'BUGATTI KIDS 3 PIECE BABY SET IN BLUE', price: '£120.00', image: '/images/products/kids-baby-set.webp', href: '/products/bugatti-kids-3-piece-baby-set' },
  { title: 'BUGATTI KIDS WINTER JACKET BLUE', price: '£112.00', image: '/images/products/kids-jacket.webp', href: '/products/bugatti-kids-winter-jacket' },
  { title: 'BUGATTI LEGO TECHNIC CHIRON PUR SPORT', price: '£160.00', image: '/images/products/lego-chiron.webp', href: '/products/lego-technic-bugatti-chiron-pur-sport' },
];

export default function BestSellers() {
  return (
    <section
      style={{ backgroundColor: '#000000', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div
        style={{ maxWidth: '1440px', margin: '0 auto', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
      >
        {/* Heading */}
        <h2
          style={{
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            fontSize: 'clamp(2rem, 3vw, 3.5rem)',
            color: '#ffffff',
            marginBottom: '3rem',
          }}
        >
          BEST SELLERS
        </h2>

        {/* Product Grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {products.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="product-card group block"
              style={{ borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: '#0a0a0a' }}
            >
              {/* Square image */}
              <div
                style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden' }}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover product-card-img"
                />
              </div>

              {/* Info */}
              <div style={{ padding: '0.75rem' }}>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    fontSize: '13px',
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                    marginBottom: '0.25rem',
                    lineHeight: '1.4',
                  }}
                >
                  {product.title}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#004BFA',
                    fontWeight: 400,
                  }}
                >
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link
            href="/collections/best-sellers"
            className="btn-bugatti btn-bugatti-outline"
          >
            VIEW ALL BEST SELLERS
          </Link>
        </div>
      </div>
    </section>
  );
}
