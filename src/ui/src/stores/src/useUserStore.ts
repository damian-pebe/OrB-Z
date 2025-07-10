import { create } from "zustand";

interface UserStore {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (value) => set({ isLoggedIn: value }),
  logout: () => set({ isLoggedIn: false }),
}));

