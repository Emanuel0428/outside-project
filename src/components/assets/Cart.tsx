import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user, isAuthenticated, getUserDetails, addPurchase } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'payu'>('whatsapp');

  const [userDetails, setUserDetails] = useState({
    fullName: '',
    phone: '',
    documentType: 'CC',
    document: '',
  });

  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    phone: '',
  });

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
        // Pre-fill the phone number in delivery details if available
        setDeliveryDetails((prev) => ({
          ...prev,
          phone: details.phone || '',
        }));
      } catch (error) {
        console.error('Error loading user details:', error);
        toast.error('Error al cargar los detalles del usuario');
      }
    };

    loadUserDetails();
  }, [isAuthenticated, user, getUserDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Por favor, inicia sesión para completar la compra');
      navigate('/login');
      return;
    }
  
    if (!userDetails.fullName) {
      toast.error('Por favor completa tu información personal (nombre) antes de continuar');
      return;
    }

    // Preparar los items en el formato que espera Supabase
    const purchaseItems = cart.map(item => ({
      productId: item.product.id,
      variant: item.variant,
      quantity: item.quantity,
      price: item.product.price
    }));
  
    try {
      // Guardar la compra en Supabase
      await addPurchase(purchaseItems, total, 'pending');
      
      if (paymentMethod === 'whatsapp') {
        const cartDetails = cart.map((item) =>
          `${item.product.name} (${item.variant}) x ${item.quantity} - ${(
            item.product.price * item.quantity
          ).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}`
        ).join('\n');
    
        const shippingCost = total >= 100000 ? 0 : 10000;
        const totalWithShipping = total + shippingCost;
    
        const deliveryInfo = deliveryDetails.address
          ? `\nDirección de entrega: ${deliveryDetails.address}`
          : '\nEntrega: Recoger en persona';
        const phoneInfo = deliveryDetails.phone
          ? `\nTeléfono: ${deliveryDetails.phone}`
          : userDetails.phone
          ? `\nTeléfono: ${userDetails.phone}`
          : '';
    
        const message = `Hola, quiero realizar un pedido:\n\n${cartDetails}\n\nSubtotal: ${total.toLocaleString(
          'es-CO',
          { style: 'currency', currency: 'COP' }
        )}\nEnvío: ${
          shippingCost === 0
            ? 'Gratis'
            : shippingCost.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
        }\nTotal: ${totalWithShipping.toLocaleString('es-CO', {
          style: 'currency',
          currency: 'COP',
        })}\n\nNombre: ${userDetails.fullName}${phoneInfo}${deliveryInfo}`;
    
        const phoneNumber = '573217905526';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
        window.open(whatsappUrl, '_blank');
        clearCart();
        toast.success('Redirigiendo a WhatsApp para completar tu compra');
      }
    
      else if (paymentMethod === 'payu') {
        try {
          const referenceCode = `OUTSIDE_${Date.now()}`;
          const payload = {
            total: total.toFixed(2),
            referenceCode,
            description: 'Compra en Outside',
            payerFullName: userDetails.fullName,
            payerEmail: user.email,
            payerPhone: userDetails.phone,
            payerDocumentType: userDetails.documentType,
            payerDocument: userDetails.document,
            buyerFullName: userDetails.fullName,
            buyerEmail: user.email,
            buyerDocumentType: userDetails.documentType,
            buyerDocument: userDetails.document,
            telephone: deliveryDetails.phone || userDetails.phone,
          };
    
          const response = await fetch('http://localhost:4000/create-payu-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
    
          const data = await response.json();
    
          // Redirige al usuario al formulario de pago
          const form = document.createElement('form');
          form.action = data.paymentUrl;
          form.method = 'POST';
          form.style.display = 'none';
    
          Object.entries(data.payuParams).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.name = key;
            input.value = value as string;
            form.appendChild(input);
          });
    
          document.body.appendChild(form);
          form.submit();
        } catch (error) {
          console.error('Error al crear pago PayU:', error);
          toast.error('No se pudo iniciar el pago con tarjeta');
        }
      }
    } catch (error) {
      console.error('Error al guardar la compra en la base de datos:', error);
      toast.error('Error al procesar tu compra. Por favor, intenta de nuevo.');
    }
  };
  

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden py-40 px-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-8">Tu carrito está vacío</h2>
        <Link to="/products" className="text-purple-400 hover:underline">
          Volver a productos
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Tu Carrito</h2>

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.variant}`}
              className="bg-gray-900 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-white">
                  {item.product.name} - {item.variant}
                </h3>
                <p className="text-purple-400">
                  {item.product.price.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                  })}{' '}
                  x {item.quantity}
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
            Total:{' '}
            <span className="text-purple-400">
              {total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
            </span>
          </p>

          {/* Delivery Details Section */}
          <div className="mt-6 bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-4">
              Detalles de Entrega
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-white mb-2">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={deliveryDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Ej: +57 300 123 4567"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-white mb-2">
                  Dirección de Entrega (Opcional - Deja en blanco si prefieres recoger en persona)
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleInputChange}
                  placeholder="Ej: Calle 123 #45-67, Medellín"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={clearCart}
              className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Vaciar Carrito
            </button>

            <div className="mb-4">
              <label className="block text-white mb-2">Método de pago:</label>
              <select
                className="w-full p-2 rounded text-white"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as 'whatsapp' | 'payu')}
              >
                <option value="whatsapp">Pago por WhatsApp</option>
                <option value="payu">Pago con Tarjeta (PayU)</option>
              </select>
            </div>

            <button
              onClick={handleCheckout}
              className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Proceder al Pago
            </button>
          </div>

          <p className="text-gray-400 mt-4">
            Serás redirigido a WhatsApp para completar tu compra. Si no tienes WhatsApp, contáctanos al +57 321 790 5526.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cart;