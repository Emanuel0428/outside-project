import { useCallback, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import { Helmet } from 'react-helmet-async';
import { Book, Info, ShoppingCart, Share2, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '@/components/assets/Loader';

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error('Error loading tsparticles:', error);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      controls.start({ opacity: 1, transition: { duration: 0.5 } });
    }, 2000);

    return () => clearTimeout(timer);
  }, [controls]);


  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } },
  };

  const shareOnX = (title: string, url: string) => {
    const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden scroll-section seamless-section" style={{ background: 'transparent' }}>
      <Helmet>
        <title>Guía Completa de Vapes y Vaporizadores 2025 | Outside Zone</title>
        <meta
          name="description"
          content="Todo lo que necesitas saber sobre vapes: tipos, sabores, precios, durabilidad y consejos para principiantes. La guía definitiva sobre vaporizadores en Colombia para 2025."
        />
        <meta
          name="keywords"
          content="vapes, mejores vapes, vapes desechables, vapes recargables, vaping, vapes en Colombia, precios de vapes, dónde comprar vapes, vapes saludables, consecuencias de los vapes, sabores de vapes, vapes para principiantes, vapes 2025, vaporizadores"
        />
        <link rel="canonical" href="https://outside-project.vercel.app/articles" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Guía Completa de Vapes y Vaporizadores 2025 | Outside Zone" />
        <meta property="og:description" content="Todo lo que necesitas saber sobre vapes: tipos, sabores, precios y consejos. Descubre los mejores vaporizadores en Colombia." />
        <meta property="og:url" content="https://outside-project.vercel.app/articles" />
        <meta property="og:image" content="https://i.postimg.cc/DZMQBTZT/articulo-1-outsidezone.png" />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guía Definitiva de Vapes 2025 | Outside Zone" />
        <meta name="twitter:description" content="Los mejores vapes, sabores y consejos para vaping. Todo lo que debes saber sobre vaporizadores en Colombia y Latinoamérica." />
        <meta name="twitter:image" content="https://i.postimg.cc/DZMQBTZT/articulo-1-outsidezone.png" />
        
        {/* Datos estructurados para FAQ */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Qué son los vapes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Los vapes, también conocidos como vapers o cigarros electrónicos, son dispositivos que vaporizan líquidos con nicotina, sabores y otros químicos para inhalar, ofreciendo una alternativa al tabaco tradicional."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuánto cuestan los vapes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Los precios varían: los vapes desechables cuestan entre 30.000 y 90.000 COP, mientras que los vapes recargables suelen estar entre 60.000 y 150.000 COP, dependiendo de la marca y las características."
                }
              },
              {
                "@type": "Question",
                "name": "¿Son los vapes dañinos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aunque son menos dañinos que los cigarrillos tradicionales, los vapes contienen nicotina y químicos que pueden afectar los pulmones. Optar por vapes sin nicotina puede ser una opción más saludable."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuánto duran los vapes desechables?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "La duración depende del modelo. Los vaporizadores con 5000 puffs duran aproximadamente 1-2 semanas, los de 10000 puffs entre 2-3 semanas, y los de 15000 puffs pueden durar hasta un mes con uso moderado."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuáles son los mejores sabores de vapes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Los sabores más populares incluyen Blue Razz Ice, Strawberry Mango, Mint, Watermelon y Mixed Berries. La preferencia depende del gusto personal, pero los sabores frutales y mentolados son los favoritos."
                }
              }
            ]
          })}
        </script>
        
        {/* Datos estructurados para Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Guía Completa de Vapes y Vaporizadores para 2025",
            "description": "Todo lo que necesitas saber sobre vapes: tipos, sabores, precios, durabilidad y consejos para principiantes.",
            "image": "https://i.postimg.cc/DZMQBTZT/articulo-1-outsidezone.png",
            "datePublished": "2023-09-15T08:00:00+08:00",
            "dateModified": "2025-05-01T08:00:00+08:00",
            "author": {
              "@type": "Organization",
              "name": "Outside Zone",
              "url": "https://outside-project.vercel.app/"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Outside Zone",
              "logo": {
                "@type": "ImageObject",
                "url": "https://outside-project.vercel.app/logo.webp"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://outside-project.vercel.app/articles"
            }
          })}
        </script>
        
        {/* Datos estructurados para BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://outside-project.vercel.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Artículos",
                "item": "https://outside-project.vercel.app/articles"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Fondo de partículas */}
      <Particles
        id="tsparticles-articles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 120,
          particles: {
            color: { value: '#ffffff' },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: { default: 'bounce' },
              random: false,
              speed: 1,
              straight: false,
            },
            number: { value: 30, density: { enable: true, area: 800 } },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto py-20 px-6 sm:px-8 lg:px-12">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-5xl md:text-6xl font-bold text-center mb-16 font-mono text-purple-200"
        >
          <span className="inline-flex items-center gap-2">
            <Book className="h-8 w-8" /> Artículos sobre Vapes y Vaping
          </span>
        </motion.h1>

        {/* Banner promocional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 mb-16 text-center shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¡Descubre los mejores vapes con un 10% de descuento hoy!
          </h3>
          <Link
            to="/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-900 rounded-full font-semibold hover:bg-purple-200 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" /> Explora nuestra tienda ahora
          </Link>
        </motion.div>

        {/* Sección 1: ¿Qué son los vapes? */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg border border-purple-900/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-200 flex items-center gap-2">
              <Info className="h-6 w-6" /> ¿Qué son los vapes y cómo funcionan?
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                  Los <strong>vapes</strong>, también conocidos como <strong>vapers</strong> o cigarros electrónicos, son dispositivos diseñados para vaporizar líquidos que contienen nicotina, sabores y otros componentes químicos. Pero, <strong>¿qué son los vapes</strong> exactamente? Son una alternativa al tabaco tradicional, y existen varios tipos, como los <strong>vapes desechables</strong>, <strong>vapes recargables</strong>, y <strong>vapes con nicotina</strong>. Si te preguntas <strong>cómo funcionan los vapes</strong>, estos dispositivos calientan un líquido (e-liquid) para producir vapor, que luego inhalas.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Marcas como <strong>Geek Bar</strong>, <strong>Fume Vapes</strong>, y <strong>Elf Bar</strong> son algunas de las <strong>mejores marcas de vapes</strong> disponibles en el mercado. ¿Quieres probar uno? <Link to="/products" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Explora nuestra colección de vapes</Link> y encuentra el perfecto para ti.
                </p>
              </div>
              <motion.img
                src="https://i.postimg.cc/DZMQBTZT/articulo-1-outsidezone.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Vape en uso"
                className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-md"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  shareOnX(
                    '¿Qué son los vapes y cómo funcionan? - Outside',
                    `${window.location.origin}/articles#what-are-vapes`
                  )
                }
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <Share2 className="h-5 w-5" /> Compartir en X
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sección 2: Tipos de vapes */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg border border-purple-900/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-200 flex items-center gap-2">
              <Info className="h-6 w-6" /> ¿Cuáles son los tipos de vapes disponibles?
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                  Existen varios <strong>tipos de vapers</strong> que puedes encontrar según tus necesidades. Los <strong>vapes desechables</strong>, como los <strong>Raz Vapes</strong> o <strong>Flum Vapes</strong>, son ideales para principiantes porque no requieren mantenimiento. Por otro lado, los <strong>vapes recargables</strong>, como los ofrecidos por <strong>Smok</strong> o <strong>Vaporesso</strong>, permiten rellenar el líquido y ajustar la potencia.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  También están los <strong>vapes con pantalla</strong>, que ofrecen mayor control, y los <strong>vapes sin nicotina</strong> para quienes buscan una opción más saludable. Si te preguntas <strong>cuáles son los mejores vapes</strong>, depende de tus preferencias: ¿buscas <strong>vapes de mota</strong>, <strong>vapes de fresa</strong>, o algo más exótico como <strong>vapes de mango</strong>? <Link to="/products" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Mira nuestras opciones de vapes desechables y recargables</Link>.
                </p>
              </div>
              <motion.img
                src="https://i.postimg.cc/Hkw2HRSw/articulo-2-outsidezone.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Diferentes tipos de vapes"
                className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-md"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  shareOnX(
                    '¿Cuáles son los tipos de vapes disponibles? - Outside',
                    `${window.location.origin}/articles#types-of-vapes`
                  )
                }
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <Share2 className="h-5 w-5" /> Compartir en X
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sección 3: Mejores sabores de vapes */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg border border-purple-900/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-200 flex items-center gap-2">
              <Star className="h-6 w-6" /> ¿Qué sabores de vapes son los mejores?
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                  Una de las mayores ventajas de los <strong>vapes</strong> es la variedad de sabores disponibles. ¿<strong>Qué sabores de vapers hay</strong>? Desde opciones frutales como <strong>vapes de fresa</strong>, <strong>vapes de mango</strong>, y <strong>vapes de sandía</strong>, hasta sabores más refrescantes como <strong>vapes de menta</strong> o <strong>vapes de blueberry ice</strong>. Los usuarios también adoran los sabores dulces como <strong>vapes de vainilla</strong> o <strong>vapes de caramelo</strong>.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  ¿<strong>Qué sabores de vapers son los mejores</strong>? En Outside, recomendamos probar los <strong>Geek Bar Pulse</strong> con sabor a <strong>Blue Razz Ice</strong> o los <strong>Fume Vapes</strong> con sabor a <strong>Strawberry Mango</strong>. ¿Listo para encontrar tu sabor favorito? <Link to="/products" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Explora nuestra selección de sabores</Link> y descubre el vape perfecto para ti.
                </p>
              </div>
              <motion.img
                src="https://i.postimg.cc/QVLQZJ1Y/articulo-3-outsidezone.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Sabores de vapes"
                className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-md"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  shareOnX(
                    '¿Qué sabores de vapes son los mejores? - Outside',
                    `${window.location.origin}/articles#best-vape-flavors`
                  )
                }
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <Share2 className="h-5 w-5" /> Compartir en X
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sección 4: Precios y dónde comprar */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg border border-purple-900/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-200 flex items-center gap-2">
              <Info className="h-6 w-6" /> ¿Cuánto cuestan los vapes y dónde comprarlos?
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                  Si te preguntas <strong>cuánto cuestan los vapes</strong>, los precios varían según el tipo y la marca. Por ejemplo, los <strong>vapes desechables</strong> como los <strong>Dummy Vapes</strong> o <strong>Breeze Vapes</strong> pueden costar entre $30.000 y $90.000 COP, mientras que los <strong>vapes recargables</strong> suelen estar entre $60.000 y $150.000 COP.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  En <strong>México</strong>, los vapes están prohibidos para su venta directa, pero puedes encontrar <strong>vapes a domicilio</strong> o <strong>vapes por mayoreo</strong> en línea. ¿<strong>Dónde comprar vapes</strong>? Sitios como <strong>Amazon</strong> o mercados especializados ofrecen <strong>vapes al por mayor</strong>. También puedes buscar <strong>vapes cerca de mí</strong> para encontrar opciones locales. En Outside, ofrecemos una amplia selección de <Link to="/products" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">vapes a domicilio</Link> para que disfrutes del mejor vaping.
                </p>
              </div>
              <motion.img
                src="https://i.postimg.cc/XvxkBF6X/articulo-4-outsidezone.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Compra de vapes en línea"
                className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-md"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  shareOnX(
                    '¿Cuánto cuestan los vapes y dónde comprarlos? - Outside',
                    `${window.location.origin}/articles#vape-prices`
                  )
                }
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <Share2 className="h-5 w-5" /> Compartir en X
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sección 5: Consecuencias y salud */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 1.0 }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg border border-purple-900/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-200 flex items-center gap-2">
              <Info className="h-6 w-6" /> ¿Son los vapes dañinos? Consecuencias del vaping
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                  Una pregunta común es: <strong>¿es el vape dañino?</strong> Aunque los vapes se consideran menos dañinos que los cigarrillos tradicionales, no están exentos de riesgos. <strong>¿Cuáles son las consecuencias de los vapes?</strong> Los vapes contienen nicotina y químicos como propilenglicol y glicerina vegetal, que pueden afectar los pulmones a largo plazo.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Si buscas <strong>vapes saludables</strong>, opta por <strong>vapes sin nicotina</strong> o <strong>vapes 0 nicotina</strong>. Además, en <strong>Colombia</strong>, los vapes no son ilegales desde 2022, lo que ha generado debates sobre <strong>por qué son ilegales los vapes en Colombia</strong>. Sin embargo, muchos usuarios siguen prefiriendo el <strong>vaping</strong> como alternativa al tabaco. ¿Quieres una opción más segura? <Link to="/products" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Explora nuestros vapes sin nicotina</Link>.
                </p>
              </div>
              <motion.img
                src="https://i.postimg.cc/nr94WPjQ/articulo-5-outsidezone.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Impacto de los vapes en la salud"
                className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-md"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  shareOnX(
                    '¿Son los vapes dañinos? Consecuencias del vaping - Outside',
                    `${window.location.origin}/articles#vape-health`
                  )
                }
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <Share2 className="h-5 w-5" /> Compartir en X
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sección 6: Duración y puffs */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg border border-purple-900/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-200 flex items-center gap-2">
              <Info className="h-6 w-6" /> ¿Cuánto duran los vapes desechables?
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                  La duración de un vape depende de su capacidad de <strong>puffs</strong>. Por ejemplo, <strong>¿cuánto dura un vape de 5000 puffs?</strong> Un vape de 5000 puffs puede durar entre 1 y 2 semanas para un usuario promedio. Marcas como <strong>Tyson Vapes</strong> o <strong>Spaceman Vape</strong> ofrecen opciones de <strong>vapes 10000 puffs</strong> o incluso <strong>vapes 15000 puffs</strong>, ideales para quienes buscan mayor duración.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Si prefieres algo más pequeño, los <strong>vapes 600 puffs</strong> son una buena opción. ¿Te interesa saber <strong>cuánto duran los vapes recargables</strong>? Esto dependerá de la frecuencia de uso y el mantenimiento. En Outside, ofrecemos <Link to="/products" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">vapes de alta duración</Link> para que disfrutes más tiempo.
                </p>
              </div>
              <motion.img
                src="https://i.postimg.cc/JzVqfMQ7/articulo-6-outsidezone.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Duración de vapes desechables"
                className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-md"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  shareOnX(
                    '¿Cuánto duran los vapes desechables? - Outside',
                    `${window.location.origin}/articles#vape-duration`
                  )
                }
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <Share2 className="h-5 w-5" /> Compartir en X
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sección 7: Cómo elegir un vape */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 1.4 }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg border border-purple-900/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-200 flex items-center gap-2">
              <Info className="h-6 w-6" /> ¿Cómo elegir el vape perfecto para ti?
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                  Elegir el vape ideal puede parecer abrumador con tantas opciones disponibles. Si eres principiante, te recomendamos empezar con un <strong>vape desechable</strong> como los <strong>Flum Vapes</strong> o <strong>Raz Vapes</strong>, que son fáciles de usar y no requieren mantenimiento. Para usuarios más experimentados, un <strong>vape recargable</strong> como los de <strong>Smok</strong> o <strong>Vaporesso</strong> ofrece mayor personalización.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Considera tus preferencias: ¿quieres un <strong>vape con pantalla</strong> para mayor control, o prefieres algo sencillo? ¿Buscas <strong>vapes de mota</strong> o <strong>vapes sin nicotina</strong>? En Outside, te ayudamos a encontrar el vape perfecto para tu estilo. <Link to="/products" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Descubre nuestra selección ahora</Link> y comienza tu experiencia de vaping.
                </p>
              </div>
              <motion.img
                src="https://i.postimg.cc/B66cT6Jp/articulo-7-outsidezone.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Elegir un vape"
                className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-md"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  shareOnX(
                    '¿Cómo elegir el vape perfecto para ti? - Outside',
                    `${window.location.origin}/articles#choose-vape`
                  )
                }
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <Share2 className="h-5 w-5" /> Compartir en X
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sección 8: Vapes para principiantes */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 1.6 }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg border border-purple-900/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-200 flex items-center gap-2">
              <Info className="h-6 w-6" /> Vapes para principiantes: ¿Por dónde empezar?
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                  Si eres nuevo en el mundo del vaping, los <strong>vapes para principiantes</strong> son una excelente opción para comenzar. Los <strong>vapes desechables</strong> son perfectos porque no necesitas preocuparte por recargar líquidos ni cambiar resistencias. Marcas como <strong>Elf Bar</strong> y <strong>Fume Vapes</strong> ofrecen opciones fáciles de usar con sabores deliciosos como <strong>vapes de fresa</strong> o <strong>vapes de menta</strong>.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Además, los vapes desechables suelen ser más baratos, lo que los hace ideales para probar el vaping sin comprometerte. Una vez que te sientas más cómodo, puedes pasar a un <strong>vape recargable</strong> para personalizar tu experiencia. ¿Listo para dar el primer paso? <Link to="/products" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Mira nuestros vapes para principiantes</Link> y empieza tu viaje con estilo.
                </p>
              </div>
              <motion.img
                src="https://i.postimg.cc/BvJCvpyd/articulo-8-outsidezone.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Vapes para principiantes"
                className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-md"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  shareOnX(
                    'Vapes para principiantes: ¿Por dónde empezar? - Outside',
                    `${window.location.origin}/articles#vapes-for-beginners`
                  )
                }
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <Share2 className="h-5 w-5" /> Compartir en X
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sección 9: Preguntas frecuentes */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 1.8 }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg border border-purple-900/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-200 flex items-center gap-2">
              <Info className="h-6 w-6" /> Preguntas frecuentes sobre vaping
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-200">¿Cuántos vapes puedo llevar en un avión?</h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Según las regulaciones de la mayoría de las aerolíneas, puedes llevar vapes en tu equipaje de mano, pero no en el equipaje facturado. Generalmente, se permite un máximo de 2-3 dispositivos por persona. Asegúrate de llevarlos en una bolsa transparente y revisar las políticas de la aerolínea.
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-200">¿Cuántos años tienes que tener para comprar un vape?</h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  En la mayoría de los países, debes tener al menos 21 años para comprar un vape. Sin embargo, en México, la venta de vapes está prohibida, aunque muchas personas los adquieren a través de canales no oficiales.
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-200">¿Qué contienen los vapes?</h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Los vapes suelen contener nicotina, propilenglicol, glicerina vegetal y saborizantes. Si buscas una opción más segura, prueba los <Link to="/products" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">vapes sin nicotina</Link> disponibles en nuestra tienda.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() =>
                  shareOnX(
                    'Preguntas frecuentes sobre vaping - Outside',
                    `${window.location.origin}/articles#vaping-faq`
                  )
                }
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <Share2 className="h-5 w-5" /> Compartir en X
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sección 10: Artículos relacionados */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 2.0 }}
          className="mb-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg border border-purple-900/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-200 flex items-center gap-2">
              <Book className="h-6 w-6" /> Artículos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900 transition-colors">
                <h3 className="text-xl font-semibold text-purple-200 mb-2">
                  Los mejores vapes para 2025
                </h3>
                <p className="text-gray-400 mb-4">
                  Descubre las tendencias de vaping para 2025 y encuentra los mejores vapes del año.
                </p>
                <Link to="/articles#best-vapes-2025" className="text-purple-400 hover:underline flex items-center gap-2">
                  Leer más <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900 transition-colors">
                <h3 className="text-xl font-semibold text-purple-200 mb-2">
                  Guía completa de sabores de vapes
                </h3>
                <p className="text-gray-400 mb-4">
                  Explora todos los sabores de vapes disponibles y encuentra tu favorito.
                </p>
                <Link to="/articles#vape-flavors-guide" className="text-purple-400 hover:underline flex items-center gap-2">
                  Leer más <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900 transition-colors">
                <h3 className="text-xl font-semibold text-purple-200 mb-2">
                  ¿Por qué elegir vapes recargables?
                </h3>
                <p className="text-gray-400 mb-4">
                  Aprende las ventajas de los vapes recargables y cómo sacarles el máximo provecho.
                </p>
                <Link to="/articles#rechargeable-vapes" className="text-purple-400 hover:underline flex items-center gap-2">
                  Leer más <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-center shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para encontrar tu vape ideal?
          </h3>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Explora nuestra tienda y descubre una amplia selección de vapes desechables, recargables y más.
          </p>
          <Link
            to="/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-900 rounded-full font-semibold hover:bg-purple-200 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" /> Ir a la tienda
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Articles;