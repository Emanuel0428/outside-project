import React from 'react';
import { Cloud, Github } from 'lucide-react';

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
        <div className="border-t border-gray-800 pt-8 text-gray-400 flex flex-col items-center justify-center text-center">
          <p>&copy; {new Date().getFullYear()} Outside. Todos los derechos reservados.</p>
          <a 
            href="https://github.com/Emanuel0428" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-center gap-4 hover:text-purple-400 transition-colors"
          >
            <span>@Desarrollado por</span>
            <Github className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;