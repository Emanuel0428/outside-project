import React from 'react';
import { Cloud, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Cloud className="h-8 w-8 text-purple-500" />
            <span className="text-2xl font-medium">Outside</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="/sitemap" className="hover:text-purple-400 transition-colors" aria-label="Sitemap">
              Sitemap
            </a>
            <a href="/terms" className="hover:text-purple-400 transition-colors" aria-label="Terms and Conditions">
              Términos y Condiciones
            </a>
            <a href="/privacy" className="hover:text-purple-400 transition-colors" aria-label="Privacy Policy">
              Política de Privacidad
            </a>
            <a href="/faq" className="hover:text-purple-400 transition-colors" aria-label="FAQ">
              FAQ
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-gray-400 flex flex-col items-center justify-center text-center">
          <p>© {new Date().getFullYear()} Outside. Todos los derechos reservados.</p>
          <a 
            href="https://github.com/Emanuel0428" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 hover:text-purple-400 transition-colors"
            aria-label="GitHub profile of Emanuel0428"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);