import { motion } from 'framer-motion';

const TopText = () => {
  return (
    <div className="fixed top-[64px] left-0 w-full bg-black/90 text-white py-2 overflow-hidden z-40">
      <motion.div
        className="inline-block whitespace-nowrap text-center text-sm md:text-base"
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 30 , repeat: Infinity, ease: 'linear' }}
      >
       -- ENVÍOS EN MEDELLIN Y ALREDEDORES, GRATIS EN PEDIDOS SUPERIORES A 120.000COP -- NACIONALES GRATIS EN PEDIDOS SUPERIORES A 250.000COP --
      </motion.div>
    </div>
  );
};

export default TopText;