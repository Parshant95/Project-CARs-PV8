import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import HeroSection from './HeroSection';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow">
        <HeroSection user={user} />
      </main>
    </div>
  );
}

export default LandingPage; 