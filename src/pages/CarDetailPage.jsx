import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCars } from '../context/CarsContext';
import { ArrowLeft, Calendar, Fuel, BarChart, Thermometer as Speedometer, Car, ArrowRight } from 'lucide-react';

const CarDetailPage = () => {
  const { carId } = useParams();
  const { getCarById, getCarsByCategory } = useCars();
  const car = getCarById(carId || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // For demo purposes, we'll generate some fake additional images
  const additionalImages = [
    car?.imageUrl,
    'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  // Get related cars (cars in the same category)
  const relatedCars = car 
    ? getCarsByCategory(car.category).filter(c => c.id !== car.id).slice(0, 3) 
    : [];

  useEffect(() => {
    if (car) {
      document.title = `${car.name} - Project Cars`;
    }
    
    return () => {
      document.title = 'Project Cars';
    };
  }, [car]);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Car Not Found</h2>
          <p className="text-gray-400 mb-6">The car you're looking for doesn't exist.</p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % additionalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + additionalImages.length) % additionalImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      {/* Breadcrumb */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${car.category}`} className="hover:text-white transition-colors">
              {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{car.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-800 aspect-[4/3]">
              <img 
                src={additionalImages[currentImageIndex] || car.imageUrl} 
                alt={car.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {additionalImages.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                    } transition-colors`}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {additionalImages.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? 'border-red-500' : 'border-transparent'
                  } transition-colors`}
                >
                  <img 
                    src={img} 
                    alt={`${car.name} - view ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Car Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{car.name}</h1>
            
            <div className="flex items-center mb-6">
              <span className="inline-block bg-red-600 text-white text-sm px-3 py-1 rounded-full">
                {car.category.charAt(0).toUpperCase() + car.category.slice(1)} Car
              </span>
              <span className="text-2xl font-bold text-red-500 ml-auto">
                {car.price}
              </span>
            </div>
            
            <p className="text-gray-300 mb-8">{car.description}</p>
            
            {/* Specifications */}
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-800 p-3 rounded-full">
                  <Calendar className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Year</p>
                  <p className="font-semibold">{car.year}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-gray-800 p-3 rounded-full">
                  <Fuel className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Fuel Type</p>
                  <p className="font-semibold">{car.fuelType}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-gray-800 p-3 rounded-full">
                  <Speedometer className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mileage</p>
                  <p className="font-semibold">{car.mileage}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-gray-800 p-3 rounded-full">
                  <Car className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Transmission</p>
                  <p className="font-semibold">{car.transmission}</p>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Book a Test Drive
              </button>
              <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Cars */}
      {relatedCars.length > 0 && (
        <div className="container mx-auto px-6 mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedCars.map(relatedCar => (
              <Link 
                key={relatedCar.id} 
                to={`/car/${relatedCar.id}`}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="h-48">
                  <img 
                    src={relatedCar.imageUrl} 
                    alt={relatedCar.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{relatedCar.name}</h3>
                  <p className="text-red-500 font-semibold">{relatedCar.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage; 