import { IQuizList } from '@/types/quiz';
import { create } from 'zustand';

interface IQuizProgress {
  currentQuizIdx: number;
  answers: boolean[];
}

interface IQuizStore {
  quizList: IQuizList[];
  setQuizList: (list: IQuizList[]) => void;
  timerValue: number;
  setTimerValue: () => void;
  quizProgress: IQuizProgress;
  setQuizProgress: (answer: boolean) => void;
}

const useQuizStore = create<IQuizStore>((set, get) => ({
  quizList: [],
  setQuizList: (list: IQuizList[]) => set({ quizList: list }),
  timerValue: 0,
  setTimerValue: () => set({ timerValue: get().timerValue + 1 }),
  quizProgress: { currentQuizIdx: 0, answers: [] },
  setQuizProgress: (answer) => {
    const currentProgress = get().quizProgress;
    const newAnswers = [...currentProgress.answers, answer];
    const nextIndex = currentProgress.currentQuizIdx + 1;
    set({
      quizProgress: {
        currentQuizIdx: nextIndex,
        answers: newAnswers,
      },
    });
  },
}));

export default useQuizStore;
