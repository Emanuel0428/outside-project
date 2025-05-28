import { useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { loadFull } from "tsparticles";
import { Engine } from 'tsparticles-engine';
import DecryptedText from '@/components/assets/DecryptedText';
import TopText from '@/components/sections/TopText';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Star } from 'lucide-react';
import OptimizedParticles from '@/components/assets/OptimizedParticles';

const ANIMATION_CONFIG = {
  title: { 
    initial: { opacity: 0, y: 50, scale: 0.8 }, 
    animate: { opacity: 1, y: 0, scale: 1 }, 
    transition: { duration: 0.8, type: "spring", bounce: 0.4 } 
  },
  subtitle: { 
    initial: { opacity: 0, x: -50 }, 
    animate: { opacity: 1, x: 0 }, 
    transition: { delay: 0.4, duration: 0.8, type: "spring" } 
  },
  button: { 
    initial: { opacity: 0, y: 30, scale: 0.8 }, 
    animate: { opacity: 1, y: 0, scale: 1 }, 
    transition: { delay: 0.8, duration: 0.6, type: "spring", bounce: 0.3 } 
  },
  decorativeElements: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: 1, duration: 0.5, staggerChildren: 0.1 }
  }
};

const PARTICLES_OPTIONS = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60, // Reducido para mejor rendimiento
  particles: {
    color: { 
      value: ["#9333ea", "#c084fc", "#e879f9", "#3a86ff"] // Reducido colores
    },
    links: { 
      color: "#9333ea", 
      distance: 120, // Reducido para menos cálculos
      enable: true, 
      opacity: 0.2, // Reducido para menos impacto visual
      width: 1,
      triangles: {
        enable: false // Deshabilitado para mejor rendimiento
      }
    },
    move: { 
      direction: "none" as const, 
      enable: true, 
      outModes: { default: "bounce" as const }, 
      random: false, // Simplificado
      speed: 1.5, // Reducido
      straight: false,
      attract: {
        enable: false // Deshabilitado para mejor rendimiento
      }
    },
    number: { 
      value: 30, // Reducido de 50 a 30
      density: { enable: true, area: 1000 } // Aumentado área para menos densidad
    },
    opacity: { 
      value: { min: 0.3, max: 0.7 },
      animation: {
        enable: true,
        speed: 0.5, // Reducido
        minimumValue: 0.2
      }
    },
    shape: { 
      type: "circle" // Solo círculos para mejor rendimiento
    },
    size: { 
      value: { min: 1, max: 3 }, // Reducido tamaño máximo
      animation: {
        enable: true,
        speed: 1, // Reducido
        minimumValue: 0.5
      }
    }
  },
  detectRetina: true,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse"
      },
      onClick: {
        enable: false // Deshabilitado para mejor rendimiento
      }
    },
    modes: {
      repulse: {
        distance: 80, // Reducido
        duration: 0.3 // Reducido
      }
    }
  }
};

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://outside-zone.com/",
  "name": "Outside",
  "description": "Redefiniendo el estilo y el vapor con productos innovadores."
};

const DECRYPT_CONFIG = {
  characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  speed: 80
};

const Hero = () => {
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const handleExplore = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  return (
    <div 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden scroll-section seamless-section"
      style={{ background: 'transparent' }}
    >
      {/* SEO Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(SCHEMA_DATA)}
        </script>
      </Helmet>
      
      {/* Announcement banner */}
      <TopText />
      
      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-glow rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-neon rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-electric rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Background particles */}
      <OptimizedParticles
        id="tsparticles"
        init={particlesInit}
        options={PARTICLES_OPTIONS}
        className="absolute inset-0"
      />
      
      {/* Decorative floating elements */}
      <motion.div 
        {...ANIMATION_CONFIG.decorativeElements}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div className="absolute top-20 left-20 text-purple-neon animate-float">
          <Sparkles size={24} />
        </motion.div>
        <motion.div className="absolute top-32 right-32 text-pink-neon animate-float" style={{ animationDelay: '0.5s' }}>
          <Zap size={28} />
        </motion.div>
        <motion.div className="absolute bottom-32 left-32 text-cyan-bright animate-float" style={{ animationDelay: '1s' }}>
          <Star size={20} />
        </motion.div>
        <motion.div className="absolute bottom-20 right-20 text-green-neon animate-float" style={{ animationDelay: '1.5s' }}>
          <Sparkles size={32} />
        </motion.div>
      </motion.div>
      
      {/* Hero content */}
      <div className="text-center z-10 max-w-6xl mx-auto px-4">
        {/* Title with enhanced effects */}
        <motion.div
          {...ANIMATION_CONFIG.title}
          className="relative mb-8 mt-20"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 relative">
            <DecryptedText
              text="OUTSIDE"
              speed={DECRYPT_CONFIG.speed}
              characters={DECRYPT_CONFIG.characters}
              className="gradient-text neon-text font-oswald"
              encryptedClassName="text-purple-900"
              parentClassName="font-mono"
              animateOn="view"
            />
            {/* Glow effect behind text */}
            <div className="absolute inset-0 gradient-text blur-lg opacity-50 -z-10"></div>
          </h1>
        </motion.div>
        
        {/* Subtitle with enhanced effects */}
        <motion.div
          {...ANIMATION_CONFIG.subtitle}
          className="relative mb-12"
        >
          <p className="text-xl md:text-3xl lg:text-4xl text-purple-200 mb-4 font-inter">
            <DecryptedText
              text="Redefiniendo el estilo y el vapor..."
              speed={DECRYPT_CONFIG.speed}
              characters={DECRYPT_CONFIG.characters}
              className="gradient-text"
              encryptedClassName="text-purple-500"
              parentClassName="font-inter"
              animateOn="view"
            />
          </p>
          <div className="w-32 h-1 bg-gradient-secondary mx-auto rounded-full animate-gradient-shift"></div>
        </motion.div>
        
        {/* Enhanced CTA Button */}
        <motion.div
          {...ANIMATION_CONFIG.button}
          className="relative"
        >
          <button
            onClick={handleExplore}
            className="group relative px-12 py-4 bg-gradient-secondary text-white text-xl font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow-lg border-2 border-transparent hover:border-purple-neon"
            aria-label="Explorar productos"
          >
            {/* Button background effects */}
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100"></div>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3">
              <Zap className="w-6 h-6 animate-pulse-icon" />
              Explorar Productos
              <Sparkles className="w-6 h-6 animate-pulse-icon" />
            </span>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-secondary blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
          </button>
          
          {/* Floating action indicators */}
          <motion.div 
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-purple-300 text-sm animate-bounce-slow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            ↓ Descubre más ↓
          </motion.div>
        </motion.div>
        
        {/* Stats or features preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="glass-effect p-6 rounded-2xl border border-purple-border/30 card-hover">
            <div className="text-3xl font-bold gradient-text mb-2">500+</div>
            <div className="text-purple-200">Productos Premium</div>
          </div>
          <div className="glass-effect p-6 rounded-2xl border border-purple-border/30 card-hover">
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-purple-200">Soporte Activo</div>
          </div>
          <div className="glass-effect p-6 rounded-2xl border border-purple-border/30 card-hover">
            <div className="text-3xl font-bold gradient-text mb-2">100%</div>
            <div className="text-purple-200">Satisfacción</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Hero);