interface GlassContainerProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function ItemOption({
  label,
  onClick = () => {},
  className = "",
}: GlassContainerProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} backdrop-blur-md border border-white/20 shadow-lg hover:-translate-y-1 transition-all duration-700 hover:cursor-pointer hover:shadow-black/30 rounded-xl p-1 font-dancing w-full text-center text-md my-3`}
    >
      {label}
    </button>
  );
}
