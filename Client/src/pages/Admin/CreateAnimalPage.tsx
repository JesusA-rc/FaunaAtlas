import { useState } from 'react';
import { FaPaw, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AnimalForm, { type AnimalFormValues } from '../../components/AnimalForm';
import animalService from '../../core/services/animalService';

const CreateAnimalPage = () => 
{
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (values: AnimalFormValues) => 
  {
    setServerError(null);
    setSuccess(false);
    try {
      await animalService.create(values as any);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      if (error.response?.data) {
        setServerError(error.response.data);
      } else {
        setServerError('Ocurrió un error inesperado al intentar registrar la especie.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#021b36] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2 text-slate hover:text-mint transition-colors no-underline">
            <FaArrowLeft />
            <span>Volver al Panel</span>
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
            <FaPaw size={32} />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-3">
            Registrar <span className="text-mint">Nueva Especie</span>
          </h1>
          <p className="text-slate max-w-lg">
            Completa los detalles a continuación para agregar una nueva especie al Atlas de Vida Salvaje.
          </p>
        </div>

        <AnimalForm 
          onSubmit={onSubmit} 
          submitLabel="Crear Especie" 
          serverError={serverError}
          success={success}
        />
      </div>
    </div>
  );
};

export default CreateAnimalPage;
