import Typography from '@/components/Typography';
import Timer from '@/components/Timer';

import { useLocation } from 'react-router-dom';
import styles from './header.module.scss';

function Header() {
  const location = useLocation();
  const showTimer = location.pathname === '/quiz';

  return (
    <header className={styles.container}>
      <Typography className={styles.title} variant="title">
        QUIZ
      </Typography>
      {showTimer && <Timer />}
    </header>
  );
}

export default Header;
