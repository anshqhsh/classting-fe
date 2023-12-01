import { IQuizList } from '@/types/quiz';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IWrongQuizList extends IQuizList {
  selectAnswer: string;
  created_at: number;
  solved_at: number;
}
export interface IWrongQuizAddMemoList extends IWrongQuizList {
  memo: string;
}

interface IQuizAnswerNoteStore {
  wrongQuizList: IWrongQuizAddMemoList[];
  setQuizList: (wrongQuiz: IWrongQuizList) => void;
  updateMemo: (solvedAt: number, newMemo: string) => void;
  removeQuiz: (solvedAt: number) => void;
}

const useAnswerNoteStore = create(
  persist<IQuizAnswerNoteStore>(
    (set, get) => ({
      wrongQuizList: [],
      setQuizList: (wrongQuiz) => {
        const addedMemoWrongQuizList = {
          ...wrongQuiz,
          memo: '',
        };
        const newWrongQuiz = [...get().wrongQuizList, addedMemoWrongQuizList];
        set({ wrongQuizList: newWrongQuiz });
      },
      updateMemo: (solvedAt, newMemo) => {
        const updatedWrongQuizList = get().wrongQuizList.map((quiz) =>
          quiz.solved_at === solvedAt ? { ...quiz, memo: newMemo } : quiz
        );
        set({ wrongQuizList: updatedWrongQuizList });
      },
      removeQuiz: (solvedAt) => {
        const filteredWrongQuizList = get().wrongQuizList.filter(
          (quiz) => quiz.solved_at !== solvedAt
        );
        set({ wrongQuizList: filteredWrongQuizList });
      },
    }),
    {
      name: 'quiz-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useAnswerNoteStore;
