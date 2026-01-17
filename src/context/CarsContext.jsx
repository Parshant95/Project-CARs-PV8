import React, { createContext, useContext, useState, useEffect } from "react";
import { carService } from "../lib/carService";
import { categories as initialCategories } from "../data/categories";

const CarsContext = createContext(undefined);

export const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories] = useState(initialCategories);

  // Initialize data
  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await carService.getAllCars();
        // Check if we have saved edits in local storage, merge them if necessary
        // For now, we prefer fresh data or use a more robust sync strategy
        const savedCars = localStorage.getItem("cars");

        if (savedCars) {
          // Simple strategy: use local storage if available to persist user adds
          // In a real app, this would be a server DB fetch
          setCars(JSON.parse(savedCars));
        } else {
          setCars(data);
        }
      } catch (err) {
        console.error("Failed to load cars", err);
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  // Persist to local storage whenever cars change (mock database)
  useEffect(() => {
    if (cars.length > 0) {
      localStorage.setItem("cars", JSON.stringify(cars));
    }
  }, [cars]);

  const addCar = (car) => {
    const newCar = {
      ...car,
      id: crypto.randomUUID(),
    };
    setCars((prevCars) => [...prevCars, newCar]);
  };

  const getCarsByCategory = (categoryId) => {
    return cars.filter((car) => car.category === categoryId);
  };

  const getCarById = (id) => {
    return cars.find((car) => car.id === id);
  };

  return (
    <CarsContext.Provider
      value={{ cars, categories, addCar, getCarsByCategory, getCarById }}
    >
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarsContext);
  if (context === undefined) {
    throw new Error("useCars must be used within a CarsProvider");
  }
  return context;
};
