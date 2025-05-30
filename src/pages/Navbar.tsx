import React, { useState } from 'react';
import { Menu, X, Car, UserCircle } from 'lucide-react';
import { User, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface NavbarProps {
  scrolled: boolean;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/60 backdrop-blur-xl shadow-lg' 
          : 'bg-black/20 backdrop-blur-lg'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Car className={`h-8 w-8 ${scrolled ? 'text-blue-600' : 'text-white'}`} />
            <span className={`ml-2 text-xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              LuxDrive
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {['Home', 'Cars', 'Offers', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-blue-300'
                }`}
              >
                {item}
              </a>
            ))}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                  ) : (
                    <UserCircle className={`w-8 h-8 ${scrolled ? 'text-gray-600' : 'text-white'}`} />
                  )}
                  <span className={`ml-2 text-sm ${scrolled ? 'text-gray-600' : 'text-white'}`}>
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className={`text-sm font-medium ${
                    scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-blue-300'
                  }`}
                >
                  Sign Out
                </button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${
                scrolled 
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-white hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/70 backdrop-blur-xl shadow-lg">
          {['Home', 'Cars', 'Offers', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {item}
            </a>
          ))}
          {user && (
            <>
              <div className="px-3 py-2 flex items-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <UserCircle className="w-8 h-8 text-gray-600" />
                )}
                <span className="ml-2 text-gray-700">{user.displayName || user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;