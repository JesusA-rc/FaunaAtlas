
const AdminDashboard = () => 
{
  return (
    <div className="min-h-screen bg-[#021b36] pt-32 pb-12">
      <div className="container">
        <h1 className="text-3xl font-heading font-bold text-white mb-6">
          Panel de <span className="text-mint">Control Admin</span>
        </h1>
        <p className="text-slate text-lg mb-8">
          Bienvenido al área administrativa de Fauna Atlas. Desde aquí podrás gestionar las especies, 
          habitats y reportes de avistamientos.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Especies', 'Hábitats', 'Avistamientos', 'Usuarios'].map((item) => (
            <div key={item} 
              className="bg-navy/50 p-6 rounded-2xl border border-white/5 hover:border-mint/30 transition-all group cursor-pointer">
              <h3 className="text-white font-bold mb-2 group-hover:text-mint transition-colors">
                {item}
              </h3>
              <p className="text-slate text-sm">
                Gestionar registros y configuraciones de {item.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
