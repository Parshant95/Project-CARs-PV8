import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  // Format price to Indian currency format
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <div className="flex flex-col bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      <img
        src={car.image_url || 'https://placehold.co/600x400/e2e8f0/334155?text=Image+Not+Found'}
        alt={`${car.brand_name} ${car.model}`}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/600x400/e2e8f0/334155?text=Image+Not+Found';
        }}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white">
          {car.brand_name} {car.model}
        </h3>
        <p className="text-lg font-semibold text-blue-400 mt-1">
          ₹ {formatPrice(car.price)}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-600 text-sm text-gray-300 space-y-2 flex-grow">
          <p>
            <span className="font-semibold text-gray-400">Fuel:</span>{' '}
            {car.fuel_type || 'N/A'}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Transmission:</span>{' '}
            {car.transmission || 'N/A'}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Engine:</span>{' '}
            {car.engine || 'N/A'}
          </p>
        </div>
        <Link
          to={car.id ? `/car/${car.id}` : '#'}
          className="mt-4 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard; 