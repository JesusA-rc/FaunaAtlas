import { FaPaw, FaLeaf, FaDna, FaShieldAlt, FaUtensils, FaMapMarkerAlt } from 'react-icons/fa';
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

      {animal.zoos && animal.zoos.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-100 mt-6">
          <h4 className="flex items-center gap-2 text-white font-bold mb-4">
            <FaMapMarkerAlt className="text-mint" />
            <span>Zoológicos donde se encuentra</span>
          </h4>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {animal.zoos.map((zoo) => (
              <div 
                key={zoo.id} 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 hover:border-mint/50 transition-colors"
                title={zoo.ubicacion}
              >
                <div className="w-2 h-2 rounded-full bg-mint shadow-[0_0_8px_rgba(46,204,113,0.6)]"></div>
                <span className="text-white text-sm font-medium">{zoo.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalDataSheet;
