import React from 'react';


const brands = [
  { name: "Smok Priv Bar", logo: "https://i.postimg.cc/c4PGBFKq/outside-privbar-logo.png" },
  { name: "Lost Orion Bar", logo: "https://i.postimg.cc/FsYQSMHg/outside-orionbar-logo.png" },
  { name: "Rifbar", logo: "https://i.postimg.cc/4xtkLptY/outside-rifbar-logo.png"},
  { name: "Taijizen", logo: "https://i.postimg.cc/ZqSk10FV/outside-taijizen.png"},
];

const BrandSection = () => {
    return (
            <section className="py-12 text-center">
            <h2 className="text-2xl md:text-3xl text-white font-semibold mb-6 light:text-gray-300">
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