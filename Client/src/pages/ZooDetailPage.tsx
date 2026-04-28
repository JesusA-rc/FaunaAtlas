import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import zooService from '../core/services/zooService';
import { type Zoo, type Animal } from '../core/models';
import StatusDisplay from '../components/Common/StatusDisplay';
import { FaMapMarkerAlt } from 'react-icons/fa';
import SpeciesCard from '../components/SpeciesCard';
import AnimalDetailModal from '../components/AnimalDetailModal';

const ZooDetailPage = () => 
{
  const { id } = useParams<{ id: string }>();
  const [zoo, setZoo] = useState<Zoo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [activeTab, setActiveTab] = useState('Overview');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const handleOpenModal = (animal: Animal) => {
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  useEffect(() => 
  {
    const fetchZoo = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await zooService.details(parseInt(id));
          setZoo(data);
        }
        setError(false);
      } catch (err) {
        console.error('Error fetching zoo:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchZoo();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 bg-[#0b1622] min-h-screen flex items-center justify-center">
        <div className="animate-pulse w-full">
           <div className="h-[400px] bg-white/5 w-full"></div>
           <div className="container mt-8"><div className="h-8 w-1/3 bg-white/5 rounded"></div></div>
        </div>
      </div>
    );
  }

  if (error || !zoo) {
    return (
      <div className="pt-32 pb-20 bg-[#0b1622] min-h-screen">
        <div className="container">
          <StatusDisplay title="Error" message="No pudimos cargar los detalles del zoológico." type="error" />
        </div>
      </div>
    );
  }

  const animalDiets = Array.from(new Set((zoo.animales || []).map(a => a.dieta).filter(Boolean)));
  const animalClases = Array.from(new Set((zoo.animales || []).map(a => a.clase).filter(Boolean)));
  const animalStatuses = Array.from(new Set((zoo.animales || []).map(a => a.estadoConservacion).filter(Boolean)));
  
  const tabs = ['Overview', ...animalDiets, ...animalClases, ...animalStatuses];

  const renderContent = () => 
  {
    if (activeTab === 'Overview') 
    {
      return (
        <div className="
          bg-[#151f2e] 
          border border-white/5 
          rounded-2xl p-8 shadow-xl 
          animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold text-white mb-6 font-heading">Acerca del Zoológico</h2>
          <p className="text-[#9fadbd] text-lg leading-relaxed whitespace-pre-wrap">
            {zoo.descripcion || "No hay información adicional sobre este zoológico."}
          </p>
        </div>
      );
    } else {
      const species = zoo.animales?.filter(a => 
        a.dieta === activeTab || 
        a.clase === activeTab || 
        a.estadoConservacion === activeTab
      ) || [];
      
      if (species.length === 0) {
        return (
          <div className="text-center py-12 text-[#9fadbd]">
             No se encontraron especies bajo esta categoría.
          </div>
        );
      }
      
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {species.map(animal => (
             <SpeciesCard key={animal.id} especie={animal} onClick={() => handleOpenModal(animal)} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="bg-[#0b1622] min-h-screen pb-20">
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img 
          src={zoo.imagenUrl || '/habitats.png'} 
          alt={zoo.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1622] via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full">
           <div className="container px-4 md:px-8 translate-y-1/2 flex items-end gap-6">
              <div className="
                bg-[#151f2e] 
                p-6 
                rounded-xl 
                border border-white/10 
                shadow-2xl 
                z-10 flex-shrink-0 
                flex flex-col 
                justify-center 
                min-w-[200px] 
                md:min-w-[280px]">
                <h1 className="text-2xl md:text-3xl font-black text-white mb-2 font-heading leading-tight">
                  {zoo.nombre}
                </h1>
                <div className="flex items-center gap-2 text-[#3db4f2] text-sm md:text-base font-medium">
                  <FaMapMarkerAlt />
                  <span>{zoo.ubicacion}</span>
                </div>
              </div>
           </div>
        </div>
      </div>
      <div className="h-16 md:h-20"></div>
      <div className="bg-[#151f2e] sticky top-20 z-40 shadow-lg">
        <div className="container px-4 md:px-8">
          <div className="flex overflow-x-auto custom-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 
                  py-5 
                  text-[13px] 
                  font-bold 
                  hover:bg-white/5 
                  transition-colors 
                  whitespace-nowrap 
                  flex
                  items-center
                  justify-center
                  ${activeTab === tab ? 'text-[#3db4f2]' : 'text-[#9fadbd] hover:text-[#d3d5f3]'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container px-4 md:px-8 mt-10">
        {renderContent()}
      </div>
      
      <AnimalDetailModal 
        isOpen={isModalOpen}
        animal={selectedAnimal}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ZooDetailPage;
