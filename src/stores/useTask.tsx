import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Tasks {
  offset: number;
  setoffset: (num: number) => void;
}

export const useTaskStore = create<Tasks>()(
  persist(
    (set) => ({
      offset: 0,
      setoffset: (num: number) => set({ offset: num }),
    }),

    { name: 'tasks-storage' },
  ),
);
