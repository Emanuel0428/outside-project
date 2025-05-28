// src/pages/Cancel.tsx
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <section className="min-h-screen overflow-hidden py-40 px-6 text-white text-center scroll-section seamless-section" style={{ background: 'transparent' }}>
      <h2 className="text-3xl font-bold mb-8">Pago Cancelado</h2>
      <p className="text-lg mb-6">El pago no se completó. ¿Deseas intentarlo de nuevo?</p>
      <Link to="/cart" className="text-purple-400 hover:underline">
        Volver al carrito
      </Link>
    </section>
  );
};

export default Cancel;