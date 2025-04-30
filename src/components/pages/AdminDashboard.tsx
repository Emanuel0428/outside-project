import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { user, isAdmin, allPurchases, updatePurchaseStatus } = useAuth();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('');

  console.log('allPurchases en AdminDashboard:', allPurchases);
  console.log('isAdmin en AdminDashboard:', isAdmin);

  if (!user || !isAdmin) {
    navigate('/');
    toast.error('Acceso denegado. Solo administradores.');
    return null;
  }

  const filteredPurchases = statusFilter
    ? allPurchases.filter((purchase) => purchase.status === statusFilter)
    : allPurchases;

  console.log('filteredPurchases:', filteredPurchases);

  const handleStatusChange = async (purchaseId: string, newStatus: string) => {
    console.log('handleStatusChange - purchaseId:', purchaseId, 'newStatus:', newStatus);
    try {
      await updatePurchaseStatus(purchaseId, newStatus);
      toast.success('Estado actualizado con éxito');
    } catch (error: unknown) {
      console.error('Error completo en handleStatusChange:', error);
      if (error instanceof Error) {
        console.log('Mensaje de error:', error.message);
        console.log('Stack trace:', error.stack);
        toast.error(error.message || 'Error al actualizar el estado');
      } else {
        console.log('Error no es una instancia de Error:', error);
        toast.error('Error al actualizar el estado');
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-purple-900 py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Panel de Administración</h2>
        <div className="mb-6">
          <label className="block mb-2">Filtrar por estado:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full max-w-xs p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
          >
            <option value="">Todos</option>
            <option value="pending">Pendiente</option>
            <option value="paid">Pagado</option>
            <option value="shipped">Enviado</option>
          </select>
        </div>
        {filteredPurchases.length === 0 ? (
          <p>No hay órdenes para mostrar.</p>
        ) : (
          <div className="space-y-6">
            {filteredPurchases.map((purchase) => (
              <div key={purchase.id} className="bg-gray-900 p-6 rounded-lg">
                <p><strong>ID de compra:</strong> {purchase.id}</p>
                <p><strong>Items:</strong></p>
                <ul>
                  {purchase.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity}x {item.variant} ({item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })})
                    </li>
                  ))}
                </ul>
                <p><strong>Fecha:</strong> {new Date(purchase.date).toLocaleString('es-CO')}</p>
                <p><strong>Total:</strong> {purchase.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                <p><strong>Estado:</strong> {purchase.status}</p>
                <ul className="mt-2">
                  {purchase.items.map((item, index) => (
                    <li key={index}>
                      - {item.quantity}x {item.variant} ({item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })})
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <label className="mr-2">Cambiar estado:</label>
                  <select
                    value={purchase.status}
                    onChange={(e) => handleStatusChange(purchase.id, e.target.value)}
                    className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="paid">Pagado</option>
                    <option value="shipped">Enviado</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;