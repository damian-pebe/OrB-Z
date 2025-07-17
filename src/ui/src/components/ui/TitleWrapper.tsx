import * as React from "react";

interface GlassContainerProps {
  children: React.ReactNode;
  label: string;
  className?: string;
  lineClassName?: string;
}

export default function TitleWrapper({
  children,
  label,
  className = "",
  lineClassName = "",
}: GlassContainerProps) {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      <div>{label}</div>
      <div className={`${lineClassName} h-0.5 bg-white/20 w-full mb-5 mt-1 `} />
      {children}
    </div>
  );
}
