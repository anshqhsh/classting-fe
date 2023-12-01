/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import useQuizStore from '@/store/useQuizStore';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/Buttons/Button';
import Stack from '@/components/Stack';
import { shuffleArray } from '@/utils';
import LoadingUI from '@/components/LoadingUI';
import Typography from '@/components/Typography';
import useAnswerNoteStore from '@/store/useAnswerNoteStore';
import styles from './quiz.module.scss';

function QuizPage() {
  const quizList = useQuizStore((state) => state.quizList);
  const quizProgress = useQuizStore((state) => state.quizProgress);
  const setQuizProgress = useQuizStore((state) => state.setQuizProgress);

  const setNoteQuizList = useAnswerNoteStore((state) => state.setQuizList);

  const [createdAt, setCreatedAt] = useState<number>();
  const [isShowNextButton, setIsShowNextButton] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<{ answer: boolean; selectAnswer: string }>();

  // 현재 문제 시간 설정
  useEffect(() => {
    setCreatedAt(Date.now());
  }, []);

  useEffect(() => {
    if (currentAnswer) {
      setIsShowNextButton(true);
    } else {
      setIsShowNextButton(false);
    }
  }, [currentAnswer]);

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

  const onClickAnswer = () => {
    if (!currentAnswer) return;

    const { answer, selectAnswer } = currentAnswer;
    const nextIndex = quizProgress.currentQuizIdx + 1;

    if (nextIndex >= quizList.length) {
      navigate('/result');
    }

    setQuizProgress(answer);
    if (answer) {
      setCurrentAnswer(undefined);
      return toast.success('정답입니다.');
    }
    // 틀린정답을 고른 경우
    const wrongAnswer = {
      ...quizList[quizProgress.currentQuizIdx],
      selectAnswer,
      created_at: createdAt || 0,
      solved_at: Date.now() || 0,
    };

    setNoteQuizList(wrongAnswer);
    setCurrentAnswer(undefined);
    return toast.success('오답입니다.');
  };

  if (quizList.length === 0 || quizProgress.currentQuizIdx >= quizList.length)
    return <LoadingUI type="center" />;

  return (
    <div className={styles.container}>
      <Typography variant="title">{`Q.${quizProgress.currentQuizIdx + 1}`}</Typography>
      <div className={styles.questionWrapper}>
        <Typography variant="main">
          {atob(quizList[quizProgress.currentQuizIdx].question)}
        </Typography>
      </div>
      <Stack>
        {quizAnswers.map((v) => (
          <Button
            key={v.text}
            isActived={currentAnswer?.selectAnswer === v.text}
            onClick={() => {
              const current = {
                answer: v.isCorrect,
                selectAnswer: v.text,
              };
              setCurrentAnswer(current);
            }}
          >
            {atob(v.text)}
          </Button>
        ))}
      </Stack>
      {isShowNextButton && (
        <div className={styles.nextButtonWrapper}>
          <Button variant="secondary" onClick={onClickAnswer}>
            다음 문제
          </Button>
        </div>
      )}
    </div>
  );
}
export default QuizPage;
