import useQuizStore from '@/store/useQuizStore';
import { convertSecToSecOrMinText } from '@/utils';
import Stack from '@/components/Stack';
import Typography from '@/components/Typography';
import Button from '@/components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import DoughnutChart from '../../components/Charts/DoughnetChart';
import styles from './resultPage.module.scss';

function calculateResults(answers: boolean[]) {
  const totalLength = answers.length;
  const correctCount = answers.filter((answer) => answer).length;
  const incorrectCount = totalLength - correctCount;
  const correctRatio = (correctCount / totalLength) * 100;
  const incorrectRatio = (incorrectCount / totalLength) * 100;

  return { totalLength, correctCount, incorrectCount, correctRatio, incorrectRatio };
}

function ResultPage() {
  const { timerValue, quizProgress } = useQuizStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (quizProgress.answers.length === 0) {
      toast.warning('잘못된 접근입니다.');
      navigate('/');
    }
  }, [navigate, quizProgress.answers.length]);

  const { correctCount, incorrectCount, correctRatio, totalLength } = calculateResults(
    quizProgress.answers
  );

  const onClickResolve = () => {
    navigate('/');
  };

  const onClickAnswerNote = () => {
    navigate('/answer-note');
  };

  return (
    <>
      <div className={styles.container}>
        <Stack className={styles.resultWrapper} gap={8}>
          <Typography variant="label">소요시간 </Typography>
          <Typography variant="main" className={styles.mainText}>
            {convertSecToSecOrMinText(timerValue)}
          </Typography>
          <Typography variant="label">정답 갯수</Typography>
          <Typography variant="main" className={styles.mainText}>
            {`${correctCount} 개`}
          </Typography>
          <Typography variant="label">오답 수 </Typography>
          <Typography variant="main" className={styles.mainText}>
            {`${incorrectCount} 개`}
          </Typography>
          <Typography variant="label">정답 비율</Typography>
          <Typography variant="main" className={styles.mainText}>
            {`${correctRatio} %`}
          </Typography>
        </Stack>
        <div className={styles.chartWrapper}>
          <DoughnutChart
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            totalLength={totalLength}
          />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button onClick={onClickResolve}>다시 풀기</Button>
        <Button onClick={onClickAnswerNote} variant="secondary">
          오답 노트
        </Button>
      </div>
    </>
  );
}
export default ResultPage;
