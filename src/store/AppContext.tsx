import { useContext, createContext } from 'react';
import { IAppContext } from '../interface';

export const AppContext = createContext<IAppContext>({});

export const useAppContext = () => {
  return useContext(AppContext);
};
