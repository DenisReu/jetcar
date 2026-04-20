import HeroSlideshow from '@/components/sections/HeroSlideshow';
import MarqueeText from '@/components/sections/MarqueeText';
import FeaturedCollections from '@/components/sections/FeaturedCollections';
import ShopTheLook from '@/components/sections/ShopTheLook';
import BestSellers from '@/components/sections/BestSellers';
import CategoryGrid from '@/components/sections/CategoryGrid';

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />
      <MarqueeText />
      <FeaturedCollections />
      <ShopTheLook />
      <BestSellers />
      <MarqueeText />
      <CategoryGrid />
    </>
  );
}
