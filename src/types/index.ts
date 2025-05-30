export interface Car {
  id: string;
  name: string;
  category: 'sports' | 'electric' | 'suv' | string;
  price: string;
  year: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  description: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}