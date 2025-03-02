import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { products } from '../data/products';

const Favorites = () => {
  const { favorites } = useFavorites();
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <section className="min-h-screen bg-black py-20 px-6 text-white text-center light:bg-gray-100 light:text-black">
        <h2 className="text-3xl font-bold mb-8">No tienes favoritos aún</h2>
        <Link to="/" className="text-purple-400 hover:underline">Explora productos</Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black py-20 px-6 light:bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12 light:text-black">Tus Favoritos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg light:bg-gray-200"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-scale-down"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 light:text-black">{product.name}</h3>
                <p className="text-purple-400 text-lg mb-4">{product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="block w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center shadow-md"
                >
                  Ver más
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Favorites;