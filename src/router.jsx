import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const CarDetailPage = lazy(() => import("./pages/CarDetailPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const LandingPage = lazy(() => import("./pages/LandingPage"));

// Helper to wrap components in Suspense with loading spinner
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <LandingPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "home",
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
      },
      {
        path: "car/:carId",
        element: (
          <SuspenseWrapper>
            <CarDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "category/:categoryId",
        element: (
          <SuspenseWrapper>
            <CategoryPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "admin",
        element: (
          <SuspenseWrapper>
            <AdminPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "news/:id",
        element: (
          <SuspenseWrapper>
            <NewsDetail />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);

export default router;
