import { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
import { auth } from '../lib/firebase';
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad
import HeroSection from './HeroSection';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
<<<<<<< HEAD
=======
  const [user, setUser] = useState(null);
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

<<<<<<< HEAD
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
=======
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
      unsubscribe();
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad
    };
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow">
<<<<<<< HEAD
        <HeroSection />
=======
        <HeroSection user={user} />
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad
      </main>
    </div>
  );
}

export default LandingPage; 