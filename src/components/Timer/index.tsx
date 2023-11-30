import { useEffect } from 'react';
import { convertSecToSecOrMinText } from '@/utils';
import useQuizStore from '@/store/useQuizStore';
import styles from './timer.module.scss';
import Typography from '../Typography';

function Timer() {
  const timerValue = useQuizStore((state) => state.timerValue);
  const setTimerValue = useQuizStore((state) => state.setTimerValue);

  useEffect(() => {
    const id = setInterval(() => {
      setTimerValue();
    }, 1000); // 1000ms마다 호출

    return () => clearInterval(id);
  }, [setTimerValue]);

  return (
    <div className={styles.container}>
      <Typography className={styles.text} variant="body1">
        {`경과 시간: ${convertSecToSecOrMinText(timerValue)}`}
      </Typography>
    </div>
  );
}

export default Timer;
