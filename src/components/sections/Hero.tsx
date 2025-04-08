import React, { useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { loadFull } from "tsparticles";
import { Engine } from 'tsparticles-engine';
import DecryptedText from '@/components/assets/DecryptedText';
import TopText from '@/components/sections/TopText';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const Particles = lazy(() => import('react-particles'));

const Hero = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const navigate = useNavigate();

  return (
    <div id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900 overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://outside-zone.com/",
            "name": "Outside",
            "description": "Redefiniendo el estilo y el vapor con productos innovadores."
          })}
        </script>
      </Helmet>
      <TopText />
      <Suspense fallback={<div>Loading...</div>}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: { value: "#ffffff" },
              links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
              move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
              number: { value: 40, density: { enable: true, area: 800 } },
              opacity: { value: 0.3 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      </Suspense>
      <div className="text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold text-white mb-4"
        >
          <DecryptedText
            text="OUTSIDE"
            speed={100}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
            className="text-white"
            encryptedClassName="text-purple-900"
            parentClassName="font-mono text-3xl"
            animateOn="view"
          />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl md:text-5xl text-purple-200 mb-8 Oswald"
        >
          <DecryptedText
            text="Redefiniendo el estilo y el vapor..."
            speed={100}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
            className="text-white"
            encryptedClassName="text-purple-500"
            parentClassName="font-mono text-3xl"
            animateOn="view"
          />
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onClick={() => navigate('/products')}
          className="px-8 py-3 bg-purple-600 text-white text-lg rounded-3xl hover:bg-purple-700 transition-colors"
        >
          Explorar
        </motion.button>
      </div>
    </div>
  );
};

export default React.memo(Hero);