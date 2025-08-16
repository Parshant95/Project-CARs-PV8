import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import Button from './Button';

const HeroSection = ({ user }) => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <img
          src="src\data\wallpaperflare.com_wallpaper (1).jpg"
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
            {user ? `Welcome, ${user.displayName || 'Guest'}!` : 'Drive Your Dream Car Today'}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-10">
            Experience luxury and performance with our premium car rental service.
            Choose from our exclusive collection and hit the road in style.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Button 
                href="/home" 
                variant="primary"
                className="animate-fade-in" 
                style={{ animationDelay: '0.3s' }}
              >
                Guest Login
              </Button>
              <Button 
                variant="secondary"
                className="animate-fade-in" 
                style={{ animationDelay: '0.6s' }}
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
            </div>
          )}
          {user && (
            <Button 
              href="/home" 
              variant="primary"
              className="animate-fade-in" 
              style={{ animationDelay: '0.3s' }}
            >
              View Dashboard
            </Button>
          )}
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