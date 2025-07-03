import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <div className="group h-64 w-full perspective">
      <div className="relative h-full w-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
            <img 
              src={category.imageUrl} 
              alt={category.name} 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-700 group-hover:opacity-70"></div>
            
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
              <p className="text-gray-300 mb-4">{category.description}</p>
              <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-md">
                Hover to Explore
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-grey-600 via-white-700 to-grey-800 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('\src\data\image.png')] opacity-10"></div>
          <div className="relative h-full w-full flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">{category.name}</h3>
            <p className="text-gray-100 mb-8">{category.description}</p>
            <Link 
              to={`/category/${category.id}`}
              className="inline-block bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-all duration-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard; 