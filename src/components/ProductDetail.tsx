import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const product = useMemo(() => products.find(p => p.id === parseInt(id || '0')), [id]);

  const variantArray = useMemo(() => {
    return product && Array.isArray(product.variants) && typeof product.variants[0] === 'object'
      ? product.variants as { name: string; image: string; alt?: string }[]
      : [];
  }, [product]);

  const isFavorite = product ? favorites.includes(product.id) : false;

  const selectedVariantObj = useMemo(() => 
    variantArray.find(v => v.name === selectedVariant), [selectedVariant, variantArray]
  );

  if (!product) {
    return <div className="min-h-screen bg-black py-20 px-6 text-white">Producto no encontrado</div>;
  }
  const displayImage = selectedVariantObj?.image || product.image;
  const displayAlt = selectedVariantObj?.alt || product.alt || product.name;

  return (
    <section className="min-h-screen bg-black py-20 px-6">
      <Helmet>
        <title>{product.metaTitle || `${product.name} - Detalles del Producto`}</title>
        <meta name="description" content={product.metaDescription || product.description.substring(0, 160)} />
        <meta name="keywords" content={product.keywords?.join(', ') || `${product.name}, vaporizador, ropa`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": displayImage,
            "description": product.description,
            "sku": `PROD-${product.id}`,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "COP",
              "price": product.price,
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-900 rounded-lg p-8">
            <img 
              src={displayImage} 
              alt={displayAlt}
              className="w-full h-auto object-contain"
              loading="lazy"
              width={product.width || 300}
              height={product.height || 300}
              onError={(e) => (e.currentTarget.src = product.image)}
            />
          </div>
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
            <button
              onClick={() => {
                addToCart(product, selectedVariant || (variantArray[0]?.name || ''), quantity);
                toast.success(`${product.name} (${selectedVariant || variantArray[0]?.name || ''}) añadido al carrito!`);
              }}
              className="w-full px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Agregar al carrito
            </button>
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

export default React.memo(ProductDetail);