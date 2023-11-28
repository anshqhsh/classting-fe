import { Children, Dispatch, ReactNode, useEffect, useRef } from 'react';

import classNames from 'classnames';
import { useSelectContext } from '@/context/useSelectContext';
import SelectContextProvider from '@/context/SelectContextProvider';
import styles from './select.module.scss';

import Ul from './Ul';
import Typography from '../Typography';

function Select({
  children,
  setValue,
}: {
  children: ReactNode;
  setValue: Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <SelectContextProvider setValue={setValue}>
      <div className={styles.selectContainer}>{children}</div>
    </SelectContextProvider>
  );
}

Select.Trigger = function SelectTrigger({ children }: { children: ReactNode }) {
  const { onOpenChange } = useSelectContext();

  return (
    <button type="button" className={styles.selectTrigger} onClick={onOpenChange}>
      {children}
    </button>
  );
};

Select.ItemUl = function SelectTrigger({ children }: { children: ReactNode }) {
  const { open, onOpenChange, selectedIndex, setIndex } = useSelectContext();

  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (open && ulRef.current) {
      ulRef.current.focus();
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const length = Children.count(children);

    if (e.key === 'ArrowDown') {
      setIndex((selectedIndex + 1) % length);
    } else if (e.key === 'ArrowUp') {
      setIndex((selectedIndex - 1 + length) % length);
    }

    if (e.key === 'Enter' || e.key === ' ') {
      onOpenChange();
    }
  };

  const renderUi = () => {
    return open ? (
      <Ul ref={ulRef} onInteractOutside={onOpenChange} onKeyDown={handleKeyDown} open={open}>
        {children}
      </Ul>
    ) : null;
  };
  return <>{renderUi()}</>;
};

Select.Item = function SelectItem({ value, index }: { value: string; index: number }) {
  const { onOpenChange, selectedIndex, setIndex, dispatch } = useSelectContext();

  useEffect(() => {
    dispatch({ type: 'ADD_ITEM', payload: { value } });

    return () => {
      dispatch({ type: 'REMOVE_ITEM', payload: value });
    };
  }, [dispatch, value]);

  const onClickItem = () => {
    setIndex(index);
    onOpenChange();
  };

  const isActive = selectedIndex === index;
  return (
    <li className={isActive ? classNames(styles.selectItem, styles.active) : styles.selectItem}>
      <button className={styles.button} type="button" onClick={onClickItem}>
        <Typography variant="button">{value}</Typography>
      </button>
    </li>
  );
};

export default Select;
