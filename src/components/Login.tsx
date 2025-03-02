import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('¡Inicio de sesión exitoso!');
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error al iniciar sesión');
      } else {
        toast.error('Error al iniciar sesión');
      }
    }
  };

  return (
    <section className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              {...register('password', { required: 'La contraseña es requerida' })}
              className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}
          </div>
          <button type="submit" className="w-full p-3 bg-purple-600 rounded hover:bg-purple-700 transition-colors">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;