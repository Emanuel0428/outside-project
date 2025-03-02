import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Home, Package, ShoppingCart, User, X, Menu, Sun, Moon } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
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
    setIsMobileOpen(false);
    setIsAccountOpen(false);
  };

  const isActive = (path: string) => (location.pathname === path ? 'text-purple-400' : 'text-white');

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMobileOpen(false);
    setIsAccountOpen(false);
  };

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
          {/* Menú de cuenta desplegable */}
          <div className="relative">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="text-white hover:text-purple-400 transition-colors flex items-center gap-2 light:text-black"
            >
              <User className="h-5 w-5" />
              {user ? `Hola, ${user.user_metadata.name}` : 'Cuenta'}
            </button>
            {isAccountOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg p-4 text-white light:bg-gray-200 light:text-black"
              >
                {user ? (
                  <>
                    <Link to="/profile" className="block py-2 hover:text-purple-400" onClick={() => setIsAccountOpen(false)}>
                      Perfil
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="block py-2 hover:text-purple-400" onClick={() => setIsAccountOpen(false)}>
                        Admin Dashboard
                      </Link>
                    )}
                    <Link to="/favorites" className="block py-2 hover:text-purple-400" onClick={() => setIsAccountOpen(false)}>
                      Favoritos
                    </Link>
                    <Link to="/news" className="block py-2 hover:text-purple-400" onClick={() => setIsAccountOpen(false)}>
                      Noticias
                    </Link>
                    <button
                      onClick={() => handleNavigation('contact')}
                      className="block w-full text-left py-2 hover:text-purple-400"
                    >
                      Contacto
                    </button>
                    <button onClick={handleLogout} className="block w-full text-left py-2 hover:text-purple-400">
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block py-2 hover:text-purple-400" onClick={() => setIsAccountOpen(false)}>
                      Iniciar Sesión
                    </Link>
                    <Link to="/register" className="block py-2 hover:text-purple-400" onClick={() => setIsAccountOpen(false)}>
                      Registrarse
                    </Link>
                    <Link to="/favorites" className="block py-2 hover:text-purple-400" onClick={() => setIsAccountOpen(false)}>
                      Favoritos
                    </Link>
                    <Link to="/news" className="block py-2 hover:text-purple-400" onClick={() => setIsAccountOpen(false)}>
                      Noticias
                    </Link>
                    <button
                      onClick={() => handleNavigation('contact')}
                      className="block w-full text-left py-2 hover:text-purple-400"
                    >
                      Contacto
                    </button>
                  </>
                )}
                <button
                  onClick={toggleTheme}
                  className="block w-full text-left py-2 hover:text-purple-400 flex items-center gap-2"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Botón Hamburguesa para Móvil */}
        <button className="md:hidden text-white light:text-black" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú Móvil */}
      {isMobileOpen && (
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
            to="/cart"
            className={`${isActive('/cart')} hover:text-purple-400 transition-colors flex items-center gap-2 relative`}
            onClick={() => setIsMobileOpen(false)}
          >
            <ShoppingCart className="h-5 w-5" /> Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <span className="text-white">Hola, {user.user_metadata.name}</span>
              <Link to="/profile" className="text-white hover:text-purple-400" onClick={() => setIsMobileOpen(false)}>
                Perfil
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-white hover:text-purple-400" onClick={() => setIsMobileOpen(false)}>
                  Admin Dashboard
                </Link>
              )}
              <Link to="/favorites" className="text-white hover:text-purple-400" onClick={() => setIsMobileOpen(false)}>
                Favoritos
              </Link>
              <Link to="/news" className="text-white hover:text-purple-400" onClick={() => setIsMobileOpen(false)}>
                Noticias
              </Link>
              <button
                onClick={() => handleNavigation('contact')}
                className="text-white hover:text-purple-400 flex items-center gap-2"
              >
                Contacto
              </button>
              <button onClick={handleLogout} className="text-white hover:text-purple-400">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-purple-400" onClick={() => setIsMobileOpen(false)}>
                Iniciar Sesión
              </Link>
              <Link to="/register" className="text-white hover:text-purple-400" onClick={() => setIsMobileOpen(false)}>
                Registrarse
              </Link>
              <Link to="/favorites" className="text-white hover:text-purple-400" onClick={() => setIsMobileOpen(false)}>
                Favoritos
              </Link>
              <Link to="/news" className="text-white hover:text-purple-400" onClick={() => setIsMobileOpen(false)}>
                Noticias
              </Link>
              <button
                onClick={() => handleNavigation('contact')}
                className="text-white hover:text-purple-400 flex items-center gap-2"
              >
                Contacto
              </button>
            </>
          )}
          <button
            onClick={() => {
              toggleTheme();
              setIsMobileOpen(false);
            }}
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