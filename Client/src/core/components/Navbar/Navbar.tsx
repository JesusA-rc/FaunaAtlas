import { useState } from 'react';
import { FaBars, FaTimes, FaTree } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar = () => 
{
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Especies', to: '/especies' },
    { name: 'Hábitats', to: '/habitats' },
    { name: 'Avistamientos', to: '/avistamientos' }
  ];

  return (
    <>
      <nav className="
        fixed
        top-0
        left-0
        w-full
        h-20
        flex
        items-center
        z-[1000]
        bg-navy/90
        backdrop-blur-md
        border-b
        border-white/5">
        <div className="container flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="
              w-10 
              h-10 
              bg-navy 
              border-2 
              border-mint 
              rounded-lg 
              flex 
              items-center 
              justify-center 
              text-mint 
              text-xl 
              shadow-[0_0_15px_rgba(76,201,138,0.3)]">
              <FaTree />
            </div>
            <span className="font-heading font-bold text-xl text-white tracking-tight">Fauna Atlas</span>
          </div>
          
          <div className="hidden md:flex flex-col items-end gap-2 mt-2">
            <div className="flex items-center gap-4">
              <button className="text-white/80 text-sm font-medium hover:text-mint transition-colors">
                Ingresar
              </button>
              <button className="button-primary !px-5 !py-1.5 !text-xs">
                Empezar
              </button>
            </div>

            <ul className="flex list-none gap-8 mb-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink 
                    to={link.to} 
                    className={({ isActive }) => `
                      no-underline text-[13px] font-medium transition-colors 
                      ${isActive ? 'text-mint' : 'text-slate hover:text-white'}
                    `}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <button 
            className="md:hidden text-white text-2xl p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <div className={`
        fixed inset-0 top-20 bg-[#011E40] z-[900] md:hidden transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}>
        <div className="container py-12 flex flex-col gap-10">
          <ul className="flex flex-col gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink 
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    text-2xl font-heading transition-colors
                    ${isActive ? 'text-mint' : 'text-white hover:text-mint'}
                  `}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          
          <div className="w-full h-px bg-white/10"></div>
          
          <div className="flex flex-col gap-4">
            <button className="button-secondary w-full">
              Ingresar
            </button>
            <button className="button-primary w-full">
              Empezar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
