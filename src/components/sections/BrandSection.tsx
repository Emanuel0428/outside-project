import React from 'react';


const brands = [
  { name: "Smok Priv Bar", logo: "https://i.postimg.cc/SKL5bPm2/outside-privbar-logo.webp" },
  { name: "Lost Orion Bar", logo: "https://i.postimg.cc/pT2SWBd0/outside-orionbar-logo.webp" },
  { name: "Rifbar", logo: "https://i.postimg.cc/Qt0yHW9j/outside-rifbar-logo-1.webp"},
  { name: "Taijizen", logo: "https://i.postimg.cc/YSBVV7BB/outside-taijizen-logo-1.webp"},
];

const BrandSection = () => {
    return (
            <section className="py-12 text-center bg-white dark:bg-black">
            <h2 className="text-2xl md:text-3xl text-white font-medium mb-6 light:text-gray-300">
            Nuestras Marcas
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6">
            {brands.map((brand) => (
                <img
                key={brand.name}
                src={brand.logo}
                alt={brand.name}
                className="w-24 md:w-32 transition-transform duration-300 hover:scale-110"
                />
            ))}
            </div>
        </section>
    );
};

export default BrandSection;