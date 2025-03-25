/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabaseClient';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user, addPurchase, updatePurchaseStatus } = useAuth();
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);
  const [pendingPurchaseId, setPendingPurchaseId] = useState<string | null>(null);
  const [loadingPayment, setLoadingPayment] = useState(false); // Agregar el estado loadingPayment

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Por favor, inicia sesión para completar la compra');
      navigate('/login');
      return;
    }
    try {
      const purchaseItems = cart.map(item => ({
        productId: item.product.id,
        variant: item.variant,
        quantity: item.quantity,
        price: item.product.price,
      }));
      await addPurchase(purchaseItems, total);
      const { data } = await supabase.from('purchases').select('id').order('created_at', { ascending: false }).limit(1);
      setPendingPurchaseId(data?.[0]?.id || null);
      setIsCheckout(true);
    } catch (error: any) {
      toast.error(error.message || 'Error al crear la orden');
    }
  };

  const confirmPurchase = async () => {
    if (!pendingPurchaseId) return;
    setLoadingPayment(true);
  
    try {
      const referenceCode = `OUTSIDE_${pendingPurchaseId}`;
      const description = cart
        .map(item => `${item.product.name} (${item.variant}) x ${item.quantity}`)
        .join(', ');
      const totalWithShipping = total >= 100000 ? total : total + 10000;
      const formattedTotal = totalWithShipping.toFixed(2);
  
      console.log('Enviando solicitud al backend para Mercado Pago:', {
        total: formattedTotal,
        referenceCode,
        buyerEmail: user?.email || '',
        description,
      });
  
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
      const response = await fetch(`${backendUrl}/create-mercadopago-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total: formattedTotal,
          referenceCode,
          buyerEmail: user?.email || '',
          description,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error al crear la preferencia de pago: ${response.statusText}`);
      }
  
      const { paymentUrl } = await response.json();
      console.log('Redirigiendo a Mercado Pago:', paymentUrl);
  
      window.location.href = paymentUrl;
    } catch (error: any) {
      console.error('Error al procesar el pago con Mercado Pago:', error);
      toast.error(error.message || 'Error al procesar el pago');
      setLoadingPayment(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden py-40 px-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-8">Tu carrito está vacío</h2>
        <Link to="/" className="text-purple-400 hover:underline">Volver a productos</Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Tu Carrito</h2>
        {!isCheckout ? (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.variant}`} className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-white">{item.product.name} - {item.variant}</h3>
                    <p className="text-purple-400">{item.product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} x {item.quantity}</p>
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
              <p className="text-xl">Total: <span className="text-purple-400">{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></p>
              <button
                onClick={clearCart}
                className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700"
              >
                Vaciar Carrito
              </button>
              <button
                onClick={handleCheckout}
                className="mt-4 ml-4 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Proceder al Pago
              </button>
            </div>
          </>
        ) : (
          <div className="bg-gray-900 p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-6">Confirmar Compra</h3>
            <p>Subtotal: <span className="text-purple-400">{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></p>
            <p className="mt-4">Envío: {total >= 100000 ? 'Gratis' : '10.000'}</p>
            <p className="mt-4">Total con envío: <span className="text-purple-400">{(total >= 100000 ? total : total + 10000).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span></p>
            <button
              onClick={confirmPurchase}
              className="mt-6 w-full px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              disabled={loadingPayment} // Deshabilitar el botón mientras se procesa el pago
            >
              {loadingPayment ? 'Procesando...' : 'Confirmar Pago'} {/* Mostrar "Procesando..." mientras loadingPayment es true */}
            </button>
            <button
              onClick={() => setIsCheckout(false)}
              className="mt-4 w-full px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              disabled={loadingPayment} // Deshabilitar también este botón mientras se procesa
            >
              Volver al Carrito
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;