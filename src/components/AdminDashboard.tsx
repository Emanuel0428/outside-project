import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { user, isAdmin, allPurchases, updatePurchaseStatus } = useAuth();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('');

  if (!user || !isAdmin) {
    navigate('/');
    toast.error('Acceso denegado. Solo administradores.');
    return null;
  }

  const filteredPurchases = statusFilter
    ? allPurchases.filter(purchase => purchase.status === statusFilter)
    : allPurchases;

  const handleStatusChange = async (purchaseId: string, newStatus: string) => {
    try {
      await updatePurchaseStatus(purchaseId, newStatus);
      toast.success('Estado actualizado con éxito');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar el estado');
    }
  };

  return (
    <section className="min-h-screen bg-black py-20 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Panel de Administración</h2>
        
        {/* Filtro por estado */}
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

        {/* Lista de órdenes */}
        {filteredPurchases.length === 0 ? (
          <p>No hay órdenes para mostrar.</p>
        ) : (
          <div className="space-y-6">
            {filteredPurchases.map((purchase) => (
              <div key={purchase.id} className="bg-gray-900 p-6 rounded-lg">
                <p><strong>ID:</strong> {purchase.id}</p>
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