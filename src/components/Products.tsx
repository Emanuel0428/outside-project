import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Search } from 'lucide-react';

const Products = () => {
  const [category, setCategory] = useState<'vaporizers' | 'clothing'>('vaporizers');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = products.filter((product) => {
    const matchesCategory = product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesVariant = selectedVariant
      ? (Array.isArray(product.variants) && typeof product.variants[0] === 'object'
          ? (product.variants as { name: string; image: string }[]).some(v => v.name === selectedVariant)
          : (product.variants as string[]).includes(selectedVariant))
      : true;
    return matchesCategory && matchesSearch && matchesPrice && matchesVariant;
  });

  const suggestions = products
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.length > 1)
    .map(p => p.name)
    .slice(0, 5);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const allVariants = Array.from(
    new Set(
      products
        .filter(p => p.category === category)
        .flatMap(p =>
          Array.isArray(p.variants)
            ? typeof p.variants[0] === 'object'
              ? (p.variants as { name: string; image: string }[]).map(v => v.name)
              : (p.variants as string[])
            : []
        )
    )
  );

  return (
    <section id="products" className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Nuestros Productos</h2>

        {/* Filtros */}
        <div className="mb-12 space-y-6">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCategory('vaporizers')}
              className={`px-6 py-2 rounded-full transition-colors shadow-md ${
                category === 'vaporizers' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Vaporizadores
            </button>
            <button
              onClick={() => setCategory('clothing')}
              className={`px-6 py-2 rounded-full transition-colors shadow-md ${
                category === 'clothing' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Ropa
            </button>
          </div>

          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
            />
            {suggestions.length > 0 && searchTerm && (
              <div className="absolute w-full bg-gray-900 rounded-lg mt-1 shadow-lg z-10">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    onClick={() => setSearchTerm(suggestion)}
                    className="p-2 text-white hover:bg-purple-600 cursor-pointer"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-white">
            <label>Rango de precio: ${priceRange[0]} - ${priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full"
            />
          </div>

          {category === 'vaporizers' && (
            <div className="text-white">
              <label>Filtrar por sabor:</label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full max-w-md p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
              >
                <option value="">Todos</option>
                {allVariants.map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-scale-down"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-purple-400 text-lg mb-4">${product.price}</p>
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

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 shadow-md hover:bg-gray-700"
            >
              Anterior
            </button>
            <span className="text-white self-center">Página {currentPage} de {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 shadow-md hover:bg-gray-700"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;