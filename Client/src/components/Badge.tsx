const Badge = ({ children }: { children: string }) => 
{
  return (
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
        mb-4">
      {children}
    </span>
  );
};

export default Badge;