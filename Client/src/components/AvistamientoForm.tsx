import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import ConfirmDialog from './Common/ConfirmDialog';
import animalService from '../core/services/animalService';
import { type Animal } from '../core/models';

const avistamientoSchema = z.object({
  animalId: z.coerce.number<number>().min(1, 'La especie es requerida'),
  ubicacion: z.string().min(3, 'La ubicación debe tener al menos 3 caracteres'),
  fecha: z.string().min(1, 'La fecha es requerida'),
  reportadoPor: z.string().min(2, 'El nombre de quien reporta es requerido'),
  notas: z.string().min(5, 'Las notas deben tener al menos 5 caracteres'),
  latitud: z.coerce.number<number>(),
  longitud: z.coerce.number<number>(),
});

export type AvistamientoFormValues = z.infer<typeof avistamientoSchema>;

interface Props {
  initialValues?: Partial<AvistamientoFormValues>;
  onSubmit: (values: AvistamientoFormValues) => Promise<void>;
  submitLabel: string;
  serverError: string | null;
  success: boolean;
}

const AvistamientoForm = ({ initialValues, onSubmit, submitLabel, serverError, success }: Props) => 
{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<AvistamientoFormValues | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<AvistamientoFormValues>({
    resolver: zodResolver(avistamientoSchema),
    defaultValues: {
      animalId: 0,
      ubicacion: '',
      fecha: new Date().toISOString().split('T')[0],
      reportadoPor: '',
      notas: '',
      latitud: 0,
      longitud: 0,
      ...initialValues,
    },
  });

  useEffect(() => {
    animalService.list()
      .then(res => setAnimals(res))
      .catch(err => console.error('Error fetching animals for dropdown:', err));
  }, []);

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        fecha: initialValues.fecha ? initialValues.fecha.split('T')[0] : '',
      } as AvistamientoFormValues);
    }
  }, [initialValues, reset]);

  const handlePreSubmit = (values: AvistamientoFormValues) => {
    setPendingValues(values);
    setIsModalOpen(true);
  };

  const confirmSubmit = () => {
    if (pendingValues) {
      onSubmit(pendingValues);
      setIsModalOpen(false);
    }
  };

  const animalOptions = animals.map(a => ({
    label: `${a.nombreComun} (${a.nombreCientifico})`,
    value: a.id.toString(),
  }));

  return (
    <div className="bg-navy/40 border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl backdrop-blur-sm">
      <ConfirmDialog
        isOpen={isModalOpen}
        title="¿Confirmar avistamiento?"
        message={`¿Estás seguro de que deseas ${submitLabel.toLowerCase()} este registro de avistamiento?`}
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
          <p className="font-bold">¡Registro de avistamiento guardado con éxito!</p>
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
        <SelectInput
          name="animalId"
          control={control}
          label="Especie Avistada"
          placeholder="Selecciona la especie"
          options={animalOptions}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            name="ubicacion"
            control={control}
            label="Ubicación / Sector"
            placeholder="Ej: Valle del Silencio, Sector Norte"
          />
          <TextInput
            name="fecha"
            control={control}
            label="Fecha del Avistamiento"
            type="date"
          />
        </div>

        <TextInput
          name="reportadoPor"
          control={control}
          label="Reportado Por"
          placeholder="Nombre del observador o guardabosques"
        />

        <TextArea
          name="notas"
          control={control}
          label="Notas de la Observación"
          placeholder="Describe el comportamiento, estado de salud o condiciones del encuentro..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            name="latitud"
            control={control}
            label="Latitud"
            type="number"
            placeholder="0.0000"
          />
          <TextInput
            name="longitud"
            control={control}
            label="Longitud"
            type="number"
            placeholder="0.0000"
          />
        </div>

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
                <FaMapMarkerAlt />
                {submitLabel}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AvistamientoForm;
