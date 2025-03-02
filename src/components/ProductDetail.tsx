import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return <div className="min-h-screen bg-black py-20 px-6 text-white">Producto no encontrado</div>;
  }

  const isFavorite = favorites.includes(product.id);

  const variantArray = Array.isArray(product.variants) && typeof product.variants[0] === 'object'
    ? product.variants as { name: string; image: string }[]
    : [];
  const selectedVariantObj = variantArray.find(v => v.name === selectedVariant);
  const displayImage = selectedVariantObj?.image || product.image;

  return (
    <section className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Imagen del producto */}
          <div className="bg-gray-900 rounded-lg p-8">
            <img 
              src={displayImage} 
              alt={selectedVariant || product.name} 
              className="w-full h-auto object-contain"
              onError={(e) => (e.currentTarget.src = product.image)}
            />
          </div>

          {/* Detalles del producto */}
          <div className="text-white">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <Heart
                  className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
                />
              </button>
            </div>
            <p className="text-purple-400 text-2xl mb-6">{product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
            
            {/* Variantes/Sabores */}
            {variantArray.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl mb-3">Sabores:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {variantArray.map((variant) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(variant.name)}
                      className={`px-4 py-2 rounded-full transition-colors ${
                        selectedVariant === variant.name
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Control de cantidad */}
            <div className="mb-6">
              <h3 className="text-xl mb-3">Cantidad:</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botón de compra */}
            <button
              onClick={() => {
                addToCart(product, selectedVariant || (variantArray[0]?.name || ''), quantity);
                toast.success(`${product.name} (${selectedVariant || variantArray[0]?.name || ''}) añadido al carrito!`);
              }}
              className="w-full px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Agregar al carrito
            </button>

            {/* Descripción */}
            <div className="mt-8">
              <h3 className="text-xl mb-3">Descripción:</h3>
              <p className="text-gray-300">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;