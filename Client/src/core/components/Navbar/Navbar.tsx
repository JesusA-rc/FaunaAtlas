import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => 
{
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Especies', href: '#especies' },
    { name: 'Hábitats', href: '#habitats' },
    { name: 'Avistamientos', href: '#avistamientos' },
    { name: 'Regiones', href: '#regiones' },
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
            <div className="w-10 h-10 bg-navy border-2 border-mint rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-mint rounded-full animate-pulse"></div>
            </div>
            <span className="font-heading font-bold text-xl text-white tracking-tight">Fauna Atlas</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12">
            <ul className="flex list-none gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="no-underline text-slate text-sm font-medium transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-6">
              <button className="text-white text-sm font-medium hover:text-mint transition-colors">
                Ingresar
              </button>
              <button className="button-primary !px-6 !py-2 !text-xs">
                Empezar
              </button>
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

      <div className={`
        fixed inset-0 top-20 bg-[#011E40] z-[900] md:hidden transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}>
        <div className="container py-12 flex flex-col gap-10">
          <ul className="flex flex-col gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-heading text-white hover:text-mint transition-colors"
                >
                  {link.name}
                </a>
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
