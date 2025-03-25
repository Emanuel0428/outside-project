// src/pages/Cancel.tsx
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden py-40 px-6 text-white text-center">
      <h2 className="text-3xl font-bold mb-8">Pago Cancelado</h2>
      <p className="text-lg mb-6">El pago no se completó. ¿Deseas intentarlo de nuevo?</p>
      <Link to="/cart" className="text-purple-400 hover:underline">
        Volver al carrito
      </Link>
    </section>
  );
};

export default Cancel;