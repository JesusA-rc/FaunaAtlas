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
  }, [searchTerm, claseFilter]);

  const clases = ['Todas', ...new Set(especies.map(e => e.clase).filter(Boolean))];

  const filteredEspecies = especies.filter(e => {
    const matchesSearch = e.nombreComun?.toLowerCase().includes(searchTerm.toLowerCase()) 
      || e.nombreCientifico?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClase = claseFilter === 'Todas' || e.clase === claseFilter;
    return matchesSearch && matchesClase;
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

          <div className="flex flex-col md:flex-row gap-4 w-full">
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

            <div className="relative w-full md:w-64">
              <select 
                value={claseFilter}
                onChange={(e) => setClaseFilter(e.target.value)}
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
                {clases.map(clase => (
                  <option key={clase} value={clase} className="bg-navy text-white">
                    {clase}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate/50">
                 <FaArrowRight className="rotate-90" size={12} />
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
