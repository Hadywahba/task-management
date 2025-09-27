import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Tasks {
  offset: number;
  setoffset: (num: number) => void;
  selectedCategory: number | null;
  setSelectedCategory: (numb: number | null) => void;
  taskid: number;
  setTaskId: (num: number) => void;
}

export const useTaskStore = create<Tasks>()(
  persist(
    (set) => ({
      offset: 0,
      setoffset: (num: number) => set({ offset: num }),
      selectedCategory: null,
      setSelectedCategory: (numb: number | null) =>
        set({ selectedCategory: numb }),
      taskid: 0,
      setTaskId: (num: number) => set({ taskid: num }),
    }),

    { name: 'tasks-storage' },
  ),
);
