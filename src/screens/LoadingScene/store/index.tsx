import { create } from "zustand";

export const useIsDownloaded = create((set) => ({
  isDownloaded: false,
  setIsDownloaded: (status: boolean) => set(() => ({ isDownloaded: status})),
}));
