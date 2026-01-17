import { cars as localCars } from '../data/cars';
import { CarapisParser } from './CarapisParser';

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const RAPID_API_HOST = 'indian-automotive-data-hub.p.rapidapi.com';

const CARAPIS_API_KEY = import.meta.env.VITE_CARAPIS_API_KEY;

/**
 * Service to handle car data fetching.
 * Currently serves local data but is architected to support external APIs.
 */
export const carService = {
  /**
   * Get all cars (mix of local and API if enabled)
   */
  getAllCars: async () => {
    // Priority: Try Carapis (Cardekho) first, then fallback to local
    if (CARAPIS_API_KEY) {
      const apiCars = await carService.fetchFromCardekho();
      if (apiCars.length > 0) {
        // Merge with local cars or return just API cars depending on preference
        // returning mix for now so UI isn't empty if API returns few
        return [...localCars, ...apiCars];
      }
    }
    
    return localCars;
  },

  /**
   * Fetch cars using Carapis Parser (Cardekho)
   */
  fetchFromCardekho: async () => {
    if (!CARAPIS_API_KEY) return [];

    try {
      const parser = new CarapisParser({
        platform: 'cardekho.com',
        apiKey: CARAPIS_API_KEY,
        options: {
          region: 'mumbai', // Default to a major city
          maxResults: 20
        }
      });

      const vehicles = await parser.extractListings({
        filters: {
          yearFrom: 2022
        }
      });

      return mapCardekhoDataToModel(vehicles);
    } catch (error) {
      console.error('CarService (Cardekho) Error:', error);
      return [];
    }
  },

  /**
   * Fetch cars from an external API (Example: Indian Automotive Data Hub)
   * valid API Key required in .env
   */
  fetchFromApi: async (limit = 10) => {
    if (!RAPID_API_KEY) {
      console.warn('CarService: No VITE_RAPID_API_KEY found. Skipping API fetch.');
      return [];
    }

    try {
      const response = await fetch(`https://${RAPID_API_HOST}/cars?limit=${limit}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST
        }
      });

      if (!response.ok) throw new Error('API Request failed');
      
      const data = await response.json();
      return mapApiDataToModel(data);
    } catch (error) {
      console.error('CarService Error:', error);
      return [];
    }
  },

  getCarById: (id) => {
    return localCars.find(car => car.id === id);
  },

  getCarsByCategory: (category) => {
    return localCars.filter(car => car.category === category);
  }
};

/**
 * Adapter to transform Cardekho API data to our internal Car model
 */
const mapCardekhoDataToModel = (apiData) => {
  return apiData.map(item => ({
    id: item.id || crypto.randomUUID(),
    name: item.title || `${item.specifications?.make} ${item.specifications?.model}`,
    price: item.price?.current ? `₹${(item.price.current / 100000).toFixed(2)} Lakh` : 'TBD',
    image: item.image || 'https://images.unsplash.com/photo-1583121274602-3e2840291d22?q=80&w=1000&auto=format&fit=crop', // Placeholder as API sample didn't have image
    category: item.specifications?.body_type?.toLowerCase() || 'unknown',
    year: item.specifications?.year || new Date().getFullYear(),
    transmission: item.specifications?.transmission || 'Manual',
    specs: {
      engine: item.specifications?.engine || 'N/A',
      power: 'N/A', // Not in sample field
      mileage: item.specifications?.mileage ? `${item.specifications.mileage} kmpl` : 'N/A'
    }
  }));
};

/**
 * Adapter to transform Rapid API data to our internal Car model
 */
const mapApiDataToModel = (apiData) => {
  // This mapping depends on the exact structure of the specific API chosen
  return apiData.map(item => ({
    id: item.id || crypto.randomUUID(),
    name: item.modelName || 'Unknown Model',
    price: `₹${item.price || 'TBD'}`,
    image: item.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
    category: item.bodyType?.toLowerCase() || 'sedan',
    specs: {
      engine: item.engine || 'N/A',
      power: item.power || 'N/A',
      zeroToSixty: 'N/A'
    }
  }));
};
