import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-black py-20 px-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-8">Tu carrito está vacío</h2>
        <Link to="/" className="text-purple-400 hover:underline">Volver a productos</Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Tu Carrito</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={`${item.product.id}-${item.variant}`} className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-white">{item.product.name} - {item.variant}</h3>
                <p className="text-purple-400">${item.product.price} x {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id, item.variant)}
                className="text-red-400 hover:text-red-600"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-white">
          <p className="text-xl">Total: <span className="text-purple-400">${total.toFixed(2)}</span></p>
          <button
            onClick={clearCart}
            className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700"
          >
            Vaciar Carrito
          </button>
          <Link
            to="/" // Aquí podrías añadir una ruta para el checkout
            className="mt-4 ml-4 inline-block px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Proceder al Pago
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;