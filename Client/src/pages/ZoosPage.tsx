import { useEffect, useState } from 'react';
import zooService from '../core/services/zooService';
import { type Zoo } from '../core/models';
import { FaArrowRight, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StatusDisplay from '../components/Common/StatusDisplay';

const ZoosPage = () => 
{
  const [zoos, setZoos] = useState<Zoo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => 
  {
    const fetchZoos = async () =>
    {
      try {
        setLoading(true);
        const data = await zooService.list();
        setZoos(data);
        setError(false);
      } catch (err) {
        console.error('Error fetching zoos:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchZoos();
  }, []);

  return (
    <div className="pt-32 pb-20 bg-navy min-h-screen">
      <div className="container">
        <div className="mb-16 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 font-heading">
            Nuestros <span className="text-mint">Zoológicos</span>
          </h1>
          <p className="text-slate max-w-2xl text-lg leading-relaxed">
            Descubre los recintos donde cuidamos y preservamos especies de todo el mundo. 
            Conoce más sobre las instalaciones y las maravillosas criaturas que albergan.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[16/10] bg-white/5 rounded-[40px] animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <StatusDisplay 
            title="Error en la exploración" 
            message="No pudimos cargar los zoológicos en este momento. Inténtalo de nuevo más tarde." 
            type="error"
          />
        ) : zoos.length === 0 ? (
          <StatusDisplay 
            title="Aún no hay zoológicos registrados" 
            message="Estamos trabajando en asociar las especies con sus recintos. Pronto habrá novedades." 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {zoos.map((zoo) => (
              <ZooCard key={zoo.id} zoo={zoo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ZooCard = ({ zoo }: { zoo: Zoo }) => 
{
  const fallback = '/habitats.png';
  const [imgSrc, setImgSrc] = useState(zoo.imagenUrl || fallback);

  useEffect(() => {
    setImgSrc(zoo.imagenUrl || fallback);
  }, [zoo.imagenUrl]);

  return (
    <Link 
      to={`/zoos/${zoo.id}`}
      className="
        group 
        relative 
        h-[450px] 
        rounded-[40px] 
        overflow-hidden 
        border border-white/5 
        bg-[#061B35] 
        shadow-2xl 
        transition-all 
        duration-700 
        hover:-translate-y-4
        block
        no-underline">
      <img 
        src={imgSrc} 
        alt={zoo.nombre}
        onError={() => setImgSrc(fallback)}
        className="
          absolute 
          inset-0 
          w-full 
          h-full 
          object-cover 
          transition-transform 
          duration-1000 
          group-hover:scale-110"
      />
      <div className="
        absolute 
        inset-0 
        bg-gradient-to-t 
        from-[#021b36] 
        via-[#021b36]/60 
        to-transparent 
        opacity-90 
        group-hover:opacity-95 
        transition-opacity"></div>
      
      <div className="absolute top-8 left-8 flex gap-3 z-20">
        <span className="
          bg-mint 
          text-navy 
          text-[10px] 
          font-black 
          px-4 
          py-1.5 
          rounded-full 
          uppercase 
          tracking-widest 
          backdrop-blur-sm 
          border border-mint/30 
          shadow-lg">
          Zoológico
        </span>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-10 z-20 transition-transform duration-500">
        <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 font-heading group-hover:text-mint transition-colors">
          {zoo.nombre}
        </h3>
        
        <div className="
          flex 
          flex-wrap 
          gap-6 
          mb-6 
          translate-y-4 
          opacity-0 
          group-hover:translate-y-0 
          group-hover:opacity-100 
          transition-all 
          duration-500">
          <div className="flex items-center gap-2 text-slate/80">
            <FaMapMarkerAlt className="text-mint" />
            <span className="text-sm font-medium">{zoo.ubicacion}</span>
          </div>
          {zoo.animales && zoo.animales.length > 0 && (
            <div className="flex items-center gap-2 text-slate/80">
              <FaUsers className="text-mint" />
              <span className="text-sm font-medium">{zoo.animales.length} Especies</span>
            </div>
          )}
        </div>
        
        <p className="
          text-slate/70 
          text-sm 
          line-clamp-2 
          mb-6 
          translate-y-4 
          opacity-0 
          group-hover:translate-y-0 
          group-hover:opacity-100 
          transition-all 
          duration-500 
          delay-100">
            {zoo.descripcion}
        </p>

        <div className="flex items-center gap-4 group/btn cursor-pointer">
           <div className="
              w-12 
              h-12 
              rounded-full 
              border 
              border-white/20 
              flex 
              items-center 
              justify-center 
              text-white 
              transition-all 
              duration-300 
              group-hover/btn:bg-mint 
              group-hover/btn:border-mint 
              group-hover/btn:text-navy">
             <FaArrowRight size={18} />
           </div>
           <span className="text-white font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
             Ver Detalles
           </span>
        </div>
      </div>
    </Link>
  );
};

export default ZoosPage;
