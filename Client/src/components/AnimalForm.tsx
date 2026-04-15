import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaPaw, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import habitatService from '../core/services/habitatService';
import { type Habitat } from '../core/models';
import ConfirmDialog from './Common/ConfirmDialog';

const animalSchema = z.object({
  nombreComun: z.string().min(3, 'El nombre común debe tener al menos 3 caracteres'),
  nombreCientifico: z.string().min(3, 'El nombre científico debe tener al menos 3 caracteres'),
  clase: z.string().min(2, 'La clase es requerida'),
  estadoConservacion: z.string().min(2, 'El estado de conservación es requerido'),
  dieta: z.string().min(2, 'La dieta es requerida'),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  habitatId: z.coerce.number().min(1, 'Debes seleccionar un hábitat'),
  imagenUrl: z.string().optional().or(z.literal('')),
});

export type AnimalFormValues = z.infer<typeof animalSchema>;

interface Props {
  initialValues?: Partial<AnimalFormValues>;
  onSubmit: (values: AnimalFormValues) => Promise<void>;
  submitLabel: string;
  serverError: string | null;
  success: boolean;
}

const AnimalForm = ({ initialValues, onSubmit, submitLabel, serverError, success }: Props) => 
{
  const [habitats, setHabitats] = useState<Habitat[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<AnimalFormValues | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<AnimalFormValues>({
    resolver: zodResolver(animalSchema) as any,
    defaultValues: {
      nombreComun: '',
      nombreCientifico: '',
      clase: '',
      estadoConservacion: '',
      dieta: '',
      descripcion: '',
      habitatId: 0,
      imagenUrl: '',
      ...initialValues,
    },
  });

  useEffect(() => {
    habitatService.list()
      .then(res => setHabitats(res))
      .catch(err => console.error('Error fetching habitats:', err));
  }, []);

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
      } as AnimalFormValues);
    }
  }, [initialValues, reset]);

  const handlePreSubmit = (values: AnimalFormValues) => {
    setPendingValues(values);
    setIsModalOpen(true);
  };

  const confirmSubmit = () => {
    if (pendingValues) {
      onSubmit(pendingValues);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-navy/40 border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl backdrop-blur-sm">
      <ConfirmDialog
        isOpen={isModalOpen}
        title="¿Confirmar cambios?"
        message={`¿Estás seguro de que deseas ${submitLabel.toLowerCase()} esta especie con los datos proporcionados?`}
        confirmLabel={submitLabel}
        onConfirm={confirmSubmit}
        onCancel={() => setIsModalOpen(false)}
      />
      {success && (
        <div className="
          mb-8 
          p-4 
          bg-mint/10 
          border 
          border-mint/20 
          rounded-2xl 
          flex 
          items-center 
          gap-4 
          text-mint 
          animate-in 
          fade-in 
          slide-in-from-top-4 
          duration-500">
          <FaCheckCircle size={24} />
          <p className="font-bold">¡Operación realizada con éxito!</p>
        </div>
      )}

      {serverError && (
        <div className="
          mb-8 
          p-4 
          bg-red-500/10 
          border 
          border-red-500/20 
          rounded-2xl 
          flex 
          items-center 
          gap-4 
          text-red-400 
          animate-in 
          fade-in 
          slide-in-from-top-2 
          duration-300">
          <FaExclamationCircle size={24} />
          <p className="font-bold">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(handlePreSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            name="nombreComun"
            control={control}
            label="Nombre Común"
            placeholder="Ej: Jaguar"
          />
          <TextInput
            name="nombreCientifico"
            control={control}
            label="Nombre Científico"
            placeholder="Ej: Panthera onca"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectInput
            name="clase"
            control={control}
            label="Clase"
            placeholder="Selecciona clase"
            options={[
              { label: 'Mammalia (Mamíferos)', value: 'Mammalia' },
              { label: 'Aves', value: 'Aves' },
              { label: 'Reptilia (Reptiles)', value: 'Reptilia' },
              { label: 'Amphibia (Anfibios)', value: 'Amphibia' },
              { label: 'Actinopterygii (Peces óseos)', value: 'Actinopterygii' },
              { label: 'Chondrichthyes (Peces cartilaginosos)', value: 'Chondrichthyes' },
              { label: 'Arachnida (Arácnidos)', value: 'Arachnida' },
              { label: 'Insecta (Insectos)', value: 'Insecta' },
            ]}
          />
          <SelectInput
            name="estadoConservacion"
            control={control}
            label="Estado"
            placeholder="Selecciona estado"
            options={[
              { label: 'Preocupación Menor (LC)', value: 'Preocupación Menor (LC)' },
              { label: 'Casi Amenazada (NT)', value: 'Casi Amenazada (NT)' },
              { label: 'Vulnerable (VU)', value: 'Vulnerable (VU)' },
              { label: 'En Peligro (EN)', value: 'En Peligro (EN)' },
              { label: 'En Peligro Crítico (CR)', value: 'En Peligro Crítico (CR)' },
              { label: 'Extinto en Estado Silvestre (EW)', value: 'Extinto en Estado Silvestre (EW)' },
              { label: 'Extinto (EX)', value: 'Extinto (EX)' },
            ]}
          />
          <SelectInput
            name="dieta"
            control={control}
            label="Dieta"
            placeholder="Selecciona dieta"
            options={[
              { label: 'Carnívoro', value: 'Carnívoro' },
              { label: 'Herbívoro', value: 'Herbívoro' },
              { label: 'Omnívoro', value: 'Omnívoro' },
              { label: 'Insectívoro', value: 'Insectívoro' },
              { label: 'Frugívoro', value: 'Frugívoro' },
              { label: 'Carroñero', value: 'Carroñero' },
            ]}
          />
        </div>

        <SelectInput
          name="habitatId"
          control={control}
          label="Hábitat"
          placeholder="Selecciona el hábitat principal"
          options={habitats.map(h => ({ label: h.nombre, value: h.id }))}
        />

        <TextArea
          name="descripcion"
          control={control}
          label="Descripción"
          placeholder="Describe las características generales..."
        />

        <TextInput
          name="imagenUrl"
          control={control}
          label="URL de Imagen (Opcional)"
          placeholder="https://ejemplo.com/imagen.jpg"
        />

        <div className="pt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full 
              py-5 
              rounded-2xl 
              bg-mint 
              text-navy 
              font-bold 
              text-xl 
              hover:bg-[#3db87b] 
              transition-all 
              duration-300 
              shadow-[0_15px_30px_rgba(76,201,138,0.2)] 
              active:scale-95 
              disabled:opacity-50 
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              gap-3
              cursor-pointer"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-3 border-navy/30 border-t-navy rounded-full animate-spin"></div>
            ) : (
              <>
                <FaPaw />
                {submitLabel}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnimalForm;
