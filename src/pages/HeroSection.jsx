import React from 'react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => {
  const { user, login, loading } = useAuth();
  const displayName = user?.displayName || user?.email || '';
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <img
          src="src\\data\\wallpaperflare.com_wallpaper (1).jpg"
          alt="Luxury car background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
          >
            {user ? `Welcome, ${displayName}!` : 'Drive Your Dream Car Today'}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-10">
            Experience luxury and performance with our premium car rental service.
            Choose from our exclusive collection and hit the road in style.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center">
            {!user && (
              <Button 
                href="/home" 
                variant="primary"
                className="animate-fade-in" 
                style={{ animationDelay: '0.3s' }}
              >
                Guest Login
              </Button>
            )}
            {user && (
              <Button
                href="/home"
                variant="primary"
                className="animate-fade-in"
                style={{ animationDelay: '0.3s' }}
              >
                Login
              </Button>
            )}
          </div>
          <div className="mt-6 flex flex-col items-center justify-center space-y-2">
            {!loading && !user && (
              <button
                onClick={login}
                className="bg-white text-black px-6 py-2 rounded shadow hover:bg-gray-200 font-semibold transition-colors"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-10 h-10 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 