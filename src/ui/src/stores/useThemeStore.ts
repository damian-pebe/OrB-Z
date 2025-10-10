import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeVariant =
  | "light"
  | "dark"
  | "ocean"
  | "forest"
  | "sunset"
  | "purple"
  | "rose";

interface ThemeStore {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme: ThemeVariant) => {
        set({ theme });
        // Apply theme class to document
        document.documentElement.className = theme === "light" ? "" : theme;
      },
      toggleDarkMode: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        get().setTheme(newTheme);
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme on hydration
          document.documentElement.className =
            state.theme === "light" ? "" : state.theme;
        }
      },
    }
  )
);

export const themes: Record<
  ThemeVariant,
  { name: string; description: string }
> = {
  light: {
    name: "Light",
    description: "Clean and minimal light theme",
  },
  dark: {
    name: "Dark",
    description: "Easy on the eyes dark theme",
  },
  ocean: {
    name: "Ocean",
    description: "Deep blue oceanic theme",
  },
  forest: {
    name: "Forest",
    description: "Natural green forest theme",
  },
  sunset: {
    name: "Sunset",
    description: "Warm orange and pink sunset theme",
  },
  purple: {
    name: "Purple",
    description: "Rich purple and violet theme",
  },
  rose: {
    name: "Rose",
    description: "Elegant pink and rose theme",
  },
};
