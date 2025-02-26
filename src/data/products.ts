import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Taijizen JuDo 24k puffs",
    price: 45.000,
    description: "El TaijiZen Judo 24K de iJOY es un excepcional vaporizador desechable con pantalla táctil y modo Boost. Su innovadora pantalla te permite ajustar la potencia de salida y monitorear el estado del dispositivo con facilidad. En modo normal, ofrece hasta 24,000 puffs, mientras que en modo Boost alcanza las 12,000. Gracias a sus bobinas de malla doble, garantiza un sabor intenso y una producción de vapor abundante. Si buscas un vaporizador desechable confiable, con gran autonomía y funciones intuitivas, esta es la elección ideal.",
    image: "https://example.com/images/taijizen-judo-default.webp", // Imagen por defecto
    category: "vaporizers",
    variants: [
      { name: "Blackberry Cherry 24k", image: "https://example.com/images/taijizen-blackberry-cherry.webp" },
      { name: "Sour Strawberry Grape 24k", image: "https://example.com/images/taijizen-sour-strawberry-grape.webp" },
      { name: "Pineapple Lime 24k", image: "https://example.com/images/taijizen-pineapple-lime.webp" },
      { name: "Cool Mint 24k", image: "https://example.com/images/taijizen-cool-mint.webp" },
      { name: "Cranberry Soda 24k", image: "https://example.com/images/taijizen-cranberry-soda.webp" },
      { name: "Blueberry BubbleGum 24k", image: "https://example.com/images/taijizen-blueberry-bubblegum.webp" },
      { name: "Triple Mango 24k", image: "https://example.com/images/taijizen-triple-mango.webp" },
      { name: "Mango Lime Pineapple 24k", image: "https://example.com/images/taijizen-mango-lime-pineapple.webp" },
      { name: "Lemon Peach Passion Fruit 24k", image: "https://example.com/images/taijizen-lemon-peach-passion.webp" },
      { name: "Chilled Watermelon 24k", image: "https://example.com/images/taijizen-chilled-watermelon.webp" },
      { name: "Blue Strawberry Coconut 24k", image: "https://example.com/images/taijizen-blue-strawberry-coconut.webp" },
      { name: "Blue Raspberry Ice 24k", image: "https://example.com/images/taijizen-blue-raspberry-ice.webp" },
    ],
  },
  {
    id: 2,
    name: "Death Row Vapes",
    price: 20.000,
    description: "12 ml de líquido para vapear precargado, una batería recargable de 700 mAh, una bobina de malla y puede proporcionar a los vapeadores hasta 7000 puffs. Death Row es elegante y compacto. La forma trapezoidal hace que sea fácil de sostener. Los sabores afrutados se resaltan a través de una bobina de malla. El puerto tipo C es otro diseño sin complicaciones. Puede recargarlo fácil y rápidamente. Death Row Disposable Vape anuncia con orgullo que los vapeadores que usan Death Row están condenados a los sabores.",
    image: "https://example.com/images/deathrow-default.webp", // Imagen por defecto
    category: "vaporizers",
    variants: [
      { name: "Black Ice", image: "https://example.com/images/deathrow-black-ice.webp" },
      { name: "Banana Ice", image: "https://example.com/images/deathrow-banana-ice.webp" },
      { name: "Blueberry", image: "https://example.com/images/deathrow-blueberry.webp" },
      { name: "Cherry", image: "https://example.com/images/deathrow-cherry.webp" },
      { name: "Grape", image: "https://example.com/images/deathrow-grape.webp" },
      { name: "Lemon", image: "https://example.com/images/deathrow-lemon.webp" },
      { name: "Mango", image: "https://example.com/images/deathrow-mango.webp" },
      { name: "Peach", image: "https://example.com/images/deathrow-peach.webp" },
      { name: "Watermelon", image: "https://example.com/images/deathrow-watermelon.webp" },
    ],
  },
  // Ropa sin cambios por ahora
  {
    id: 3,
    name: "Urban Hoodie",
    price: 59.99,
    description: "Comfortable cotton blend hoodie with minimalist design",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    category: "clothing",
    variants: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Street Tech Jacket",
    price: 89.99,
    description: "Water-resistant jacket with modern cut and hidden pockets",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    category: "clothing",
    variants: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Nuevo Vape 10k",
    price: 30.000,
    description: "Un vape innovador con 10,000 puffs y sabores intensos.",
    image: "https://example.com/images/nuevo-vape-default.webp",
    category: "vaporizers",
    variants: [
      { name: "Strawberry Kiwi", image: "https://example.com/images/nuevo-vape-strawberry-kiwi.webp" },
      { name: "Tropical Punch", image: "https://example.com/images/nuevo-vape-tropical-punch.webp" },
    ],
  },
];
