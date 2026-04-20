import { Product, Collection, NavItem } from '@/types';

export const products: Product[] = [
  // TECH
  {
    id: 'p1',
    slug: 'bugatti-wireless-headphones-pro',
    name: 'Bugatti Wireless Headphones PRO',
    vendor: 'Bugatti International',
    price: 349,
    originalPrice: 499,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
    ],
    category: 'tech',
    collection: 'headphones',
    tags: ['headphones', 'wireless', 'tech'],
    description:
      'Experience sound without limits. The Bugatti Wireless Headphones PRO combine cutting-edge audio technology with the iconic Bugatti design philosophy — where form meets function in perfect harmony.',
    isNew: true,
    isBestSeller: true,
    inStock: true,
    variants: [
      { id: 'v1', name: 'Color', value: 'Carbon Black', inStock: true },
      { id: 'v2', name: 'Color', value: 'Ivory White', inStock: true },
      { id: 'v3', name: 'Color', value: 'Midnight Blue', inStock: false },
    ],
  },
  {
    id: 'p2',
    slug: 'bugatti-zwart-ii-headphones',
    name: 'Bugatti Zwart II Headphones',
    vendor: 'Bugatti International',
    price: 249,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    ],
    category: 'tech',
    collection: 'headphones',
    tags: ['headphones', 'wireless', 'tech'],
    description:
      'The Zwart II is a testament to Bugatti\'s obsession with perfection. Premium audio performance wrapped in luxurious materials.',
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 'p3',
    slug: 'bugatti-supersport-electric-scooter',
    name: 'Bugatti Supersport Electric Scooter',
    vendor: 'Bugatti International',
    price: 1299,
    originalPrice: 1599,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    category: 'tech',
    collection: 'electric-scooters',
    tags: ['scooter', 'electric', 'tech'],
    description:
      'The Bugatti Supersport Electric Scooter redefines urban mobility with a top speed of 35 km/h and a range of up to 50km per charge.',
    isNew: true,
    inStock: true,
  },
  {
    id: 'p4',
    slug: 'bugatti-bytech-smart-watch',
    name: 'Bugatti BYTECH Smart Watch',
    vendor: 'Bugatti International',
    price: 179,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    ],
    category: 'tech',
    collection: 'wearables',
    tags: ['smartwatch', 'tech', 'wearable'],
    description:
      'Precision engineering for your wrist. The BYTECH Smart Watch tracks performance with the same obsessive attention to detail as a Bugatti hypercar.',
    inStock: true,
  },

  // MODEL CARS
  {
    id: 'p5',
    slug: 'bugatti-bolide-model-118',
    name: 'Bugatti Bolide 1:18 Scale Model',
    vendor: 'Bugatti International',
    price: 279,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80',
    ],
    category: 'model-cars',
    collection: 'bolide',
    tags: ['model', 'bolide', 'diecast'],
    description:
      'A meticulous 1:18 scale recreation of the Bugatti Bolide. Every curve, every vent, every detail faithfully reproduced in die-cast metal.',
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 'p6',
    slug: 'bugatti-chiron-model-143',
    name: 'Bugatti Chiron 1:43 Scale Model',
    vendor: 'Bugatti International',
    price: 89,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    ],
    category: 'model-cars',
    collection: 'chiron',
    tags: ['model', 'chiron', 'diecast'],
    description:
      'The iconic Bugatti Chiron in 1:43 scale. A collectible masterpiece that captures the essence of the world\'s most powerful production car.',
    inStock: true,
  },
  {
    id: 'p7',
    slug: 'lego-bugatti-chiron-technic',
    name: 'LEGO Technic Bugatti Chiron',
    vendor: 'LEGO x Bugatti',
    price: 329,
    originalPrice: 379,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
    ],
    category: 'model-cars',
    collection: 'lego',
    tags: ['lego', 'technic', 'chiron', 'model'],
    description:
      'The official LEGO Technic Bugatti Chiron. 3,599 pieces of pure engineering joy. Features working W16 engine, rear wing, and more.',
    isNew: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 'p8',
    slug: 'bugatti-mistral-model-118',
    name: 'Bugatti Mistral 1:18 Scale Model',
    vendor: 'Bugatti International',
    price: 319,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    ],
    category: 'model-cars',
    collection: 'mistral',
    tags: ['model', 'mistral', 'diecast'],
    description:
      'The stunning Bugatti Mistral roadster immortalised in 1:18 scale. A collector\'s edition that embodies open-air freedom.',
    inStock: true,
  },

  // CLOTHING
  {
    id: 'p9',
    slug: 'bugatti-logo-tshirt-black',
    name: 'Bugatti Logo T-Shirt — Black',
    vendor: 'Bugatti International',
    price: 79,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    ],
    category: 'clothing',
    collection: 'tshirts',
    tags: ['tshirt', 'clothing', 'apparel'],
    description:
      'Premium pima cotton T-shirt featuring the iconic Bugatti macaron logo. Crafted for those who value the finest things in life.',
    isBestSeller: true,
    inStock: true,
    variants: [
      { id: 'v1', name: 'Size', value: 'XS', inStock: true },
      { id: 'v2', name: 'Size', value: 'S', inStock: true },
      { id: 'v3', name: 'Size', value: 'M', inStock: true },
      { id: 'v4', name: 'Size', value: 'L', inStock: true },
      { id: 'v5', name: 'Size', value: 'XL', inStock: false },
    ],
  },
  {
    id: 'p10',
    slug: 'bugatti-heritage-hoodie',
    name: 'Bugatti Heritage Sweatshirt',
    vendor: 'Bugatti International',
    price: 149,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
    ],
    category: 'clothing',
    collection: 'sweatshirts',
    tags: ['hoodie', 'sweatshirt', 'clothing'],
    description:
      'Heavyweight French terry sweatshirt with embroidered Bugatti logo. A wardrobe essential for the discerning enthusiast.',
    inStock: true,
    variants: [
      { id: 'v1', name: 'Size', value: 'S', inStock: true },
      { id: 'v2', name: 'Size', value: 'M', inStock: true },
      { id: 'v3', name: 'Size', value: 'L', inStock: true },
      { id: 'v4', name: 'Size', value: 'XL', inStock: true },
    ],
  },
  {
    id: 'p11',
    slug: 'bugatti-racing-cap',
    name: 'Bugatti Racing Cap',
    vendor: 'Bugatti International',
    price: 59,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
    ],
    category: 'clothing',
    collection: 'hats',
    tags: ['cap', 'hat', 'clothing'],
    description:
      'Structured 6-panel cap with embroidered Bugatti EB logo. Adjustable strap for the perfect fit.',
    inStock: true,
  },
  {
    id: 'p12',
    slug: 'bugatti-performance-jacket',
    name: 'Bugatti Performance Jacket',
    vendor: 'Bugatti International',
    price: 349,
    originalPrice: 449,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
    category: 'clothing',
    collection: 'outerwear',
    tags: ['jacket', 'outerwear', 'clothing'],
    description:
      'Technical performance jacket with water-resistant finish. Inspired by Bugatti\'s racing heritage and engineered for everyday excellence.',
    isNew: true,
    inStock: true,
  },

  // ACCESSORIES
  {
    id: 'p13',
    slug: 'bugatti-carbon-champagne',
    name: 'Bugatti Carbon Champagne Set',
    vendor: 'Bugatti International',
    price: 249,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    category: 'accessories',
    collection: 'champagne',
    tags: ['champagne', 'accessories', 'lifestyle'],
    description:
      'Celebrate in Bugatti style. This exclusive carbon fibre champagne set includes two flutes and a bottle cooler, each crafted to perfection.',
    isNew: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 'p14',
    slug: 'bugatti-travel-luggage-set',
    name: 'Bugatti Travel Luggage Set',
    vendor: 'Bugatti International',
    price: 599,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    ],
    category: 'accessories',
    collection: 'travel',
    tags: ['luggage', 'travel', 'accessories'],
    description:
      'The Bugatti Travel Set comprises a cabin bag and check-in suitcase in premium carbon-effect hardshell. Travel in hyperspeed style.',
    inStock: true,
  },
  {
    id: 'p15',
    slug: 'bugatti-drinkware-set',
    name: 'Bugatti Drinkware Set — Carbon Edition',
    vendor: 'Bugatti International',
    price: 129,
    originalPrice: 159,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    ],
    category: 'accessories',
    collection: 'drinkware',
    tags: ['drinkware', 'accessories', 'lifestyle'],
    description:
      'A set of four premium drinkware pieces featuring carbon fibre detailing and the Bugatti macaron. The ultimate gift for automotive enthusiasts.',
    inStock: true,
  },

  // EXCLUSIVE LIFESTYLE
  {
    id: 'p16',
    slug: 'bugatti-eyewear-carbon',
    name: 'Bugatti Carbon Fibre Sunglasses',
    vendor: 'Bugatti International',
    price: 449,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    ],
    category: 'exclusive-lifestyle',
    collection: 'eyewear',
    tags: ['sunglasses', 'eyewear', 'luxury'],
    description:
      'Handcrafted carbon fibre frame with polarised sapphire glass lenses. Each pair is a feat of engineering and design.',
    isNew: true,
    inStock: true,
  },
  {
    id: 'p17',
    slug: 'bugatti-artwork-veyron-20',
    name: '20 Years of Veyron — Limited Artwork',
    vendor: 'Bugatti x Hedley Studios',
    price: 1200,
    currency: 'GBP',
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    ],
    category: 'exclusive-lifestyle',
    collection: 'artwork',
    tags: ['artwork', 'limited', 'veyron', 'exclusive'],
    description:
      'A limited edition commemoration of 20 years since the Bugatti Veyron changed the automotive world forever. Signed and numbered.',
    isNew: true,
    inStock: true,
  },
];

export const collections: Collection[] = [
  {
    id: 'c1',
    slug: 'tech',
    name: 'Tech',
    description: 'Headphones, scooters, wearables and more',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    productCount: 4,
  },
  {
    id: 'c2',
    slug: 'model-cars',
    name: 'Model Cars',
    description: 'Precision die-cast and LEGO collectibles',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80',
    productCount: 4,
  },
  {
    id: 'c3',
    slug: 'clothing',
    name: 'Clothing',
    description: 'Premium apparel for the Bugatti lifestyle',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    productCount: 4,
  },
  {
    id: 'c4',
    slug: 'accessories',
    name: 'Accessories',
    description: 'Champagne, travel, drinkware and more',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    productCount: 3,
  },
  {
    id: 'c5',
    slug: 'exclusive-lifestyle',
    name: 'Exclusive Lifestyle',
    description: 'Eyewear, artwork and rare collectibles',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    productCount: 2,
  },
];

export const navItems: NavItem[] = [
  { label: 'ALL PRODUCTS', href: '/products' },
  {
    label: 'TECH',
    href: '/collections/tech',
    children: [
      { label: 'Headphones', href: '/collections/headphones' },
      { label: 'Electric Scooters', href: '/collections/electric-scooters' },
      { label: 'Wearables', href: '/collections/wearables' },
    ],
  },
  {
    label: 'MODEL CARS',
    href: '/collections/model-cars',
    children: [
      { label: 'Bolide', href: '/collections/bolide' },
      { label: 'Divo', href: '/collections/divo' },
      { label: 'Chiron', href: '/collections/chiron' },
      { label: 'Mistral', href: '/collections/mistral' },
      { label: 'LEGO', href: '/collections/lego' },
    ],
  },
  {
    label: 'CLOTHING',
    href: '/collections/clothing',
    children: [
      { label: 'Hats', href: '/collections/hats' },
      { label: 'T-Shirts', href: '/collections/tshirts' },
      { label: 'Sweatshirts', href: '/collections/sweatshirts' },
      { label: 'Outerwear', href: '/collections/outerwear' },
      { label: 'Kids', href: '/collections/kids' },
    ],
  },
  {
    label: 'ACCESSORIES',
    href: '/collections/accessories',
    children: [
      { label: 'Champagne', href: '/collections/champagne' },
      { label: 'Travel', href: '/collections/travel' },
      { label: 'Drinkware', href: '/collections/drinkware' },
    ],
  },
  {
    label: 'EXCLUSIVE LIFESTYLE',
    href: '/collections/exclusive-lifestyle',
    children: [
      { label: 'Eyewear', href: '/collections/eyewear' },
      { label: 'Artwork', href: '/collections/artwork' },
    ],
  },
  { label: 'ARCHIVE SALE', href: '/collections/archive-sale' },
];

export function getProductsByCollection(slug: string): Product[] {
  return products.filter(
    (p) => p.collection === slug || p.category === slug
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}
