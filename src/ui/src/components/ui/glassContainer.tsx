import * as React from "react";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

export default function GlassContainer({
  children,
  className = "",
  padding,
}: GlassContainerProps) {
  return (
    <div
      className={`backdrop-blur-xl border border-white/20 shadow-sm rounded-xl ${
        padding ?? "p-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
