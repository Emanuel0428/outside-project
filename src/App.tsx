import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext'; // Nuevo
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import News from './components/News';
import Favorites from './components/Favorites';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  return (
    <CartProvider>
      <FavoritesProvider>
        <ThemeProvider>
          <Router>
            <div className="min-h-screen bg-black text-white light:bg-gray-100 light:text-black transition-colors">
              <Navbar />
              <Routes>
                <Route path="/" element={<><Hero /><Products /><Contact /></>} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/news" element={<News />} />
                <Route path="/favorites" element={<Favorites />} /> {/* Nueva ruta */}
              </Routes>
              <Footer />
              <ToastContainer position="top-right" autoClose={3000} theme="dark" />
              {showScroll && (
                <motion.button
                  onClick={scrollTop}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="fixed bottom-8 right-8 p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
                >
                  <ArrowUp className="h-6 w-6" />
                </motion.button>
              )}
            </div>
          </Router>
        </ThemeProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;