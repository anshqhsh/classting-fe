import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './stack.module.scss';

interface IProps {
  gap?: number;
  className?: string;
}

function Stack({ className, gap, children }: PropsWithChildren<IProps>) {
  const style = {
    gap: `${gap || 8}px`,
  };
  const conbinedClassName = classNames(styles.container, className);
  return (
    <div className={conbinedClassName} style={style}>
      {children}
    </div>
  );
}

export default Stack;
