import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaSearch, FaEdit, FaArrowLeft, FaTrash } from 'react-icons/fa';
import habitatService from '../../core/services/habitatService';
import { type Habitat } from '../../core/models';
import ConfirmDialog from '../../components/Common/ConfirmDialog';

const AdminHabitatListPage = () => 
{
  const location = useLocation();
  const [habitats, setHabitats] = useState<Habitat[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitatToDelete, setHabitatToDelete] = useState<Habitat | null>(null);

  const isViewMode = location.pathname.includes('/admin/habitats/ver');
  const isDeleteMode = location.pathname.includes('/admin/habitats/eliminar');
  const isUpdateMode = location.pathname.includes('/admin/habitats/actualizar');

  const getPageTitle = () => 
  {
    if (isViewMode) return { title: 'Ver', highlight: 'Hábitats' };
    if (isDeleteMode) return { title: 'Eliminar', highlight: 'Hábitats' };
    return { title: 'Actualizar', highlight: 'Hábitats' };
  };

  const { title, highlight } = getPageTitle();

  useEffect(() => {
    habitatService.list()
      .then(res => setHabitats(res))
      .catch(err => console.error('Error fetching habitats:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = (habitat: Habitat) => {
    setHabitatToDelete(habitat);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => 
  {
    if (!habitatToDelete) return;

    try {
      await habitatService.delete(habitatToDelete.id);
      setHabitats(prev => prev.filter(h => h.id !== habitatToDelete.id));
      setIsModalOpen(false);
      setHabitatToDelete(null);
    } catch (error) {
      console.error('Error deleting habitat:', error);
      alert('Ocurrió un error al eliminar el hábitat.');
    }
  };

  const filteredHabitats = habitats.filter(h => 
    h.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#021b36] pt-32 pb-20 px-6">
      <ConfirmDialog
        isOpen={isModalOpen}
        title="¿Estás seguro?"
        message={`Estás a punto de eliminar el hábitat "${habitatToDelete?.nombre}". 
          Esta acción puede afectar a las especies asociadas.`}
        confirmLabel="Eliminar"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
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
              placeholder="Buscar por nombre o región..."
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
                    <th className="px-8 py-6 text-slate text-xs font-bold uppercase tracking-widest">
                      Hábitat
                    </th>
                    <th className="px-8 py-6 text-slate text-xs font-bold uppercase tracking-widest hidden md:table-cell">
                      Tipo
                    </th>
                    <th className="px-8 py-6 text-slate text-xs font-bold uppercase tracking-widest hidden lg:table-cell">
                      Región
                    </th>
                    <th className="px-8 py-6 text-slate text-xs font-bold uppercase tracking-widest text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredHabitats.length > 0 ? (
                    filteredHabitats.map((habitat) => (
                      <tr key={habitat.id} className="hover:bg-white/5 transition-colors group">
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
                                    src={habitat.imagenUrl || 'https://via.placeholder.com/150'} 
                                    alt={habitat.nombre} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                              <p className="text-white font-bold">{habitat.nombre}</p>
                              <p className="text-slate text-xs">{habitat.clima}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 hidden md:table-cell">
                          <span className="text-slate text-sm">{habitat.tipo}</span>
                        </td>
                        <td className="px-8 py-6 hidden lg:table-cell">
                           <span className="text-slate text-sm">
                             {habitat.region}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right flex justify-end gap-2">
                            {isViewMode && (
                                <div className="
                                  text-mint/40 
                                  italic 
                                  text-xs 
                                  py-2 
                                  px-4 
                                  border 
                                  border-white/5 
                                  rounded-xl 
                                  bg-white/5">
                                    Modo Vista
                                </div>
                            )}
                            {isUpdateMode && (
                                <Link 
                                    to={`/admin/habitats/actualizar/${habitat.id}`}
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
                                    onClick={() => handleDeleteClick(habitat)}
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
                        No se encontraron hábitats que coincidan con tu búsqueda.
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

export default AdminHabitatListPage;
