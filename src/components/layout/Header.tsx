import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Car } from 'lucide-react';
import { auth } from '../../lib/firebase';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Current user:', user?.email); // Debug log
      const isUserAdmin = user?.email === 'ridergamer160@gmail.com';
      console.log('Is user admin:', isUserAdmin); // Debug log
      setIsAdmin(isUserAdmin);
    });

    return () => unsubscribe();
  }, []);

  // Debug log for current admin state
  console.log('Current isAdmin state:', isAdmin);

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-2xl font-bold tracking-tight"
        >
          <Car className="h-6 w-6" />
          <span>Project Cars</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
          <Link to="/category/sports" className="hover:text-red-500 transition-colors">Sports</Link>
          <Link to="/category/electric" className="hover:text-red-500 transition-colors">Electric</Link>
          <Link to="/category/suv" className="hover:text-red-500 transition-colors">SUVs</Link>
          {isAdmin && (
            <Link to="/admin" className="hover:text-red-500 transition-colors">Admin</Link>
          )}
        </div>

        <div className="hidden md:flex relative">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-700 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-gray-600 transition-all w-56"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-gray-800 rounded-lg shadow-xl p-4 absolute z-50 left-0 right-0 mx-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-gray-600 transition-all w-full"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex flex-col space-y-3">
            <Link to="/" className="hover:text-red-500 transition-colors py-2 border-b border-gray-700" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/category/sports" className="hover:text-red-500 transition-colors py-2 border-b border-gray-700" onClick={() => setIsOpen(false)}>Sports</Link>
            <Link to="/category/electric" className="hover:text-red-500 transition-colors py-2 border-b border-gray-700" onClick={() => setIsOpen(false)}>Electric</Link>
            <Link to="/category/suv" className="hover:text-red-500 transition-colors py-2 border-b border-gray-700" onClick={() => setIsOpen(false)}>SUVs</Link>
            {isAdmin && (
              <Link to="/admin" className="hover:text-red-500 transition-colors py-2" onClick={() => setIsOpen(false)}>Admin</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;