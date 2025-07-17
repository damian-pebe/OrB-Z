import * as React from "react";

interface GlassContainerProps {
  label: string;
  onClick?: () => void;
  className?: string;
}
interface GlassContainerPropsCustom {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

function ItemOption({
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

function CustomItemOption({
  onClick = () => {},
  className = "",
  children
}: GlassContainerPropsCustom) {
  return (
    <button
      onClick={onClick}
      className={`${className} backdrop-blur-md border border-white/20 shadow-lg hover:-translate-y-1 transition-all duration-700 hover:cursor-pointer hover:shadow-black/30 rounded-xl p-1 font-dancing w-full text-center text-md my-3`}
    >
      {children}
    </button>
  );
}

export { ItemOption, CustomItemOption };
