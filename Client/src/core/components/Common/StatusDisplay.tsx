interface StatusDisplayProps {
  title: string;
  message: string;
  type?: 'info' | 'error';
}

const StatusDisplay = ({ title, message, type = 'info' }: StatusDisplayProps) => 
{
  return (
    <div className={`
      flex flex-col items-center justify-center p-20 border border-dashed rounded-[40px] text-slate
      ${type === 'error' ? 'border-red-500/20 bg-red-500/5' : 'border-white/10 bg-white/5'}
    `}>
      <p className="text-2xl font-bold mb-4 text-white font-heading">{title}</p>
      <p className="text-lg text-center opacity-60 max-w-md">{message}</p>
    </div>
  );
};

export default StatusDisplay;
