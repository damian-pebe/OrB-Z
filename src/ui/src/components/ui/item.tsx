import * as React from "react";

interface GlassContainerProps {
  label: string;
  onClick?: () => void;
  className?: string;
}
interface GlassContainerPropsIcon {
  label: string;
  onClick?: () => void;
  icon: React.ReactNode;
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


function IconItemOption({
  label,
  onClick = () => {},
  icon,
  className = "",
}: GlassContainerPropsIcon) {
  return (
    <button
      onClick={onClick}
      className={`${className} backdrop-blur-md border border-white/20 shadow-lg hover:-translate-y-1 transition-all duration-700 hover:cursor-pointer hover:shadow-black/30 rounded-xl p-1 px-5 font-dancing w-full text-center text-md my-3 flex justify-center items-center gap-2 group`}
    >
      <span className="transform transition-transform duration-700 group-hover:-translate-x-2 ">
        {label}
      </span>
      <span className="transform transition-transform duration-700 group-hover:translate-x-2 group-hover:-rotate-360">
        {icon}
      </span>
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

export { ItemOption, CustomItemOption, IconItemOption };
