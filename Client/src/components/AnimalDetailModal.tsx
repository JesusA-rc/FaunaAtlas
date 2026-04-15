import { FaTimes, FaPaw, FaLeaf, FaDna, FaShieldAlt, FaUtensils } from 'react-icons/fa';
import { type Animal } from '../core/models';

interface Props {
  isOpen: boolean;
  animal: Animal | null;
  onClose: () => void;
}

const AnimalDetailModal = ({ isOpen, animal, onClose }: Props) => 
{
  if (!isOpen || !animal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-navy/90 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="
        relative 
        z-10 
        w-full 
        max-w-4xl 
        max-h-[90vh] 
        bg-[#021b36] 
        border 
        border-white/10 
        rounded-[40px] 
        overflow-hidden 
        shadow-2xl 
        flex 
        flex-col 
        md:flex-row
        animate-in 
        zoom-in-95 
        duration-300">
        
        <button 
          onClick={onClose}
          className="
            absolute 
            top-6 
            right-6 
            z-20 
            w-10 
            h-10 
            bg-navy/50 
            backdrop-blur-md 
            border 
            border-white/10 
            rounded-full 
            flex 
            items-center 
            justify-center 
            text-white 
            hover:bg-mint 
            hover:text-navy 
            transition-all 
            cursor-pointer"
        >
          <FaTimes size={18} />
        </button>
        <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-navy flex-shrink-0">
          <img 
            src={animal.imagenUrl || 'https://via.placeholder.com/600x800'} 
            alt={animal.nombreComun} 
            className="w-full h-full object-cover"
          />
          <div className="
            absolute 
            inset-0 
            bg-gradient-to-t 
            from-[#021b36] 
            via-transparent 
            to-transparent 
            md:bg-gradient-to-r" />
        </div>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <span className="
              inline-block 
              px-4 
              py-1.5 
              rounded-full 
              bg-mint/10 
              text-mint 
              text-[10px] 
              font-bold 
              uppercase 
              tracking-widest 
              mb-4 
              border 
              border-mint/20">
              Ficha Técnica
            </span>
            <h2 className="text-4xl font-heading font-bold text-white mb-2 leading-tight">
              {animal.nombreComun}
            </h2>
            <p className="text-xl text-slate italic font-medium">
              {animal.nombreCientifico}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-mint mt-1"><FaDna size={18} /></div>
              <div>
                <p className="text-slate text-[10px] font-bold uppercase tracking-wider mb-1">Clase</p>
                <p className="text-white font-medium">{animal.clase}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-mint mt-1"><FaShieldAlt size={18} /></div>
              <div>
                <p className="text-slate text-[10px] font-bold uppercase tracking-wider mb-1">Estado</p>
                <p className="text-white font-medium">{animal.estadoConservacion}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-mint mt-1"><FaUtensils size={18} /></div>
              <div>
                <p className="text-slate text-[10px) font-bold uppercase tracking-wider mb-1">Dieta</p>
                <p className="text-white font-medium">{animal.dieta}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="text-mint mt-1"><FaLeaf size={18} /></div>
              <div>
                <p className="text-slate text-[10px] font-bold uppercase tracking-wider mb-1">Hábitat</p>
                <p className="text-white font-medium">{animal.habitat?.nombre || 'General'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="flex items-center gap-2 text-white font-bold mb-4">
                <FaPaw className="text-mint" />
                <span>Descripción General</span>
              </h4>
              <p className="text-slate leading-relaxed bg-white/5 p-6 rounded-3xl border border-white/5">
                {animal.descripcion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailModal;
