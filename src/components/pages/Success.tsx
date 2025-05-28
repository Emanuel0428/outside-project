import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'react-toastify';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updatePurchaseStatus } = useAuth();

  useEffect(() => {
    const processPayment = async () => {
      const referenceCode = searchParams.get('referenceCode');
      const transactionState = searchParams.get('transactionState');

      if (!referenceCode || !transactionState) {
        navigate('/');
        return;
      }

      const purchaseId = referenceCode.replace('OUTSIDE_', '');
      let status = 'pending';

      switch(transactionState) {
        case 'APPROVED':
          status = 'completed';
          toast.success('¡Pago aprobado! Gracias por tu compra');
          break;
        case 'DECLINED':
          status = 'declined';
          toast.error('Pago declinado. Por favor intenta nuevamente');
          break;
        case 'PENDING':
          status = 'pending';
          toast.warning('Pago pendiente. Estamos procesando tu transacción');
          break;
        default:
          status = 'unknown';
      }

      try {
        await updatePurchaseStatus(purchaseId, status);
      } catch (error) {
        console.error('Error updating purchase:', error);
      }

      navigate('/profile');
    };

    processPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white scroll-section seamless-section" style={{ background: 'transparent' }}>
      <div className="text-center p-6 max-w-md">
        <h1 className="text-3xl font-bold mb-4">Procesando tu pago...</h1>
        <p>Serás redirigido automáticamente en unos momentos</p>
      </div>
    </div>
  );
};

export default SuccessPage;