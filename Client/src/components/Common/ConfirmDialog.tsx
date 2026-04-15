import { FaExclamationTriangle } from 'react-icons/fa';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'primary' | 'success';
}

const ConfirmDialog = ({ 
  isOpen, 
  title, 
  message, 
  confirmLabel, 
  cancelLabel = 'Cancelar', 
  onConfirm, 
  onCancel,
  type = 'primary'
}: Props) => {
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: <FaExclamationTriangle className="text-red-400" />,
      button: 'bg-red-500 hover:bg-red-600 shadow-[0_10px_20px_rgba(239,68,68,0.2)]',
      border: 'border-red-500/20'
    },
    primary: {
      icon: <FaExclamationTriangle className="text-mint" />,
      button: 'bg-mint hover:bg-[#3db87b] shadow-[0_10px_20px_rgba(76,201,138,0.2)]',
      border: 'border-mint/20'
    },
    success: {
      icon: <FaExclamationTriangle className="text-green-400" />,
      button: 'bg-green-500 hover:bg-green-600 shadow-[0_10px_20px_rgba(34,197,94,0.2)]',
      border: 'border-green-500/20'
    }
  };

  const config = typeConfig[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className={`
        relative 
        z-10 
        w-full 
        max-w-md 
        bg-[#021b36] 
        border 
        ${config.border} 
        rounded-[32px] 
        p-8 
        shadow-2xl 
        animate-in 
        zoom-in-95 
        duration-300
      `}>
        <div className="flex flex-col items-center text-center">
          <div className={`
            w-16 
            h-16 
            rounded-2xl 
            bg-white/5 
            flex 
            items-center 
            justify-center 
            text-2xl 
            mb-6 
            border 
            border-white/5 
            shadow-inner`}>
            {config.icon}
          </div>
          
          <h3 className="text-2xl font-heading font-bold text-white mb-3">
            {title}
          </h3>
          
          <p className="text-slate mb-8 leading-relaxed">
            {message}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={onCancel}
              className="
                flex-1 
                py-4 
                rounded-2xl 
                bg-white/5 
                text-slate 
                font-bold 
                hover:bg-white/10 
                hover:text-white 
                transition-all 
                border 
                border-white/5
                cursor-pointer"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`
                flex-1 
                py-4 
                rounded-2xl 
                ${config.button} 
                text-navy 
                font-bold 
                transition-all 
                cursor-pointer
              `}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
