import { IQuizList } from '@/types/quiz';
import { create } from 'zustand';

interface IQuizStore {
  quizList: IQuizList[];
  setQuizList: (list: IQuizList[]) => void;
  timerValue: number;
  setTimerValue: () => void;
}

const useQuizStore = create<IQuizStore>((set, get) => ({
  quizList: [],
  setQuizList: (list: IQuizList[]) => set({ quizList: list }),
  timerValue: 0,
  setTimerValue: () => set({ timerValue: get().timerValue + 1 }),
}));

export default useQuizStore;
