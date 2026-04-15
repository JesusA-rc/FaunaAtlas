import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { type Animal } from '../../core/models';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import AnimalDetailModal from '../../components/AnimalDetailModal';
import { FaSearch, FaEdit, FaArrowLeft, FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import animalService from '../../core/services/animalService';

const AdminAnimalListPage = () => 
{
  const location = useLocation();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const isViewMode = location.pathname.includes('/admin/ver');
  const isDeleteMode = location.pathname.includes('/admin/eliminar');
  const isUpdateMode = location.pathname.includes('/admin/actualizar');

  const getPageTitle = () => {
    if (isViewMode) return { title: 'Ver', highlight: 'Especies' };
    if (isDeleteMode) return { title: 'Eliminar', highlight: 'Especies' };
    return { title: 'Actualizar', highlight: 'Especies' };
  };

  const { title, highlight } = getPageTitle();

  useEffect(() => {
    animalService.list()
      .then(res => setAnimals(res))
      .catch(err => console.error('Error fetching animals:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = (animal: Animal) => {
    setAnimalToDelete(animal);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => 
  {
    if (!animalToDelete) return;

    try {
      await animalService.delete(animalToDelete.id);
      setAnimals(prev => prev.filter(a => a.id !== animalToDelete.id));
      setIsModalOpen(false);
      setAnimalToDelete(null);
    } catch (error) {
      console.error('Error deleting animal:', error);
      alert('Ocurrió un error al eliminar la especie.');
    }
  };

  const handleViewDetails = (animal: Animal) => {
    setSelectedAnimal(animal);
    setIsDetailModalOpen(true);
  };

  const filteredAnimals = animals.filter(a => 
    a.nombreComun.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.nombreCientifico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#021b36] pt-32 pb-20 px-6">
      <ConfirmDialog
        isOpen={isModalOpen}
        title="¿Estás seguro?"
        message={`Estás a punto de eliminar permanentemente a "${animalToDelete?.nombreComun}". Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />

      <AnimalDetailModal 
        isOpen={isDetailModalOpen}
        animal={selectedAnimal}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/admin" 
          className="flex items-center gap-2 text-slate hover:text-mint transition-colors no-underline">
            <FaArrowLeft />
            <span>Volver al Panel</span>
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-white mb-6">
            {title} <span className="text-mint">{highlight}</span>
          </h1>
          
          <div className="relative group max-w-2xl">
            <div className={`
              absolute 
              inset-y-0 
              left-0 
              pl-6 
              flex 
              items-center 
              pointer-events-none 
              text-slate/50 
              group-focus-within:text-mint 
              transition-colors
            `}>
              <FaSearch size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre común o científico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full 
                bg-navy/40 
                border 
                border-white/5 
                rounded-[25px] 
                py-5 
                pl-14 
                pr-6 
                text-white 
                placeholder:text-slate/30 
                focus:outline-none 
                focus:border-mint/30 
                focus:ring-2 
                focus:ring-mint/10 
                transition-all 
                shadow-2xl 
                backdrop-blur-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-mint/20 border-t-mint rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-navy/30 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-8 py-6 text-slate text-xs font-bold uppercase tracking-widest">Especie</th>
                    <th className="px-8 py-6 text-slate text-xs font-bold uppercase tracking-widest hidden md:table-cell">
                      Clase
                    </th>
                    <th className="px-8 py-6 text-slate text-xs font-bold uppercase tracking-widest hidden lg:table-cell">
                      Estado
                    </th>
                    <th className="px-8 py-6 text-slate text-xs font-bold uppercase tracking-widest text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredAnimals.length > 0 ? (
                    filteredAnimals.map((animal) => (
                      <tr key={animal.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="
                              w-12 
                              h-12 
                              rounded-xl 
                              border 
                              border-white/10 
                              overflow-hidden 
                              bg-navy 
                              flex-shrink-0">
                                <img 
                                    src={animal.imagenUrl || 'https://via.placeholder.com/150'} 
                                    alt={animal.nombreComun} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                              <p className="text-white font-bold">{animal.nombreComun}</p>
                              <p className="text-slate text-xs italic">{animal.nombreCientifico}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 hidden md:table-cell">
                          <span className="text-slate text-sm">{animal.clase}</span>
                        </td>
                        <td className="px-8 py-6 hidden lg:table-cell">
                           <span className={`
                             px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter
                             ${animal.estadoConservacion.includes('Extinto') ? 'bg-red-500/10 text-red-500' : 
                               animal.estadoConservacion.includes('Peligro') ? 'bg-orange-500/10 text-orange-500' :
                               'bg-mint/10 text-mint'}
                           `}>
                             {animal.estadoConservacion}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right flex justify-end gap-2">
                            {isViewMode && (
                                <button
                                    onClick={() => handleViewDetails(animal)}
                                    className="
                                        inline-flex 
                                        items-center 
                                        gap-2 
                                        bg-mint/10 
                                        text-mint 
                                        px-4 
                                        py-2 
                                        rounded-xl 
                                        text-sm 
                                        font-bold 
                                        hover:bg-mint 
                                        hover:text-navy 
                                        transition-all 
                                        cursor-pointer"
                                >
                                    <FaEye size={14} />
                                    <span>Ver más</span>
                                </button>
                            )}
                            {isUpdateMode && (
                                <Link 
                                    to={`/admin/actualizar/${animal.id}`}
                                    className="
                                        inline-flex 
                                        items-center 
                                        gap-2 
                                        bg-mint/10 
                                        text-mint 
                                        px-4 
                                        py-2 
                                        rounded-xl 
                                        text-sm 
                                        font-bold 
                                        hover:bg-mint 
                                        hover:text-navy 
                                        transition-all 
                                        no-underline"
                                >
                                    <FaEdit size={14} />
                                    <span>Editar</span>
                                </Link>
                            )}
                            {isDeleteMode && (
                                <button
                                    onClick={() => handleDeleteClick(animal)}
                                    className="
                                        inline-flex 
                                        items-center 
                                        gap-2 
                                        bg-red-500/10 
                                        text-red-400 
                                        px-4 
                                        py-2 
                                        rounded-xl 
                                        text-sm 
                                        font-bold 
                                        hover:bg-red-500 
                                        hover:text-white 
                                        transition-all 
                                        cursor-pointer"
                                >
                                    <FaTrash size={14} />
                                    <span>Eliminar</span>
                                </button>
                            )}
                            </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-slate">
                        No se encontraron especies que coincidan con tu búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnimalListPage;
