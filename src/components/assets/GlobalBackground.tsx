import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useOptimizedAnimations } from '@/lib/hooks';

const GlobalBackground = () => {
  const { shouldReduceAnimations, animationConfig } = useOptimizedAnimations();

  // Memoizar las partículas para evitar recrearlas en cada render
  const floatingShapes = useMemo(() => 
    Array.from({ length: shouldReduceAnimations ? 4 : 8 }, (_, i) => ({ // Menos partículas en dispositivos lentos
      id: i,
      color: i % 4 === 0 ? 'bg-purple-neon' :
             i % 4 === 1 ? 'bg-pink-neon' :
             i % 4 === 2 ? 'bg-cyan-bright' : 'bg-green-neon',
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: shouldReduceAnimations ? 8 : (6 + Math.random() * 2), // Duraciones más largas para mejor rendimiento
      delay: Math.random() * 3,
    })), [shouldReduceAnimations]
  );

  // Configuraciones optimizadas para las animaciones
  const orbAnimationConfig = {
    ease: animationConfig.ease,
    repeat: shouldReduceAnimations ? 0 : Infinity, // Sin animaciones si se prefiere reducir movimiento
  };

  // No renderizar efectos complejos si se prefieren animaciones reducidas
  if (shouldReduceAnimations) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Solo gradientes estáticos para dispositivos de bajo rendimiento */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 60%),
              radial-gradient(circle at 75% 75%, rgba(255, 0, 110, 0.1) 0%, transparent 60%)
            `
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient orbs - Optimizados */}
      <div className="absolute inset-0 opacity-25" style={{ willChange: 'transform' }}>
        <motion.div 
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-glow rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 80, -40, 0], // Reducido el rango de movimiento
            y: [0, -40, 80, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 25, // Aumentado para ser más suave
            ...orbAnimationConfig
          }}
          style={{ willChange: 'transform' }}
        />
        
        <motion.div 
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-neon rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 30,
            delay: 3,
            ...orbAnimationConfig
          }}
          style={{ willChange: 'transform' }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-blue-electric rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 100, -60, 0],
            y: [0, -50, 60, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 35,
            delay: 6,
            ...orbAnimationConfig
          }}
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Floating geometric shapes - Optimizadas */}
      <div className="absolute inset-0 opacity-15">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute w-1.5 h-1.5 rounded-full ${shape.color}`}
            style={{
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              willChange: 'transform, opacity'
            }}
            animate={{
              y: [0, -60, 0], // Reducido el rango de movimiento
              opacity: [0.3, 0.8, 0.3], // Ajustado para mejor visibilidad
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay - Estático para mejor rendimiento */}
      <div 
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px' // Aumentado para menos líneas
        }}
      />

      {/* Radial gradient overlay - Estático */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 75% 75%, rgba(255, 0, 110, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(58, 134, 255, 0.06) 0%, transparent 60%)
          `
        }}
      />
    </div>
  );
};

export default memo(GlobalBackground); 