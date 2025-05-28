import { memo } from 'react';
import { motion } from 'framer-motion';

interface SectionTransitionProps {
  fromColor?: string;
  toColor?: string;
  height?: string;
  className?: string;
}

const SectionTransition = ({ 
  fromColor = 'transparent', 
  toColor = 'transparent',
  height = 'h-20',
  className = ''
}: SectionTransitionProps) => {
  return (
    <motion.div 
      className={`w-full ${height} relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Gradiente suave de transición */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${fromColor} 0%, transparent 50%, ${toColor} 100%)`
        }}
      />
      
      {/* Partículas flotantes para suavizar la transición */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-neon rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: '50%',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default memo(SectionTransition); 