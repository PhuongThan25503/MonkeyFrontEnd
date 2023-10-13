import { create } from "zustand";

//loading 
export const useIsLoadingStore = create((set) => ({
  isLoading: false,
  changeIsLoading: (status: boolean) => set((state: any) => ({ isLoading: status })),
}))

export const useTextEffect = create((set) => ({
  effectIndex: -1,
  setEffectIndex: (index: number) => set(() => ({ effectIndex: index })),
}));