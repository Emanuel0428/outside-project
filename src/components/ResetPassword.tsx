import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordForm>();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isValidLink, setIsValidLink] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  // Observar los valores de los campos en tiempo real
  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  useEffect(() => {
    const handleResetFlow = async () => {
      const hashParams = new URLSearchParams(location.hash.slice(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const type = hashParams.get('type');

      if (type !== 'recovery' || !accessToken || !refreshToken) {
        toast.error('Enlace de recuperación inválido o expirado');
        navigate('/login');
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        toast.error('Error al validar el enlace de recuperación: ' + error.message);
        navigate('/login');
        return;
      }

      setIsValidLink(true);
      setLoading(false);
    };

    handleResetFlow();
  }, [location, navigate]);

  // Validar coincidencia de contraseñas en tiempo real
  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  }, [password, confirmPassword]);

  const onSubmit = async (data: ResetPasswordForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({ password: data.password });
      if (error) throw error;
      toast.success('Contraseña actualizada con éxito');
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error al actualizar la contraseña');
      } else {
        toast.error('Error al actualizar la contraseña');
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando...</div>;

  if (!isValidLink) return null;

  return (
    <section className="min-h-screen bg-black py-20 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-gray-900 p-8 rounded-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="password" className="block mb-2">Nueva Contraseña</label>
            <input
              type="password"
              {...register('password', { required: 'La contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
              className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              {...register('confirmPassword', { required: 'Confirma tu contraseña' })}
              className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.confirmPassword && <span className="text-red-400 text-sm">{errors.confirmPassword.message}</span>}
            {passwordMismatch && <span className="text-red-400 text-sm">Las contraseñas no coinciden</span>}
          </div>
          <button
            type="submit"
            disabled={passwordMismatch} // Deshabilitar si no coinciden
            className={`w-full p-3 rounded transition-colors ${passwordMismatch ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            Actualizar Contraseña
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-purple-400 hover:underline">Inicia sesión</Link>
        </p>
      </motion.div>
    </section>
  );
};

export default ResetPassword;