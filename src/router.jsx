import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import CarDetailPage from './pages/CarDetailPage';
import CategoryPage from './pages/CategoryPage';
import AdminPage from './pages/AdminPage';
import NewsDetail from './pages/NewsDetail';
import LandingPage from './pages/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'car/:carId',
        element: <CarDetailPage />
      },
      {
        path: 'category/:categoryId',
        element: <CategoryPage />
      },
      {
        path: 'admin',
        element: <AdminPage />
      },
      {
        path: 'news/:id',
        element: <NewsDetail />
      }
    ]
  }
]);

export default router; 