import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import TextInput from '../components/TextInput';
import AccountService from '../core/services/accountService';
import { type LoginFormValues } from '../core/models';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import { useAccount } from '../core/contexts/AccountContext';

const loginSchema = z.object({
  username: z.string().min(1, 'El usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

const LoginPage = () => 
{
  const navigate = useNavigate();
  const { login } = useAccount();
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => 
  {
    try {
      const userRes = await AccountService.login(values);
      login(userRes);
      navigate('/');
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('username', { type: 'manual', message: 'Usuario o contraseña incorrectos' });
        setError('password', { type: 'manual', message: ' ' });
      } else {
        console.error('Error en el inicio de sesión:', error);
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
              <FaLock size={26} />
            </div>
          </div>

          <h2 className="text-2xl font-heading font-bold text-white text-center mb-10">
            Bienvenido de <span className="text-mint">nuevo</span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              name="username"
              control={control}
              label="Nombre de Usuario"
              placeholder="Ingresa tu alias"
            />
            <TextInput
              name="password"
              control={control}
              label="Contraseña"
              placeholder="••••••••"
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
                'Ingresar'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate text-sm">
            ¿No tienes cuenta todavía?{' '}
            <Link to="/register" className="text-mint font-bold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
