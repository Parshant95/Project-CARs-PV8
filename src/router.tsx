import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import CarDetailPage from './pages/CarDetailPage';
import AdminPage from './pages/AdminPage';
import LandingPage from './pages/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        index: true,
        path: "/home",
        element: <Home />
      },
      {
        path: 'category/:categoryId',
        element: <CategoryPage />
      },
      {
        path: 'car/:carId',
        element: <CarDetailPage />
      },
      {
        path: 'admin',
        element: <AdminPage />
      }
    ]
  }
]);

export default router;