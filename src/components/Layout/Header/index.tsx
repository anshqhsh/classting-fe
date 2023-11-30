import Typography from '@/components/Typography';
import styles from './header.module.scss';

function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.filters}>
        <Typography className={styles.title} variant="title">
          QUIZ
        </Typography>
      </div>
    </header>
  );
}

export default Header;
