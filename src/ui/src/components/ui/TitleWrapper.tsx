import * as React from "react";
import Separator from "./separator";

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
      <Separator className={lineClassName} />
      {children}
    </div>
  );
}
