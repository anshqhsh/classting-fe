import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPage from '@/pages';
import { getQuizApi } from '@/service/quiz';

jest.mock('@/service/quiz', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    results: [
      {
        type: 'type',
        difficulty: 'difficulty',
        category: 'category',
        question: 'question',
        correct_answer: 'correct_answer',
        incorrect_answers: ['answer'],
      },
    ],
  }),
}));

// Mock useNavigate and useQuizStore
const mockNavigate = jest.fn();
const mockSetQuizList = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('@/store/useQuizStore', () => () => ({
  setQuizList: mockSetQuizList,
}));

describe('MainPage', () => {
  it('renders MainPage component', () => {
    render(<MainPage />);
    expect(screen.getByText('퀴즈 풀기')).toBeInTheDocument();
  });

  it('calls getQuizApi and updates state on button click', async () => {
    render(<MainPage />);
    fireEvent.click(screen.getByText('퀴즈 풀기'));

    // getQuizApi의 호출을 기다립니다.
    await waitFor(() => {
      expect(getQuizApi).toHaveBeenCalled();
    });

    // setQuizList가 올바른 인자로 호출되었는지 확인합니다.
    expect(mockSetQuizList).toHaveBeenCalledWith([
      {
        type: 'type',
        difficulty: 'difficulty',
        category: 'category',
        question: 'question',
        correct_answer: 'correct_answer',
        incorrect_answers: ['answer'],
      },
    ]);
    expect(mockNavigate).toHaveBeenCalledWith('/quiz');
  });
});
