import { useState, useEffect, lazy, Suspense, useCallback, Component } from 'react';
import { useSmoothScroll } from '@/lib/hooks';
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
import ProtectedRoute from '@/components/auth/ProtectedRoute'; 
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// Componentes cargados dinámicamente
const Hero = lazy(() => import('@/components/sections/Hero'));
const Products = lazy(() => import('@/components/pages/Products'));
const ProductDetail = lazy(() => import('@/components/pages/ProductDetail'));
const Cart = lazy(() => import('@/components/assets/Cart'));
const Favorites = lazy(() => import('@/components/pages/Favorites'));
const Login = lazy(() => import('@/components/pages/Login'));
const Register = lazy(() => import('@/components/pages/Register'));
const Profile = lazy(() => import('@/components/pages/Profile'));
const AdminDashboard = lazy(() => import('@/components/pages/AdminDashboard'));
const Articles = lazy(() => import('@/components/pages/Articles'));
const ResetPassword = lazy(() => import('@/components/auth/ResetPassword'));
const Privacy = lazy(() => import('@/components/pages/Privacy'));
const Terms = lazy(() => import('@/components/pages/Terms'));
const AccessDenied = lazy(() => import('@/components/pages/AccessDenied'));
const Success = lazy(() => import('@/components/pages/Success'));
const Cancel = lazy(() => import('@/components/pages/Cancel'));
const Pending = lazy(() => import('@/components/pages/Pending'));
const WhatsappChat = lazy(() => import('@/components/assets/WhatsappChat'));
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const GlobalBackground = lazy(() => import('@/components/assets/GlobalBackground'));

// Error Boundary para capturar errores de renderizado
class ErrorBoundary extends Component<{ children: React.ReactNode }> {
  state: { hasError: boolean; error: Error | null } = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <h1 className="text-2xl">Algo salió mal: {this.state.error?.message || 'Error desconocido'}</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

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
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
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
            <Route path="/success" element={<Success />} /> 
            <Route path="/cancel" element={<Cancel />} />   
            <Route path="/pending" element={<Pending />} />
          </Route>

          {/* Rutas protegidas para administradores */}
          <Route element={<ProtectedRoute requireAuth={true} requireAdmin={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </Suspense>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
};

function App() {
  const [showScroll, setShowScroll] = useState(false);
  const { scrollToTop } = useSmoothScroll();

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  }, [showScroll]);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [checkScrollTop, showScroll]);

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="canonical" href="https://outside-project.vercel.app" />
        <meta name="author" content="Outside Zone" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Outside Zone" />
        <meta property="og:title" content="Outside Zone - Tienda Premium de Accesorios Urbanos y Moda" />
        <meta property="og:description" content="Outside Zone es una marca líder que fusiona estilo urbano y cultura alternativa, ofreciendo productos premium de accesorios tecnológicos y moda urbana exclusiva en Colombia." />
        <meta property="og:image" content="https://outside-project.vercel.app/logo.webp" />
        <meta property="og:url" content="https://outside-project.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Outside Zone - Accesorios Premium y Moda Urbana" />
        <meta name="twitter:description" content="Outside Zone es una marca que fusiona estilo urbano y cultura alternativa, con productos premium en accesorios tecnológicos y moda urbana exclusiva." />
        <meta name="twitter:image" content="https://outside-project.vercel.app/logo.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Outside Zone",
          "url": "https://outside-project.vercel.app",
          "logo": "https://outside-project.vercel.app/logo.webp",
          "sameAs": [
            "https://www.instagram.com/zone.outside",
            "https://github.com/Emanuel0428"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+57-321-790-5526",
            "contactType": "customer service",
            "areaServed": "CO",
            "availableLanguage": "Spanish"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Medellín",
            "addressCountry": "CO"
          }
        })}</script>
      </Helmet>
      <CartProvider>
        <FavoritesProvider>
          <AuthProvider>
            <Router>
              <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                  <WhatsappChat />
                </Suspense>
                <div className="min-h-screen text-white light:bg-gray-100 light:text-black transition-colors overflow-hidden relative smooth-scroll" style={{ background: 'var(--gradient-primary)' }}>
                  <Suspense fallback={null}>
                    <GlobalBackground />
                  </Suspense>
                  <Navbar />
                  <AppContent scrollTop={scrollToTop} />
                  {showScroll && (
                                          <motion.button
                        onClick={() => scrollToTop()}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="fixed bottom-8 left-8 p-4 bg-gradient-secondary text-white rounded-full hover:shadow-glow-lg transition-all duration-300 shadow-glow border-2 border-transparent hover:border-purple-neon glow-effect"
                      style={{ zIndex: 100 }}
                      aria-label="Volver arriba"
                    >
                      <ArrowUp className="h-6 w-6 animate-pulse-icon" />
                    </motion.button>
                  )}
                </div>
              </ErrorBoundary>
            </Router>
          </AuthProvider>
        </FavoritesProvider>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;