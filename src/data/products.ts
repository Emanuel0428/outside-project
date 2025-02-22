import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Taijizen JuDo 24k puffs",
    price: 45.000,
    description: "Premium vaporizer with temperature control and long battery life",
    image: "src/images/cranberry-sodaTaijiZen-Judo.png",
    category: "vaporizers"
  },
  {
    id: 2,
    name: "Death Row Vape",
    price: 20.000,
    description: "Compact and discrete vaporizer perfect for on-the-go use",
    image: "src/images/Death_Row_Snoop_Dogg_Vapes_7000_puffs_vape_desechable_vaporsoul_Black_ice.png",
    category: "vaporizers"
  },
  {
    id: 3,
    name: "Urban Hoodie",
    price: 59.99,
    description: "Comfortable cotton blend hoodie with minimalist design",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    category: "clothing"
  },
  {
    id: 4,
    name: "Street Tech Jacket",
    price: 89.99,
    description: "Water-resistant jacket with modern cut and hidden pockets",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    category: "clothing"
  }
];