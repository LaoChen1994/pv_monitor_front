import { FC } from 'react';
import { IBreadcrumbItemProps } from 'zent';
import { FullLngLatPos } from 'react-amap';
import { string } from 'prop-types';

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

export interface ITableSearchInfo {
  date: number;
  data_type: boolean;
  id: number;
  isNew: boolean;
}

export interface ITableSearchWithNumber {
  data: ITableSearchInfo[];
  totalNumber: number;
}

export type TGetPlotCurve = (
  curveId: number
) => Promise<ICommonApiInterface<IPlotCurve>>;

export type GetMoDataNumber = (
  moduleType: string
) => Promise<ICommonApiInterface<ICount>>;

export interface ISearchGridProp {
  searchDataset: ITableSearchInfo[];
  handlePageChange: (current: number) => void;
  pageInfo: IPageInfo;
  pageLink?: (current: number) => void;
}

export type TGetTableInfo = (
  start: number,
  end: number,
  low?: number,
  high?: number,
  mode?: number
) => Promise<ICommonApiInterface<ITableSearchWithNumber>>;

export interface IPageInfo {
  current: number;
  pageSize: number;
  totalItem: number;
}

export interface INavItem {
  urlMatch: string;
  isExact: boolean;
  component: FC<any>;
  name: string;
}

export interface IContact {
  iconName: string;
  name: string;
  url?: string;
}

export interface ISearchFormData {
  mode: string;
  timeRange: string[];
}

export interface IRadioType {
  value: string;
  name: string;
}

export interface IAppContext {
  handleNavChange?: (index: number) => () => void;
  addNewBreads?: (bread: IBreadcrumbItemProps) => void;
}

export interface IMyMapProps {
  center?: FullLngLatPos;
  setCenter?: React.Dispatch<React.SetStateAction<FullLngLatPos>>;
}

export interface IMyItemsProps {
  label: string;
  content?: string;
  hasColon?: boolean;
  bodyRender?: () => React.ReactElement;
}

export type ITransKeys<T> = {
  readonly [P in keyof T]?: string;
};

export type TAEC<T> = keyof T;

export interface IDataWithOrg<T> {
  value: T;
  org: 'W' | 'A' | 'V';
}

export interface IKeyValueOnCurves {
  Voc: IDataWithOrg<number>;
  Isc: IDataWithOrg<number>;
  Pmpp: IDataWithOrg<number>;
  Vmpp: IDataWithOrg<number>;
  Impp: IDataWithOrg<number>;
}
