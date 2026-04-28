import { useEffect, useState, useRef, useCallback } from 'react';
import animalService from '../core/services/animalService';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { type Animal } from '../core/models';
import StatusDisplay from '../components/Common/StatusDisplay';
import AnimalDetailModal from '../components/AnimalDetailModal';
import SpeciesCard from '../components/SpeciesCard';

const EspeciesPage = () => 
{
  const [especies, setEspecies] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [claseFilter, setClaseFilter] = useState('Todas');
  const [estadoFilter, setEstadoFilter] = useState('Todos');
  const [dietaFilter, setDietaFilter] = useState('Todas');
  const [habitatFilter, setHabitatFilter] = useState('Todos');
  
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const handleOpenModal = (animal: Animal) => {
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchEspecies = async () => 
    {
      try {
        setLoading(true);
        const data = await animalService.list();
        setEspecies(data);
        setError(false);
      } catch (err) {
        console.error('Error fetching especies:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecies();
  }, []);

  useEffect(() => 
  {
    setVisibleCount(12);
  }, [searchTerm, claseFilter, estadoFilter, dietaFilter, habitatFilter]);

  const clases = ['Todas', ...new Set(especies.map(e => e.clase).filter(Boolean))];
  const estados = ['Todos', ...new Set(especies.map(e => e.estadoConservacion).filter(Boolean))];
  const dietas = ['Todas', ...new Set(especies.map(e => e.dieta).filter(Boolean))];
  const habitats = ['Todos', ...new Set(especies.map(e => e.habitatNombre).filter(Boolean))];

  const filteredEspecies = especies.filter(e => {
    const matchesSearch = e.nombreComun?.toLowerCase().includes(searchTerm.toLowerCase()) 
      || e.nombreCientifico?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClase = claseFilter === 'Todas' || e.clase === claseFilter;
    const matchesEstado = estadoFilter === 'Todos' || e.estadoConservacion === estadoFilter;
    const matchesDieta = dietaFilter === 'Todas' || e.dieta === dietaFilter;
    const matchesHabitat = habitatFilter === 'Todos' || e.habitatNombre === habitatFilter;
    return matchesSearch && matchesClase && matchesEstado && matchesDieta && matchesHabitat;
  });

  const visibleEspecies = filteredEspecies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEspecies.length;

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading || isLoadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, isLoadingMore, hasMore]);

  const loadMore = async () => 
  {
    setIsLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setVisibleCount(prev => prev + 12);
    setIsLoadingMore(false);
  };

  return (
    <div className="pt-32 pb-20 bg-navy min-h-screen">
      <div className="container">
        <div className="flex flex-col mb-16 text-left">
          <h1 className="text-5xl font-bold text-white mb-4 font-heading">
            Directorio de <span className="text-mint">Especies</span>
          </h1>
          <p className="text-slate max-w-xl mb-10">
            Explora nuestra base de datos completa de fauna silvestre. Desde los grandes depredadores hasta las 
            especies más raras.
          </p>

          <div className="flex flex-col gap-4 w-full">
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
                placeholder="Buscar por nombre común o científico..." 
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
              <div className="relative">
                <select 
                  value={claseFilter}
                  onChange={(e) => setClaseFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-white text-sm appearance-none focus:outline-none focus:border-mint/50 transition-all cursor-pointer shadow-inner"
                >
                  <option disabled value="Todas" className="bg-navy text-slate/50">Filtrar por Clase</option>
                  {clases.map(clase => (
                    <option key={clase} value={clase} className="bg-navy text-white">
                      {clase === 'Todas' ? 'Todas las Clases' : clase}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate/50">
                   <FaArrowRight className="rotate-90" size={10} />
                </div>
              </div>

              <div className="relative">
                <select 
                  value={estadoFilter}
                  onChange={(e) => setEstadoFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-white text-sm appearance-none focus:outline-none focus:border-mint/50 transition-all cursor-pointer shadow-inner"
                >
                  <option disabled value="Todos" className="bg-navy text-slate/50">Estado de Conservación</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado} className="bg-navy text-white">
                      {estado === 'Todos' ? 'Cualquier Estado' : estado}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate/50">
                   <FaArrowRight className="rotate-90" size={10} />
                </div>
              </div>

              <div className="relative">
                <select 
                  value={dietaFilter}
                  onChange={(e) => setDietaFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-white text-sm appearance-none focus:outline-none focus:border-mint/50 transition-all cursor-pointer shadow-inner"
                >
                  <option disabled value="Todas" className="bg-navy text-slate/50">Dieta</option>
                  {dietas.map(dieta => (
                    <option key={dieta} value={dieta} className="bg-navy text-white">
                      {dieta === 'Todas' ? 'Cualquier Dieta' : dieta}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate/50">
                   <FaArrowRight className="rotate-90" size={10} />
                </div>
              </div>

              <div className="relative">
                <select 
                  value={habitatFilter}
                  onChange={(e) => setHabitatFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-white text-sm appearance-none focus:outline-none focus:border-mint/50 transition-all cursor-pointer shadow-inner"
                >
                  <option disabled value="Todos" className="bg-navy text-slate/50">Hábitat</option>
                  {habitats.map(habitat => (
                    <option key={habitat} value={habitat} className="bg-navy text-white">
                      {habitat === 'Todos' ? 'Cualquier Hábitat' : habitat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate/50">
                   <FaArrowRight className="rotate-90" size={10} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : error ? (
          <StatusDisplay 
            title="Error al cargar datos" 
            message="No pudimos conectar con el servidor de fauna. Por favor intenta más tarde." 
            type="error"
          />
        ) : filteredEspecies.length === 0 ? (
          <StatusDisplay 
            title="No se encontraron especies" 
            message="Intenta ajustar tu búsqueda o explora otras categorías." 
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleEspecies.map((especie) => (
                <SpeciesCard 
                  key={especie.id} 
                  especie={especie} 
                  onClick={() => handleOpenModal(especie)}
                />
              ))}
              
              {isLoadingMore && [1, 2, 3, 4].map(i => (
                <LoadingCard key={`skeleton-${i}`} />
              ))}
            </div>

            <div ref={lastElementRef} className="h-10 mt-10"></div>
          </>
        )}
      </div>

      <AnimalDetailModal 
        isOpen={isModalOpen}
        animal={selectedAnimal}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

const LoadingCard = () => (
  <div className="h-96 bg-white/5 rounded-3xl animate-pulse border border-white/5">
     <div className="h-2/3 bg-white/5 w-full"></div>
     <div className="p-6">
       <div className="h-4 bg-white/10 w-3/4 rounded mb-2"></div>
       <div className="h-3 bg-white/5 w-1/2 rounded"></div>
     </div>
  </div>
);

export default EspeciesPage;
