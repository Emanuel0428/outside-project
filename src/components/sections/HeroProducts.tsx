import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, ShieldCheck, Leaf, Users } from 'lucide-react';

const HeroProducts = () => {
  // Estado para controlar qué carrusel se muestra: "vapes" o "streetwear"
  const [activeCategory, setActiveCategory] = useState("vapes");
  
  // Datos estructurados para SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'El Estilo Outside: Cultura Urbana y Estilo Alternativo',
    description: 'Descubre la filosofía y estilo único que hace de Outside una marca diferente en el mundo de los accesorios tecnológicos y la moda urbana.',
    image: 'https://outside-project.vercel.app/logo.webp',
    author: {
      '@type': 'Organization',
      name: 'Outside Zone',
      url: 'https://outside-project.vercel.app'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Outside Zone',
      logo: {
        '@type': 'ImageObject',
        url: 'https://outside-project.vercel.app/logo.webp'
      }
    },
    datePublished: '2025-05-07'
  };

  return (
    <section id="outside-style" className="py-20 px-6 text-white min-h-screen scroll-section seamless-section" style={{ background: 'transparent' }}>
        <Helmet>
          <title>El Estilo Outside | Cultura Urbana y Estilo Alternativo</title>
          <meta name="description" content="Descubre la filosofía y estilo único que hace de Outside una marca diferente en el mundo de los accesorios tecnológicos y la moda urbana." />
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Helmet>      
      <div className="max-w-6xl mx-auto mt-20">

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 overflow-hidden"
        >
          {/* Fondo con efecto parallax */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10"></div>
            <motion.div 
              className="absolute inset-0 bg-[url('/images/background-urban.webp')] bg-cover bg-center"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 2.5 }}
            ></motion.div>
          </div>

          {/* Elementos gráficos */}
          <div className="absolute inset-0 -z-5 overflow-hidden">
            <motion.div
              className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-purple-600/20 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div
              className="absolute bottom-10 -left-10 w-64 h-64 rounded-full bg-indigo-600/20 blur-xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div 
              className="absolute right-1/3 top-1/3 w-32 h-32 rounded-full bg-violet-600/30 blur-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Elementos de diseño urbano */}
            <svg className="absolute right-0 top-0 h-full w-1/4 text-purple-500/10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M100,0 L70,0 C60,20 60,40 70,60 C80,80 90,90 100,100 L100,0 Z"
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                stroke="currentColor"
                strokeWidth="0.5"
                fill="currentColor"
              />
            </svg>
            <svg className="absolute left-0 bottom-0 h-full w-1/4 text-purple-500/10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0,100 L30,100 C40,80 40,60 30,40 C20,20 10,10 0,0 L0,100 Z"
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                stroke="currentColor"
                strokeWidth="0.5"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Contenido principal */}
          <div className="relative z-20 py-16 px-6 md:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="text-sm font-mono tracking-wider text-purple-400 mb-3 uppercase">
                      Outside Zone® | Est. 2020
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200">
                      NO SOMOS SOLO UN ESTILO,<br/> 
                      <span className="text-white">SOMOS UNA CULTURA</span>
                    </h2>
                    <div className="prose prose-lg prose-invert mb-8 text-purple-100/90">
                      <p>Accesorios tecnológicos premium y streetwear diseñados para quienes se atreven a ser diferentes. Únete a la comunidad que está redefiniendo el estilo urbano en Colombia.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8">
                      <button
                        onClick={() => setActiveCategory("vapes")}
                        className={`group relative overflow-hidden rounded-xl ${
                          activeCategory === "vapes" 
                            ? "bg-gradient-to-br from-purple-600 to-indigo-700" 
                            : "bg-transparent border border-purple-500/80 text-purple-200"
                        } px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/30`}
                      >
                        <span className="relative z-10">Accesorios Tech</span>
                        <span className={`absolute inset-0 h-full w-full bg-gradient-to-br from-purple-500 to-indigo-600 opacity-0 transition-opacity duration-300 ${
                          activeCategory === "vapes" ? "opacity-100" : "group-hover:opacity-100"
                        }`}></span>
                        <span className="absolute bottom-0 right-0 -mb-2 -mr-2 h-16 w-16 rounded-full bg-white/10 transition-all duration-500 group-hover:scale-150"></span>
                      </button>
                      
                      <button
                        onClick={() => setActiveCategory("streetwear")}
                        className={`group relative overflow-hidden rounded-xl ${
                          activeCategory === "streetwear" 
                            ? "bg-gradient-to-br from-purple-600 to-indigo-700" 
                            : "bg-transparent border border-purple-500/80 text-purple-200"
                        } px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/30`}
                      >
                        <span className="relative z-10">Streetwear</span>
                        <span className={`absolute inset-0 h-full w-full bg-gradient-to-br from-purple-800/80 to-indigo-900/80 opacity-0 transition-opacity duration-300 ${
                          activeCategory === "streetwear" ? "opacity-100" : "group-hover:opacity-100"
                        }`}></span>
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-8 w-8 rounded-full border-2 border-purple-900 bg-gradient-to-br from-purple-600 to-indigo-700"></div>
                        ))}
                      </div>
                      <div className="text-sm text-purple-200">
                        <span className="font-bold">+2.5K</span> personas ya son parte de la cultura Outside
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="order-1 md:order-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-indigo-500/20 blur-lg"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-black/50 shadow-2xl">
                      {/* Carruseles con cambio según selección */}
                      <div className="relative h-[350px] w-full">
                        <AnimatePresence mode="wait">
                          {/* Carrusel de Accesorios Tech */}
                          {activeCategory === "vapes" && (
                            <motion.div
                              key="vapes-carousel"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0"
                            >
                              <motion.div
                                className="flex h-full"
                                animate={{ x: ["0%", "-66.66%"] }}
                                transition={{ 
                                  duration: 20, 
                                  repeat: Infinity, 
                                  ease: "linear",
                                  repeatType: "loop"
                                }}
                              >
                                {/* Productos de accesorios tecnológicos */}
                                <div className="flex-shrink-0 w-1/3 h-full p-4">
                                  <div className="relative h-full rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-black to-purple-900/20">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <img 
                                        src="https://i.postimg.cc/T1CDj1tS/outside-rifbar-turbo-x-portada.webp" 
                                        alt="Dispositivo RifBar Turbo X" 
                                        className="h-[95%] w-auto max-w-[90%] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                      <p className="text-xs font-mono text-purple-300 uppercase">Accesorios Tech</p>
                                      <p className="text-base font-semibold text-white">RifBar Turbo X</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex-shrink-0 w-1/3 h-full p-4">
                                  <div className="relative h-full rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-black to-purple-900/20">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <img 
                                        src="https://i.postimg.cc/HWR3gSQ9/outside-MTRX-portada.webp" 
                                        alt="Dispositivo MTRX 25k" 
                                        className="h-[95%] w-auto max-w-[90%] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                      <p className="text-xs font-mono text-purple-300 uppercase">Accesorios Tech</p>
                                      <p className="text-base font-semibold text-white">MTRX 25k</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex-shrink-0 w-1/3 h-full p-4">
                                  <div className="relative h-full rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-black to-purple-900/20">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <img 
                                        src="https://i.postimg.cc/525jD8r8/outside-portada-Ai-RMEZ-Mars.webp" 
                                        alt="Dispositivo AirMez Mars" 
                                        className="h-[95%] w-auto max-w-[90%] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                      <p className="text-xs font-mono text-purple-300 uppercase">Accesorios Tech</p>
                                      <p className="text-base font-semibold text-white">AirMez Mars 20k</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex-shrink-0 w-1/3 h-full p-4">
                                  <div className="relative h-full rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-black to-purple-900/20">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <img 
                                        src="https://i.postimg.cc/k4YzQKpX/outside-taijizen-judo-portada.webp" 
                                        alt="Dispositivo Taijizen JuDo" 
                                        className="h-[95%] w-auto max-w-[90%] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                      <p className="text-xs font-mono text-purple-300 uppercase">Accesorios Tech</p>
                                      <p className="text-base font-semibold text-white">Taijizen JuDo 24k</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </motion.div>
                          )}
                          
                          {/* Carrusel de Streetwear */}
                          {activeCategory === "streetwear" && (
                            <motion.div
                              key="streetwear-carousel"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0"
                            >
                              <motion.div
                                className="flex h-full"
                                animate={{ x: ["0%", "-75%"] }}
                                transition={{ 
                                  duration: 18, 
                                  repeat: Infinity, 
                                  ease: "linear", 
                                  repeatType: "loop"
                                }}
                              >
                                {/* Productos de streetwear */}
                                <div className="flex-shrink-0 w-1/3 h-full p-4">
                                  <div className="relative h-full rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-black to-purple-900/20">
                                    <div className="h-full">
                                      <img 
                                        src="https://i.postimg.cc/FFZgBhr3/outside-hoodie-soon.jpg" 
                                        alt="Urban Hoodie" 
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 hover:opacity-80"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                      <p className="text-xs font-mono text-purple-300 uppercase">Streetwear</p>
                                      <p className="text-base font-semibold text-white">Urban Hoodie</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex-shrink-0 w-1/3 h-full p-4">
                                  <div className="relative h-full rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-black to-purple-900/20">
                                    <div className="h-full">
                                      <img 
                                        src="https://i.postimg.cc/VvY9kVRJ/outside-camisa-soon.jpg" 
                                        alt="Camisa Urbana Tech" 
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 hover:opacity-80"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                      <p className="text-xs font-mono text-purple-300 uppercase">Streetwear</p>
                                      <p className="text-base font-semibold text-white">Camisa Urbana Tech</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex-shrink-0 w-1/3 h-full p-4">
                                  <div className="relative h-full rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-black to-purple-900/20">
                                    <div className="h-full">
                                      <img 
                                        src="https://i.postimg.cc/2y2Qb7c2/outside-cargo-soon.jpg" 
                                        alt="Pantalón Cargo Tech" 
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 hover:opacity-80"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                      <p className="text-xs font-mono text-purple-300 uppercase">Streetwear</p>
                                      <p className="text-base font-semibold text-white">Pantalón Cargo Tech</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex-shrink-0 w-1/3 h-full p-4">
                                  <div className="relative h-full rounded-xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-black to-purple-900/20">
                                    <div className="h-full">
                                      <img 
                                        src="https://i.postimg.cc/dtVmMg3X/outside-gorra-soon.jpg" 
                                        alt="Gorra Urbana" 
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 hover:opacity-80"
                                      />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                                      <p className="text-xs font-mono text-purple-300 uppercase">Streetwear</p>
                                      <p className="text-base font-semibold text-white">Gorra Urbana</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      {/* Overlay con gradiente */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 h-16 top-0 bg-gradient-to-b from-black/70 to-transparent"></div>
                        <div className="absolute inset-x-0 h-16 bottom-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute inset-y-0 w-16 left-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                        <div className="absolute inset-y-0 w-16 right-0 bg-gradient-to-l from-black/70 to-transparent"></div>
                      </div>
                      
                      {/* Control flotante */}
                      <Link 
                        to={`/products?category=${activeCategory === "vapes" ? "vaporizers" : "clothing"}`} 
                        className="absolute bottom-6 right-6 rounded-full bg-purple-600/90 p-3 z-20 hover:bg-purple-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                    
                    {/* Badge flotante */}
                    <motion.div
                      initial={{ opacity: 0, y: 20, rotate: -5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="absolute -bottom-8 -right-8 rounded-full bg-white px-4 py-2 shadow-xl"
                    >
                      <div className="text-sm font-bold text-purple-900">
                        ENVÍO GRATIS +$120K
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroProducts;