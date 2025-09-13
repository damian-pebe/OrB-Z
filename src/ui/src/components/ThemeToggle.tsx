import { Moon, Sun, Palette } from "lucide-react";
import { type ThemeVariant } from "../stores/useThemeStore";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const quickThemes: ThemeVariant[] = [
    "light",
    "dark",
    "ocean",
    "forest",
    "sunset",
  ];

  const getThemeIcon = (currentTheme: ThemeVariant) => {
    switch (currentTheme) {
      case "light":
        return <Sun className="w-4 h-4" />;
      case "dark":
        return <Moon className="w-4 h-4" />;
      default:
        return <Palette className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        className="p-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-colors"
        title="Change theme"
      >
        {getThemeIcon(theme)}
      </button>

      {showThemeMenu && (
        <div className="absolute right-0 top-12 bg-card/90 backdrop-blur-lg border border-border rounded-lg shadow-lg p-2 min-w-[120px] z-50">
          {quickThemes.map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => {
                setTheme(themeOption);
                setShowThemeMenu(false);
              }}
              className={`
                w-full px-3 py-2 text-left rounded-md transition-colors text-sm capitalize
                ${
                  theme === themeOption
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-foreground"
                }
              `}
            >
              <div className="flex items-center space-x-2">
                {getThemeIcon(themeOption)}
                <span>{themeOption}</span>
              </div>
            </button>
          ))}
          <div className="border-t border-border my-1" />
          <button
            onClick={() => setShowThemeMenu(false)}
            className="w-full px-3 py-2 text-left rounded-md hover:bg-accent text-foreground text-sm"
          >
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>More themes...</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
