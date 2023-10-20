import { create } from "zustand";
import { User } from "../types";

//loading 
export const useIsLoadingStore = create((set) => ({
  isLoading: false,
  changeIsLoading: (status: boolean) => set((state: any) => ({ isLoading: status })),
}))

export const useTextEffect = create((set) => ({
  effectIndex: -1,
  setEffectIndex: (index: number) => set(() => ({ effectIndex: index })),
}));

export const useUserInfor = create((set) => ({
  user: false,
  setUser: (data: User | boolean) => set(() => ({ user: data })),
}));

//settings
export const useSaveData = create((set) => ({
  saveData: true,
  setSavedData: (status: boolean) => set(() => ({ saveData: status })),
}));