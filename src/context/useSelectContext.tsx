/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, createContext, useContext } from 'react';

export type Action = { type: 'ADD_ITEM'; payload: any } | { type: 'REMOVE_ITEM'; payload: any };

// State 타입 정의
export type State = any[];

export interface IContextProps {
  // select Open 상태
  open: boolean;
  onOpenChange: () => void;
  // 선택된 index관련
  selectedIndex: number;
  setIndex: (idx: number) => void;
  // 배열 데이터
  list: State;
  dispatch: Dispatch<Action>;
}

const SelectContext = createContext({} as IContextProps);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (context === undefined) {
    throw new Error('useSelectContext must be used within a SelectContextProvider');
  }
  return context;
}

export { SelectContext, useSelectContext };
