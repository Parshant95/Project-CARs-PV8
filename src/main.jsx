import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './index.css';
<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
=======

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad
  </StrictMode>
); 