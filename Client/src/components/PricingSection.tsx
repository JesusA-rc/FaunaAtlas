import { FaCheck } from 'react-icons/fa';

const plans = [
  {
    name: 'Visitante',
    price: 'Gratis',
    description: 'Perfecto para comenzar a explorar la fauna local.',
    features: [
      'Acceso al atlas básico',
      'Buscador de especies',
      'Ver avistamientos públicos',
      'Mapa regional básico'
    ],
    buttonText: 'Empezar Gratis',
    highlight: false
  },
  {
    name: 'Explorador',
    price: '$9.99',
    period: '/mes',
    description: 'Para entusiastas que buscan una experiencia profunda.',
    features: [
      'Todo lo de Visitante',
      'Alertas de avistamientos',
      'Mapas de calor detallados',
      'Galería de fotos HD',
      'Filtros avanzados'
    ],
    buttonText: 'Ser Explorador',
    highlight: true
  },
  {
    name: 'Guardián',
    price: '$19.99',
    period: '/mes',
    description: 'Apoya directamente a la conservación y monitoreo.',
    features: [
      'Todo lo de Explorador',
      'Certificado de Guardián',
      'Insignias exclusivas',
      'Soporte prioritario',
      'Acceso a API de datos'
    ],
    buttonText: 'Ser Guardián',
    highlight: false
  }
];

const PricingSection = () => 
{
  return (
    <section className="py-32 bg-navy relative overflow-hidden">
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-mint font-bold tracking-wider uppercase text-sm mb-4">
            Membresías
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Únete a la comunidad de Fauna Atlas
          </h3>
          <p className="text-slate text-lg">
            Elige el plan que mejor se adapte a tu nivel de curiosidad y compromiso con la naturaleza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`
                relative p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2
                ${plan.highlight 
                  ? 'bg-white/5 border-mint shadow-[5px_5px_5px_5px_rgba(76,201,138,0.1)] md:scale-115 z-10' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }
              `}
            >
              {plan.highlight && (
                <div className="
                  absolute
                  -top-4
                  left-1/2
                  -translate-x-1/2
                  bg-mint
                  text-navy
                  text-xs
                  font-bold
                  px-4
                  py-1
                  rounded-full
                  uppercase">
                  Más Popular
                </div>
              )}

              <div className="mb-8">
                <h4 className="text-white text-xl font-bold mb-2">
                  {plan.name}
                </h4>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-heading font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-slate text-sm">
                    {plan.period}
                  </span>}
                </div>
                <p className="text-slate text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="w-full h-px bg-white/10 mb-8"></div>

              <ul className="flex flex-col gap-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-slate text-sm">
                    <FaCheck className="text-mint flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`
                w-full py-4 rounded-xl font-bold transition-all duration-300
                ${plan.highlight
                  ? 'bg-mint text-navy hover:bg-[#3db87b] shadow-[0_10px_20px_rgba(76,201,138,0.2)]'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }
              `}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
