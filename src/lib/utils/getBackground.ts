import type { ThemeVariant } from "../../ui/src/stores/useThemeStore";

const themeBackgrounds: Record<ThemeVariant, string> = {
  light: "/background.png",
  dark: "/background.png", // Using default background for now
  ocean: "/background.png", // Using default background for now
  forest: "/background.png", // Using default background for now
  sunset: "/background.png", // Using default background for now
  purple: "/background.png", // Using default background for now
  rose: "/background.png", // Using default background for now
};

export default function getBackground(theme: ThemeVariant = "light") {
  return themeBackgrounds[theme] || themeBackgrounds.light;
}
