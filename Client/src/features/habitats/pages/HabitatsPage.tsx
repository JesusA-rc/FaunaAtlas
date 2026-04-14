import { useEffect, useState } from 'react';
import habitatService from '../../../core/services/habitatService';
import { type Habitat } from '../../../core/models';
import { FaArrowRight, FaCloudSun, FaGlobeAmericas } from 'react-icons/fa';
import StatusDisplay from '../../../core/components/Common/StatusDisplay';

const HabitatsPage = () => 
{
  const [habitats, setHabitats] = useState<Habitat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => 
  {
    const fetchHabitats = async () =>
    {
      try {
        setLoading(true);
        const data = await habitatService.list();
        setHabitats(data);
        setError(false);
      } catch (err) {
        console.error('Error fetching habitats:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHabitats();
  }, []);

  return (
    <div className="pt-32 pb-20 bg-navy min-h-screen">
      <div className="container">
        <div className="mb-16 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 font-heading">
            Nuestros <span className="text-teal">Hábitats</span>
          </h1>
          <p className="text-slate max-w-2xl text-lg leading-relaxed">
            Sumérgete en los ecosistemas más impresionantes de la región. Desde selvas densas hasta humedales vitales, 
            cada rincón cuenta una historia de equilibrio y vida.
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
            message="No pudimos cargar los ecosistemas en este momento. Inténtalo de nuevo más tarde." 
            type="error"
          />
        ) : habitats.length === 0 ? (
          <StatusDisplay 
            title="Aún no hay hábitats registrados" 
            message="La expedición sigue en curso. Pronto añadiremos nuevos ecosistemas." 
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {habitats.map((habitat) => (
              <HabitatCard key={habitat.id} habitat={habitat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const HabitatCard = ({ habitat }: { habitat: Habitat }) => 
{
  const fallback = '/habitats.png';
  const [imgSrc, setImgSrc] = useState(habitat.imagenUrl || fallback);

  useEffect(() => {
    setImgSrc(habitat.imagenUrl || fallback);
  }, [habitat.imagenUrl]);

  return (
    <div className="
        group 
        relative 
        h-[450px] 
        rounded-[40px] 
        overflow-hidden 
        border border-white/5 
        bg-navy 
        shadow-2xl 
        transition-all 
        duration-700 
        hover:-translate-y-4">
      <img 
        src={imgSrc} 
        alt={habitat.nombre}
        onError={() => setImgSrc(fallback)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="
        absolute 
        inset-0 
        bg-gradient-to-t 
        from-navy 
        via-navy/40 
        to-transparent 
        opacity-80 
        group-hover:opacity-90 
        transition-opacity"></div>
      
      <div className="absolute top-8 left-8 flex gap-3 z-20">
        <span className="
          bg-teal 
          text-white 
          text-[10px] 
          font-black 
          px-4 
          py-1.5 
          rounded-full 
          uppercase 
          tracking-widest 
          backdrop-blur-sm 
          border border-teal/30 
          shadow-lg">
          {habitat.tipo}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-10 z-20 transition-transform duration-500">
        <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 font-heading group-hover:text-teal transition-colors">
          {habitat.nombre}
        </h3>
        
        <div className="
          flex 
          flex-wrap 
          gap-6 
          mb-8 
          translate-y-4 
          opacity-0 
          group-hover:translate-y-0 
          group-hover:opacity-100 
          transition-all 
          duration-500">
          <div className="flex items-center gap-2 text-slate/80">
            <FaCloudSun className="text-teal" />
            <span className="text-sm font-medium">{habitat.clima}</span>
          </div>
          <div className="flex items-center gap-2 text-slate/80">
            <FaGlobeAmericas className="text-teal" />
            <span className="text-sm font-medium">{habitat.region}</span>
          </div>
        </div>

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
              group-hover/btn:bg-teal 
              group-hover/btn:border-teal 
              group-hover/btn:text-navy">
             <FaArrowRight size={18} />
           </div>
           <span className="text-white font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
             Explorar Ecosistema
           </span>
        </div>
      </div>
    </div>
  );
};

export default HabitatsPage;
