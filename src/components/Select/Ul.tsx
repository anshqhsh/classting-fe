import { KeyboardEventHandler, ReactNode, forwardRef, useEffect } from 'react';
import styles from './select.module.scss';

interface IProps {
  children: ReactNode;
  open: boolean;
  onInteractOutside: () => void;
  onKeyDown: KeyboardEventHandler<HTMLUListElement>;
}
const Ul = forwardRef<HTMLUListElement, IProps>(
  ({ children, open, onInteractOutside, onKeyDown }, ref) => {
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (ref && 'current' in ref && ref.current) {
          if (open && !ref.current.contains(e.target as Node)) {
            onInteractOutside();
          }
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onInteractOutside, open, ref]);

    return (
      <ul
        className={styles.ulContainer}
        role="listbox"
        onKeyDown={onKeyDown}
        ref={ref}
        tabIndex={0}
      >
        {children}
      </ul>
    );
  }
);

export default Ul;
