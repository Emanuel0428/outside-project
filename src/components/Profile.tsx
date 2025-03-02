import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, purchaseHistory } = useAuth();

  if (!user) return <div className="min-h-screen bg-black py-20 px-6 text-white text-center">Por favor, inicia sesión.</div>;

  return (
    <section className="min-h-screen bg-black py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Perfil de {user.user_metadata.name}</h2>
        <p>Email: {user.email}</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Historial de Compras</h3>
        {purchaseHistory.length === 0 ? (
          <p>No tienes compras aún.</p>
        ) : (
          <div className="space-y-4">
            {purchaseHistory.map(purchase => (
              <div key={purchase.id} className="bg-gray-900 p-4 rounded-lg">
                <p>Fecha: {new Date(purchase.date).toLocaleString('es-CO')}</p>
                <p>Total: ${purchase.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                <ul className="mt-2">
                  {purchase.items.map((item, index) => (
                    <li key={index}>
                      - {item.quantity}x {item.variant} (${item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;