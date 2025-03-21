import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied: React.FC = () => {
  return (
    <section className="min-h-screen bg-black py-20 px-6 flex items-center justify-center">
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