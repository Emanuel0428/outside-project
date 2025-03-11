import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewReleases = () => {
  const video1Url = 'https://www.youtube.com/embed/G0yuFJPMTg4';
  const video2Url = 'https://www.youtube.com/embed/NDlRq_vZcRo';

  const videoSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Rifbar Turbo X Launch",
    "description": "Discover the new Rifbar Turbo X with 25,000 puffs and innovative design.",
    "thumbnailUrl": "https://i.postimg.cc/WbsP2tzt/portada-ritfbar-turbo-x.webp",
    "uploadDate": "2025-03-01",
    "contentUrl": video1Url,
    "embedUrl": video1Url,
    "interactionCount": "1000"
  }), []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <section id="new-releases" className="bg-black py-20 px-6 text-white">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(videoSchema)}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Nuevos Lanzamientos: Rifbar Turbo X
        </motion.h2>
        <Slider {...settings}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              src={video1Url}
              title="Rifbar Turbo X Launch"
              className="w-full h-64 md:h-96"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              src={video2Url}
              title="Rifbar Turbo X Launch"
              className="w-full h-64 md:h-96"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </Slider>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8 text-lg text-gray-300"
        >
          Descubre el Rifbar Turbo X: potencia, estilo y sabor en un solo dispositivo.
          <p className="text-lg text-gray-300 mb-4">Disponible ahora con 15,000 puffs y nuevos sabores.</p>
          <Link
            to="/product/1"
            className="inline-block px-12 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            aria-label="Get your Rifbar Turbo X now"
          >
            Consigue el tuyo!
          </Link>
        </motion.p>
      </div>
    </section>
  );
};

export default React.memo(NewReleases);