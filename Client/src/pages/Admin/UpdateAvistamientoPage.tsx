import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';
import AvistamientoForm, { type AvistamientoFormValues } from '../../components/AvistamientoForm';
import avistamientoService from '../../core/services/avistamientoService';
import { type Avistamiento } from '../../core/models';

const UpdateAvistamientoPage = () => 
{
  const { id } = useParams<{ id: string }>();
  const [sighting, setSighting] = useState<Avistamiento | null>(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => 
  {
    if (id) {
      avistamientoService.details(Number(id))
        .then(res => setSighting(res))
        .catch(err => console.error('Error fetching sighting details:', err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const onSubmit = async (values: AvistamientoFormValues) => 
  {
    if (!id) return;
    
    setServerError(null);
    setSuccess(false);
    try {
      await avistamientoService.update(Number(id), { ...values, id: Number(id) } as any);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      if (error.response?.data) {
        setServerError(error.response.data);
      } else {
        setServerError('Ocurrió un error inesperado al actualizar el registro.');
      }
    }
  };

  if (loading) 
  {
    return (
      <div className="min-h-screen bg-[#021b36] pt-32 flex justify-center">
        <div className="w-12 h-12 border-4 border-mint/20 border-t-mint rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!sighting) 
  {
    return (
      <div className="min-h-screen bg-[#021b36] pt-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl text-white font-bold mb-4">Registro no encontrado</h1>
          <Link to="/admin/avistamientos/actualizar" className="text-mint hover:underline">Volver a la lista</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#021b36] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/admin/avistamientos/actualizar" 
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
            Editar <span className="text-mint">Avistamiento</span>
          </h1>
          <p className="text-slate max-w-lg">
            Actualiza la información técnica o la ubicación del encuentro registrado.
          </p>
        </div>

        <AvistamientoForm 
          initialValues={sighting as any}
          onSubmit={onSubmit} 
          submitLabel="Guardar Cambios" 
          serverError={serverError}
          success={success}
        />
      </div>
    </div>
  );
};

export default UpdateAvistamientoPage;
