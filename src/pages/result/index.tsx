import useQuizStore from '@/store/useQuizStore';
import { convertSecToSecOrMinText } from '@/utils';
import Stack from '@/components/Stack';
import Typography from '@/components/Typography';
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

  const { correctCount, incorrectCount, correctRatio, totalLength } = calculateResults(
    quizProgress.answers
  );

  return (
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
        <Typography variant="label">정오답 비율</Typography>
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
  );
}
export default ResultPage;
