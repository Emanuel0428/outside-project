import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '@/context/CartContext';

const Response = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    const transactionState = searchParams.get('lapTransactionState');
    const referenceCode = searchParams.get('referenceCode');
    const transactionId = searchParams.get('transactionId');
    const message = searchParams.get('message');

    if (transactionState === 'APPROVED') {
      toast.success(`¡Pago aprobado! Referencia: ${referenceCode}, ID de transacción: ${transactionId}`);
      clearCart();
      navigate(`/success?referenceCode=${referenceCode}&transactionState=APPROVED`);
    } else if (transactionState === 'DECLINED') {
      toast.error(`Pago declinado: ${message}. Referencia: ${referenceCode}`);
      navigate(`/cancel?referenceCode=${referenceCode}&transactionState=DECLINED`);
    } else if (transactionState === 'PENDING') {
      toast.warning(`Pago pendiente. Referencia: ${referenceCode}`);
      navigate(`/pending?referenceCode=${referenceCode}&transactionState=PENDING`);
    } else {
      toast.error('Estado de transacción desconocido');
      navigate('/cart');
    }
  }, [searchParams, navigate, clearCart]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden py-40 px-6 text-white text-center">
      <h2 className="text-3xl font-bold mb-8">Procesando tu pago...</h2>
      <p>Por favor espera mientras verificamos tu transacción.</p>
    </section>
  );
};


export default Response;