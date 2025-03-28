import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabaseClient';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { 
    user, 
    addPurchase, 
    updateUserProfile, 
    getUserDetails,
    isAuthenticated
  } = useAuth();
  
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    phone: '',
    documentType: 'CC',
    document: '',
  });
  
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);
  const [pendingPurchaseId, setPendingPurchaseId] = useState<string | null>(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    const loadUserDetails = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        const details = await getUserDetails();
        setUserDetails({
          fullName: details.name || '',
          phone: details.phone || '',
          documentType: details.documentType || 'CC',
          document: details.document || '',
        });
      } catch (error) {
        console.error('Error loading user details:', error);
        toast.error('Error al cargar los detalles del usuario');
      }
    };
    
    loadUserDetails();
  }, [isAuthenticated, user, getUserDetails]);

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Por favor, inicia sesión para completar la compra');
      navigate('/login');
      return;
    }

    // Verificar datos requeridos para PayU
    if (!userDetails.fullName || !userDetails.phone || !userDetails.document) {
      toast.error('Por favor completa tu información personal antes de pagar');
      return;
    }

    try {
      const purchaseItems = cart.map(item => ({
        productId: item.product.id,
        variant: item.variant,
        quantity: item.quantity,
        price: item.product.price,
      }));

      // Crear la compra en Supabase
      await addPurchase(purchaseItems, total);
      
      // Obtener el ID de la última compra
      const { data, error } = await supabase
        .from('purchases')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      if (!data) throw new Error('No se pudo crear la orden');

      setPendingPurchaseId(data.id);
      setIsCheckout(true);
      
    } catch (error: any) {
      console.error('Error during checkout:', error);
      toast.error(error.message || 'Error al crear la orden');
    }
  };

  const confirmPurchase = async () => {
    if (!pendingPurchaseId || !user) {
      toast.error('Error al procesar el pago');
      return;
    }
    
    setLoadingPayment(true);

    try {
      const referenceCode = `OUTSIDE_${pendingPurchaseId}`;
      const description = cart
        .map(item => `${item.product.name} (${item.variant}) x ${item.quantity}`)
        .join(', ');
      
      const totalWithShipping = total >= 100000 ? total : total + 10000;
      const formattedTotal = totalWithShipping.toFixed(2);

      // Datos para PayU
      const paymentData = {
        total: formattedTotal,
        referenceCode,
        description,
        payerFullName: userDetails.fullName,
        payerEmail: user.email || '',
        payerPhone: userDetails.phone,
        payerDocumentType: userDetails.documentType,
        payerDocument: userDetails.document,
        buyerFullName: userDetails.fullName,
        buyerEmail: user.email || '',
        buyerDocumentType: userDetails.documentType,
        buyerDocument: userDetails.document,
        telephone: userDetails.phone,
      };

      // Llamar al backend para crear el pago en PayU
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
      const response = await fetch(`${backendUrl}/create-payu-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear el pago: ${response.statusText} - ${errorText}`);
      }

      const { paymentUrl, payuParams } = await response.json();

      // Crear formulario para redirigir a PayU
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentUrl;
      form.style.display = 'none';

      Object.entries(payuParams).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (error: any) {
      console.error('Error al procesar el pago:', error);
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
                    <p className="text-purple-400">
                      {item.product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} x {item.quantity}
                    </p>
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
              <p className="text-xl">
                Total: <span className="text-purple-400">
                  {total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                </span>
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={clearCart}
                  className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Vaciar Carrito
                </button>
                
                <button
                  onClick={handleCheckout}
                  className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Proceder al Pago
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-900 p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-6">Confirmar Compra</h3>
            
            <div className="space-y-4">
              <p>Subtotal: <span className="text-purple-400">
                {total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
              </span></p>
              
              <p>Envío: {total >= 100000 ? 'Gratis' : '$10,000'}</p>
              
              <p className="font-bold">Total con envío: <span className="text-purple-400">
                {(total >= 100000 ? total : total + 10000).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
              </span></p>
            </div>
            
            <div className="mt-6 space-y-4">
              <button
                onClick={confirmPurchase}
                className="w-full px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                disabled={loadingPayment}
              >
                {loadingPayment ? 'Procesando...' : 'Confirmar Pago con PayU'}
              </button>
              
              <button
                onClick={() => setIsCheckout(false)}
                className="w-full px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                disabled={loadingPayment}
              >
                Volver al Carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;