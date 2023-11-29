import { create } from 'zustand';

interface IQuizList {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface IQuizStore {
  quizList: IQuizList[];
  setQuizList: (list: IQuizList[]) => void;
}

const useQuizStore = create<IQuizStore>((set) => ({
  quizList: [],
  setQuizList: (list: IQuizList[]) => set({ quizList: list }),
}));

export default useQuizStore;
