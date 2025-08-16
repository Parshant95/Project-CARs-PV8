export interface Car {
  id: number;
  brand_name: string;
  model: string;
  year: string;
  fuel_type: string;
  price: number;
  transmission: string;
  engine: string;
  image_url: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}