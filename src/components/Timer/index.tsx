import { useEffect, useState } from 'react';
import { convertSecToSecOrMinText } from '@/utils';
import styles from './timer.module.scss';
import Typography from '../Typography';

// import { convertMsToSecOrMin } from '@/utils/time';
// import { useResultFeedbackStore } from '@/zustand/gugudanStore';

interface IProps {
  isStopped?: boolean;
  onTimeout?: () => void;
}

function Timer({ isStopped = false, onTimeout }: IProps) {
  const [count, setCount] = useState(0);
  // const count = useResultFeedbackStore((state) => state.totalTime);
  // const incrementCount = useResultFeedbackStore((state) => state.setTotalTime);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((_count) => _count + 1);
    }, 1000); // 1000ms마다 호출

    if (isStopped) {
      clearInterval(id);
      if (onTimeout) {
        onTimeout();
      }
    }

    return () => clearInterval(id);
  }, [isStopped, onTimeout]);

  return (
    <div className={styles.container}>
      <Typography className={styles.text} variant="body1">
        {`경과 시간: ${convertSecToSecOrMinText(count)}`}
      </Typography>
    </div>
  );
}

export default Timer;
