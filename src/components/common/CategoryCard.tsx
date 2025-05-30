import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.id}`}
      className="group relative overflow-hidden rounded-lg shadow-lg"
    >
      <div className="relative h-64 w-full">
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/90 transition-colors duration-300"></div>
        
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
          <p className="text-gray-300 mb-4">{category.description}</p>
          <div className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
            Explore {category.name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;