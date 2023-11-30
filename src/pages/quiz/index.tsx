/* eslint-disable camelcase */
import useQuizStore from '@/store/useQuizStore';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/Buttons/Button';
import Stack from '@/components/Stack';
import { shuffleArray } from '@/utils';
import LoadingUI from '@/components/LoadingUI';
import styles from './quiz.module.scss';

function QuizPage() {
  const quizList = useQuizStore((state) => state.quizList);
  const [quizProgress, setQuizProgress] = useState<{ currentQuizIdx: number; answers: boolean[] }>({
    currentQuizIdx: 0,
    answers: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (quizList.length === 0) {
      toast.warning('잘못된 접근입니다.');
      navigate('/');
    }
  }, [navigate, quizList.length]);

  const quizAnswers = useMemo(() => {
    // quizList가 비어있거나 currentQuizIdx가 범위를 벗어난 경우 빈 배열을 반환
    if (!quizList || quizList.length === 0 || quizProgress.currentQuizIdx >= quizList.length) {
      return [];
    }

    const { currentQuizIdx } = quizProgress;
    const { incorrect_answers, correct_answer } = quizList[currentQuizIdx];
    const getIncorrectAnswers = incorrect_answers.map((v) => ({ text: v, isCorrect: false }));
    const answers = [...getIncorrectAnswers, { text: correct_answer, isCorrect: true }];

    return shuffleArray(answers);
  }, [quizList, quizProgress]);

  const onClickAnswer = (answer: boolean) => {
    const nextIndex = quizProgress.currentQuizIdx + 1;

    if (nextIndex >= quizList.length) {
      navigate('/result');
    }

    setQuizProgress((_prev) => {
      const newAnswers = [..._prev.answers, answer];
      return {
        currentQuizIdx: nextIndex,
        answers: newAnswers,
      };
    });
    if (answer) {
      return toast.success('정답입니다.');
    }
    return toast.success('오답입니다.');
  };

  if (quizList.length === 0 || quizProgress.currentQuizIdx >= quizList.length)
    return <LoadingUI type="center" />;

  return (
    <div className={styles.container}>
      <div className={styles.questionWrapper}>
        {atob(quizList[quizProgress.currentQuizIdx].question)}
      </div>
      <Stack>
        {quizAnswers.map((v) => (
          <Button key={v.text} onClick={() => onClickAnswer(v.isCorrect)}>
            {atob(v.text)}
          </Button>
        ))}
      </Stack>
    </div>
  );
}
export default QuizPage;
