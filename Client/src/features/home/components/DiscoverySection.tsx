import { useState, useEffect } from 'react';
import { FaArrowRight, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import animalService from '../../../core/services/animalService';
import habitatService from '../../../core/services/habitatService';
import noticiaService from '../../../core/services/noticiaService';

const DiscoverySection = () => 
{
  const [animales, setAnimales] = useState<any[]>([]);
  const [habitats, setHabitats] = useState<any[]>([]);
  const [noticias, setNoticias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'animales' | 'habitats'>('animales');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => 
    {
      try {
        const [a, h, n] = await Promise.all([
          animalService.list(),
          habitatService.list(),
          noticiaService.list()
        ]);
        setAnimales(a);
        setHabitats(h);
        setNoticias(n);
      } catch (error) {
        console.error("Error fetching discovery data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  if (loading) return (
    <div className="py-20 text-center text-mint font-bold animate-pulse">
      Cargando biodiversidad...
    </div>
  );

  const activeData = activeTab === 'animales' ? animales : habitats;
  const totalPages = Math.ceil(activeData.length / itemsPerPage);
  const paginatedData = activeData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageNumbers = () => 
  {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) 
    {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    
    return pages;
  };

  return (
    <section className="py-20 bg-navy overflow-hidden">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
              <div>
                <h2 className="text-white text-4xl font-bold font-heading mb-4">
                  Descubrimiento
                </h2>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setActiveTab('habitats')}
                    className={`
                      px-4 
                      py-1.5 
                      rounded-full 
                      text-xs 
                      font-bold 
                      uppercase 
                      transition-all 
                      duration-300 
                      border 
                      cursor-pointer ${
                      activeTab === 'habitats' 
                      ? 'bg-teal border-teal text-white shadow-[0_0_15px_rgba(2,88,73,0.4)]' 
                      : 'bg-transparent border-white/20 text-slate hover:border-teal/50'
                    }`}
                  >
                    Habitats
                  </button>
                  <button 
                    onClick={() => setActiveTab('animales')}
                    className={`
                      px-4 
                      py-1.5 
                      rounded-full 
                      text-xs 
                      font-bold 
                      uppercase 
                      transition-all 
                      duration-300 
                      border 
                      cursor-pointer ${
                      activeTab === 'animales' 
                      ? 'bg-mint border-mint text-navy shadow-[0_0_15px_rgba(76,201,138,0.4)]' 
                      : 'bg-transparent border-white/20 text-slate hover:border-mint/50'
                    }`}
                  >
                    Animales
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 min-h-[528px]">
              {paginatedData.map((item) => (
                <DiscoveryItem 
                  key={`${activeTab}-${item.id}`} 
                  item={item} 
                  activeTab={activeTab} 
                />
              ))}
              
              {paginatedData.length === 0 && (
                <div className="
                  flex
                  items-center 
                  justify-center 
                  h-40 
                  border 
                  border-dashed 
                  border-white/10 
                  rounded-2xl 
                  text-slate 
                  bg-white/5">
                  No se encontraron registros.
                </div>
              )}
            </div>

            <div className="mt-10 flex items-center justify-between w-full gap-2 pb-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={`w-10 h-10 flex items-center justify-center rounded-md transition-all border ${
                  currentPage === 1
                  ? 'bg-white/5 border-white/5 text-slate/30 cursor-not-allowed'
                  : 'bg-white/5 border-white/10 text-slate hover:border-mint/50 hover:text-white cursor-pointer'
                }`}
              >
                <FaChevronLeft size={12} />
              </button>
              <div className="flex gap-2 md:gap-10">
                {getPageNumbers().map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`
                      w-10 
                      h-10 
                      flex 
                      items-center 
                      justify-center 
                      rounded-md 
                      font-bold 
                      text-sm 
                      transition-all 
                      border 
                      cursor-pointer ${
                      currentPage === num
                      ? 'bg-mint border-mint text-navy translate-y-[-2px] shadow-lg'
                      : 'bg-white/5 border-white/10 text-slate hover:border-mint/50 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={`w-10 h-10 flex items-center justify-center rounded-md transition-all border ${
                  currentPage === totalPages
                  ? 'bg-white/5 border-white/5 text-slate/30 cursor-not-allowed'
                  : 'bg-white/5 border-white/10 text-slate hover:border-mint/50 hover:text-white cursor-pointer'
                }`}
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>
          <div className="lg:border-l lg:border-white/5 lg:pl-12 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-white text-2xl font-bold font-heading">Últimas Noticias</h2>
              <span className="bg-mint/10 text-mint text-[10px] font-bold px-3 py-1 rounded-full border border-mint/20">
                {noticias.length} TOTAL
              </span>
            </div>

            <div className="flex flex-col gap-8 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {noticias.map((noticia) => (
                <NewsItem key={noticia.id} noticia={noticia} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsItem = ({ noticia }: { noticia: any }) => 
{
  const fallback = '/animales.png';
  const [imgSrc, setImgSrc] = useState(noticia.imagenUrl || fallback);

  useEffect(() => {
    setImgSrc(noticia.imagenUrl || fallback);
  }, [noticia.imagenUrl]);

  return (
    <article className="group cursor-pointer flex gap-4 items-start">
      <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border border-white/10 bg-white/5">
        <img 
          src={imgSrc} 
          alt={noticia.titulo}
          onError={() => setImgSrc(fallback)}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      <div className="flex flex-col flex-grow pt-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="
            text-mint 
            text-[10px] 
            font-black 
            uppercase 
            tracking-widest 
            opacity-80 
            group-hover:opacity-100 
            transition-opacity">
            {noticia.tagCategoria}
          </span>
        </div>
        
        <h4 className="
          text-white 
          text-sm 
          font-bold 
          group-hover:text-mint 
          transition-colors 
          line-clamp-2 
          leading-snug 
          mb-3">
          {noticia.titulo}
        </h4>

        <div className="flex gap-2">
           <div className="
            w-6 
            h-6 
            rounded 
            bg-mint/20 
            flex 
            items-center 
            justify-center 
            text-mint 
            hover:bg-mint 
            hover:text-navy 
            transition-all 
            cursor-pointer">
              <FaCalendarAlt size={10} />
           </div>
           <div className="
            w-6 
            h-6 
            rounded 
            bg-white/5 
            flex 
            items-center 
            justify-center 
            text-slate 
            hover:bg-mint 
            hover:text-navy 
            transition-all 
            border 
            border-white/5 
            hover:border-mint/30 
            cursor-pointer">
              <FaArrowRight size={10} />
           </div>
        </div>
      </div>
    </article>
  );
};

const DiscoveryItem = ({ item, activeTab }: { item: any; activeTab: string }) => 
{
  const fallback = activeTab === 'animales' ? '/animales.png' : '/habitats.png';
  const [imgSrc, setImgSrc] = useState(item.imagenUrl || fallback);

  useEffect(() => {
    setImgSrc(item.imagenUrl || fallback);
  }, [item.imagenUrl, fallback]);

  return (
    <div 
      className="
        group 
        relative 
        h-40 
        rounded-2xl 
        overflow-hidden 
        cursor-pointer 
        border 
        border-white/5 
        bg-white/5 
        transition-all 
        duration-500 
        hover:border-mint/30"
    >
      <img 
        src={imgSrc} 
        alt={item.nombre || item.nombreComun}
        onError={() => setImgSrc(fallback)}
        className="
          w-full 
          h-full 
          object-cover 
          transition-transform 
          duration-700 
          group-hover:scale-105 
          opacity-80 
          group-hover:opacity-100"
      />
      <div className="
        absolute 
        inset-0 
        bg-gradient-to-t 
        from-navy/90 
        via-navy/20 
        to-transparent 
        opacity-60 
        group-hover:opacity-40 
        transition-opacity"></div>
      <div className="
        absolute 
        bottom-0 
        left-0 
        w-full 
        p-6 
        bg-navy/40 
        backdrop-blur-md 
        border-t 
        border-white/5 
        transition-colors 
        group-hover:bg-mint/10">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-mint text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">
              {activeTab === 'animales' ? item.clase : item.tipo}
            </span>
            <h4 className="text-white text-xl font-bold font-heading group-hover:text-mint transition-colors">
              {activeTab === 'animales' ? item.nombreComun : item.nombre}
            </h4>
          </div>
          <div className="
            w-10 
            h-10 
            rounded-full 
            bg-white/5 
            flex 
            items-center 
            justify-center 
            text-white 
            border 
            border-white/10 
            group-hover:bg-mint 
            group-hover:text-navy 
            transition-all">
            <FaArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverySection;
