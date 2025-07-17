import * as React from "react";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassContainer({
  children,
  className = "",
}: GlassContainerProps) {
  return (
    <div
      className={`backdrop-blur-sm bg-white/3 border border-white/20 shadow-sm rounded-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}
