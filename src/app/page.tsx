import HeroBanner from '@/components/sections/HeroBanner';
import TrustBar from '@/components/sections/TrustBar';
import FeaturedBanners from '@/components/sections/FeaturedBanners';
import ProductGrid from '@/components/sections/ProductGrid';
import CategoryGrid from '@/components/sections/CategoryGrid';
import ShopTheLook from '@/components/sections/ShopTheLook';
import { getBestSellers, getNewArrivals, collections } from '@/data/products';

export default function HomePage() {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <>
      <HeroBanner />
      <TrustBar />
      <FeaturedBanners />
      <ProductGrid
        title="Best Sellers"
        subtitle="Our most-loved products"
        products={bestSellers}
        viewAllHref="/products"
        columns={4}
      />
      <CategoryGrid collections={collections} />
      <ShopTheLook />
      <ProductGrid
        title="New Arrivals"
        subtitle="Just landed"
        products={newArrivals}
        viewAllHref="/products"
        columns={4}
      />
    </>
  );
}
