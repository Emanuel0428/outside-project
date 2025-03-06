import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// URLs de ejemplo para videos e imagen (reemplaza con tus propios enlaces)
const video1Url = 'https://youtu.be/G0yuFJPMTg4';
const video2Url = 'https://www.youtube.com/watch?v=NDlRq_vZcRo';
{/*const vapeImage = 'https://i.postimg.cc/WbsP2tzt/portada-ritfbar-turbo-x.webp';*/}

const NewReleases = () => {
  return (
    <section id="new-releases" className="bg-black py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Nuevos Lanzamientos: Rifbar Turbo X
        </motion.h2>

        {/* Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <video
              src={video1Url}
              controls
              muted
              loop
              className="w-full h-auto"
              onError={(e) => console.error('Error loading video 1:', e)}
            >
              Tu navegador no soporta videos.
            </video>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <video
              src={video2Url}
              controls
              muted
              loop
              className="w-full h-auto"
              onError={(e) => console.error('Error loading video 2:', e)}
            >
              Tu navegador no soporta videos.
            </video>
          </motion.div>
        </div>

        {/* Animación del vape 
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center"
        >
          <img
            src={vapeImage}
            alt="Rifbar Turbo X"
            className="max-w-xs md:max-w-md h-auto object-contain"
          />
        </motion.div>*/}

        {/* Texto descriptivo opcional */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8 text-lg text-gray-300"
        >
          Descubre el Rifbar Turbo X: potencia, estilo y sabor en un solo dispositivo.
          <p className="text-lg text-gray-300 mb-4">Disponible ahora con 25,000 puffs y nuevos sabores.</p>
            <Link
                // link a el producto con id 1
                to="/product/1"
                className="inline-block px-12 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
                Consigue el tuyo!
            </Link>
        </motion.p>
      </div>
    </section>
  );
};

export default NewReleases;