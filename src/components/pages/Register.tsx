import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  documentType: string;
  document: string;
  termsAccepted: boolean;
}

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch, setError, clearErrors } = useForm<RegisterForm>({
    mode: 'onChange', // Validar en tiempo real mientras el usuario escribe
  });
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  // Validaciones de seguridad para la contraseña
  const passwordRequirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

 
  useEffect(() => {
    if (isPasswordValid) {
      clearErrors('password');
    } else if (password.length > 0 && !isPasswordValid) {
      setError('password', { type: 'manual', message: 'La contraseña no cumple con los requisitos de seguridad' });
    } else {
      clearErrors('password'); 
    }
  }, [isPasswordValid, password, setError, clearErrors]);

  useEffect(() => {
    if (confirmPassword.length > 0 && !passwordsMatch) {
      setError('confirmPassword', { type: 'manual', message: 'Las contraseñas no coinciden' });
    } else {
      clearErrors('confirmPassword');
    }
  }, [passwordsMatch, confirmPassword, setError, clearErrors]);

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(
        data.email, 
        data.name, 
        data.password,
        data.fullName,
        data.phone,
        data.documentType,
        data.document
      );
      toast.success('¡Registro exitoso! Por favor, inicia sesión.');
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('email already in use')) {
          toast.error('Este email ya está registrado. Por favor, usa otro email o inicia sesión.');
        } else {
          toast.error(error.message || 'Error al registrarse');
        }
      } else {
        toast.error('Error al registrarse');
      }
    }
  };

  return (
    <section className="min-h-screen py-20 px-6 flex items-center justify-center scroll-section seamless-section" style={{ background: 'transparent' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-gray-900 p-8 rounded-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Registrarse</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo: Nombre */}
          <div>
            <label htmlFor="name" className="block mb-2">Usuario</label>
            <input
              {...register('name', { required: 'El nombre de usuario es requerido', minLength: { value: 2, message: 'Mínimo 2 caracteres' } })}
              className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
          </div>

          {/* Campo: Email */}
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              {...register('email', {
                required: 'El email es requerido',
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email inválido' },
              })}
              className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
          </div>

          {/* Campo: Contraseña */}
          <div>
            <label htmlFor="password" className="block mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'La contraseña es requerida',
                })}
                className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}

            {/* Indicadores de seguridad de la contraseña */}
            <div className="mt-2 text-sm space-y-1">
              <p className="text-gray-400">La contraseña debe incluir:</p>
              <div className="flex items-center gap-2">
                {passwordRequirements.minLength ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className={passwordRequirements.minLength ? 'text-green-500' : 'text-red-500'}>
                  Mínimo 8 caracteres
                </span>
              </div>
              <div className="flex items-center gap-2">
                {passwordRequirements.hasUpperCase ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className={passwordRequirements.hasUpperCase ? 'text-green-500' : 'text-red-500'}>
                  Al menos una mayúscula
                </span>
              </div>
              <div className="flex items-center gap-2">
                {passwordRequirements.hasLowerCase ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className={passwordRequirements.hasLowerCase ? 'text-green-500' : 'text-red-500'}>
                  Al menos una minúscula
                </span>
              </div>
              <div className="flex items-center gap-2">
                {passwordRequirements.hasNumber ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className={passwordRequirements.hasNumber ? 'text-green-500' : 'text-red-500'}>
                  Al menos un número
                </span>
              </div>
              <div className="flex items-center gap-2">
                {passwordRequirements.hasSpecialChar ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className={passwordRequirements.hasSpecialChar ? 'text-green-500' : 'text-red-500'}>
                  Al menos un carácter especial
                </span>
              </div>
            </div>
          </div>

          {/* Campo: Confirmar contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-2">Confirmar contraseña</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'La confirmación de la contraseña es requerida',
                })}
                className="w-full p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {/* Indicador de coincidencia de contraseñas */}
            {confirmPassword.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                {passwordsMatch ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span className={passwordsMatch ? 'text-green-500' : 'text-red-500'}>
                  {passwordsMatch ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                </span>
              </div>
            )}
            {errors.confirmPassword && <span className="text-red-400 text-sm">{errors.confirmPassword.message}</span>}
          </div>

          <div>
            <label htmlFor="fullName" className="block mb-2">Nombre Completo</label>
            <input
              {...register('fullName', { required: 'El nombre completo es requerido' })}
              className="w-full p-3 bg-gray-800 rounded"
            />
            {errors.fullName && <span className="text-red-400 text-sm">{errors.fullName.message}</span>}
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2">Teléfono</label>
            <input
              type="tel"
              {...register('phone', { 
                required: 'El teléfono es requerido',
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: 'Teléfono inválido'
                }
              })}
              className="w-full p-3 bg-gray-800 rounded"
            />
            {errors.phone && <span className="text-red-400 text-sm">{errors.phone.message}</span>}
          </div>

          <div>
            <label htmlFor="documentType" className="block mb-2">Tipo de Documento</label>
            <select
              {...register('documentType', { required: 'El tipo de documento es requerido' })}
              className="w-full p-3 bg-gray-800 rounded"
            >
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="NIT">NIT</option>
            </select>
          </div>

          <div>
            <label htmlFor="document" className="block mb-2">Número de Documento</label>
            <input
              {...register('document', { 
                required: 'El documento es requerido',
                pattern: {
                  value: /^[0-9]{6,20}$/,
                  message: 'Documento inválido'
                }
              })}
              className="w-full p-3 bg-gray-800 rounded"
            />
            {errors.document && <span className="text-red-400 text-sm">{errors.document.message}</span>}
          </div>


          {/* Campo: Aceptar términos y condiciones */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('termsAccepted', { required: 'Debes aceptar los términos y condiciones' })}
              className="h-4 w-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
            />
            <label htmlFor="termsAccepted" className="text-sm">
              Acepto los{' '}
              <Link to="/Terms" className="text-purple-400 hover:underline">términos y condiciones</Link>
            </label>
          </div>
          {errors.termsAccepted && <span className="text-red-400 text-sm">{errors.termsAccepted.message}</span>}

          {/* Botón de registro */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 bg-purple-600 rounded hover:bg-purple-700 transition-colors"
          >
            Registrarse
          </motion.button>
        </form>

        {/* Enlace para iniciar sesión */}
        <p className="text-center mt-4 text-sm text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-purple-400 hover:underline">Inicia sesión</Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;