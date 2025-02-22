import React from 'react';
import { Cloud } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Cloud className="h-8 w-8 text-purple-500" />
            <span className="text-2xl font-bold">Outside</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="hover:text-purple-400 transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-purple-400 transition-colors">FAQ</a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Outside. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;