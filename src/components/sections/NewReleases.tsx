import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products } from '../../data/products';

const NewReleases = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const video1Url = 'https://www.youtube.com/embed/G0yuFJPMTg4';
  const video2Url = 'https://www.youtube.com/embed/NDlRq_vZcRo';

  const rifbarProduct = useMemo(() => products.find((p) => p.id === 1), []);

  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'VideoObject',
          name: 'Rifbar Turbo X Launch Video 1',
          description: 'Discover the new Rifbar Turbo X with 15,000 puffs and innovative design.',
          thumbnailUrl: 'https://i.postimg.cc/WbsP2tzt/portada-ritfbar-turbo-x.webp',
          uploadDate: '2025-03-01',
          contentUrl: video1Url,
          embedUrl: video1Url,
          interactionCount: '1000',
          isRelatedTo: rifbarProduct
            ? {
                '@type': 'Product',
                name: rifbarProduct.name,
                image: rifbarProduct.image,
                description: rifbarProduct.description,
                sku: rifbarProduct.id.toString(),
                brand: {
                  '@type': 'Brand',
                  name: 'RifBar',
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'COP',
                  price: rifbarProduct.price.toString(),
                  availability: 'https://schema.org/InStock',
                  url: 'https://outside-zone.com/product/1',
                },
                hasVariant: rifbarProduct.variants.map((variant) => ({
                  '@type': 'Product',
                  name: `${rifbarProduct.name} - ${typeof variant === 'object' ? variant.name : variant}`,
                  image: typeof variant === 'object' ? variant.image : undefined,
                  description: typeof variant === 'object' ? variant.alt || rifbarProduct.description : rifbarProduct.description,
                })),
              }
            : undefined,
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'VideoObject',
          name: 'Rifbar Turbo X Launch Video 2',
          description: 'Explore the features of the Rifbar Turbo X in this exclusive video.',
          thumbnailUrl: 'https://i.postimg.cc/WbsP2tzt/portada-ritfbar-turbo-x.webp',
          uploadDate: '2025-03-01',
          contentUrl: video2Url,
          embedUrl: video2Url,
          interactionCount: '800',
          isRelatedTo: rifbarProduct
            ? {
                '@type': 'Product',
                name: rifbarProduct.name,
                image: rifbarProduct.image,
                description: rifbarProduct.description,
                sku: rifbarProduct.id.toString(),
                brand: {
                  '@type': 'Brand',
                  name: 'RifBar',
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'COP',
                  price: rifbarProduct.price.toString(),
                  availability: 'https://schema.org/InStock',
                  url: 'https://outside-zone.com/product/1',
                },
                hasVariant: rifbarProduct.variants.map((variant) => ({
                  '@type': 'Product',
                  name: `${rifbarProduct.name} - ${typeof variant === 'object' ? variant.name : variant}`,
                  image: typeof variant === 'object' ? variant.image : undefined,
                  description: typeof variant === 'object' ? variant.alt || rifbarProduct.description : rifbarProduct.description,
                })),
              }
            : undefined,
        },
      },
    ],
  }), [rifbarProduct, video1Url, video2Url]);

  interface SliderSettings {
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    arrows: boolean;
    afterChange: (current: number) => void;
  }

  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (current: number) => setActiveSlide(current),
  };

  return (
    <section id="new-releases" className="bg-gradient-to-b from-purple-900 to-black py-20 px-6 text-white min-h-screen">
      <Helmet>
        <title>Nuevos Lanzamientos - Rifbar Turbo X | Outside</title>
        <meta
          name="description"
          content="Descubre los nuevos lanzamientos de Rifbar Turbo X con 15,000 puffs, diseño innovador y sabores intensos. Mira los videos exclusivos y adquiere el tuyo ahora."
        />
        <meta name="keywords" content="Rifbar Turbo X, nuevos lanzamientos, vaporizadores, vapes, Outside" />
        <script type="application/ld+json">{JSON.stringify(structuredData, null, 2)}</script>
      </Helmet>
      <div className="max-w-7xl mx-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-5xl font-medium text-center mb-12"
        >
          Nuevos Lanzamientos: Rifbar Turbo X
        </motion.h2>
        <Slider {...settings}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            {activeSlide === 0 ? (
              <iframe
                src={video1Url}
                title="Rifbar Turbo X Launch Video 1"
                className="w-full h-64 md:h-96"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="w-full h-64 md:h-96 bg-gray-800" />
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            {activeSlide === 1 ? (
              <iframe
                src={video2Url}
                title="Rifbar Turbo X Launch Video 2"
                className="w-full h-64 md:h-96"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="w-full h-64 md:h-96 bg-gray-800" />
            )}
          </motion.div>
        </Slider>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8 text-lg text-gray-300"
        >
          <p> Descubre el Rifbar Turbo X: potencia, estilo y sabor en un solo dispositivo.</p>
          <p className="text-lg text-gray-300 mb-4">Disponible ahora con 15,000 puffs y nuevos sabores.</p>
          <Link
            to="/product/1"
            className="inline-block px-12 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            aria-label="Get your Rifbar Turbo X now"
          >
            Consigue el tuyo!
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(NewReleases);