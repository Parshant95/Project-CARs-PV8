import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car, Category } from '../types';
import { cars as initialCars } from '../data/cars';
import { categories as initialCategories } from '../data/categories';

interface CarsContextProps {
  cars: Car[];
  categories: Category[];
  addCar: (car: Omit<Car, 'id'>) => void;
  getCarsByCategory: (categoryId: string) => Car[];
  getCarById: (id: string) => Car | undefined;
}

const CarsContext = createContext<CarsContextProps | undefined>(undefined);

export const CarsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>(() => {
    const savedCars = localStorage.getItem('cars');
    return savedCars ? JSON.parse(savedCars) : initialCars;
  });

  const [categories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  const addCar = (car: Omit<Car, 'id'>) => {
    const newCar: Car = {
      ...car,
      id: crypto.randomUUID()
    };
    setCars(prevCars => [...prevCars, newCar]);
  };

  const getCarsByCategory = (categoryId: string) => {
    return cars.filter(car => car.category === categoryId);
  };

  const getCarById = (id: string) => {
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