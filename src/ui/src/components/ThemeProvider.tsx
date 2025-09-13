import { useEffect } from "react";
import { useThemeStore } from "../stores/useThemeStore";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Apply theme class to document element
    const root = document.documentElement;

    // Remove all theme classes first
    root.classList.remove(
      "dark",
      "ocean",
      "forest",
      "sunset",
      "purple",
      "rose"
    );

    // Apply current theme class (light theme has no class)
    if (theme !== "light") {
      root.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
}
