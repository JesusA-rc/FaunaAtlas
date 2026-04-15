import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import TextInput from '../components/TextInput';
import AccountService from '../core/services/accountService';
import { type UserFormValues } from '../core/models';
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa';
import { useAccount } from '../core/contexts/AccountContext';

const registerSchema = z.object({
  username: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  nombreCompleto: z.string().min(1, 'El nombre completo es requerido'),
});

const RegisterPage = () => 
{
  const navigate = useNavigate();
  const { login } = useAccount();
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      nombreCompleto: '',
    },
  });

  const onSubmit = async (values: UserFormValues) => 
  {
    try {
      const userRes = await AccountService.register(values);
      login(userRes);
      navigate('/');
    } catch (error: any) {
      if (error.response?.data === 'username_taken') {
        setError('username', { type: 'manual', message: 'Este nombre de usuario ya está en uso' });
      } else if (error.response?.data === 'email_taken') {
        setError('email', { type: 'manual', message: 'Este correo electrónico ya está registrado' });
      } else {
        console.error('Error en el registro:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6 pt-24">
      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/" className="text-slate hover:text-white transition-colors">
            <FaArrowLeft size={20} />
          </Link>
        </div>

        <div className="bg-[#021b36] border border-white/5 p-10 rounded-[40px] shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-mint/10 rounded-2xl flex items-center justify-center text-mint border border-mint/20">
              <FaUserPlus size={30} />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <TextInput
              name="nombreCompleto"
              control={control}
              label="Nombre Completo"
            />
            <TextInput
              name="username"
              control={control}
              label="Usuario"
            />
            <TextInput
              name="email"
              control={control}
              label="Correo Electrónico"
              type="email"
            />
            <TextInput
              name="password"
              control={control}
              label="Contraseña"
              type="password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full 
                mt-8 
                py-4 
                rounded-2xl 
                bg-mint 
                text-navy 
                font-bold 
                text-lg 
                hover:bg-[#3db87b] 
                transition-all 
                duration-300 
                shadow-[0_10px_20px_rgba(76,201,138,0.2)] 
                active:scale-95 
                disabled:opacity-50 
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2
                cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-navy/30 border-t-navy rounded-full animate-spin"></div>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-mint font-bold hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
