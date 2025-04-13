import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user, isAuthenticated, getUserDetails } = useAuth();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    fullName: '',
    phone: '',
    documentType: 'CC',
    document: '',
  });

  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    phone: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [paymentMethod] = useState('payu'); // PayU será el método por defecto
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserDetailsChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
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

    if (!user.email) {
      toast.error('No se pudo obtener el correo del usuario. Por favor verifica tu perfil.');
      return;
    }

    if (
      !userDetails.phone ||
      !userDetails.document ||
      !deliveryDetails.address ||
      !deliveryDetails.city ||
      !deliveryDetails.state ||
      !deliveryDetails.postalCode
    ) {
      toast.error(
        'Por favor completa todos los campos obligatorios (teléfono, documento, dirección, ciudad, departamento, código postal).'
      );
      return;
    }

    setLoading(true);

    try {
      const referenceCode = `OUTSIDE_${Date.now()}`;

      // Preparar los datos para enviar al backend
      const paymentData = {
        total: total.toString(),
        referenceCode,
        description: `Compra en Outside - Ref ${referenceCode}`,
        userId: user.id,
        payerFullName: userDetails.fullName,
        payerEmail: user.email,
        payerPhone: userDetails.phone,
        payerDocumentType: userDetails.documentType,
        payerDocument: userDetails.document,
        buyerFullName: userDetails.fullName,
        buyerEmail: user.email,
        buyerDocumentType: userDetails.documentType,
        buyerDocument: userDetails.document,
        telephone: userDetails.phone,
      };

      // Enviar los datos al backend
      const response = await fetch('http://localhost:4000/create-payu-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Error al procesar el pago');
      }

      const { paymentUrl, payuParams } = await response.json();

      // Crear un formulario dinámico para redirigir a PayU
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentUrl;

      // Agregar todos los parámetros como campos ocultos
      Object.keys(payuParams).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = payuParams[key];
        form.appendChild(input);
      });

      // Agregar el formulario al DOM y enviarlo automáticamente
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      toast.error('Error al procesar el pago: ' + errorMessage);
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden py-40 px-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-8">Tu carrito está vacío</h2>
        <Link to="/" className="text-purple-400 hover:underline">
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

          {/* Detalles del Comprador */}
          <div className="mt-6 bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-4">Detalles del Comprador</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="documentType" className="block text-white mb-2">
                  Tipo de Documento
                </label>
                <select
                  id="documentType"
                  name="documentType"
                  value={userDetails.documentType}
                  onChange={handleUserDetailsChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="CC">Cédula de Ciudadanía (CC)</option>
                  <option value="CE">Cédula de Extranjería (CE)</option>
                  <option value="PPN">Pasaporte (PPN)</option>
                </select>
              </div>
              <div>
                <label htmlFor="document" className="block text-white mb-2">
                  Número de Documento
                </label>
                <input
                  type="text"
                  id="document"
                  name="document"
                  value={userDetails.document}
                  onChange={handleUserDetailsChange}
                  placeholder="Ej: 12345678"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-white mb-2">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleUserDetailsChange}
                  placeholder="Ej: +57 300 123 4567"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Detalles de Entrega */}
          <div className="mt-6 bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-4">Detalles de Entrega</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-white mb-2">
                  Dirección de Entrega
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleInputChange}
                  placeholder="Ej: Calle 123 #45-67"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-white mb-2">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={deliveryDetails.city}
                  onChange={handleInputChange}
                  placeholder="Ej: Medellín"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-white mb-2">
                  Departamento
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={deliveryDetails.state}
                  onChange={handleInputChange}
                  placeholder="Ej: Antioquia"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-white mb-2">
                  Código Postal
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={deliveryDetails.postalCode}
                  onChange={handleInputChange}
                  placeholder="Ej: 050001"
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

            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`px-6 py-2 rounded-lg ${
                loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? 'Procesando...' : 'Proceder al Pago'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;