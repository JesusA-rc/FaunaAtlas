import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes, FaTree, FaChevronDown } from 'react-icons/fa';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from '../../core/contexts/AccountContext';

const Navbar = () => 
{
  const { user, logout } = useAccount();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Especies', to: '/especies' },
    { name: 'Hábitats', to: '/habitats' },
    { name: 'Zoológicos', to: '/zoos' },
    { name: 'Avistamientos', to: '/avistamientos' }
  ];

  const adminLinks = [
    { name: 'Inicio', to: '/admin' },
    {
      name: 'Especies',
      subLinks: [
        { name: 'Ver', to: '/admin/ver' },
        { name: 'Crear', to: '/admin/crear' },
        { name: 'Actualizar', to: '/admin/actualizar' },
        { name: 'Eliminar', to: '/admin/eliminar' },
      ]
    },
    {
      name: 'Hábitats',
      subLinks: [
        { name: 'Ver', to: '/admin/habitats/ver' },
        { name: 'Crear', to: '/admin/habitats/crear' },
        { name: 'Actualizar', to: '/admin/habitats/actualizar' },
        { name: 'Eliminar', to: '/admin/habitats/eliminar' },
      ]
    },
    {
      name: 'Avistamientos',
      subLinks: [
        { name: 'Ver', to: '/admin/avistamientos/ver' },
        { name: 'Crear', to: '/admin/avistamientos/crear' },
        { name: 'Actualizar', to: '/admin/avistamientos/actualizar' },
        { name: 'Eliminar', to: '/admin/avistamientos/eliminar' },
      ]
    }
  ];

  const currentLinks = isAdminPath ? adminLinks : navLinks;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 flex items-center z-[1000] bg-navy/90 backdrop-blur-md border-b border-white/5">
        <div className="container flex justify-between items-center w-full px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy border-2 border-mint rounded-lg flex items-center justify-center text-mint text-xl shadow-[0_0_15px_rgba(76,201,138,0.3)]">
              <FaTree />
            </div>
            <span className="font-heading font-bold text-xl text-white tracking-tight">Fauna Atlas</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex list-none gap-8">
              {currentLinks.map((link) => (
                <li key={link.name} className="relative group">
                  {link.subLinks ? (
                    <>
                      <button className="flex items-center gap-1.5 text-[13px] font-medium text-slate hover:text-white transition-colors cursor-pointer">
                        {link.name}
                        <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      <div className="absolute top-full left-0 pt-2 w-44 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[1100]">
                        <div className="bg-navy border border-white/10 rounded-xl py-2 shadow-2xl">
                          {link.subLinks.map(sub => (
                            <Link 
                              key={sub.to} 
                              to={sub.to}
                              className="block px-4 py-2 text-xs text-slate hover:text-mint hover:bg-white/5 no-underline transition-all"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <NavLink 
                      to={link.to || ''} 
                      end={link.to === '/admin' || link.to === '/'}
                      className={({ isActive }) => `
                        no-underline text-[13px] font-medium transition-colors 
                        ${isActive ? 'text-mint' : 'text-slate hover:text-white'}
                      `}
                    >
                      {link.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 group focus:outline-none cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-mint/30 overflow-hidden group-hover:border-mint transition-all">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${user.username}&background=025849&color=4CC98A`} 
                        alt="Profile" 
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>
                    <FaChevronDown className={`text-slate text-xs transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`absolute top-full right-0 pt-3 w-48 transition-all duration-300 ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                    <div className="bg-navy border border-white/10 rounded-2xl shadow-2xl py-2">
                       <div className="px-4 py-2 border-b border-white/5">
                         <p className="text-white text-xs font-bold truncate">{user.nombreCompleto}</p>
                         <p className="text-slate text-[10px] truncate">@{user.username}</p>
                       </div>
                       
                       {user.rol === 'Admin' && (
                         <Link 
                           to="/admin" 
                           onClick={() => setIsDropdownOpen(false)}
                           className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/5 transition-all no-underline"
                         >
                           Panel de control
                         </Link>
                       )}

                       <button 
                         onClick={() => {
                           logout();
                           setIsDropdownOpen(false);
                           navigate('/');
                         }}
                         className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                       >
                         Cerrar sesión
                       </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-white/80 text-sm font-medium hover:text-mint transition-colors no-underline">
                    Ingresar
                  </Link>
                  <Link to="/register" className="button-primary !px-5 !py-1.5 !text-xs no-underline">
                    Empezar
                  </Link>
                </>
              )}
            </div>
          </div>

          <button 
            className="md:hidden text-white text-2xl p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 top-20 bg-[#011E40] z-[900] md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="container py-12 flex flex-col gap-10 px-6">
          <ul className="flex flex-col gap-6 list-none">
            {currentLinks.map((link) => (
              <li key={link.name}>
                {link.subLinks ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-slate text-xs font-bold uppercase tracking-widest">{link.name}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {link.subLinks.map(sub => (
                        <Link 
                          key={sub.to} 
                          to={sub.to} 
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-3 bg-white/5 rounded-xl text-sm text-white no-underline border border-white/5"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink 
                    to={link.to || ''}
                    end={link.to === '/admin' || link.to === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `
                      text-2xl font-heading transition-colors
                      ${isActive ? 'text-mint' : 'text-white hover:text-mint'}
                    `}
                  >
                    {link.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          
          <div className="w-full h-px bg-white/10"></div>
          
          <div className="flex flex-col gap-4">
            {user ? (
               <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl ">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${user.username}&background=025849&color=4CC98A`} 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full border-2 border-mint/30"
                    />
                    <div>
                      <p className="text-white font-bold">{user.nombreCompleto}</p>
                      <p className="text-slate text-sm">@{user.username}</p>
                    </div>
                  </div>

                  {user.rol === 'Admin' && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsOpen(false)}
                      className="w-full py-4 text-center rounded-2xl bg-mint/10 text-mint font-bold border border-mint/20 no-underline"
                    >
                      Panel de control
                    </Link>
                  )}

                  <button 
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                      navigate('/');
                    }}
                    className="w-full py-4 text-center rounded-2xl bg-red-500/10 text-red-500 font-bold border border-red-500/20 cursor-pointer"
                  >
                    Cerrar sesión
                  </button>
               </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="button-secondary w-full text-center no-underline">
                  Ingresar
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="button-primary w-full text-center no-underline">
                  Empezar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
