import { Dispatch, ReactNode, useMemo, useReducer, useState } from 'react';
import { Action, SelectContext, State } from './useSelectContext';

function listReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'REMOVE_ITEM':
      return state.filter((item) => item.value !== action.payload);
    default:
      return state;
  }
}

function SelectContextProvider({
  children,
  setValue,
}: {
  children: ReactNode;
  setValue: Dispatch<React.SetStateAction<string>>;
}) {
  // useReducer를 사용하여 list 상태와 dispatch 함수 생성
  const [list, dispatch] = useReducer(listReducer, []);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const onOpenChange = () => {
    setOpen((_open) => !_open);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setIndex = (idx: number) => {
    const selectedValue = list[idx].value;
    setValue(selectedValue);
    setSelectedIndex(idx);
  };

  const selectValue = useMemo(
    () => ({
      open,
      onOpenChange,
      selectedIndex,
      setIndex,
      list,
      dispatch,
    }),
    [open, selectedIndex, setIndex, list]
  );

  return <SelectContext.Provider value={selectValue}>{children}</SelectContext.Provider>;
}
export default SelectContextProvider;
