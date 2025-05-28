
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <section className="min-h-screen py-20 px-6 flex items-center justify-center scroll-section seamless-section" style={{ background: 'transparent' }}>
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Acceso Denegado</h1>
        <p className="text-gray-400 mb-6">
          No tienes permisos para acceder a esta página. Si crees que esto es un error, por favor contacta al soporte.
        </p>
        <Link to="/" className="text-purple-400 hover:underline">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
};

export default AccessDenied;