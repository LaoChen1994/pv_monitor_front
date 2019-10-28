import { FC } from 'react';

interface ICount {
  count: number;
}

export interface ICommonApiInterface<T> {
  status: 200 | 404 | 500 | 301 | 302;
  statusText: string;
  data: T;
}

export type plotData = [number, number];

export interface IPlotCurve {
  temperature: number;
  irradiance: number;
  plot_data: plotData[];
  work_status: string;
  pk: number; // 曲线id
}

export type TGetPlotCurve = (
  curveId: number
) => Promise<ICommonApiInterface<IPlotCurve>>;
export type GetMoDataNumber = (
  moduleType: string
) => Promise<ICommonApiInterface<ICount>>;

export interface INavItem {
  urlMatch: string;
  isExact: boolean;
  component: FC;
  name: string;
}
