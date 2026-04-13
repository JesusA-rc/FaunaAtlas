import { FaFacebookF, FaLinkedin, FaGithub } from "react-icons/fa";

const SocialIcon = ({icon, href}: {icon: React.ReactNode, href: string}) =>
{
  return (
    <a
      href={href}
      className="
        w-10
        h-10
        flex
        items-center
        justify-center
        bg-mint
        text-navy
        rounded-lg
        hover:bg-teal
        transition-all
        duration-300
        transform
        hover:-translate-y-1"
    >
      {icon}
    </a>
  )
}

const Footer = () => 
{
  return (
    <footer className="w-full bg-navy text-white py-12">
      <div className="container flex flex-col items-center">
        <div className="flex gap-4 mb-8">
          <SocialIcon icon={<FaFacebookF />} href="#"/>
          <SocialIcon icon={<FaLinkedin />} href="#"/>
          <SocialIcon icon={<FaGithub />} href="https://github.com/JesusA-rc"/>
        </div>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-8 text-sm font-medium">
          <a href="#" className="text-slate hover:text-mint transition-colors">Inicio</a>
          <a href="#" className="text-slate hover:text-mint transition-colors">Sobre nosotros</a>
          <a href="#" className="text-slate hover:text-mint transition-colors">Servicios</a>
          <a href="#" className="text-slate hover:text-mint transition-colors">Contacto</a>
          <a href="#" className="text-slate hover:text-mint transition-colors">Prensa</a>
        </div>

        <p className="text-xs text-slate/40 text-center">
          © {new Date().getFullYear()} Atlas de Vida Salvaje. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;