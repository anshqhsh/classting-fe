import { render, screen } from '@testing-library/react';
import useQuizStore from '@/store/useQuizStore';
import ResultPage from '@/pages/result';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();

jest.mock('@/store/useQuizStore', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ResultPage', () => {
  it('renders correctly', () => {
    (useQuizStore as unknown as jest.Mock).mockReturnValue({
      quizList: [
        // ... 퀴즈 목록 데이터 ...
      ],
      timerValue: 4,
      quizProgress: {
        currentQuizIdx: 2,
        answers: [false, false],
      },
    });

    render(<ResultPage />);

    expect(screen.getByText('소요시간')).toBeInTheDocument();
    expect(screen.getByText('정답 갯수')).toBeInTheDocument();
    expect(screen.getByText('오답 수')).toBeInTheDocument();
    expect(screen.getByText('정답 비율')).toBeInTheDocument();
    expect(screen.getByText('다시 풀기')).toBeInTheDocument();
    expect(screen.getByText('오답 노트')).toBeInTheDocument();
  });
});
