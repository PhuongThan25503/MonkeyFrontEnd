import { create } from "zustand";
import { StoryData } from "../types";

//loading 
export const useIsLoadingStore = create((set) => ({
  isLoading: false,
  changeIsLoading: () => set((state: any) => ({ isLoading: !state.isLoading })),
}))

export const useTextEffect = create((set) => ({
  effectIndex: -1,
  setEffectIndex: (index: number) => set(() => ({ effectIndex: index })),
}));

export const useAnimatedHighlight = create((set) => ({
  effectOn: false,
  setAnimatedOn: (status: boolean) => set(() => ({ effectOn: status})),
}));

export const useLastPage = create((set) => ({
  isLastPage: false,
  setIsLastPage: (status: boolean) => set(() => ({ effectOn: status})),
}));

export const useStory = create((set) => ({
  storyNumPage: 0,
  currentPageNum: 0,
  setCurrentPageNum: (num: number) => set(() => ({ currentPageNum: num})),
  setStoryNumPage: (num: number) => set(() => ({ storyNumPage: num})),
}));
