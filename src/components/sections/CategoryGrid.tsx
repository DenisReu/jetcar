import CategoryCard from '@/components/ui/CategoryCard';
import { Collection } from '@/types';

interface CategoryGridProps {
  collections: Collection[];
}

export default function CategoryGrid({ collections }: CategoryGridProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
      <div className="mb-10">
        <p className="text-[#c9a84c] text-[11px] tracking-[0.3em] uppercase mb-2">
          Explore
        </p>
        <h2 className="text-white text-2xl md:text-3xl tracking-[0.08em] uppercase font-light">
          Shop by Category
        </h2>
      </div>

      {/* 5-column or responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {collections.map((col) => (
          <CategoryCard key={col.id} collection={col} />
        ))}
      </div>
    </section>
  );
}
