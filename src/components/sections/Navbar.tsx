import { useState, useMemo, useCallback, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Gem, Home, Package, ShoppingCart, User, X, Menu, Book } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/components/auth/AuthContext';
import { debounce } from 'lodash';

// Constants for animation and UI elements
const ANIMATION_CONFIG = {
  navbarInitial: { y: -100 },
  navbarAnimate: { y: 0 },
  mobileMenuInitial: { opacity: 0, y: -20 },
  mobileMenuAnimate: { opacity: 1, y: 0 },
  accountMenuInitial: { opacity: 0, y: -10 },
  accountMenuAnimate: { opacity: 1, y: 0 }
};

// NavLink component for consistent styling
const NavLink = ({ to, onClick, isActive, children }: { to: string; onClick?: () => void; isActive: boolean; children: ReactNode }) => (
  <Link 
    to={to} 
    className={`${isActive ? 'text-purple-400' : 'text-white'} hover:text-purple-400 transition-colors flex items-center gap-2`}
    onClick={onClick}
  >
    {children}
  </Link>
);

// NavButton component for consistent styling
const NavButton = ({ onClick, isActive, children }: { onClick: () => void; isActive: boolean; children: ReactNode }) => (
  <button 
    onClick={onClick} 
    className={`${isActive ? 'text-purple-400' : 'text-white'} hover:text-purple-400 transition-colors flex items-center gap-2`}
  >
    {children}
  </button>
);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Calculate cart item count
  const itemCount = useMemo(() => 
    cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const isActive = useCallback(
    (path: string): boolean => location.pathname === path,
    [location.pathname]
  );

  const handleNavigation = useMemo(
    () => debounce((id) => {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileOpen(false);
      setIsAccountOpen(false);
    }, 300),
    [location.pathname, navigate]
  );

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/');
    setIsMobileOpen(false);
    setIsAccountOpen(false);
  }, [logout, navigate]);

  const closeMenus = useCallback(() => {
    setIsMobileOpen(false);
    setIsAccountOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setIsAccountOpen(prev => !prev);
  }, []);

  const renderAuthMenuItems = useCallback((closeMenu: any) => (
    user ? (
      <>
        <Link to="/profile" className="block py-2 hover:text-purple-400" onClick={closeMenu}>
          Perfil
        </Link>
        {isAdmin && (
          <Link to="/admin" className="block py-2 hover:text-purple-400" onClick={closeMenu}>
            Panel de Administrador
          </Link>
        )}
        <Link to="/favorites" className="block py-2 hover:text-purple-400" onClick={closeMenu}>
          Favoritos
        </Link>
        <button 
          onClick={() => handleNavigation('contact')} 
          className="block w-full text-left py-2 hover:text-purple-400"
        >
          Contacto
        </button>
        <button 
          onClick={handleLogout} 
          className="block w-full text-left py-2 hover:text-purple-400"
        >
          Cerrar Sesión
        </button>
      </>
    ) : (
      <>
        <Link to="/login" className="block py-2 hover:text-purple-400" onClick={closeMenu}>
          Iniciar Sesión
        </Link>
        <Link to="/register" className="block py-2 hover:text-purple-400" onClick={closeMenu}>
          Registrarse
        </Link>
        <Link to="/favorites" className="block py-2 hover:text-purple-400" onClick={closeMenu}>
          Favoritos
        </Link>
        <button 
          onClick={() => handleNavigation('contact')} 
          className="block w-full text-left py-2 hover:text-purple-400"
        >
          Contacto
        </button>
      </>
    )
  ), [user, isAdmin, handleLogout, handleNavigation]);

  const CartBadge = useMemo(() => (
    itemCount > 0 && (
      <span className="absolute -top-2 -right-4 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
        {itemCount}
      </span>
    )
  ), [itemCount]);

  const mobileMenu = useMemo(() => (
    <motion.div
      initial={ANIMATION_CONFIG.mobileMenuInitial}
      animate={ANIMATION_CONFIG.mobileMenuAnimate}
      className="md:hidden bg-gray-900 p-4 mt-4 flex flex-col gap-4 light:bg-gray-200"
    >
      {user && (
        <span className="text-white">Hola, {user.user_metadata.name}</span>
      )}
      <NavButton 
        onClick={() => handleNavigation('home')} 
        isActive={isActive('/')}
      >
        <Home className="h-5 w-5" /> Inicio
      </NavButton>
      
      <NavLink 
        to="/products" 
        onClick={closeMenus} 
        isActive={isActive('/products')}
      >
        <Package className="h-5 w-5" /> Productos
      </NavLink>
      
      <NavLink 
        to="/cart" 
        onClick={closeMenus} 
        isActive={isActive('/cart')}
      >
        <div className="relative flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" /> Carrito
          {CartBadge}
        </div>
      </NavLink>
      
      <Link 
        to="/articles" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white hover:text-purple-400 transition-colors flex items-center gap-2" 
        onClick={closeMenus}
      >
        <Book className="h-5 w-5" /> Artículos
      </Link>
      
      
      
      {renderAuthMenuItems(closeMenus)}
    </motion.div>
  ), [isActive, CartBadge, user, closeMenus, renderAuthMenuItems, handleNavigation]);

  return (
    <motion.nav
      initial={ANIMATION_CONFIG.navbarInitial}
      animate={ANIMATION_CONFIG.navbarAnimate}
      className="fixed w-full bg-black/90 backdrop-blur-sm z-50 px-6 py-4 light:bg-gray-100/90"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <Gem className="h-6 w-6 text-purple-500" />
          <span className="text-2xl font-medium">Outside Zone</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <NavButton 
            onClick={() => handleNavigation('home')} 
            isActive={isActive('/')}
          >
            <Home className="h-5 w-5" /> Inicio
          </NavButton>
          
          <NavLink 
            to="/products" 
            onClick={closeMenus}
            isActive={isActive('/products')}
          >
            <Package className="h-5 w-5" /> Productos
          </NavLink>
          
          <NavLink 
            to="/cart" 
            onClick={closeMenus}
            isActive={isActive('/cart')}
          >
            <div className="relative flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" /> Carrito
              {CartBadge}
            </div>
          </NavLink>
          
          <Link 
            to="/articles" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-purple-400 transition-colors flex items-center gap-2"
          >
            <Book className="h-5 w-5" /> Artículos
          </Link>
          
          {/* Account Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleAccountMenu} 
              className="text-white hover:text-purple-400 transition-colors flex items-center gap-2"
            >
              <User className="h-5 w-5" />
              {user ? `Hola, ${user.user_metadata.name}` : 'Cuenta'}
            </button>
            
            {isAccountOpen && (
              <motion.div
                initial={ANIMATION_CONFIG.accountMenuInitial}
                animate={ANIMATION_CONFIG.accountMenuAnimate}
                className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg p-4 text-white light:bg-gray-200 light:text-black"
              >
                {renderAuthMenuItems(() => setIsAccountOpen(false))}
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white light:text-black" 
          onClick={toggleMobileMenu} 
          aria-label="Toggle mobile menu"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileOpen && mobileMenu}
    </motion.nav>
  );
};

export default Navbar;