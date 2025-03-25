import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const Success = () => {
  const { clearCart } = useCart();

  // Limpiar el carrito después de un pago exitoso
  clearCart();

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden py-40 px-6 text-white text-center">
      <h2 className="text-3xl font-bold mb-8">¡Pago Exitoso!</h2>
      <p className="text-lg mb-6">Gracias por tu compra. Recibirás un correo con los detalles de tu pedido.</p>
      <Link to="/" className="text-purple-400 hover:underline">
        Volver a la tienda
      </Link>
    </section>
  );
};

export default Success;