import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';
import HabitatForm, { type HabitatFormValues } from '../../components/HabitatForm';
import habitatService from '../../core/services/habitatService';
import { type Habitat } from '../../core/models';

const UpdateHabitatPage = () => 
{
  const { id } = useParams<{ id: string }>();
  const [habitat, setHabitat] = useState<Habitat | null>(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      habitatService.details(Number(id))
        .then(res => setHabitat(res))
        .catch(err => console.error('Error fetching habitat details:', err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const onSubmit = async (values: HabitatFormValues) => 
  {
    if (!id) return;
    
    setServerError(null);
    setSuccess(false);
    try {
      await habitatService.update(Number(id), { ...values, id: Number(id) } as any);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      if (error.response?.data) {
        setServerError(error.response.data);
      } else {
        setServerError('Ocurrió un error inesperado al intentar actualizar el hábitat.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#021b36] pt-32 flex justify-center">
        <div className="w-12 h-12 border-4 border-mint/20 border-t-mint rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!habitat) {
    return (
      <div className="min-h-screen bg-[#021b36] pt-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl text-white font-bold mb-4">Hábitat no encontrado</h1>
          <Link to="/admin/habitats/actualizar" className="text-mint hover:underline">Volver a la lista</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#021b36] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/admin/habitats/actualizar" 
            className="flex items-center gap-2 text-slate hover:text-mint transition-colors no-underline">
            <FaArrowLeft />
            <span>Volver a la Lista</span>
          </Link>
        </div>

        <div className="flex flex-col items-center mb-10 text-center">
          <div className="
            w-20 
            h-20 
            bg-mint/10 
            rounded-3xl 
            flex 
            items-center 
            justify-center 
            text-mint 
            border 
            border-mint/20 
            mb-6 
            shadow-[0_0_30px_rgba(76,201,138,0.1)]">
            <FaEdit size={32} />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-3">
            Editar <span className="text-mint">{habitat.nombre}</span>
          </h1>
          <p className="text-slate max-w-lg">
            Modifica las características del ecosistema. Los cambios se aplicarán a todas las especies que habitan en él.
          </p>
        </div>

        <HabitatForm 
          initialValues={habitat as any}
          onSubmit={onSubmit} 
          submitLabel="Guardar Cambios" 
          serverError={serverError}
          success={success}
        />
      </div>
    </div>
  );
};

export default UpdateHabitatPage;
