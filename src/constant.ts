import { FaultDetection } from './pages/FaultDetection';
import { IVCurveSearch } from './pages/IVCurveSearch';
import { IVModeling } from './pages/IVModeling';
import { RealTimeMonitor } from './pages/RealTimeMonitor';
import {
  INavItem,
  IContact,
  IRadioType,
  ITransKeys,
  IPlotCurve,
  IKeyValueOnCurves
} from './interface';

export const routes: INavItem[] = [
  {
    urlMatch: '/',
    isExact: false,
    component: RealTimeMonitor,
    name: '实时检测'
  },
  {
    urlMatch: '/query_curve/:id',
    isExact: true,
    component: IVCurveSearch,
    name: '曲线查询'
  },
  {
    urlMatch: '/curve_modeling',
    isExact: true,
    component: IVModeling,
    name: 'IV特性建模'
  },
  {
    urlMatch: '/fault_detection',
    isExact: true,
    component: FaultDetection,
    name: '故障诊断'
  }
];

export const contact: IContact[] = [
  {
    name: 'GitHub开源',
    url: 'https://github.com/LaoChen1994/pv_monitor_front',
    iconName: 'GitHub'
  },
  {
    name: '735849467@qq.com',
    iconName: 'Mail'
  }
];

export const radioList: IRadioType[] = [
  {
    value: '1',
    name: '历史数据'
  },
  {
    value: '2',
    name: '实时数据'
  }
];

export const transTextDict = {
  temperature: ''
};

export const notesList: string[] = [
  '在时间区间选择数据存入的起始和结束时间',
  '选择数据类型为历史数据或实时采集的阵列数据',
  '通过查询按钮可以，在列表中可查询到筛选后的数据结果'
];

export const nameTrans: ITransKeys<IPlotCurve & IKeyValueOnCurves> = {
  temperature: '温度',
  irradiance: '幅照度',
  work_status: '运行状态',
  pk: '曲线ID',
  Vmpp: '最大功率点电压',
  Impp: '最大功率点电流',
  Pmpp: '最大功率点功率',
  Isc: '短路电流',
  Voc: '开路电压'
};

export const faultTypes = {
  normal: '正常',
  'partial shadow_1': '阴影故障 1',
  'partial shadow_2': '阴影故障 2',
  'partial shadow_3': '阴影故障 3',
  'short circuit_1': '短路故障 1',
  'short circuit_2': '短路故障 2',
  degradation_1: '老化故障 1',
  degradation_2: '老化故障 2',
  open_circuit: '开路故障'
};

export const mapKey = '4e55cfed61e358a2e5de01661fb97dbc';
