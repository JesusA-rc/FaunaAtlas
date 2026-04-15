import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => 
{
    return (
        <div className="min-h-screen bg-navy flex items-center justify-center p-6 pt-24">
            <div className="text-center max-w-lg">
                <div className="flex justify-center mb-8">
                    <div className="
                        w-24 
                        h-24 
                        bg-mint/10 
                        rounded-full 
                        flex 
                        items-center 
                        justify-center 
                        text-mint 
                        border 
                        border-mint/20 
                        animate-pulse">
                        <FaExclamationTriangle size={48} />
                    </div>
                </div>
                
                <h1 className="text-6xl font-heading font-black text-white mb-4">404</h1>
                <h2 className="text-2xl font-bold text-mint mb-8">Página extinta</h2>
                
                <p className="text-slate text-lg mb-10 leading-relaxed">
                    Parece que esta ruta ha sido desplazada de su hábitat natural o nunca existió.
                </p>

                <Link 
                    to="/" 
                    className="
                        inline-flex 
                        items-center 
                        justify-center 
                        px-8 
                        py-4 
                        bg-mint 
                        text-navy 
                        font-bold 
                        rounded-2xl 
                        hover:bg-[#3db87b] 
                        transition-all 
                        transform 
                        hover:scale-105 
                        shadow-lg 
                        shadow-mint/20"
                >
                    Vuelve a la actualidad dando click aquí
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
