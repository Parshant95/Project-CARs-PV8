import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCars } from '../context/CarsContext';
import CategoryCard from '../components/common/CategoryCard';
import CarCard from '../components/common/CarCard';
import { ChevronRight, Calendar, ArrowRight, Car, Zap, TrendingUp, FileText } from 'lucide-react';
import BrandSlider from "../components/common/BrandSlider";
import { fetchLatestNews, NewsItem } from '../lib/api';
import { auth } from '../lib/firebase';

const Home: React.FC = () => {
  const { categories, cars } = useCars();
  const featuredCars = cars.slice(0, 4);
  const [userType, setUserType] = useState('user');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in and has admin email
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Home - Current user:', user?.email); // Debug log
      if (user && user.email === 'ridergamer260@gmail.com' || user && user.email === 'parshantvardhan63@gmail.com') {
        console.log('Home - Setting admin access'); // Debug log
        setUserType('admin');
        localStorage.setItem('userType', 'admin');
      } else {
        console.log('Home - Setting regular user access'); // Debug log
        setUserType('user');
        localStorage.setItem('userType', 'user');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Loading news...');
        const newsData = await fetchLatestNews();
        console.log('News data received:', newsData);
        
        if (isMounted) {
          if (newsData && newsData.length > 0) {
            setNews(newsData);
          } else {
            setError('No news articles found');
          }
        }
      } catch (err) {
        console.error('Error in loadNews:', err);
        if (isMounted) {
          setError('Failed to load news. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadNews();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return Zap;
      case 'car':
        return Car;
      case 'trending-up':
        return TrendingUp;
      case 'file-text':
        return FileText;
      default:
        return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="src\data\Projectcars.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-red-500">Project Cars</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Discover the finest automobiles from around the world with detailed specifications and stunning imagery.
          </p>
 
          <div className="flex flex-wrap gap-4">
            <Link to="/category/sports" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md text-white font-medium transition-colors">
              Explore Sports Cars
            </Link>
            {
              userType === 'admin' ? (
            <Link to="/admin" className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md text-white font-medium transition-colors">
              Add New Car
            </Link>) : (<p></p>)
            }
          </div>
        </div>
      </section>

       <div>

        <section className="bg-auto py-8">
          <h2 className="text-3xl font-bold text-center mb-4">Our Trusted Brands</h2>
          <BrandSlider />
        </section>

        {/* Automotive News Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-bold">Latest Automotive News</h2>
                  <p className="text-gray-400 mt-2">Top 5 latest updates from the automotive world</p>
                </div>
              </div>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                  <p className="mt-4 text-gray-400">Loading latest news...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {news.map((newsItem) => {
                    const Icon = getIconComponent(newsItem.icon);
                    return (
                      <a 
                        key={newsItem.id} 
                        href={newsItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors group"
                      >
                        <div className="flex items-start gap-6">
                          {newsItem.imageUrl ? (
                            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                              <img 
                                src={newsItem.imageUrl} 
                                alt={newsItem.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="bg-red-600/20 p-3 rounded-lg flex-shrink-0">
                              <Icon className="h-6 w-6 text-red-500" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h3 className="text-xl font-semibold group-hover:text-red-400 transition-colors">
                                {newsItem.title}
                              </h3>
                              <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm">
                                {newsItem.category}
                              </span>
                            </div>
                            <p className="text-gray-300 mb-3">{newsItem.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-gray-400 text-sm">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(newsItem.date).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                                {newsItem.source && (
                                  <span className="ml-4 text-gray-500">Source: {newsItem.source}</span>
                                )}
                              </div>
                              <span className="text-red-500 font-medium inline-flex items-center">
                                Read More <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      


      
      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Explore the World of Cars</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Cars</h2>
            <Link to="/cars" className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors">
              View All Cars <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to add your car?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Use our admin interface to add your own car models and descriptions to the collection.
          </p>
          <Link to="/admin" className="inline-block bg-red-600 hover:bg-red-700 px-8 py-4 rounded-md text-white font-medium text-lg transition-colors">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;