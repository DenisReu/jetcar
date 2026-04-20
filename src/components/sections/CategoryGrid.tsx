import CategoryCard from '@/components/ui/CategoryCard';
import { Collection } from '@/types';

interface CategoryGridProps {
  collections: Collection[];
}

export default function CategoryGrid({ collections }: CategoryGridProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
      <div className="mb-12">
        <p className="text-[#c8a55a] text-[10px] tracking-[0.35em] uppercase mb-3 font-[Montserrat] font-medium">
          Explore
        </p>
        <h2 className="text-white text-3xl md:text-4xl lg:text-[40px] tracking-[-0.01em] font-light font-[Cormorant]">
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {collections.map((col) => (
          <CategoryCard key={col.id} collection={col} />
        ))}
      </div>
    </section>
  );
}
