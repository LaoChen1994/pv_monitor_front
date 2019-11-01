import { FaultDetection } from './pages/FaultDetection';
import { IVCurveSearch } from './pages/IVCurveSearch';
import { IVModeling } from './pages/IVModeling';
import { RealTimeMonitor } from './pages/RealTimeMonitor';
import { INavItem, IContact, IRadioType } from './interface';

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

export const notesList: string[] = [
  '在时间区间选择数据存入的起始和结束时间',
  '选择数据类型为历史数据或实时采集的阵列数据',
  '通过查询按钮可以，在列表中可查询到筛选后的数据结果'
];

export const mapKey = '4e55cfed61e358a2e5de01661fb97dbc';
