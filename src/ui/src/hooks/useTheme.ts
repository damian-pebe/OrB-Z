import { useThemeStore } from "../stores/useThemeStore";

export function useTheme() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  return {
    theme,
    setTheme,
    toggleDarkMode,
    isDark: theme !== "light",
  };
}
