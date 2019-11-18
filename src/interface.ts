import { FC } from 'react';
import { IBreadcrumbItemProps } from 'zent';
import { FullLngLatPos } from 'react-amap';
import { faultTypes } from './constant';

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

export interface IAccItem {
  mean: number;
  std: number;
}

export interface IAccurateInfo {
  rmse: IAccItem;
  nrmse: IAccItem;
}

export interface IAccurateDataset {
  dataType: string;
  itemType: string;
  mean: number;
  std: number;
}

export interface IRange {
  xRange: [number, number];
  yRange: [number, number];
}

export interface IAccurateList {
  testSet: IAccurateInfo;
  trainSet: IAccurateInfo;
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

export type TGetModelingAccuracy = (
  module: string
) => Promise<ICommonApiInterface<{ accuracyList: IAccurateList }>>;

export interface ISearchGridProp {
  searchDataset: ITableSearchInfo[];
  handlePageChange: (current: number) => void;
  pageInfo: IPageInfo;
  pageLink?: (current: number) => void;
}

export interface TDetailFault {
  normal: string;
  'partial shadow_1': string;
  'partial shadow_2': string;
  'partial shadow_3': string;
  'short circuit_1': string;
  'short circuit_2': string;
  degradation_1: string;
  degradation_2: string;
  open_circuit: string;
  Normal: string;
  'Partial Shading 1': string;
  'Partial Shading 2': string;
  'Partial Shading 3': string;
  'Short Circuit 1': string;
  'Short Circuit 2': string;
  'Degradation 1': string;
  'Degradation 2': string;
  'Open Circuit': string;
}

export interface IFaultNumberList {
  trueData: boolean;
  fault_type: keyof TDetailFault;
  count: number;
  faultId: number;
}

export interface IFaultNumberRes {
  expDataCount: number;
  simDataCount: number;
  faultNumber: IFaultNumberList[];
  total: number;
}

export type TQueryFaultNumber = () => Promise<
  ICommonApiInterface<IFaultNumberRes>
>;

export interface IGetDataDistribute {
  data: [number, number, number][];
  maxCount: number;
}

export interface IHeatMapItem {
  irr: number;
  temp: number;
  quantity: number;
}

export type TGetDataDistrib = (
  module: moduleType
) => Promise<ICommonApiInterface<IGetDataDistribute>>;

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

export interface IModelingForm {
  modelSelection: string;
  modulesSelection: moduleType;
  curveID: number;
  curveQuantity: number;
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
  setPageLoading?: (status: boolean) => void;
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
  dataType: 0 | 1;
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

export type TGetSampleCurve = (
  pk: number,
  num: number
) => Promise<ICommonApiInterface<{ plot_data: [number, number][] }>>;

export type TGetCurvesAdvanced = (
  temp_low: number,
  temp_upper: number,
  irr_low: number,
  irr_upper: number,
  fault_type: keyof TDetailFault,
  data_type: 0 | 1
) => Promise<ICommonApiInterface<{ query_list: number[] }>>;

export type moduleType =
  | 'aSiMicro03038'
  | 'CdTe75669'
  | 'xSi11246'
  | 'mSi0251'
  | 'GIGS'
  | undefined;

export interface IOptions<T> {
  fields: T;
  pk: number;
  model: string;
}

export interface IDataTypeOpt {
  dataType: moduleType;
  moduleCharcter: string;
}

export interface ISelectionOpt {
  modelName: string;
  modelType: string;
  modelUse: number;
}

export interface IGetOptions {
  dataTypeOptions: IOptions<IDataTypeOpt>[];
  selectionOpions: IOptions<ISelectionOpt>[];
}

export interface IModelRes {
  current: number[];
  voltage: number[];
  irradiance: number;
  temperature: number;
  modelRes: [number[]];
}

export interface IModelResItem {
  vol: number;
  curr: number;
  type: string;
}

export type TGetSelectOptions = () => Promise<ICommonApiInterface<IGetOptions>>;
export type TGetModelResById = (
  model: string,
  module: moduleType,
  curveId: number
) => Promise<ICommonApiInterface<{ data: IModelRes }>>;

export type TGetModelCurveQuantity = (
  module: moduleType
) => Promise<ICommonApiInterface<{ count: number }>>;

export interface IDialogDetail {
  imgUrl: string;
  tabber?: string;
  content?: string;
}

export interface IImgSwiper {
  title: string;
  imgUrl: string;
}

export interface IFlowchartItem extends IImgSwiper {
  detail: string[];
}

export interface IDetectionForm {
  model?: 'ResNet' | 'CAE' | 'CNN';
  dataType?: 'simulated' | 'measured';
  id?: number;
  chartType?: 'radar' | 'polygon' | 'line';
}

export interface IGetFormValue<T> {
  (value: keyof T): void;
  (): T;
}

export interface ICommonForm<T> {
  // getFormValue: (value: keyof T) => void;
  getFormValue: IGetFormValue<T>;
  setFormValue: (name: keyof T, value: T[keyof T]) => void;
}

export interface IDetectOptions {
  value: IDetectionForm['dataType'] | IDetectionForm['model'];
  eText: string;
  cText: string;
}

export interface IDetecOptionRes {
  dataTypes: IDetectOptions[];
  modelTypes: IDetectOptions[];
}

export type TGetDetectOptions = () => Promise<
  ICommonApiInterface<IDetecOptionRes>
>;

export interface IGetDetectRes {
  status: boolean;
  data: string;
}

export type TGetDetectionResById = (
  model: IDetectionForm['model'],
  dataType: IDetectionForm['dataType'],
  id: number
) => Promise<ICommonApiInterface<IGetDetectRes>>;

export interface IGetAlgorithmAcc {
  name: string;
  samples: string;
  accuracy: string;
  frontendText: keyof typeof faultTypes;
}

export type TGetAlgorithmAcc = (
  model: IDetectionForm['model'],
  data: IDetectionForm['dataType']
) => Promise<ICommonApiInterface<{ data: IGetAlgorithmAcc[] }>>;

export interface IDetectRadarData {
  faultName: string;
  accuracy: number;
  modelName: string;
}

export interface IQueryChartAcc {
  name: IDetectionForm['model'];
  value: string[];
}

export type TGetChartAcc = (
  type: 'Sim' | 'true'
) => Promise<ICommonApiInterface<{ data: IQueryChartAcc[] }>>;

export interface IModelStructure {
  imgUrl: string;
  detail: string;
  title: string;
}
