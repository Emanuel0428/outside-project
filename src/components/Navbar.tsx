import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Home, Mail, Menu, Newspaper, Package, ShoppingCart, X, Sun, Moon, Heart } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavigation = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path ? 'text-purple-400' : 'text-white';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-black/90 backdrop-blur-sm z-50 px-6 py-4 light:bg-gray-100/90"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Cloud className="h-8 w-6 text-purple-500" />
          <span className="text-2xl font-bold">Outside</span>
        </div>

        {/* Menú Desktop */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => handleNavigation('home')}
            className={`${isActive('/')} hover:text-purple-400 transition-colors flex items-center gap-2`}
          >
            <Home className="h-5 w-5" /> Home
          </button>
          <button
            onClick={() => handleNavigation('products')}
            className={`${isActive('/products')} hover:text-purple-400 transition-colors flex items-center gap-2`}
          >
            <Package className="h-5 w-5" /> Products
          </button>
          <Link
            to="/news"
            className={`${isActive('/news')} hover:text-purple-400 transition-colors flex items-center gap-2`}
          >
            <Newspaper className="h-5 w-5" /> News
          </Link>
          <Link
            to="/favorites"
            className={`${isActive('/favorites')} hover:text-purple-400 transition-colors flex items-center gap-2`}
          >
            <Heart className="h-5 w-5" /> Favorites
          </Link>
          <button
            onClick={() => handleNavigation('contact')}
            className={`${isActive('/contact')} hover:text-purple-400 transition-colors flex items-center gap-2`}
          >
            <Mail className="h-5 w-5" /> Contact
          </button>
          <Link
            to="/cart"
            className={`${isActive('/cart')} hover:text-purple-400 transition-colors flex items-center gap-2 relative`}
          >
            <ShoppingCart className="h-5 w-5" /> Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={toggleTheme}
            className="text-white hover:text-purple-400 transition-colors light:text-black"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Botón Hamburguesa para Móvil */}
        <button className="md:hidden text-white light:text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú Móvil */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-gray-900 p-4 mt-4 flex flex-col gap-4 light:bg-gray-200"
        >
          <button
            onClick={() => handleNavigation('home')}
            className={`${isActive('/')} hover:text-purple-400 transition-colors flex items-center gap-2`}
          >
            <Home className="h-5 w-5" /> Home
          </button>
          <button
            onClick={() => handleNavigation('products')}
            className={`${isActive('/products')} hover:text-purple-400 transition-colors flex items-center gap-2`}
          >
            <Package className="h-5 w-5" /> Products
          </button>
          <Link
            to="/news"
            className={`${isActive('/news')} hover:text-purple-400 transition-colors flex items-center gap-2`}
            onClick={() => setIsOpen(false)}
          >
            <Newspaper className="h-5 w-5" /> News
          </Link>
          <Link
            to="/favorites"
            className={`${isActive('/favorites')} hover:text-purple-400 transition-colors flex items-center gap-2`}
            onClick={() => setIsOpen(false)}
          >
            <Heart className="h-5 w-5" /> Favorites
          </Link>
          <button
            onClick={() => handleNavigation('contact')}
            className={`${isActive('/contact')} hover:text-purple-400 transition-colors flex items-center gap-2`}
          >
            <Mail className="h-5 w-5" /> Contact
          </button>
          <Link
            to="/cart"
            className={`${isActive('/cart')} hover:text-purple-400 transition-colors flex items-center gap-2 relative`}
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart className="h-5 w-5" /> Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => { toggleTheme(); setIsOpen(false); }}
            className="text-white hover:text-purple-400 transition-colors light:text-black flex items-center gap-2"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />} 
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;