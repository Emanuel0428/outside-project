export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'vaporizers' | 'clothing';
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}