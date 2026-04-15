import { FaPaw, FaTree, FaMapMarkedAlt, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => 
{
  const navigate = useNavigate();

  const menuItems = [
    { 
      name: 'Especies', 
      icon: <FaPaw />, 
      path: '/admin/ver',
      desc: 'Gestionar registros y fichas técnicas de animales.' 
    },
    { 
      name: 'Hábitats', 
      icon: <FaTree />, 
      path: '/admin/habitats/ver',
      desc: 'Administrar ecosistemas y regiones geográficas.' 
    },
    { 
      name: 'Avistamientos', 
      icon: <FaMapMarkedAlt />, 
      path: '/admin/avistamientos',
      desc: 'Revisar reportes de avistamientos recibidos.' 
    },
    { 
      name: 'Usuarios', 
      icon: <FaUsers />, 
      path: '/admin/usuarios',
      desc: 'Administrar accesos y roles de la plataforma.' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#021b36] pt-32 pb-12">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            Panel de <span className="text-mint">Control Admin</span>
          </h1>
          <p className="text-slate text-lg max-w-2xl leading-relaxed">
            Bienvenido al área administrativa de Fauna Atlas. Desde aquí podrás gestionar integralmente 
            la base de conocimientos de vida salvaje.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div 
              key={item.name} 
              onClick={() => navigate(item.path)}
              className="
                bg-navy/50 
                p-8 
                rounded-[32px] 
                border 
                border-white/5 
                hover:border-mint/30 
                hover:bg-navy/70 
                transition-all 
                duration-300 
                group 
                cursor-pointer 
                flex 
                flex-col 
                items-start 
                gap-4 
                shadow-2xl 
                backdrop-blur-sm"
            >
              <div className="
                w-12 
                h-12 
                rounded-2xl 
                bg-mint/10 
                text-mint 
                flex 
                items-center 
                justify-center 
                text-xl 
                group-hover:scale-110 
                transition-transform"
              >
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl text-white font-bold mb-2 group-hover:text-mint transition-colors">
                  {item.name}
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
