import { create } from "zustand";

interface UserStore {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (value) => set({ isLoggedIn: value }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useUserStore;
