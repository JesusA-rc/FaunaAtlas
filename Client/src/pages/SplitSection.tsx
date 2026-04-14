import Badge from "../components/Badge";

const SplitSection = () => 
{
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 flex h-full w-full">
        <div className="w-1/2 bg-navy"></div>
        <div className="w-1/2 bg-teal"></div>
      </div>

      {/* Content Layer aligned with Hero Container */}
      <div className="relative z-10 container">
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          <div className="lg:w-1/2 py-20 flex flex-col justify-center text-white">
            <div className="flex gap-4 mb-6">
              <Badge>Explora por hábitat</Badge>
              <Badge>Descubre especies</Badge>
            </div>

            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-tight font-heading mb-6">
              Nuestros <span className="text-mint">ecosistemas</span>
            </h2>

            <p className="text-lg text-slate max-w-[500px] mb-8">
              Especies que te sorprenderán y te harán reflexionar sobre la importancia 
              de cuidar nuestro planeta y preservar la biodiversidad local.
            </p>

            <div className="flex flex-wrap gap-6">
              <button className="button-primary">
                Ver hábitats
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            {/* Space for additional map or visual content */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitSection;