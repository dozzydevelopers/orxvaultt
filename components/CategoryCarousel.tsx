
import React from 'react';
import type { Category } from '../types';

interface CategoryCarouselProps {
  categories: Category[];
}

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
  <a href={`/category/${encodeURIComponent(category.name)}`} className="flex-shrink-0 flex flex-col items-center justify-center space-y-2 group">
    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[var(--background-secondary)] group-hover:scale-105 transition-transform">
      <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
    </div>
    <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">{category.name}</span>
  </a>
);

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories }) => {
  return (
    <div className="my-8">
      <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-2">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
