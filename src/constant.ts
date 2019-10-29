import { FaultDetection } from './pages/FaultDetection';
import { IVCurveSearch } from './pages/IVCurveSearch';
import { IVModeling } from './pages/IVModeling';
import { RealTimeMonitor } from './pages/RealTimeMonitor';
import { INavItem, IContact } from './interface';

export const routes: INavItem[] = [
  {
    urlMatch: '/',
    isExact: false,
    component: RealTimeMonitor,
    name: '实时检测'
  },
  {
    urlMatch: '/query_curve',
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
