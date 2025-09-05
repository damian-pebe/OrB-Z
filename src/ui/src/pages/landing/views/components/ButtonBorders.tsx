interface ButtonBordersProps {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function ButtonBorders({
  label,
  onClick,
  className,
  disabled = false,
}: ButtonBordersProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative bg-black/0 py-2 px-8 text-center font-barlow inline-flex justify-center text-base uppercase rounded-lg border-solid transition-transform duration-700 ease-in-out group overflow-hidden ${
        disabled
          ? "text-gray-400 cursor-not-allowed pointer-events-none"
          : "text-white cursor-pointer"
      } ${className}`}
    >
      <span className="relative z-20">{label}</span>
      <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-700 ease-in-out" />
      <span className="w-1/2 drop-shadow-3xl transition-all duration-700 block border-white absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0" />
      <span className="w-1/2 drop-shadow-3xl transition-all duration-700 block border-white absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0" />
      <span className="w-1/2 drop-shadow-3xl transition-all duration-700 block border-white absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0" />
      <span className="w-1/2 drop-shadow-3xl transition-all duration-700 block border-white absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0" />
    </button>
  );
}
