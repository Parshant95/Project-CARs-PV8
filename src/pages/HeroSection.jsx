import React from 'react';
<<<<<<< HEAD
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => {
  const { user, login, loading } = useAuth();
  const displayName = user?.displayName || user?.email || '';
=======
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

>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <img
<<<<<<< HEAD
          src="src\\data\\wallpaperflare.com_wallpaper (1).jpg"
=======
          src="src\data\wallpaperflare.com_wallpaper (1).jpg"
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad
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
<<<<<<< HEAD
            {user ? `Welcome, ${displayName}!` : 'Drive Your Dream Car Today'}
=======
            {user ? `Welcome, ${user.displayName || 'Guest'}!` : 'Drive Your Dream Car Today'}
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-10">
            Experience luxury and performance with our premium car rental service.
            Choose from our exclusive collection and hit the road in style.
          </p>
<<<<<<< HEAD
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center">
            {!user && (
=======
          {!user && (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad
              <Button 
                href="/home" 
                variant="primary"
                className="animate-fade-in" 
                style={{ animationDelay: '0.3s' }}
              >
                Guest Login
              </Button>
<<<<<<< HEAD
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
=======
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
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad
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