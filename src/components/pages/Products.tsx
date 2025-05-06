import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Search, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { lazy } from 'react';

const NewReleases = lazy(() => import('@/components/sections/NewReleases'));
const BrandSection = lazy(() => import('@/components/sections/BrandSection'));

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  variants: any[];
  rating?: number;
  isNew?: boolean;
}

const Products = () => {
  const [category, setCategory] = useState<'vaporizers' | 'clothing'>('vaporizers');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [puffRange, setPuffRange] = useState<[number, number]>([0, 30000]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const itemsPerPage = 3;

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      const matchesCategory = product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesPuffs =
        product.category === 'vaporizers' &&
        product.name.includes('puffs') &&
        parseInt(product.name.match(/\d+k/i)?.[0] || '0') * 1000 >= puffRange[0] &&
        parseInt(product.name.match(/\d+k/i)?.[0] || '0') * 1000 <= puffRange[1];
      const matchesBrand = selectedBrand ? product.name.toLowerCase().includes(selectedBrand.toLowerCase()) : true;
      const matchesVariant = selectedVariant
        ? (Array.isArray(product.variants) && typeof product.variants[0] === 'object'
            ? (product.variants as { name: string; image: string }[]).some((v) => v.name === selectedVariant)
            : (product.variants as string[]).includes(selectedVariant))
        : true;
      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        (product.category === 'clothing' || matchesPuffs) &&
        matchesBrand &&
        matchesVariant
      );
    });
  }, [category, searchTerm, priceRange, puffRange, selectedBrand, selectedVariant]);

  const suggestions = useMemo(() => {
    return products
      .filter((p: Product) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.length > 1)
      .map((p: Product) => p.name)
      .slice(0, 5);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const allVariants = Array.from(
    new Set(
      products
        .filter((p: Product) => p.category === category)
        .flatMap((p: Product) =>
          Array.isArray(p.variants)
            ? typeof p.variants[0] === 'object'
              ? (p.variants as { name: string; image: string }[]).map((v) => v.name)
              : (p.variants as string[])
            : []
        )
    )
  );

  const allBrands = Array.from(
    new Set(products.filter((p: Product) => p.category === 'vaporizers').map((p: Product) => p.name.split(' ')[0]))
  );

  const itemListSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: paginatedProducts.map((product: Product, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: product.description,
        sku: product.id.toString(),
        brand: {
          '@type': 'Brand',
          name: product.name.split(' ')[0]
        },
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'COP',
          availability: 'https://schema.org/InStock',
          url: `/product/${product.id}`
        },
        ...(product.category === 'vaporizers' && {
          hasVariant: product.variants.map((variant) => ({
            '@type': 'Product',
            name: `${product.name} - ${(variant as { name: string }).name}`,
            image: (variant as { name: string; image: string }).image,
            description: (typeof variant === 'object' && 'alt' in variant ? variant.alt : product.description),
          })),
        }),
        ...(product.category === 'clothing' && {
          size: product.variants,
        }),
        aggregateRating: product.rating
          ? {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: 10,
            }
          : undefined,
      },
    })),
  }), [paginatedProducts]);

  return (
    <>
      <NewReleases />
      <section id="products" className="min-h-screen bg-gradient-to-b from-black to-purple-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Helmet>
            <title>
              {category === 'vaporizers'
                ? 'Vaporizadores y Vapes Premium - Outside Zone | Tienda Online'
                : 'Ropa Urbana y Streetwear - Outside Zone | Tienda Online'}
            </title>
            <meta
              name="description"
              content={
                category === 'vaporizers'
                  ? 'Explora nuestra selección de vaporizadores desechables de alta calidad en Outside Zone. Encuentra los mejores vapes con sabores intensos, diseños innovadores y entrega en toda Colombia.'
                  : 'Descubre nuestra colección de ropa urbana en Outside Zone. Prendas modernas y cómodas para un estilo casual y funcional con envíos a todo Colombia.'
              }
            />
            <meta
              name="keywords"
              content={
                category === 'vaporizers'
                  ? 'vaporizadores, vapes, vapeo, sabores vape, tienda de vapes, vapes desechables, vapes en Colombia, Rifbar, Taijizen, Orion Bar, Priv Bar'
                  : 'ropa urbana, sudaderas, camisas, pantalones cargo, moda casual, moda urbana Colombia, streetwear'
              }
            />
            <link rel="canonical" href={`https://outside-project.vercel.app/products?category=${category}`} />
            <meta property="og:title" content={category === 'vaporizers' ? 'Vaporizadores Premium | Outside Zone' : 'Ropa Urbana | Outside Zone'} />
            <meta 
              property="og:description" 
              content={category === 'vaporizers' 
                ? 'Explora nuestra selección premium de vaporizadores con los mejores sabores y envíos en toda Colombia.' 
                : 'Descubre nuestra línea de ropa urbana con diseños exclusivos y calidad premium.'}
            />
            <meta property="og:url" content={`https://outside-project.vercel.app/products?category=${category}`} />
            <meta property="og:type" content="website" />
            <script type="application/ld+json">{JSON.stringify(itemListSchema, null, 2)}</script>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Inicio",
                    "item": "https://outside-project.vercel.app/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": category === 'vaporizers' ? "Vaporizadores" : "Ropa",
                    "item": `https://outside-project.vercel.app/products?category=${category}`
                  }
                ]
              })}
            </script>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": category === 'vaporizers' 
                      ? "¿Cuánto duran los vaporizadores desechables?" 
                      : "¿Qué tallas están disponibles en la ropa?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": category === 'vaporizers'
                        ? "La duración depende del modelo. Los vaporizadores con 10k puffs duran aproximadamente 2-3 semanas con uso moderado, mientras que los de 15k-24k puffs pueden durar hasta un mes."
                        : "Todas nuestras prendas están disponibles en tallas S, M, L y XL. Consulta la guía de tallas en cada producto para encontrar tu ajuste perfecto."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": category === 'vaporizers'
                      ? "¿Hacen envíos de vaporizadores a toda Colombia?"
                      : "¿Realizan envíos de ropa a todo Colombia?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Sí, realizamos envíos a toda Colombia. Los envíos en Medellín y alrededores son gratuitos en pedidos superiores a 120.000 COP, mientras que los envíos nacionales son gratuitos en pedidos superiores a 250.000 COP."
                    }
                  }
                ]
              })}
            </script>
          </Helmet>
          <h2 className="text-4xl font-medium text-white text-center mb-12">Nuestros Productos</h2>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setCategory('vaporizers')}
              className={`px-6 py-2 rounded-3xl transition-colors shadow-md ${
                category === 'vaporizers' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Vaporizadores
            </button>
            <button
              onClick={() => setCategory('clothing')}
              className={`px-6 py-2 rounded-3xl transition-colors shadow-md ${
                category === 'clothing' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Ropa
            </button>
          </div>

          <div className="mb-8">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full flex justify-between items-center px-4 py-2 bg-[#2d1b4e] text-white rounded-lg hover:bg-purple-900 transition-colors shadow-md"
            >
              <span>Filtros</span>
              {isFiltersOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>

            {isFiltersOpen && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#2d1b4e] p-4 rounded-lg text-white">
                <div className="relative">
                  <Search className="absolute left-3 top-5 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 pl-10 rounded-lg bg-[#2d1b4e] border border-gray-700 focus:outline-none focus:border-purple-500"
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

                <div>
                  <label className="block mb-1">
                    Precio: {priceRange[0].toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} -{' '}
                    {priceRange[1].toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full"
                  />
                </div>

                {category === 'vaporizers' && (
                  <div>
                    <label className="block mb-1">Puffs: {puffRange[0]} - {puffRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="35000"
                      step="1000"
                      value={puffRange[0]}
                      onChange={(e) => setPuffRange([+e.target.value, puffRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="35000"
                      step="1000"
                      value={puffRange[1]}
                      onChange={(e) => setPuffRange([puffRange[0], +e.target.value])}
                      className="w-full"
                    />
                  </div>
                )}

                {category === 'vaporizers' && (
                  <div>
                    <label className="block mb-1">Marca:</label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full p-2 rounded-lg bg-[#2d1b4e] border border-gray-700 focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Todas</option>
                      {allBrands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {category === 'vaporizers' && (
                  <div>
                    <label className="block mb-1">Sabor:</label>
                    <select
                      value={selectedVariant}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="w-full p-2 rounded-lg bg-[#2d1b4e] border border-gray-700 focus:outline-none focus:border-purple-500"
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
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProducts.length === 0 ? (
              <p className="text-white text-center col-span-full">No se encontraron productos.</p>
            ) : (
              paginatedProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="relative bg-[#2d1b4e] rounded-lg overflow-hidden shadow-lg border border-[#3b2064] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purple-500/50"
                >
                  <div className="relative overflow-hidden">
                    <picture>
                      <source srcSet={`${product.image}.webp`} type="image/webp" />
                      <img
                        src={product.image}
                        alt={
                          product.category === 'vaporizers'
                            ? `Imagen del vaporizador ${product.name} con diseño vibrante y acabado en cuero sintético. Destaca por sus botones de turbo boost y watts ajustables de 15 a 25, ofreciendo sabores top. Sabor: ${Array.isArray(product.variants) && typeof product.variants[0] === 'object' ? (product.variants as { name: string; image: string }[])[0].name : ''}`
                            : product.name
                        }
                        className="w-full h-64 object-scale-down transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                        width="300"
                        height="300"
                      />
                    </picture>
                    {product.isNew && (
                      <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Nuevo
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white transition-colors duration-300 hover:text-purple-300">
                        {product.name}
                      </h3>
                      <span className="text-purple-400 font-bold">
                        {product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                      </span>
                    </div>
                    <div className="flex items-center mb-4">
                      <span className="border border-purple-600 text-gray-300 text-xs font-semibold px-2 py-1 rounded">
                        {product.category === 'vaporizers' ? 'Vaporizadores' : 'Ropa'}
                      </span>
                      <div className="ml-auto flex items-center">
                        <Star className="h-4 w-4 fill-purple-600 text-purple-600" />
                        <span className="ml-1 text-sm text-white">{product.rating || 4.5}</span>
                      </div>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="block w-full px-4 py-2 bg-purple-600 text-white rounded-lg text-center shadow-md transition-all duration-300 hover:bg-purple-700 hover:-translate-y-1 hover:shadow-lg"
                    >
                      Añadir al Carrito
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 shadow-md hover:bg-gray-700"
              >
                Anterior
              </button>
              <span className="text-white self-center">Página {currentPage} de {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 shadow-md hover:bg-gray-700"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </section>
      <BrandSection />
    </>
  );
};

export default Products;