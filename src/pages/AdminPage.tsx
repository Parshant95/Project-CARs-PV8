import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCars } from '../context/CarsContext';
import CarForm from '../components/admin/CarForm';
import { Edit, Trash2, Plus, ArrowLeft, X } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { cars } = useCars();
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = () => {
    setSuccessMessage('Car added successfully!');
    setShowForm(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Link to="/" className="text-gray-400 hover:text-white mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        
        {successMessage && (
          <div className="bg-green-600 text-white p-4 rounded-lg mb-6 flex justify-between items-center">
            <p>{successMessage}</p>
            <button onClick={() => setSuccessMessage('')} className="text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Cars</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            {showForm ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add New Car
              </>
            )}
          </button>
        </div>
        
        {showForm && (
          <div className="mb-10">
            <CarForm onSuccess={handleSuccess} />
          </div>
        )}
        
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Car
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {cars.length > 0 ? (
                  cars.map(car => (
                    <tr key={car.id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 mr-4">
                            <img
                              src={car.imageUrl}
                              alt={car.name}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{car.name}</div>
                            <div className="text-sm text-gray-400">{car.transmission}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-block bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                          {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {car.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {car.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/car/${car.id}`}
                          className="text-indigo-400 hover:text-indigo-300 mr-4"
                        >
                          View
                        </Link>
                        <button className="text-blue-400 hover:text-blue-300 mr-4">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                      No cars found. Click "Add New Car" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;