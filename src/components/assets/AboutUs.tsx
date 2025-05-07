import { useRef, useMemo } from "react";
import { Users, Sparkles, ShieldCheck, Leaf } from "lucide-react";
import { motion, useInView } from "framer-motion";

const brandValues = [
  {
    icon: <Sparkles className="h-12 w-12 text-purple-400" />,
    title: "Innovación Continua",
    description: "Buscamos constantemente nuevas formas de mejorar la experiencia de nuestros clientes, desde la tecnología de nuestros vaporizadores hasta el diseño de nuestras prendas urbanas."
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-purple-400" />,
    title: "Calidad Premium",
    description: "Cada producto Outside ha sido diseñado y probado bajo rigurosos estándares de calidad, asegurando una experiencia excepcional en cada uso."
  },
  {
    icon: <Leaf className="h-12 w-12 text-purple-400" />,
    title: "Sostenibilidad",
    description: "Comprometidos con el medio ambiente, implementamos prácticas responsables en nuestra cadena de producción para minimizar nuestro impacto ecológico."
  },
  {
    icon: <Users className="h-12 w-12 text-purple-400" />,
    title: "Comunidad y Cultura",
    description: "Más que una marca, somos una comunidad que celebra la diversidad y el estilo único, uniendo personas a través de experiencias compartidas."
  }
];

const AboutUs = () => {

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
            Nuestra Filosofía
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed text-center">
            En Outside creemos que la autenticidad es el verdadero lujo en un mundo de tendencias pasajeras. Cada producto que creamos está pensado para personas que aprecian la calidad y el diseño distintivo sin comprometer la funcionalidad.
            <br />
            <br />
            Nacidos en las calles de Medellín, nos inspiramos en la rica diversidad cultural de Colombia para crear experiencias que trascienden más allá de simples productos: creamos conexiones, momentos y recuerdos.
          </p>
        </article>
      </main>
      
      {/* Valores de la marca */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {brandValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-800/40 hover:bg-purple-800/40 transition-colors"
                >
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-black/30 rounded-lg">
                      {value.icon}
                    </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </div>
                </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default AboutUs;