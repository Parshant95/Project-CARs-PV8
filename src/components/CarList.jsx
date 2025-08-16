import React, { useState, useEffect } from 'react';

// The API data is now placed directly inside the component file.
const carData =  [
    {
      "brand_name": "Maruti Suzuki",
      "model": "Fronx",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 751000,
      "transmission": "Manual - 5 Gears",
      "engine": "1197 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://img.autocarindia.com/ExtraImages/20240919043009_Maruti_Fronx_action_white.jpg?w=700&c=1",
      "id": 1
    },
    {
        "brand_name": "Tata",
        "model": "Nexon",
        "year": "2024",
        "fuel_type": "Petrol",
        "price": 800000,
        "transmission": "Manual - 5 Gears, Sport Mode",
        "engine": "1199 cc, 3 Cylinders Inline, 2 Valves/Cylinder, SOHC",
        "image_url": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Nexon/9675/1751559838445/front-left-side-47.jpg?imwidth=420&impolicy=resize",
        "id": 21
      },
      {
        "brand_name": "Kia",
        "model": "New EV9",
        "year": "2024",
        "fuel_type": "Electric",
        "price": 9000000,
        "transmission": "Automatic",
        "engine": "",
        "image_url": "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/144485/ev9-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80&q=80",
        "id": 34
      },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Brezza",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 834000,
      "transmission": "Manual - 5 Gears",
      "engine": "1462 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://www.kvrmaruti.com/storage/upload/blogs/feature_image/unnamed.jpg",
      "id": 3
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Swift",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 649000,
      "transmission": "Manual - 5 Gears",
      "engine": "1197 cc, 3 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://www.shutterstock.com/image-photo/novosibirsk-russia-april-23-2024-260nw-2454281231.jpg",
      "id": 4
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Baleno",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 666000,
      "transmission": "Manual - 5 Gears",
      "engine": "1197 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://auto.hindustantimes.com/cms-images/marutisuzuki_baleno/images/exterior_marutisuzuki-baleno-facelift_front-right-view_1150x648.jpeg",
      "id": 5
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Alto K10",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 399000,
      "transmission": "Manual - 5 Gears",
      "engine": "998 cc, 3 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Alto-800/10327/1687348176706/front-left-side-47.jpg?impolicy=resize&imwidth=420",
      "id": 6
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Ertiga",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 869000,
      "transmission": "Manual - 5 Gears",
      "engine": "1462 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://stimg.cardekho.com/images/car-images/930x620/Maruti/Ertiga/8711/1650016330874/225_brown_391d0f.jpg?imwidth=420&impolicy=resize",
      "id": 7
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Dzire",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 656000,
      "transmission": "Manual - 5 Gears",
      "engine": "1197 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/dzire-2024-exterior-front-three-quarter.jpg",
      "id": 8
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Wagon R",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 554000,
      "transmission": "Manual - 5 Gears",
      "engine": "998 cc, 3 Cylinders Inline, 4 Valves/Cylinder, K10C",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/wagon-r-2024-exterior-front-three-quarter.jpg",
      "id": 9
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "XL6",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 1161000,
      "transmission": "Manual - 5 Gears",
      "engine": "1462 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/xl6-2024-exterior-front-three-quarter.jpg",
      "id": 10
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Celerio",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 536000,
      "transmission": "Manual - 5 Gears",
      "engine": "998 cc, 3 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/celerio-2024-exterior-front-three-quarter.jpg",
      "id": 11
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "S-Presso",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 426000,
      "transmission": "Manual - 5 Gears",
      "engine": "998 cc, 3 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/s-presso-2024-exterior-front-three-quarter.jpg",
      "id": 12
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Ignis",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 584000,
      "transmission": "Manual - 5 Gears",
      "engine": "1197 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/ignis-2024-exterior-front-three-quarter.jpg",
      "id": 13
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Jimny",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 1274000,
      "transmission": "Manual - 5 Gears",
      "engine": "1462 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/jimny-2024-exterior-front-three-quarter.jpg",
      "id": 14
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Eeco",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 532000,
      "transmission": "Manual - 5 Gears",
      "engine": "1197 cc, 4 Cylinders Inline, 4 Valves/Cylinder, SOHC",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/eeco-2024-exterior-front-three-quarter.jpg",
      "id": 15
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Ciaz",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 940000,
      "transmission": "Manual - 5 Gears",
      "engine": "1462 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/ciaz-2024-exterior-front-three-quarter.jpg",
      "id": 16
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "Invicto",
      "year": "2024",
      "fuel_type": "Hybrid (Electric + Petrol)",
      "price": 2505000,
      "transmission": "Automatic (e-CVT) - CVT Gears, Paddle Shift",
      "engine": "1987 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/invicto-2024-exterior-front-three-quarter.jpg",
      "id": 17
    },
    {
      "brand_name": "Maruti Suzuki",
      "model": "New Dzire",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 707000,
      "transmission": "Manual - 5 Gears",
      "engine": "1197 cc, 3 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/maruti-suzuki/new-dzire-2024-exterior-front-three-quarter.jpg",
      "id": 18
    },
    {
      "brand_name": "Tata",
      "model": "Curvv",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 999000,
      "transmission": "Manual - 6 Gears, Sport Mode",
      "engine": "1199 cc, 3 Cylinders Inline, 2 Valves/Cylinder, SOHC",
      "image_url": "https://api.example.com/images/cars/tata/curvv-2024-exterior-front-three-quarter.jpg",
      "id": 19
    },
    {
      "brand_name": "Tata",
      "model": "Punch",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 613000,
      "transmission": "Manual - 5 Gears",
      "engine": "1199 cc, 3 Cylinders Inline, 4 Valves/Cylinder, SOHC",
      "image_url": "https://api.example.com/images/cars/tata/punch-2024-exterior-front-three-quarter.jpg",
      "id": 20
    },
   
    {
      "brand_name": "Tata",
      "model": "Harrier",
      "year": "2024",
      "fuel_type": "Diesel",
      "price": 1549000,
      "transmission": "Manual - 6 Gears, Sport Mode",
      "engine": "1956 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/tata/harrier-2024-exterior-front-three-quarter.jpg",
      "id": 22
    },
    {
      "brand_name": "Tata",
      "model": "Curvv EV",
      "year": "2024",
      "fuel_type": "Electric",
      "price": 1040000,
      "transmission": "Automatic - 1 Gears, Sport Mode",
      "engine": "Not Applicable Cylinders Not Applicable, Not Applicable Valves/Cylinder, Not Applicable",
      "image_url": "https://api.example.com/images/cars/tata/curvv-ev-2024-exterior-front-three-quarter.jpg",
      "id": 23
    },
    {
      "brand_name": "Tata",
      "model": "Safari",
      "year": "2024",
      "fuel_type": "Diesel",
      "price": 1619000,
      "transmission": "Manual - 6 Gears, Sport Mode",
      "engine": "1956 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/tata/safari-2024-exterior-front-three-quarter.jpg",
      "id": 24
    },
    {
      "brand_name": "Tata",
      "model": "Altroz",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 665000,
      "transmission": "Manual - 5 Gears",
      "engine": "1199 cc, 3 Cylinders Inline, 4 Valves/Cylinder, SOHC",
      "image_url": "https://api.example.com/images/cars/tata/altroz-2024-exterior-front-three-quarter.jpg",
      "id": 25
    },
    {
      "brand_name": "Tata",
      "model": "Tiago",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 565000,
      "transmission": "Manual - 5 Gears",
      "engine": "1199 cc, 3 Cylinders Inline, 4 Valves/Cylinder, SOHC",
      "image_url": "https://api.example.com/images/cars/tata/tiago-2024-exterior-front-three-quarter.jpg",
      "id": 26
    },
    {
      "brand_name": "Tata",
      "model": "Tiago EV",
      "year": "2024",
      "fuel_type": "Electric",
      "price": 799000,
      "transmission": "Automatic - 1 Gears, Sport Mode",
      "engine": "Not Applicable Cylinders Not Applicable, Not Applicable Valves/Cylinder, Not Applicable",
      "image_url": "https://api.example.com/images/cars/tata/tiago-ev-2024-exterior-front-three-quarter.jpg",
      "id": 27
    },
    {
      "brand_name": "Tata",
      "model": "Tigor",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 630000,
      "transmission": "Manual - 5 Gears",
      "engine": "1199 cc, 3 Cylinders Inline, 4 Valves/Cylinder, SOHC",
      "image_url": "https://api.example.com/images/cars/tata/tigor-2024-exterior-front-three-quarter.jpg",
      "id": 28
    },
    {
      "brand_name": "Tata",
      "model": "Tiago NRG",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 670000,
      "transmission": "Manual - 5 Gears",
      "engine": "1199 cc, 3 Cylinders Inline, 4 Valves/Cylinder, SOHC",
      "image_url": "https://api.example.com/images/cars/tata/tiago-nrg-2024-exterior-front-three-quarter.jpg",
      "id": 29
    },
    {
      "brand_name": "Tata",
      "model": "Tigor EV",
      "year": "2024",
      "fuel_type": "Electric",
      "price": 1249000,
      "transmission": "Automatic - 1 Gears, Sport Mode",
      "engine": "Not Applicable Cylinders Not Applicable, Not Applicable Valves/Cylinder, Not Applicable",
      "image_url": "https://api.example.com/images/cars/tata/tigor-ev-2024-exterior-front-three-quarter.jpg",
      "id": 30
    },
    {
      "brand_name": "Tata",
      "model": "Harrier EV",
      "year": "2024",
      "fuel_type": "Electric",
      "price": 2400000,
      "transmission": "Automatic",
      "engine": "",
      "image_url": "https://api.example.com/images/cars/tata/harrier-ev-2024-exterior-front-three-quarter.jpg",
      "id": 31
    },
    {
      "brand_name": "Tata",
      "model": "Altroz EV",
      "year": "2024",
      "fuel_type": "Electric",
      "price": 1200000,
      "transmission": "Automatic",
      "engine": "",
      "image_url": "https://api.example.com/images/cars/tata/altroz-ev-2024-exterior-front-three-quarter.jpg",
      "id": 32
    },
    {
      "brand_name": "Kia",
      "model": "New Carnival",
      "year": "2024",
      "fuel_type": "Diesel",
      "price": 4000000,
      "transmission": "Automatic (TC) - 8 Gears, Manual Override & Paddle Shift, Sport Mode",
      "engine": "2151 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/kia/new-carnival-2024-exterior-front-three-quarter.jpg",
      "id": 33
    },
    
    {
      "brand_name": "Kia",
      "model": "Seltos",
      "year": "2024",
      "fuel_type": "Petrol",
      "price": 1090000,
      "transmission": "Manual - 6 Gears",
      "engine": "1497 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
      "image_url": "https://api.example.com/images/cars/kia/seltos-2024-exterior-front-three-quarter.jpg",
      "id": 35
    }
  ]
;

const CarList = ({ limit = 8 }) => {
  // Initialize state directly with the carData array.
  const [cars, setCars] = useState(carData);

  // Since the data is local, useEffect is not strictly necessary for this setup,
  // but it would be essential if you were fetching from a live API.
  // useEffect(() => {
  //   // Example: fetch('https://api.example.com/cars').then(res => res.json()).then(data => setCars(data));
  //   setCars(carData);
  // }, []);

  const formatPrice = (price) => {
    // Formats the number in the Indian numbering system (lakhs, crores).
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.slice(0, limit).map((car) => (
          <div
            // Use the unique 'id' from your data as the key. This is a React best practice.
            key={car.id}
            className="flex flex-col bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={car.image_url} // Simplified since the data only uses image_url
              alt={`${car.brand_name} ${car.model}`}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop if placeholder also fails
                e.target.src = 'https://placehold.co/600x400/e2e8f0/334155?text=Image+Not+Found';
              }}
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-800">
                {car.brand_name} {car.model}
              </h3>
              <p className="text-lg font-semibold text-blue-600 mt-1">
                ₹ {formatPrice(car.price)}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600 space-y-2 flex-grow">
                <p>
                  <span className="font-semibold text-gray-700">Fuel:</span>{' '}
                  {car.fuel_type}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Transmission:</span>{' '}
                  {car.transmission}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Engine:</span>{' '}
                  {car.engine || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
