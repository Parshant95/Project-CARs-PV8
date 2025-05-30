import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCars } from '../context/CarsContext';
import CarCard from '../components/common/CarCard';
import { ArrowLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { getCarsByCategory, categories } = useCars();
  const [isLoading, setIsLoading] = useState(true);
  
  const category = categories.find(c => c.id === categoryId);
  const cars = getCarsByCategory(categoryId || '');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [categoryId]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Category Not Found</h2>
          <p className="text-gray-400 mb-6">The category you're looking for doesn't exist.</p>
          <a 
            href="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <div className="absolute inset-0">
          <img 
            src={category.imageUrl} 
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl max-w-2xl">{category.description}</p>
        </div>
      </section>

      {/* Cars Listing */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">
            Explore Our {category.name}
          </h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No cars found</h3>
              <p className="text-gray-400 mb-8">
                There are no cars in this category yet. Add some cars from the admin interface.
              </p>
              <a 
                href="/admin"
                className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md text-white transition-colors"
              >
                Add New Car
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;