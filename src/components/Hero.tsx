import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-particles';
import { loadFull } from "tsparticles";
import type { Engine } from 'tsparticles-engine';
import DecryptedText from './DecryptedText';

const Hero = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              value: 80,
              density: {
                enable: true,
                area: 800
              }
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      
      <div className="text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-white mb-4"
        >
          <DecryptedText
              text="OUTSIDE"
              speed={100}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
              className="text-white"
              encryptedClassName="text-red-500"
              parentClassName="font-mono text-3xl"
              animateOn="view"
          />
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-5xl text-purple-200 mb-8"
        >
          <DecryptedText
            text="Redefiniendo el estilo y el vapor"
            speed={100}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
            className="text-white"
            encryptedClassName="text-red-500"
            parentClassName="font-mono text-3xl"
            animateOn="view"
          />
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={scrollToProducts}
          className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          Explorar
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;