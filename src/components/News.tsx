import React from 'react';
import { motion } from 'framer-motion';

const newsArticles = [
  {
    id: 1,
    title: "Nuevos Sabores de Taijizen Judo 24k Lanzados",
    date: "Febrero 20, 2025",
    content: "iJOY ha anunciado tres nuevos sabores para su línea Taijizen Judo 24k, incluyendo Tropical Sunset, Iced Coffee y Vanilla Cream. Estos sabores prometen una experiencia única para los amantes del vapeo.",
    image: "https://example.com/images/news-taijizen.webp",
  },
  {
    id: 2,
    title: "Tendencias en Vapeo para 2025",
    date: "Febrero 15, 2025",
    content: "El vapeo sigue evolucionando con dispositivos más potentes y sostenibles. Este año, se espera un auge en los vapes recargables y biodegradables.",
    image: "https://example.com/images/news-trends.webp",
  },
  {
    id: 3,
    title: "Outside Lanza Nueva Colección de Ropa",
    date: "Febrero 10, 2025",
    content: "La marca Outside ha presentado su nueva línea de ropa urbana, combinando estilo y comodidad para los amantes del vapeo y la moda callejera.",
    image: "https://example.com/images/news-clothing.webp",
  },
];

const News = () => {
    return (
      <section className="min-h-screen bg-black py-20 px-6 light:bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12 light:text-black">Noticias</h2>
          <div className="space-y-12">
            {newsArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-gray-900 to-purple-900 rounded-lg p-6 flex flex-col md:flex-row gap-6 shadow-lg light:from-gray-200 light:to-purple-200"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full md:w-1/3 h-48 object-cover rounded-lg"
                />
                <div className="text-white light:text-black">
                  <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-400 mb-4 light:text-gray-600">{article.date}</p>
                  <p className="text-gray-300 light:text-gray-700">{article.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default News;