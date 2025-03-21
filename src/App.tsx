import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { AuthProvider } from '@/components/auth/AuthContext';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loader from '@/components/assets/Loader';
import NotFound from '@/components/pages/NotFound';
import CookieConsent from 'react-cookie-consent';
import ProtectedRoute from '@/components/auth/ProtectedRoute'; 
import { SpeedInsights } from "@vercel/speed-insights/react"

const Hero = lazy(() => import('./components/sections/Hero'));
const Products = lazy(() => import('./components/sections/Products'));
const Contact = lazy(() => import('./components/sections/Contact'));
const ProductDetail = lazy(() => import('./components/pages/ProductDetail'));
const Cart = lazy(() => import('./components/assets/Cart'));
const Favorites = lazy(() => import('./components/pages/Favorites'));
const Login = lazy(() => import('./components/pages/Login'));
const Register = lazy(() => import('./components/pages/Register'));
const Profile = lazy(() => import('./components/pages/Profile'));
const AdminDashboard = lazy(() => import('./components/pages/AdminDashboard'));
const Articles = lazy(() => import('./components/pages/Articles'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const NewReleases = lazy(() => import('./components/sections/NewReleases'));
const BrandSection = lazy(() => import('./components/sections/BrandSection'));
const Privacy = lazy(() => import('./components/pages/Privacy'));
const Terms = lazy(() => import('./components/pages/Terms'));
const AccessDenied = lazy(() => import('./components/pages/AccessDenied'));

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
          {/* Rutas públicas */}
          <Route path="/" element={<><Hero /><NewReleases /><Products /><Contact /><BrandSection /></>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Rutas protegidas para usuarios autenticados */}
          <Route element={<ProtectedRoute requireAuth={true} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Rutas protegidas para administradores */}
          <Route element={<ProtectedRoute requireAuth={true} requireAdmin={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
        <SpeedInsights />
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
        <link rel="canonical" href="https://outside-project.vercel.app" />
      </Helmet>
      <CartProvider>
        <FavoritesProvider>
            <AuthProvider>
              <Router>
                <CookieConsent
                  location="bottom"
                  buttonText="Aceptar"
                  declineButtonText="Rechazar"
                  cookieName="outsideZoneCookieConsent"
                  style={{ background: '#1F2937', color: '#fff', fontSize: '14px' }}
                  buttonStyle={{ background: '#9333EA', color: 'white', fontSize: '14px', padding: '8px 16px', borderRadius: '4px' }}
                  declineButtonStyle={{ background: '#EF4444', color: 'white', fontSize: '14px', padding: '8px 16px', borderRadius: '4px' }}
                  expires={150}
                >
                  Este sitio utiliza cookies para mejorar tu experiencia. Consulta nuestra{' '}
                  <Link to="/privacy" className="text-purple-400 hover:underline">Política de Privacidad</Link> para más información.
                </CookieConsent>
                <div className="min-h-screen bg-black text-white light:bg-gray-100 light:text-black transition-colors">
                  <Navbar />
                  <AppContent scrollTop={scrollTop} />
                </div>
              </Router>
              
            </AuthProvider>
        </FavoritesProvider>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;