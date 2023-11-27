/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import Typography from '@/components/Typography';
import styles from './button.module.scss';

interface IProps {
  type?: 'submit' | 'reset' | 'button';
  variant?: 'primary' | 'secondary';
  isActived?: boolean;
  gap?: number;
  [x: string]: any;
}

function Button({
  children,
  type = 'button',
  variant = 'primary',
  isActived = true,
  gap = 8,
  ...restProps
}: PropsWithChildren<IProps>) {
  const buttonClassName = classNames(
    styles.button,
    variant === 'primary' ? styles.primary : styles.secondary,
    isActived && styles.actived
  );

  const style = {
    gap: `${gap}px`,
  };

  return (
    <button className={buttonClassName} style={style} type={type} {...restProps}>
      <Typography variant="title">{children}</Typography>
    </button>
  );
}

export default Button;
