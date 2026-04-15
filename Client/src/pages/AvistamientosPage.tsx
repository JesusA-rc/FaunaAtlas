import { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaInfoCircle, FaCompass } from 'react-icons/fa';
import avistamientoService from '../core/services/avistamientoService';
import { type Avistamiento } from '../core/models';
import StatusDisplay from '../components/Common/StatusDisplay';
import AnimalDataSheet from '../components/AnimalDataSheet';

const AvistamientosPage = () => 
{
  const [sightings, setSightings] = useState<Avistamiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('Todas');

  useEffect(() => {
    const fetchSightings = async () => 
    {
      try {
        setLoading(true);
        const data = await avistamientoService.list();
        setSightings(data);
        setError(false);
      } catch (err) {
        console.error('Error fetching sightings:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSightings();
  }, []);

  const regions = ['Todas', ...new Set(sightings.map(s => s.ubicacion).filter(Boolean))];

  const filteredSightings = sightings.filter(s => {
    const matchesSearch = s.animalNombre?.toLowerCase().includes(searchTerm.toLowerCase()) 
      || s.animal?.nombreComun?.toLowerCase().includes(searchTerm.toLowerCase())
      || s.animal?.nombreCientifico?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'Todas' || s.ubicacion === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="pt-32 pb-20 bg-[#021b36] min-h-screen">
      <div className="container">
        <div className="flex flex-col mb-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 font-heading">
            Registro de <span className="text-mint">Avistamientos</span>
          </h1>
          <p className="text-slate max-w-2xl mx-auto mb-10">
            Explora los últimos encuentros registrados por nuestra comunidad y guarda-parques. 
            Información en tiempo real para la protección de nuestra fauna.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto">
            <div className="relative flex-grow group">
              <FaSearch className="
                absolute 
                left-4 
                top-1/2 
                -translate-y-1/2 
                text-slate/50 
                group-focus-within:text-mint 
                transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar por especie..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full 
                  bg-white/5 
                  border 
                  border-white/10 
                  rounded-2xl 
                  py-4 
                  pl-12 
                  pr-6 
                  text-white 
                  placeholder:text-slate/30 
                  focus:outline-none 
                  focus:border-mint/50 
                  transition-all 
                  shadow-inner"
              />
            </div>

            <div className="relative w-full md:w-64">
              <select 
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="
                  w-full 
                  bg-white/5 
                  border 
                  border-white/10 
                  rounded-2xl 
                  py-4 
                  px-6 
                  text-white 
                  appearance-none 
                  focus:outline-none 
                  focus:border-mint/50 
                  transition-all 
                  cursor-pointer 
                  shadow-inner"
              >
                {regions.map(region => (
                  <option key={region} value={region} className="bg-navy text-white">
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-10">
            {[1, 2, 3].map(i => <LoadingSightingCard key={i} />)}
          </div>
        ) : error ? (
          <StatusDisplay 
            title="Error de conexión" 
            message="No pudimos obtener el registro de avistamientos. Verifica tu conexión." 
            type="error"
          />
        ) : filteredSightings.length === 0 ? (
          <StatusDisplay 
            title="Sin resultados" 
            message="No hay avistamientos que coincidan con tus filtros." 
          />
        ) : (
          <div className="space-y-12 max-w-6xl mx-auto">
            {filteredSightings.map((sighting) => (
              <SightingCard key={sighting.id} sighting={sighting} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SightingCard = ({ sighting }: { sighting: Avistamiento }) => 
{
  const animal = sighting.animal;
  const fallback = '/animales.png';

  return (
    <div className="flex flex-col lg:flex-row gap-8 group animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
        <div className="
          relative 
          w-full 
          aspect-square 
          md:aspect-video 
          lg:aspect-square 
          rounded-[40px] 
          overflow-hidden 
          border 
          border-white/10 
          shadow-2xl 
          transition-all 
          group-hover:border-mint/30">
          <img 
            src={animal?.imagenUrl || fallback} 
            alt={animal?.nombreComun || sighting.animalNombre}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {animal?.clase && (
            <div className="absolute top-6 left-6">
              <span className="
                bg-mint 
                text-navy 
                text-[10px] 
                font-black 
                px-4 
                py-2 
                rounded-xl 
                uppercase 
                tracking-tighter 
                shadow-xl">
                 {animal.clase}
              </span>
            </div>
          )}
        </div>
        <div className="mt-6 text-center lg:text-left">
          <h2 className="text-3xl font-heading font-bold text-white mb-1 group-hover:text-mint transition-colors">
            {animal?.nombreComun || sighting.animalNombre}
          </h2>
          <p className="text-lg text-slate italic font-medium">
            {animal?.nombreCientifico || 'Especie por clasificar'}
          </p>
        </div>
      </div>

      <div className="lg:w-2/3 flex flex-col gap-6">
        <div className="
          bg-white/5 
          border 
          border-white/10 
          rounded-[40px] 
          p-8 
          md:p-10 
          backdrop-blur-sm 
          relative 
          overflow-hidden 
          flex-1 
          hover:bg-white/[0.07] 
          transition-all">
          <div className="flex items-center gap-3 text-mint/60 mb-8 font-bold uppercase tracking-widest text-xs">
            <FaInfoCircle />
            <span>Datos del Animal</span>
          </div>
          
          {animal ? (
            <AnimalDataSheet animal={animal} />
          ) : (
            <p className="text-slate italic">Datos de la especie no disponibles.</p>
          )}
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-mint/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        </div>
        <div className="
          bg-navy 
          border 
          border-mint/20 
          rounded-[40px] 
          p-8 
          md:p-10 
          shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
          relative 
          group-hover:border-mint/40 
          transition-all">
          <div className="flex items-center gap-3 text-mint mb-8 font-bold uppercase tracking-widest text-xs">
            <FaMapMarkerAlt />
            <span>Datos del Avistamiento</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-mint">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-slate text-[10px] font-bold uppercase tracking-widest mb-1">
                    Localización
                  </p>
                  <p className="text-white font-bold">
                    {sighting.ubicacion}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-mint">
                   <FaCalendarAlt />
                 </div>
                 <div>
                   <p className="text-slate text-[10px] font-bold uppercase tracking-widest mb-1">Fecha</p>
                   <p className="text-white font-bold">
                      {new Date(sighting.fecha).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                   </p>
                 </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-mint">
                  <FaUser />
                </div>
                <div>
                  <p className="text-slate text-[10px] font-bold uppercase tracking-widest mb-1">
                    Reportado por
                  </p>
                  <p className="text-white font-bold">
                    {sighting.reportadoPor}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-mint">
                   <FaCompass />
                 </div>
                 <div>
                   <p className="text-slate text-[10px] font-bold uppercase tracking-widest mb-1">
                      Coordenadas
                   </p>
                   <div className="flex gap-3 font-mono text-sm text-white/60">
                     <span>Lat: {sighting.latitud.toFixed(4)}</span>
                     <span>Long: {sighting.longitud.toFixed(4)}</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5">
             <p className="text-slate/70 italic text-sm leading-relaxed">
               <span className="text-white/40 font-bold not-italic mr-2">Notas:</span>
               "{sighting.notas || 'Sin observaciones adicionales registradas.'}"
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSightingCard = () => (
  <div className="flex flex-col lg:flex-row gap-8 animate-pulse opacity-50">
    <div className="lg:w-1/3">
      <div className="w-full aspect-square bg-white/5 rounded-[40px]"></div>
      <div className="mt-6 h-6 bg-white/10 w-3/4 rounded-lg"></div>
      <div className="mt-2 h-4 bg-white/5 w-1/2 rounded-lg"></div>
    </div>
    <div className="lg:w-2/3 space-y-6">
      <div className="h-40 bg-white/5 rounded-[40px]"></div>
      <div className="h-48 bg-white/5 rounded-[40px]"></div>
    </div>
  </div>
);

export default AvistamientosPage;
