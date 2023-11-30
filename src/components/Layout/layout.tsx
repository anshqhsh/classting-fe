import { ReactNode } from 'react';
import Header from './Header';
import styles from './layout.module.scss';
import Divider from './Divider';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Header />
      <Divider size={1} />
      {children}
    </div>
  );
}

export default Layout;
