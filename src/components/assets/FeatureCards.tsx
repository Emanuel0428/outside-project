"use client";

import React from "react";
import { ShieldCheck, Truck, CreditCard, Users } from "lucide-react";
import { motion} from 'framer-motion';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCards() {
  const features: Feature[] = [
    {
      icon: <Truck className="h-10 w-10 text-purple-glow" />,
      title: "Envío Rápido",
      description: "Envíos gratis en Medellín y alrededores en pedidos superiores a 120.000COP.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-purple-glow" />,
      title: "Productos Garantizados",
      description: "Todos nuestros productos cuentan con garantía de calidad y autenticidad.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-purple-glow" />,
      title: "Pago Seguro",
      description: "Múltiples métodos de pago seguros para tu tranquilidad.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-glow" />,
      title: "Comunidad Activa",
      description: "Únete a nuestra comunidad de entusiastas del estilo urbano.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-purple-900 to-black py-4 px-6 min-h-screen">
      <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-100">
              El Estilo Outside
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Fusionamos la cultura urbana con un toque alternativo para crear productos que no solo satisfacen necesidades, sino que definen un estilo de vida auténtico y vibrante.
            </p>
        </motion.div>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl max-h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-purple-dark p-6 rounded-xl border border-purple-border flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_#9333ea] hover:border-purple-glow"
              aria-label={feature.title}
            >
              <div className="p-3 bg-purple-border/50 rounded-full mb-4 group-hover:animate-pulse-icon">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}