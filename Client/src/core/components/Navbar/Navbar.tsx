const Navbar = () => 
{
  return (
    <nav className="
      fixed
      top-0
      left-0
      w-full
      h-20
      flex
      items-center
      z-[1000]
      bg-navy
      bg-surface
      border-none
      rounded-none">
      <div className="container flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-navy border-2 border-mint rounded-lg"></div>
          <span className="font-heading font-bold text-xl text-white">Fauna Atlas</span>
        </div>
        
        <div className="flex flex-col items-end gap-2 mt-2">
          <div className="flex items-center gap-4">
            <button className="
              bg-none
              border-none
              text-white
              font-medium
              cursor-pointer
              font-sans
              text-sm
              hover:text-mint
              transition-colors">
              Ingresar
            </button>
            <button className="button-primary !px-5 !py-1.5 !text-xs">
              Empezar
            </button>
          </div>
          <ul className="hidden md:flex list-none gap-6 mb-2">
            <li>
              <a href="#especies" className="
              no-underline text-slate text-sm font-medium transition-colors hover:text-mint active:text-mint">
                Especies
              </a>
            </li>
            <li>
              <a href="#habitats" className="
              no-underline text-slate text-sm font-medium transition-colors hover:text-mint">
                Hábitats
              </a>
            </li>
            <li>
              <a href="#avistamientos" className="
              no-underline text-slate text-sm font-medium transition-colors hover:text-mint">
                Avistamientos
              </a>
            </li>
            <li>
              <a href="#regiones" 
                className="no-underline text-slate text-sm font-medium transition-colors hover:text-mint">
                Regiones
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
