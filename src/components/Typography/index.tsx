import { PropsWithChildren } from 'react';

import classNames from 'classnames';
import styles from './typography.module.scss';

interface IProps {
  tag?: keyof JSX.IntrinsicElements;
  variant: 'heading' | 'body1' | 'body2' | 'body3' | 'title' | 'button' | 'label' | 'main';
  className?: string;
}

function Typography({
  tag = 'p',
  variant = 'body1',
  className,
  children,
}: PropsWithChildren<IProps>) {
  const getComponentAndClassName = (): [keyof JSX.IntrinsicElements, string] => {
    const defaultComponent = {
      heading: 'h1',
      body1: 'p',
      body2: 'p',
      body3: 'p',
      title: 'p',
      button: 'p',
      label: 'p',
      main: 'p',
    }[variant];

    return [
      tag || defaultComponent, // 외부에서 제공된 tag를 사용하거나 기본값 사용
      styles[variant],
    ];
  };

  const [Component, defaultClassName] = getComponentAndClassName();

  const combinedClassName = classNames(defaultClassName, className);

  return <Component className={combinedClassName}>{children}</Component>;
}

export default Typography;
