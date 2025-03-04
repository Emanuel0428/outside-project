import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

interface LoginForm {
  email: string;
  password: string;
}

interface ResetForm {
  email: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { register: registerReset, handleSubmit: handleResetSubmit, formState: { errors: resetErrors } } = useForm<ResetForm>();
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password, rememberMe);
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

  const onResetSubmit = async (data: ResetForm) => {
    try {
      await resetPassword(data.email);
      toast.success('Se ha enviado un enlace de recuperación a tu email');
      setShowReset(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error al enviar el enlace de recuperación');
      } else {
        toast.error('Error al enviar el enlace de recuperación');
      }
    }
  };

  return (
    <section className="min-h-screen bg-black py-20 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-gray-900 p-8 rounded-lg text-white"
      >
        {!showReset ? (
          <>
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
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm">Recordarme</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-sm text-purple-400 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <button type="submit" className="w-full p-3 bg-purple-600 rounded hover:bg-purple-700 transition-colors">
                Iniciar Sesión
              </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-400">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-purple-400 hover:underline">Regístrate</Link>
            </p>
            <p className="text-center mt-2 text-sm text-gray-400">
              ¿Olvidaste tu email? Contacta a{' '}
              <a href="mailto:soporte@outside.com" className="text-purple-400 hover:underline">soporte</a>.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
            <form onSubmit={handleResetSubmit(onResetSubmit)} className="space-y-6">
              <div>
                <label htmlFor="resetEmail" className="block mb-2">Email</label>
                <input
                  {...registerReset('email', { required: 'El email es requerido', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email inválido' } })}
                  className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {resetErrors.email && <span className="text-red-400 text-sm">{resetErrors.email.message}</span>}
              </div>
              <button type="submit" className="w-full p-3 bg-purple-600 rounded hover:bg-purple-700 transition-colors">
                Enviar enlace de recuperación
              </button>
            </form>
            <button
              onClick={() => setShowReset(false)}
              className="w-full mt-4 text-sm text-purple-400 hover:underline"
            >
              Volver al inicio de sesión
            </button>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default Login;