import { useCallback, lazy, Suspense, memo } from 'react';
import { motion } from 'framer-motion';
import { loadFull } from "tsparticles";
import { Engine } from 'tsparticles-engine';
import DecryptedText from '@/components/assets/DecryptedText';
import TopText from '@/components/sections/TopText';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const Particles = lazy(() => import('react-particles'));

const ANIMATION_CONFIG = {
  title: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } },
  subtitle: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3, duration: 0.6 } },
  button: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6, duration: 0.5 } }
};

const PARTICLES_OPTIONS = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: "#ffffff" },
    links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
    move: { direction: "none" as const, enable: true, outModes: { default: "bounce" as const }, random: false, speed: 1, straight: false },
    number: { value: 30, density: { enable: true, area: 800 } },
    opacity: { value: 0.3 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true
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
  speed: 100
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
      className="relative h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900 overflow-hidden"
    >
      {/* SEO Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(SCHEMA_DATA)}
        </script>
      </Helmet>
      
      {/* Announcement banner */}
      <TopText />
      
      {/* Background particles */}
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={PARTICLES_OPTIONS}
          className="absolute inset-0"
        />
      </Suspense>
      
      {/* Hero content */}
      <div className="text-center z-10">
        {/* Title with decrypt effect */}
        <motion.h1
          {...ANIMATION_CONFIG.title}
          className="text-6xl md:text-8xl font-bold text-white mb-4"
        >
          <DecryptedText
            text="OUTSIDE"
            speed={DECRYPT_CONFIG.speed}
            characters={DECRYPT_CONFIG.characters}
            className="text-white"
            encryptedClassName="text-purple-900"
            parentClassName="font-mono text-3xl"
            animateOn="view"
          />
        </motion.h1>
        
        {/* Subtitle with decrypt effect */}
        <motion.p
          {...ANIMATION_CONFIG.subtitle}
          className="text-xl md:text-5xl text-purple-200 mb-8 Oswald"
        >
          <DecryptedText
            text="Redefiniendo el estilo y el vapor..."
            speed={DECRYPT_CONFIG.speed}
            characters={DECRYPT_CONFIG.characters}
            className="text-white"
            encryptedClassName="text-purple-500"
            parentClassName="font-mono text-3xl"
            animateOn="view"
          />
        </motion.p>
        
        {/* CTA Button */}
        <motion.button
          {...ANIMATION_CONFIG.button}
          onClick={handleExplore}
          className="px-8 py-3 bg-purple-600 text-white text-lg rounded-3xl hover:bg-purple-700 transition-colors"
          aria-label="Explorar productos"
        >
          Explorar
        </motion.button>
      </div>
    </div>
  );
};

export default memo(Hero);