import { FC } from 'react';
import { IBreadcrumbItemProps } from 'zent';
import { FullLngLatPos } from 'react-amap';

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

export interface IToken {
  token: string;
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

export type TGetToken = () => Promise<ICommonApiInterface<IToken>>;

export interface ISearchGridProp {
  searchDataset: ITableSearchInfo[];
  handlePageChange: (current: number) => void;
  pageInfo: IPageInfo;
  pageLink?: (current: number) => void;
}

export type TFaultTypes = 'normal' | 'partial shadow_1';

export interface TDetailFault {
  normal: string;
  'partial shadow_1': string;
  'partial shadow_2': string;
  'partial shadow_3': string;
  'short circuit_1': '短路故障 1';
  'short circuit_2': '短路故障 2';
  degradation_1: '老化故障 1';
  degradation_2: '老化故障 2';
  open_circuit: '开路故障';
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

export interface IMyCurSelFormParam {
  curveId: number;
  lowTemp: number;
  highTemp: number;
  lowIrr: number;
  highIrr: number;
  faultType: keyof TDetailFault;
  dataType: number;
}

export interface ICommonFormProps {
  name: string;
  label?: string;
  _onChange?: (name: string, value: any) => void;
  hasColon?: boolean;
  layout?: 'horizontal' | 'vertical';
  align?: 'center' | 'start' | 'end';
}

export interface ICurveQuantWithFault {
  total: number;
  faultNumber: {
    trueData: boolean;
    fault_type: keyof TDetailFault;
    count: number;
    faultId: number;
  }[];
  expDataCount: number;
  simDataCount: number;
}

export type TGetCurvesQuantity = () => Promise<
  ICommonApiInterface<ICurveQuantWithFault>
>;
