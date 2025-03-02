import React from 'react';
import { motion } from 'framer-motion';

const TopText = () => {
  return (
    <div className="fixed top-[64px] left-0 w-full bg-black text-white py-2 overflow-hidden z-40">
      <motion.div
        className="inline-block whitespace-nowrap text-center text-sm md:text-base"
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        Si haces compras superiores a $ 100.000 el envío será gratis — ¡Aprovecha ahora!
      </motion.div>
    </div>
  );
};

export default TopText;