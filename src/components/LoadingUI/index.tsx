import React from 'react';
import styles from './loadingUI.module.scss';

function LoadingUI({ type = 'center' }: { type: 'center' | 'component' }) {
  if (type === 'center') {
    return (
      <div className={styles.container}>
        <div className={styles.icon} />
      </div>
    );
  }
  return (
    <div className={styles.componentContainer}>
      <div className={styles.icon} />
    </div>
  );
}

export default LoadingUI;
