import React, { useState } from 'react';
import { useCars } from '../../context/CarsContext';
import { Car } from '../../types';
import { Save, X } from 'lucide-react';

interface CarFormProps {
  onSuccess?: () => void;
}

const CarForm: React.FC<CarFormProps> = ({ onSuccess }) => {
  const { categories, addCar } = useCars();
  const [formData, setFormData] = useState<Omit<Car, 'id'>>({
    name: '',
    category: categories[0]?.id || 'sports',
    price: '',
    year: new Date().getFullYear(),
    mileage: '',
    fuelType: '',
    transmission: '',
    description: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.mileage.trim()) newErrors.mileage = 'Mileage is required';
    if (!formData.fuelType.trim()) newErrors.fuelType = 'Fuel type is required';
    if (!formData.transmission.trim()) newErrors.transmission = 'Transmission is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!/^https?:\/\/.+\.(jpeg|jpg|png|webp)(\?.*)?$/i.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        addCar(formData);
        
        // Reset form
        setFormData({
          name: '',
          category: categories[0]?.id || 'sports',
          price: '',
          year: new Date().getFullYear(),
          mileage: '',
          fuelType: '',
          transmission: '',
          description: '',
          imageUrl: '',
        });
        
        setErrors({});
        
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error('Error adding car:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Add New Car</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 mb-2">Car Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-red-500`}
            placeholder="e.g. BMW M5"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
              errors.price ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-red-500`}
            placeholder="e.g. Rs. 1.99 Cr*"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min={1900}
            max={new Date().getFullYear() + 1}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Mileage</label>
          <input
            type="text"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
              errors.mileage ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-red-500`}
            placeholder="e.g. 49.75 kmpl"
          />
          {errors.mileage && <p className="text-red-500 text-sm mt-1">{errors.mileage}</p>}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Fuel Type</label>
          <input
            type="text"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
              errors.fuelType ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-red-500`}
            placeholder="e.g. Petrol"
          />
          {errors.fuelType && <p className="text-red-500 text-sm mt-1">{errors.fuelType}</p>}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Transmission</label>
          <input
            type="text"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
              errors.transmission ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-red-500`}
            placeholder="e.g. Automatic"
          />
          {errors.transmission && <p className="text-red-500 text-sm mt-1">{errors.transmission}</p>}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
              errors.imageUrl ? 'border-red-500' : 'border-gray-600'
            } focus:outline-none focus:ring-2 focus:ring-red-500`}
            placeholder="https://example.com/car-image.jpg"
          />
          {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-gray-300 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
            errors.description ? 'border-red-500' : 'border-gray-600'
          } focus:outline-none focus:ring-2 focus:ring-red-500`}
          placeholder="Enter car description..."
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? 'Saving...' : 'Save Car'}
        </button>
        
        <button
          type="button"
          onClick={() => setFormData({
            name: '',
            category: categories[0]?.id || 'sports',
            price: '',
            year: new Date().getFullYear(),
            mileage: '',
            fuelType: '',
            transmission: '',
            description: '',
            imageUrl: '',
          })}
          className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
        >
          <X className="h-4 w-4" />
          Reset
        </button>
      </div>
    </form>
  );
};

export default CarForm;