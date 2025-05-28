import { memo } from 'react';
import { Gem, Github, Instagram, Mail, MapPin, Phone, Heart, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/sitemap.xml", label: "Sitemap", icon: <Gem size={16} /> },
    { href: "/terms", label: "Términos y Condiciones", icon: <Sparkles size={16} /> },
    { href: "/privacy", label: "Política de Privacidad", icon: <Zap size={16} /> },
    { href: "/faq", label: "PQRS", icon: <Heart size={16} /> }
  ];

  const socialLinks = [
    { 
      href: "https://github.com/Emanuel0428", 
      label: "GitHub", 
      icon: <Github size={20} />,
      color: "hover:text-purple-neon"
    },
    { 
      href: "https://www.instagram.com/zone.outside", 
      label: "Instagram", 
      icon: <Instagram size={20} />,
      color: "hover:text-pink-neon"
    },
    { 
      href: "mailto:contact@outside-zone.com", 
      label: "Email", 
      icon: <Mail size={20} />,
      color: "hover:text-cyan-bright"
    }
  ];

  const contactInfo = [
    { icon: <MapPin size={16} />, text: "Medellín, Colombia", color: "text-green-neon" },
    { icon: <Phone size={16} />, text: "+57 321 790 5526", color: "text-blue-electric" },
    { icon: <Mail size={16} />, text: "contact@outside-zone.com", color: "text-orange-vibrant" }
  ];

  return (
    <footer className="text-white py-16 px-6 relative overflow-hidden scroll-section seamless-section section-transition" role="contentinfo" style={{ background: 'transparent' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-10 left-10 w-64 h-64 bg-purple-glow rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -25, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-48 h-48 bg-pink-neon rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-8 right-20 text-purple-neon"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={20} />
        </motion.div>
        <motion.div 
          className="absolute bottom-8 left-20 text-cyan-bright"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Zap size={24} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Gem className="h-8 w-8 text-purple-glow" />
            </motion.div>
            <span className="text-4xl font-bold gradient-text font-oswald">Outside</span>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto font-inter"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Redefiniendo el estilo urbano con productos innovadores y experiencias auténticas
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-gradient-secondary mx-auto mt-6 rounded-full animate-gradient-shift"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold gradient-text mb-6 font-oswald">Contacto</h3>
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <span className={item.color}>{item.icon}</span>
                <span className="font-inter">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold gradient-text mb-6 font-oswald">Enlaces Rápidos</h3>
            {footerLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.href} 
                className="flex items-center gap-3 text-gray-300 hover:text-purple-neon transition-all duration-300 group"
                whileHover={{ x: 5 }}
                aria-label={link.label}
              >
                <span className="group-hover:text-purple-neon transition-colors duration-300">
                  {link.icon}
                </span>
                <span className="font-inter">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold gradient-text mb-6 font-oswald">Síguenos</h3>
            <div className="flex flex-col gap-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`flex items-center gap-3 text-gray-300 ${social.color} transition-all duration-300 group`}
                  whileHover={{ x: 5, scale: 1.05 }}
                  aria-label={social.label}
                >
                  <motion.span
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {social.icon}
                  </motion.span>
                  <span className="font-inter">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold gradient-text mb-6 font-oswald">Newsletter</h3>
            <p className="text-gray-300 text-sm font-inter mb-4">
              Mantente al día con nuestras últimas novedades y ofertas exclusivas
            </p>
            <motion.button
              className="w-full px-4 py-3 bg-gradient-secondary text-white rounded-xl hover:shadow-glow-lg transition-all duration-300 font-inter font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Suscribirse
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-purple-border/30 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-gray-400 font-inter"
              whileHover={{ color: "#ffffff" }}
            >
              © {currentYear} Outside Zone. Todos los derechos reservados.
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-2 text-gray-400"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-inter">Hecho con</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ["#ef4444", "#f97316", "#ef4444"]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart size={16} fill="currentColor" />
              </motion.div>
              <span className="font-inter">en Medellín</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default memo(Footer);