import { ReactNode } from 'react';

export interface ISliderTabProps<T> {
  data: T[];
  bodyRender?: (elem: T) => ReactNode;
}
