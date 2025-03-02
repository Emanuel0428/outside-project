import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data.email, data.name, data.password);
      toast.success('¡Registro exitoso! Por favor, inicia sesión.');
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error al registrarse');
      } else {
        toast.error('Error al registrarse');
      }
    }
  };

  return (
    <section className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrarse</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2">Nombre</label>
            <input
              {...register('name', { required: 'El nombre es requerido' })}
              className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              {...register('email', { required: 'El email es requerido', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email inválido' } })}
              className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Contraseña</label>
            <input
              type="password"
              {...register('password', { required: 'La contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
              className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}
          </div>
          <button type="submit" className="w-full p-3 bg-purple-600 rounded hover:bg-purple-700 transition-colors">
            Registrarse
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;