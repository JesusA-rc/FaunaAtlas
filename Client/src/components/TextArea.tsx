import { type FieldValues, useController, type UseControllerProps } from 'react-hook-form';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  placeholder?: string;
  rows?: number;
}

export default function TextArea<T extends FieldValues>(props: Props<T>) 
{
  const { field, fieldState } = useController({ ...props });

  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <label className="text-slate text-sm font-bold ml-1 uppercase tracking-wider">
        {props.label}
      </label>
      <textarea
        {...field}
        rows={props.rows || 4}
        placeholder={props.placeholder}
        className={`
          w-full 
          bg-navy/50 
          border 
          rounded-2xl 
          py-4 
          px-6 
          text-white 
          placeholder:text-slate/30 
          focus:outline-none 
          transition-all 
          shadow-inner
          resize-none
          ${fieldState.error 
            ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
            : 'border-white/10 focus:border-mint/50 shadow-[0_0_15px_rgba(76,201,138,0.1)]'
          }
        `}
      />
      {fieldState.error && (
        <p className="text-red-400 text-xs ml-2 mt-1 italic">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
