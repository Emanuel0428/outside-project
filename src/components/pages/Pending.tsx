// src/pages/Pending.tsx
import { Link } from 'react-router-dom';

const Pending = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 overflow-hidden py-40 px-6 text-white text-center">
      <h2 className="text-3xl font-bold mb-8">Pago Pendiente</h2>
      <p className="text-lg mb-6">
        Tu pago está pendiente de confirmación. Te notificaremos una vez que se haya procesado.
      </p>
      <Link to="/" className="text-purple-400 hover:underline">
        Volver a la tienda
      </Link>
    </section>
  );
};

export default Pending;