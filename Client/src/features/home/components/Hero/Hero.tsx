import Navbar from '../../../../core/components/Navbar/Navbar';
import heroBg from '../../../../assets/herobg.png';

const Hero = () => 
{
  return (
    <section 
      className="relative min-h-screen flex items-center bg-cover bg-center px-6 pt-[100px] pb-32 overflow-hidden"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <Navbar />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-navy/90 to-navy/40 z-10"></div>

      <div className="relative z-20 container grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
        <div className="flex flex-col items-start text-left">
          <header className="mb-8">
            <div className="flex items-center gap-4">
              <span className="
                inline-block
                px-5
                py-2
                bg-mint/10
                text-mint
                border
                border-mint/20
                rounded-full
                text-xs
                font-semibold
                tracking-wider
                uppercase
                mb-4
                animate-fade-down">
                Atlas de Vida Salvaje
              </span>
              <span className="
                inline-block 
                px-5
                py-2
                bg-mint/10
                text-mint
                border
                border-mint/20
                rounded-full
                text-xs
                font-semibold
                tracking-wider
                uppercase
                mb-4
                animate-fade-down">
                Nuevos descubrimientos
              </span>
            </div>
            <h1 className="
              text-[clamp(2.5rem,6vw,3.8rem)]
              text-white
              leading-[1.1]
              mb-4
              animate-fade-left
              [animation-delay:200ms]">
              Descubre la esencia de
              <span className="text-mint"> la vida silvestre</span>
            </h1>
            <p className="text-lg text-slate max-w-[540px] animate-fade-left [animation-delay:400ms]">
              Explora los hábitats más recónditos y conoce las especies que
              habitan nuestro planeta en un viaje visual sin precedentes.
            </p>
          </header>

          <div className="flex items-center gap-8 mb-12 animate-fade-left [animation-delay:600ms]">
            <button className="button-primary">
              Explorar especies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
