import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, purchaseHistory, updateUserProfile, getUserDetails } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    fullName: '',
    phone: '',
    documentType: 'CC',
    document: '',
  });
  const [loading, setLoading] = useState(false);

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      try {
        const details = await getUserDetails();
        setUserDetails({
          name: details.name || '',
          fullName: details.name || '',
          phone: details.phone || '',
          documentType: details.documentType || 'CC',
          document: details.document || '',
        });
      } catch (error) {
        console.error('Error loading user details:', error);
        toast.error('Error al cargar los datos del perfil');
      }
    };

    loadUserData();
  }, [user, getUserDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateUserProfile({
        name: userDetails.name,
        phone: userDetails.phone,
        documentType: userDetails.documentType,
        document: userDetails.document,
      });
      
      toast.success('Perfil actualizado correctamente');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen py-20 px-6 text-white text-center scroll-section seamless-section" style={{ background: 'transparent' }}>
        Por favor, inicia sesión.
      </div>
    );
  }

  return (
    <section className="min-h-screen  py-20 px-6 text-white scroll-section seamless-section" style={{ background: 'transparent' }}>
      <div className="max-w-7xl mx-auto mt-20 mb-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Mi Perfil</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
          >
            {editMode ? 'Cancelar' : 'Editar Perfil'}
          </button>
        </div>

        {editMode ? (
          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            <div>
              <label className="block mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Nombre Completo</label>
              <input
                type="text"
                name="fullName"
                value={userDetails.fullName}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 rounded"
                pattern="[0-9]{10,15}"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Tipo de Documento</label>
              <select
                name="documentType"
                value={userDetails.documentType}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 rounded"
                required
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="NIT">NIT</option>
                <option value="TI">Tarjeta de Identidad</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Número de Documento</label>
              <input
                type="text"
                name="document"
                value={userDetails.document}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 rounded"
                pattern="[0-9]{6,20}"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-6 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Información Personal</h3>
                <div className="space-y-3">
                  <p><span className="text-gray-400">Nombre:</span> {userDetails.name}</p>
                  <p><span className="text-gray-400">Nombre Completo:</span> {userDetails.fullName || 'No especificado'}</p>
                  <p><span className="text-gray-400">Email:</span> {user.email}</p>
                  <p><span className="text-gray-400">Teléfono:</span> {userDetails.phone || 'No especificado'}</p>
                  <p>
                    <span className="text-gray-400">Documento:</span> 
                    {userDetails.documentType ? ` ${userDetails.documentType} ` : ''}
                    {userDetails.document || 'No especificado'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <h3 className="text-2xl font-bold mb-4">Historial de Compras</h3>
        {purchaseHistory.length === 0 ? (
          <p>No tienes compras aún.</p>
        ) : (
          <div className="space-y-4">
            {purchaseHistory.map(purchase => (
              <div key={purchase.id} className="bg-gray-900 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      Fecha: {new Date(purchase.date).toLocaleString('es-CO')}
                    </p>
                    <p>
                      Estado: <span className={
                        purchase.status === 'completed' ? 'text-green-400' :
                        purchase.status === 'pending' ? 'text-yellow-400' :
                        'text-red-400'
                      }>
                        {purchase.status === 'completed' ? 'Completado' :
                         purchase.status === 'pending' ? 'Pendiente' :
                         purchase.status === 'declined' ? 'Declinado' :
                         purchase.status}
                      </span>
                    </p>
                  </div>
                  <p className="text-lg font-bold">
                    Total: {purchase.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                  </p>
                </div>
                <ul className="mt-3 space-y-1">
                  {Array.isArray(purchase.items) ? (
                    purchase.items.map((item, index) => (
                      <li key={index} className="text-gray-300">
                        - {item.quantity}x {item.variant} ({item.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })})
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-300">No hay información detallada de los productos</li>
                  )}
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