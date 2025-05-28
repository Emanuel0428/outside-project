import { useRef, useMemo } from "react";
import { Users, Sparkles, ShieldCheck, Leaf, Star, Zap, Heart } from "lucide-react";
import { motion, useInView } from "framer-motion";

const brandValues = [
  {
    icon: <Sparkles className="h-12 w-12" />,
    title: "Innovación Continua",
    description: "Buscamos constantemente nuevas formas de mejorar la experiencia de nuestros clientes, desde la tecnología de nuestros vaporizadores hasta el diseño de nuestras prendas urbanas.",
    color: "text-purple-neon",
    gradient: "from-purple-neon to-purple-light",
    bgGradient: "from-purple-900/20 to-purple-600/20"
  },
  {
    icon: <ShieldCheck className="h-12 w-12" />,
    title: "Calidad Premium",
    description: "Cada producto Outside ha sido diseñado y probado bajo rigurosos estándares de calidad, asegurando una experiencia excepcional en cada uso.",
    color: "text-green-neon",
    gradient: "from-green-neon to-emerald-400",
    bgGradient: "from-green-900/20 to-emerald-600/20"
  },
  {
    icon: <Leaf className="h-12 w-12" />,
    title: "Sostenibilidad",
    description: "Comprometidos con el medio ambiente, implementamos prácticas responsables en nuestra cadena de producción para minimizar nuestro impacto ecológico.",
    color: "text-cyan-bright",
    gradient: "from-cyan-bright to-blue-electric",
    bgGradient: "from-cyan-900/20 to-blue-600/20"
  },
  {
    icon: <Users className="h-12 w-12" />,
    title: "Comunidad y Cultura",
    description: "Más que una marca, somos una comunidad que celebra la diversidad y el estilo único, uniendo personas a través de experiencias compartidas.",
    color: "text-pink-neon",
    gradient: "from-pink-neon to-orange-vibrant",
    bgGradient: "from-pink-900/20 to-orange-600/20"
  }
];

const AboutUs = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-0 px-6 relative overflow-hidden scroll-section seamless-section section-transition" style={{ background: 'transparent' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-20 w-96 h-96 bg-purple-glow rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-pink-neon rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-bright rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-32 text-purple-neon animate-float"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Star size={24} />
        </motion.div>
        <motion.div 
          className="absolute top-40 right-40 text-cyan-bright animate-float"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          style={{ animationDelay: '0.5s' }}
        >
          <Heart size={20} />
        </motion.div>
        <motion.div 
          className="absolute bottom-32 left-32 text-pink-neon animate-float"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          style={{ animationDelay: '1s' }}
        >
          <Zap size={28} />
        </motion.div>
      </div>

      {/* Contenedor centrado */}
      <motion.main 
        ref={containerRef}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-20 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        {/* Sección Izquierda: Imagen */}
        <motion.figure 
          className="flex-shrink-0 relative"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: -30 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-gradient-secondary rounded-full blur-2xl opacity-30 animate-glow-pulse"></div>
          
          <img
            src="/web-app-manifest-512x512.png"
            alt="Logo de Outside"
            width={400}
            height={400}
            className="w-64 h-64 lg:w-96 lg:h-96 rounded-full object-cover transition-all duration-1000 hover:flip-coin border-4 border-purple-glow shadow-glow-lg relative z-10 hover:shadow-glow-xl"
            loading="lazy"
          />
          
          {/* Floating particles around image */}
          <motion.div 
            className="absolute -top-4 -right-4 text-purple-neon"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles size={24} />
          </motion.div>
          <motion.div 
            className="absolute -bottom-4 -left-4 text-cyan-bright"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Star size={20} />
          </motion.div>
        </motion.figure>

        {/* Sección Derecha: Texto */}
        <motion.article 
          className="flex-1 p-6 lg:pl-12"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1 
            className="text-3xl lg:text-5xl font-bold gradient-text neon-text mb-8 text-center lg:text-left font-oswald"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Nuestra Filosofía
          </motion.h1>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-secondary mx-auto lg:mx-0 mb-8 rounded-full animate-gradient-shift"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          ></motion.div>
          
          <motion.p 
            className="text-gray-300 text-lg lg:text-xl leading-relaxed text-center lg:text-left font-inter mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            En <span className="gradient-text font-semibold">Outside</span> creemos que la autenticidad es el verdadero lujo en un mundo de tendencias pasajeras. Cada producto que creamos está pensado para personas que aprecian la calidad y el diseño distintivo sin comprometer la funcionalidad.
          </motion.p>
          
          <motion.p 
            className="text-gray-300 text-lg lg:text-xl leading-relaxed text-center lg:text-left font-inter"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Nacidos en las calles de <span className="text-yellow-electric font-semibold">Medellín</span>, nos inspiramos en la rica diversidad cultural de Colombia para crear experiencias que trascienden más allá de simples productos: creamos conexiones, momentos y recuerdos.
          </motion.p>
        </motion.article>
      </motion.main>
      
      {/* Valores de la marca */}
      <motion.div 
        className="max-w-7xl mb-10 mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl lg:text-5xl font-bold gradient-text text-center mb-16 font-oswald"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nuestros Valores
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {brandValues.map((value, index) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card with glass effect */}
              <div className="glass-effect rounded-3xl p-8 border border-purple-border/30 shadow-card transition-all duration-500 hover:shadow-card-hover card-hover relative overflow-hidden">
                
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 rounded-3xl"></div>
                
                <div className="flex items-start gap-6 relative z-10">
                  {/* Icon container */}
                  <motion.div 
                    className={`p-4 bg-purple-border/30 rounded-2xl ${value.color} relative group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      {value.icon}
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    {/* Title */}
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-4 font-oswald group-hover:gradient-text transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {value.title}
                    </motion.h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-base lg:text-lg leading-relaxed font-inter group-hover:text-white transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </div>
                
                {/* Floating particle effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={value.color}
                  >
                    <Sparkles size={16} />
                  </motion.div>
                </div>
              </div>
              
              {/* External glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;