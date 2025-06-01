import React, { createContext, useContext, useState, useEffect } from 'react';
import { cars as initialCars } from '../data/cars';
import { categories as initialCategories } from '../data/categories';

const CarsContext = createContext(undefined);

export const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState(() => {
    const savedCars = localStorage.getItem('cars');
    return savedCars ? JSON.parse(savedCars) : initialCars;
  });

  const [categories] = useState(initialCategories);

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  const addCar = (car) => {
    const newCar = {
      ...car,
      id: crypto.randomUUID()
    };
    setCars(prevCars => [...prevCars, newCar]);
  };

  const getCarsByCategory = (categoryId) => {
    return cars.filter(car => car.category === categoryId);
  };

  const getCarById = (id) => {
    return cars.find(car => car.id === id);
  };

  return (
    <CarsContext.Provider value={{ cars, categories, addCar, getCarsByCategory, getCarById }}>
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarsContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
}; 