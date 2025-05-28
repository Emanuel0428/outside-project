"use client";

import { ShieldCheck, Truck, CreditCard, Users, Sparkles, Zap } from "lucide-react";
import { motion } from 'framer-motion';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

export default function FeatureCards() {
  const features: Feature[] = [
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Envío Rápido",
      description: "Envíos gratis en Medellín y alrededores en pedidos superiores a 120.000COP.",
      color: "text-blue-electric",
      gradient: "from-blue-electric to-cyan-bright"
    },
    {
      icon: <ShieldCheck className="h-12 w-12" />,
      title: "Productos Garantizados",
      description: "Todos nuestros productos cuentan con garantía de calidad y autenticidad.",
      color: "text-green-neon",
      gradient: "from-green-neon to-emerald-400"
    },
    {
      icon: <CreditCard className="h-12 w-12" />,
      title: "Pago Seguro",
      description: "Múltiples métodos de pago seguros para tu tranquilidad.",
      color: "text-orange-vibrant",
      gradient: "from-orange-vibrant to-yellow-electric"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Comunidad Activa",
      description: "Únete a nuestra comunidad de entusiastas del estilo urbano.",
      color: "text-pink-neon",
      gradient: "from-pink-neon to-purple-light"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <div className="py-0 px-6 min-h-screen relative overflow-hidden scroll-section seamless-section section-transition" style={{ background: 'transparent' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-glow rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-neon rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-electric rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-32 left-20 text-purple-neon animate-float"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Sparkles size={20} />
        </motion.div>
        <motion.div 
          className="absolute top-40 right-32 text-cyan-bright animate-float"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          style={{ animationDelay: '0.5s' }}
        >
          <Zap size={24} />
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-40 text-pink-neon animate-float"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          style={{ animationDelay: '1s' }}
        >
          <Sparkles size={18} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10 pt-20"
      >
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 gradient-text neon-text font-oswald"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        >
          El Estilo Outside
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-inter leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Fusionamos la cultura urbana con un toque alternativo para crear productos que no solo satisfacen necesidades, sino que definen un estilo de vida auténtico y vibrante.
        </motion.p>
        
        {/* Decorative line */}
        <motion.div 
          className="w-32 h-1 bg-gradient-secondary mx-auto mt-8 rounded-full animate-gradient-shift"
          initial={{ width: 0 }}
          whileInView={{ width: 128 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        ></motion.div>
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative"
            >
              {/* Card background with glass effect */}
              <div className="glass-effect p-8 rounded-3xl border border-purple-border/30 flex flex-col items-center text-center shadow-card transition-all duration-500 hover:shadow-card-hover card-hover relative overflow-hidden">
                
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 rounded-3xl"></div>
                
                {/* Icon container with enhanced effects */}
                <motion.div 
                  className={`p-4 bg-purple-border/30 rounded-2xl mb-6 ${feature.color} relative group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    {feature.icon}
                  </div>
                </motion.div>
                
                {/* Title with gradient effect */}
                <motion.h3 
                  className="text-2xl font-bold text-white mb-4 font-oswald relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="group-hover:gradient-text transition-all duration-300">
                    {feature.title}
                  </span>
                </motion.h3>
                
                {/* Description */}
                <p className="text-gray-300 text-base md:text-lg leading-relaxed font-inter group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={feature.color}
                  >
                    <Sparkles size={16} />
                  </motion.div>
                </div>
              </div>
              
              {/* External glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            className="group relative px-10 py-4 mb-10 bg-gradient-secondary text-white text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow-lg border-2 border-transparent hover:border-purple-neon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100"></div>
            <span className="relative z-10 flex items-center gap-3">
              <Zap className="w-5 h-5 animate-pulse-icon" />
              Descubre Más
              <Sparkles className="w-5 h-5 animate-pulse-icon" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}