export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'vaporizers' | 'clothing';
  variants: string[] | { name: string; image: string }[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}