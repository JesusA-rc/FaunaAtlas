import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaTree, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import ConfirmDialog from './Common/ConfirmDialog';

const habitatSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  tipo: z.string().min(2, 'El tipo es requerido'),
  clima: z.string().min(2, 'El clima es requerido'),
  region: z.string().min(2, 'La región es requerida'),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  imagenUrl: z.string().optional().or(z.literal('')),
});

export type HabitatFormValues = z.infer<typeof habitatSchema>;

interface Props {
  initialValues?: Partial<HabitatFormValues>;
  onSubmit: (values: HabitatFormValues) => Promise<void>;
  submitLabel: string;
  serverError: string | null;
  success: boolean;
}

const HabitatForm = ({ initialValues, onSubmit, submitLabel, serverError, success }: Props) => 
{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<HabitatFormValues | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<HabitatFormValues>({
    resolver: zodResolver(habitatSchema) as any,
    defaultValues: {
      nombre: '',
      tipo: '',
      clima: '',
      region: '',
      descripcion: '',
      imagenUrl: '',
      ...initialValues,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
      } as HabitatFormValues);
    }
  }, [initialValues, reset]);

  const handlePreSubmit = (values: HabitatFormValues) => 
  {
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
        message={`¿Estás seguro de que deseas ${submitLabel.toLowerCase()} este hábitat con los datos proporcionados?`}
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
        <TextInput
          name="nombre"
          control={control}
          label="Nombre del Hábitat"
          placeholder="Ej: Amazonía Central"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectInput
            name="tipo"
            control={control}
            label="Tipo de Hábitat"
            placeholder="Selecciona tipo"
            options={[
              { label: 'Selva Tropical', value: 'Selva Tropical' },
              { label: 'Bosque Templado', value: 'Bosque Templado' },
              { label: 'Desierto', value: 'Desierto' },
              { label: 'Sabana', value: 'Sabana' },
              { label: 'Montaña', value: 'Montaña' },
              { label: 'Humedal', value: 'Humedal' },
              { label: 'Océano / Marino', value: 'Océano' },
              { label: 'Pradera', value: 'Pradera' },
              { label: 'Tundra', value: 'Tundra' },
            ]}
          />
          <SelectInput
            name="clima"
            control={control}
            label="Clima"
            placeholder="Selecciona clima"
            options={[
              { label: 'Tropical', value: 'Tropical' },
              { label: 'Árido / Seco', value: 'Árido' },
              { label: 'Templado', value: 'Templado' },
              { label: 'Continental', value: 'Continental' },
              { label: 'Polar', value: 'Polar' },
              { label: 'Subtropical', value: 'Subtropical' },
            ]}
          />
        </div>

        <TextInput
          name="region"
          control={control}
          label="Región Geográfica"
          placeholder="Ej: América del Sur"
        />

        <TextArea
          name="descripcion"
          control={control}
          label="Descripción"
          placeholder="Describe las características climáticas y geográficas..."
        />

        <TextInput
          name="imagenUrl"
          control={control}
          label="URL de Imagen (Opcional)"
          placeholder="https://ejemplo.com/habitat.jpg"
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
                <FaTree />
                {submitLabel}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitatForm;
