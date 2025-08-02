import { create } from "zustand";
import { persist } from "zustand/middleware";

type ScreenSource = {
  id: string;
  name: string;
};

type ScreenStore = {
  screenSources: ScreenSource[];
  addScreenSource: (source: ScreenSource) => void;
  clearScreenSources: () => void;
  getScreenSources: () => ScreenSource[];
  removeScreenSourceById: (id: string) => void;
};

export const useScreenStore = create<ScreenStore>()(
  persist(
    (set, get) => ({
      screenSources: [],
      addScreenSource: (source) => {
        const current = get().screenSources;
        const exists = current.some((s) => s.id === source.id);
        if (!exists) {
          set({ screenSources: [...current, source] });
        }
      },
      clearScreenSources: () => set({ screenSources: [] }),
      getScreenSources: () => get().screenSources,
      removeScreenSourceById: (id) => {
        const current = get().screenSources;
        set({ screenSources: current.filter((s) => s.id !== id) });
      },
    }),
    {
      name: "screen-sources-storage",
    }
  )
);
