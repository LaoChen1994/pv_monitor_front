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
  TDetailFault,
  IKeyValueOnCurves,
  IMyCurSelFormParam,
  IAccurateList,
  IAccItem,
  IModelingForm,
  IFlowchartItem,
  IFaultNumberRes,
  IImgSwiper,
  IModelStructure
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

export const faultNumberInit: IFaultNumberRes = {
  expDataCount: 0,
  simDataCount: 0,
  total: 0,
  faultNumber: []
};

export const nameTrans: ITransKeys<IPlotCurve &
  IKeyValueOnCurves &
  IAccurateList &
  IAccItem> = {
  temperature: '温度',
  irradiance: '幅照度',
  work_status: '运行状态',
  pk: '曲线ID',
  Vmpp: '最大功率点电压',
  Impp: '最大功率点电流',
  Pmpp: '最大功率点功率',
  Isc: '短路电流',
  Voc: '开路电压',
  trainSet: '训练集',
  testSet: '测试集',
  mean: '均值',
  std: '方差'
};

export const faultTypes: TDetailFault = {
  normal: '正常',
  'partial shadow_1': '阴影故障 1',
  'partial shadow_2': '阴影故障 2',
  'partial shadow_3': '阴影故障 3',
  'short circuit_1': '短路故障 1',
  'short circuit_2': '短路故障 2',
  degradation_1: '老化故障 1',
  degradation_2: '老化故障 2',
  open_circuit: '开路故障',
  Normal: '正常',
  'Partial Shading 1': '阴影故障 1',
  'Partial Shading 2': '阴影故障 2',
  'Partial Shading 3': '阴影故障 3',
  'Short Circuit 1': '短路故障 1',
  'Short Circuit 2': '短路故障 2',
  'Degradation 1': '老化故障 1',
  'Degradation 2': '老化故障 2',
  'Open Circuit': '开路故障'
};

export const initCurSelValue: IMyCurSelFormParam = {
  curveId: 1,
  lowTemp: 0,
  highTemp: 40,
  lowIrr: 0,
  highIrr: 1000,
  faultType: 'normal',
  dataType: 0
};

export const initModelForm: IModelingForm = {
  modelSelection: 'resnet',
  modulesSelection: undefined,
  curveID: -1,
  curveQuantity: 0
};

export const mapKey = '4e55cfed61e358a2e5de01661fb97dbc';

export const flowchartContent: IFlowchartItem[] = [
  {
    title: '数据清洗',
    detail: [
      '新的IV特性曲线由原始采集的IV特性曲线下采样ResNum个点得到的',
      '电压下采样过程是从0至开路电压之间找到相应的均分采样点，之后找到与之最近的电压值，通过线性插值法来估计对应的电流值',
      '电流下采样的方法和电压下采样方法类似，在0至短路电流之间找到相应个数的采样电流点，之后利用线性插值估计响应的电压值',
      '完成下采样后通过EHA-NMS,来计算其RMSE值，将其与阈值Eth进行比较，若其大于阈值则认为其为故障曲线，删除;否则，留下'
    ],
    imgUrl: 'dataFilter_gaitubao_1106x933.png'
  },
  {
    title: '网格采样',
    detail: [
      '在0 ℃~40 ℃和 0 W/㎡ ~ 1000 W/㎡,之间以10℃和100W/㎡为间隔，将数据集进行网格分区, 并设置下采样数量N为300',
      '对于每个网格中超过下采样个数N的网格，在网格中随机下采样得到N个样本作为建模数据集，并将其中70%作为训练集，30%作为测试集',
      '对于每个网格中超过下采样个数N的网格，网格中所有的样本都将被选择，并将70%作为训练集，30%作为测试集',
      '在模型训练的过程中，采用10折交叉验证来提升训练模型的泛化能力,我们将训练集中的90%的数据用于训练所提出的ResNet模型，另外的10%用来进行交叉验证'
    ],
    imgUrl: 'gridSampling_gaitubao_800x800.png'
  },
  {
    title: '网络模型',
    detail: [
      '所提出的1-D ResNet具有一层输入层, 五层一维残差层,和最后一层输出层',
      '该1-D ResNet能够自动从数据中提取复杂抽象的特征',
      '通过一维卷积计算可以获得更多临近特征的信息来建立和标签值之间的关系',
      '残查网络可以提升网络的性能,并在端到端的训练中避免梯度消失和梯度爆炸问题'
    ],
    imgUrl: 'Structure_modeling_gaitubao_800x800.png'
  },
  {
    title: '训练过程',
    detail: [
      '在每次Epoch时, 通过权重(weight)和偏差(bias)在前向传播中的计算获得上一个epoch更新或初始化后的预测值',
      '当在训练过程中得到相较于上一次具有更高准确率的模型，则采用贪心策略进行保存，获得更准确的训练模型',
      '在反向传播过程中，通过Adam优化算法对权重和偏差进行更新，最终得到的ResNet模型即为最优模型.'
    ],
    imgUrl: 'modeling_flowchart_gaitubao_800x800.png'
  }
];

export const modelIntroduction: IModelStructure[] = [
  {
    title: 'CNN',
    imgUrl: require('./static/img/PV_IMAGE/CNN.png'),
    detail:
      '所用于比较的CNN受到VGG和AlexNet的启发,其由二维卷积层,池化层和全连接层组成.在此结构中,我们为了保证维度的匹配,而使该网络能够更深层次的自动提取网络参数,我们将部分二维的卷积层通过一维卷积层进行替代'
  },
  {
    title: 'ResNet',
    imgUrl: require('./static/img/PV_IMAGE/ResNet.png'),
    detail: `
    所用到ResNet的输入矩阵大小为40 * 4, 该网络的输出为1 * 9矩阵,
    该ReNet在特征压缩部分由一个二维残差模块和一个二维卷积层组成. 
    之后由6个一维残差模块进行特征提取, 其中在第二和第三个残差模块之间添加了平均池化层.
    最后,为了维度匹配在线性分类器之前,我们添加了另一个平均池化层来完成维度的匹配. 最终,通过线性分类器获得输出结果
    `
  },
  {
    title: 'CAE',
    imgUrl: require('./static/img/PV_IMAGE/CAE.png'),
    detail: `对于所对比卷积自编码网络，该网络通过编码器和解码器来进行特征的压缩提取，然后将所得到的特征图通过线性分类其进行分类，最终得到1 * 9的输出结果，得到最终的预测结果．
    反卷积层作为卷积操作的反操作，用来产生原有的特征图，通过比较生成的特征图和原有的特征图对比，优化其误差，最终得到最优的压缩特征．
    `
  }
];

export const deSwiperData: IImgSwiper[] = [
  {
    title: '[实测]实验室光伏面板',
    imgUrl: 'PV_array_gaitubao_2427x1456.jpg'
  },
  {
    title: '[实测]老化故障模拟',
    imgUrl: 'DE_gaitubao_2427x1456.jpg'
  },
  {
    title: '[实测]开路故障模拟',
    imgUrl: 'OC_gaitubao_2427x1456.jpg'
  },
  {
    title: '[实测]短路故障模拟',
    imgUrl: 'SC_gaitubao_2427x1456.jpg'
  },
  {
    title: '[实测]阴影故障模拟',
    imgUrl: 'Shading_gaitubao_2427x1456.jpg'
  },
  {
    title: '[模拟]光伏组件',
    imgUrl: 'PV_module_model.png'
  },
  {
    title: '[模拟]单二极管模型',
    imgUrl: 'Single_diode_model.png'
  },
  {
    title: '[模拟]模拟阵列模型',
    imgUrl: 'Simulation_model.png'
  }
];
