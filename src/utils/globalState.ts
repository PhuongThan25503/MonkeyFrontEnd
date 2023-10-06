import { create } from "zustand";

//loading 
export const useIsLoadingStore = create((set) => ({
  isLoading: false,
  changeIsLoading: () => set((state: any) => ({ isLoading: !state.isLoading })),
}))

export const useTextEffect = create((set) => ({
  effectIndex: -1,
  setEffectIndex: (index: number) => set(() => ({ effectIndex: index })),
}));