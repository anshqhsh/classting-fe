import { IQuizList } from '@/types/quiz';
import { create } from 'zustand';

interface IQuizStore {
  quizList: IQuizList[];
  setQuizList: (list: IQuizList[]) => void;
}

const useQuizStore = create<IQuizStore>((set) => ({
  quizList: [],
  setQuizList: (list: IQuizList[]) => set({ quizList: list }),
}));

export default useQuizStore;
