import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import type { Product } from '../types';

const Products = () => {
  const [category, setCategory] = useState<'vaporizers' | 'clothing'>('vaporizers');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => product.category === category);

  return (
    <section id="products" className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Nuestros Productos</h2>
        
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setCategory('vaporizers')}
            className={`px-6 py-2 rounded-full transition-colors ${
              category === 'vaporizers' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Vaporizadores
          </button>
          <button
            onClick={() => setCategory('clothing')}
            className={`px-6 py-2 rounded-full transition-colors ${
              category === 'clothing' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Ropa
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-purple-400 text-lg mb-4">${product.price}</p>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Ver más
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 p-6 rounded-lg max-w-lg w-full"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{selectedProduct.name}</h3>
              <p className="text-gray-300 mb-4">{selectedProduct.description}</p>
              <p className="text-purple-400 text-xl mb-6">${selectedProduct.price}</p>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;