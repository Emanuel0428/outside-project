import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import type { ContactForm } from '../types';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-b from-black to-purple-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Contáctanos</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 backdrop-blur-sm p-8 rounded-lg"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Nombre</label>
                <input
                  {...register("name", { required: "El nombre es requerido" })}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.name && (
                  <span className="text-red-400 text-sm">{errors.name.message}</span>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  })}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.email && (
                  <span className="text-red-400 text-sm">{errors.email.message}</span>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">Mensaje</label>
                <textarea
                  {...register("message", { required: "El mensaje es requerido" })}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.message && (
                  <span className="text-red-400 text-sm">{errors.message.message}</span>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h3 className="text-2xl font-bold mb-6">Síguenos</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-4 hover:text-purple-400 transition-colors">
                <Instagram className="h-6 w-6" />
                <span>@outside.official</span>
              </a>
              <a href="#" className="flex items-center gap-4 hover:text-purple-400 transition-colors">
                <Facebook className="h-6 w-6" />
                <span>Outside Official</span>
              </a>
              <a href="#" className="flex items-center gap-4 hover:text-purple-400 transition-colors">
                <Twitter className="h-6 w-6" />
                <span>@outside</span>
              </a>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Ubicación</h3>
              <p className="text-gray-300">
                Calle Principal #123<br />
                Ciudad, País<br />
                Tel: +1 234 567 890
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;