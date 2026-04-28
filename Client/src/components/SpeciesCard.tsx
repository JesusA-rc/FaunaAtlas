import { useState, useEffect } from 'react';
import { type Animal } from '../core/models';
import { FaArrowRight } from 'react-icons/fa';

interface Props {
  especie: Animal;
  onClick: () => void;
}

const SpeciesCard = ({ especie, onClick }: Props) => 
{
  const fallback = '/animales.png';
  const [imgSrc, setImgSrc] = useState(especie.imagenUrl || fallback);

  useEffect(() => {
    setImgSrc(especie.imagenUrl || fallback);
  }, [especie.imagenUrl]);

  return (
    <div 
      onClick={onClick}
      className="
      group 
      bg-[#061B35] 
      rounded-3xl 
      overflow-hidden 
      border 
      border-white/5 
      hover:border-mint/30 
      transition-all 
      duration-500 
      hover:-translate-y-2 
      flex 
      flex-col 
      h-full 
      shadow-xl
      cursor-pointer">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={imgSrc} 
          alt={especie.nombreComun}
          onError={() => setImgSrc(fallback)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="
          absolute 
          inset-0 
          bg-gradient-to-t 
          from-navy 
          via-transparent 
          to-transparent 
          opacity-80 
          group-hover:opacity-40 
          transition-opacity">
        </div>
        
        {especie.clase && (
          <div className="absolute top-4 left-4">
            <span className="
              bg-mint 
              text-navy 
              text-[10px] 
              font-black 
              px-3 
              py-1 
              rounded-full 
              uppercase 
              tracking-tighter 
              shadow-lg">
              {especie.clase}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-mint transition-colors">
          {especie.nombreComun}
        </h3>
        <p className="text-sm italic text-slate/50 mb-4 font-serif">
          {especie.nombreCientifico || 'Especie no clasificada'}
        </p>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
           <span className="text-[10px] text-mint font-bold uppercase tracking-widest">
             Ver Ficha
           </span>
           <div className="
            w-8 
            h-8 
            rounded-full 
            bg-white/5 
            flex 
            items-center 
            justify-center 
            text-white 
            group-hover:bg-mint 
            group-hover:text-navy 
            transition-all 
            duration-300">
             <FaArrowRight size={12} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesCard;
