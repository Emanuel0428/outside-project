import React from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-black/90 backdrop-blur-sm z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="h-8 w-8 text-purple-500" />
          <span className="text-2xl font-bold text-white">Outside</span>
        </div>
        
        <div className="hidden md:flex gap-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-white hover:text-purple-400 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('products')}
            className="text-white hover:text-purple-400 transition-colors"
          >
            Products
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-white hover:text-purple-400 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;