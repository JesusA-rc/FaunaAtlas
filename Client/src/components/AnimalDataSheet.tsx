import { FaPaw, FaLeaf, FaDna, FaShieldAlt, FaUtensils } from 'react-icons/fa';
import { type Animal } from '../core/models';

interface Props {
  animal: Animal;
  showDescription?: boolean;
}

const AnimalDataSheet = ({ animal, showDescription = true }: Props) => 
{
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div className="flex items-start gap-3 md:gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-mint mt-1 flex-shrink-0"><FaDna size={18} /></div>
          <div>
            <p className="text-slate text-[10px] font-bold uppercase tracking-wider mb-1">
              Clase
            </p>
            <p className="text-white font-medium text-sm md:text-base">
              {animal.clase}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 md:gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-mint mt-1 flex-shrink-0"><FaShieldAlt size={18} /></div>
          <div>
            <p className="text-slate text-[10px] font-bold uppercase tracking-wider mb-1">
              Estado
            </p>
            <p className="text-white font-medium text-sm md:text-base">
              {animal.estadoConservacion}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 md:gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-mint mt-1 flex-shrink-0"><FaUtensils size={18} /></div>
          <div>
            <p className="text-slate text-[10px] font-bold uppercase tracking-wider mb-1">
              Dieta
            </p>
            <p className="text-white font-medium text-sm md:text-base">
              {animal.dieta}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 md:gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-mint mt-1 flex-shrink-0"><FaLeaf size={18} /></div>
          <div>
            <p className="text-slate text-[10px] font-bold uppercase tracking-wider mb-1">
              Hábitat
            </p>
            <p className="text-white font-medium text-sm md:text-base">
              {animal.habitat?.nombre || 'General'}
            </p>
          </div>
        </div>
      </div>

      {showDescription && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <h4 className="flex items-center gap-2 text-white font-bold mb-4">
            <FaPaw className="text-mint" />
            <span>Descripción General</span>
          </h4>
          <p className="
          text-slate 
          leading-relaxed 
          bg-white/5 
          p-6 
          rounded-3xl 
          border 
          border-white/5 
          text-sm 
          md:text-base">
            {animal.descripcion}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnimalDataSheet;
