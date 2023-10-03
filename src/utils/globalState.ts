import { create } from "zustand";
  export interface IsLoadingStore {
    isLoading : boolean,
    changeIsLoading : () => void,
  }

  //loading 
  export const useIsLoadingStore = create<IsLoadingStore>((set) => ({
    isLoading : false,
    changeIsLoading : () => set((state : any) => ({ isLoading: !state.isLoading })),
  }))

  export const useTextEffect = create((set) => ({
    effectIndex: -1,
    setEffectIndex: (index:number) => set(() => ({ effectIndex: index })),
  }));