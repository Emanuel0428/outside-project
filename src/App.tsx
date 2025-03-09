import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/components/auth/AuthContext';
import Navbar from '@/components/assets/Navbar';
import Footer from '@/components/assets/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loader from '@/components/assets/Loader';

const Hero = lazy(() => import('./components/assets/Hero'));
const Products = lazy(() => import('./components/pages/Products'));
const Contact = lazy(() => import('./components/pages/Contact'));
const ProductDetail = lazy(() => import('./components/pages/ProductDetail'));
const Cart = lazy(() => import('./components/assets/Cart'));
const News = lazy(() => import('./components/pages/News'));
const Favorites = lazy(() => import('./components/pages/Favorites'));
const Login = lazy(() => import('./components/pages/Login'));
const Register = lazy(() => import('./components/pages/Register'));
const Profile = lazy(() => import('./components/pages/Profile'));
const AdminDashboard = lazy(() => import('./components/pages/AdminDashboard'));
const Articles = lazy(() => import('./components/pages/Articles'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const NewReleases = lazy(() => import('./components/assets/NewReleases'));
const BrandSection = lazy(() => import('./components/pages/BrandSection'));

// Componente para manejar la transición entre rutas
const AppContent = ({ scrollTop }: { scrollTop: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<><Hero /><NewReleases /><Products /><Contact /><BrandSection /></>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/news" element={<News />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </Suspense>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      {onscroll && (
        <motion.button
          onClick={() => scrollTop()}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </>
  );
};

function App() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [checkScrollTop, showScroll]);

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>
      <CartProvider>
        <FavoritesProvider>
          <ThemeProvider>
            <AuthProvider>
              <Router>
                <div className="min-h-screen bg-black text-white light:bg-gray-100 light:text-black transition-colors">
                  <Navbar />
                  <AppContent scrollTop={scrollTop} />
                </div>
              </Router>
            </AuthProvider>
          </ThemeProvider>
        </FavoritesProvider>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;