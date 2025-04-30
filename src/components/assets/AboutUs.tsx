import { useRef, useMemo } from "react";
import { Users, Zap, Award } from "lucide-react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: Users,
    title: "Comunidad Vibrante",
    description: "Únete a miles de entusiastas del estilo urbano en toda Colombia.",
  },
  {
    icon: Zap,
    title: "Productos Premium",
    description: "Calidad garantizada en cada producto que ofrecemos.",
  },
  {
    icon: Award,
    title: "Diseños Exclusivos",
    description: "Colaboraciones únicas con artistas y diseñadores locales.",
  },
];

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-purple-dark p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
    <div className="p-3 bg-purple-600/20 rounded-full mb-4">
      <Icon className="h-8 w-8 text-purple-600" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm md:text-base">{description}</p>
  </div>
);

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const animationProps = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, staggerChildren: 0.1 }
  }), [isInView]);

  return (
    <section className="bg-black p-8 py-16 flex flex-col items-center justify-center">
      {/* Contenedor centrado */}
      <main className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12 py-16">
        {/* Sección Izquierda: Imagen */}
        <figure className="flex-shrink-0">
          <img
            src="/web-app-manifest-512x512.png"
            alt="Logo de Outside"
            width={320}
            height={320}
            className="w-48 h-48 md:w-80 md:h-80 rounded-full object-cover transition-transform duration-1000 hover:flip-coin border-4 border-purple-glow shadow-lg"
            loading="lazy"
          />
        </figure>

        {/* Sección Derecha: Texto */}
        <article className="flex-1 p-4 md:pl-8">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-600 mb-4 text-center">
            Sobre Outside
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed text-center">
            Outside es más que una marca: somos una comunidad que vive y respira el estilo urbano y la cultura alternativa. 
            Conectamos a personas que valoran la autenticidad, la creatividad y la innovación. 
            Nuestra misión es revolucionar el mundo del vapeo y la moda urbana, ofreciendo productos de alta calidad y experiencias únicas 
            que vibren con una comunidad en constante evolución.
          </p>
        </article>
      </main>
      
      {/* Features Section */}
      <motion.div
        ref={ref}
        {...animationProps}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutUs;