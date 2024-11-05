import { create } from 'zustand';
import type { TbtItem } from '@/types/pagespeed';

interface PageSpeedState {
  tbts1: TbtItem[];
  tbts2: TbtItem[];
  displayName1: string;
  displayName2: string;
  addTbt1: (tbt: TbtItem) => void;
  addTbt2: (tbt: TbtItem) => void;
  setTbts1: (tbts: TbtItem[]) => void;
  setTbts2: (tbts: TbtItem[]) => void;
  setDisplayName1: (name: string) => void;
  setDisplayName2: (name: string) => void;
  resetTbts: () => void;
}

export const usePageSpeedStore = create<PageSpeedState>((set) => ({
  tbts1: [],
  tbts2: [],
  displayName1: 'URL 1',
  displayName2: 'URL 2',
  addTbt1: (tbt) => set((state) => {
    const isExist = state.tbts1.find(item => item.timeStamp === tbt.timeStamp);
    if (isExist) return state;
    return { tbts1: [...state.tbts1, tbt] };
  }),
  addTbt2: (tbt) => set((state) => {
    const isExist = state.tbts2.find(item => item.timeStamp === tbt.timeStamp);
    if (isExist) return state;
    return { tbts2: [...state.tbts2, tbt] };
  }),
  setTbts1: (tbts) => set({ tbts1: tbts }),
  setTbts2: (tbts) => set({ tbts2: tbts }),
  setDisplayName1: (name) => set({ displayName1: name }),
  setDisplayName2: (name) => set({ displayName2: name }),
  resetTbts: () => set({ tbts1: [], tbts2: [] }),
})); 