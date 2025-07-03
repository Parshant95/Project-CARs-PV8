import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { CarsProvider } from './context/CarsContext';
import BrandSlider from "./components/common/BrandSlider"; 

function App() {
  return (
    <CarsProvider>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CarsProvider>
  );
}

export default App; 