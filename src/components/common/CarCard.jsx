import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CarCard = ({ car }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
      <div className="relative h-48">
        <img 
          src={car.imageUrl} 
          alt={car.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 rounded-br-lg">
          {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{car.name}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{car.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-gray-300 text-sm">
            <span className="text-gray-500">Year:</span> {car.year}
          </div>
          <div className="text-gray-300 text-sm">
            <span className="text-gray-500">Price:</span> {car.price}
          </div>
          <div className="text-gray-300 text-sm">
            <span className="text-gray-500">Fuel:</span> {car.fuelType}
          </div>
          <div className="text-gray-300 text-sm">
            <span className="text-gray-500">Trans:</span> {car.transmission}
          </div>
        </div>
        
        <Link
          to={`/car/${car.id}`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-md transition-all duration-300"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CarCard; 