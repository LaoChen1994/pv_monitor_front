import React, { useEffect, useState, useMemo } from 'react';
import { useAppContext } from '../../store/AppContext';
import styles from './style.module.scss';

import { getAccurateList } from '../../api';
import {
  IAccurateDataset,
  IAccurateList,
  IAccurateInfo,
  IModelingForm,
  moduleType,
  IModelResItem,
  IHeatMapItem
} from '../../interface';
import { Grid, IGridColumn } from 'zent';
import { nameTrans, initModelForm } from '../../constant';
import { num2Exp } from '../../utils';
import { useForm } from '../../store/useFormValue';
import { ModelForm } from '../../component/ModelForm/';
import { MyChart } from '../../component/MyChart';
import { FlowchartTabs } from '../../component/FlowChartTabs';

import { getModelResById, getModelCurQuant, getMoDataDis } from '../../api';

interface Props {}

export const IVModeling: React.FC<Props> = () => {
  const { handleNavChange } = useAppContext();
  const [accurateList, setAccurateList] = useState<IAccurateDataset[]>([]);
  const { getFormValue, setFormValue } = useForm<IModelingForm>(initModelForm);
  const [nowModule, setNowModule] = useState<moduleType>(undefined);
  const [modelRes, setModelRes] = useState<IModelResItem[]>([]);
  const [heatMapData, setHeatMapData] = useState<IHeatMapItem[]>([]);
  const [maxCount, setMaxCount] = useState<number>(0);

  const [_f, setF] = useState<number>(0);

  const xAxisValue = Array.from(
    { length: 10 },
    (elem, index) => `${index * 100}~${(index + 1) * 100}`
  );
  const yAxisValue = Array.from(
    { length: 8 },
    (elem, index) => `${index * 5}~${(index + 1) * 5}`
  );

  const updateAccurate = async (module: moduleType = 'aSiMicro03038') => {
    const { data } = await getAccurateList(module);
    const { accuracyList } = data;
    const dataset = _handleAccList(accuracyList);
    setAccurateList(dataset);
    setNowModule(module);
  };

  const updateModDataDis = async (module: moduleType = 'aSiMicro03038') => {
    const { data: res } = await getMoDataDis(module);
    const { data, maxCount } = res;
    const hData = data.reduce<IHeatMapItem[]>((prev, _curr) => {
      const curr = _curr as number[];
      const item: IHeatMapItem = {
        irr: curr[0],
        temp: curr[1],
        quantity: curr[2]
      };
      prev.push(item);
      return prev;
    }, []);

    setMaxCount(maxCount);
    setHeatMapData(hData);
  };

  const _handleAccList = (accuracyList: IAccurateList) =>
    Object.keys(accuracyList).reduce<IAccurateDataset[]>((prev, _curr) => {
      const curr = _curr as keyof typeof accuracyList;
      Object.keys(accuracyList[curr]).forEach(_elem => {
        const elem = _elem as keyof IAccurateInfo;
        const data = {
          dataType: nameTrans[curr] || '',
          itemType: elem.toUpperCase(),
          ...accuracyList[curr][elem]
        };
        prev.push(data);
      });
      return prev;
    }, []) as IAccurateDataset[];

  useEffect(() => {
    handleNavChange && handleNavChange(2)();
    updateAccurate();
    updateModDataDis();
  }, []);

  useEffect(() => {
    setF(_f + 1);
  }, [heatMapData]);

  useEffect(() => {
    const module = getFormValue('modulesSelection') as moduleType;
    const getCurveNum = async (modulesSelection: moduleType) => {
      // @ts-ignore
      const { data } = await getModelCurQuant(modulesSelection);
      const { count } = data;
      setFormValue('curveQuantity', count);
    };
    module && getCurveNum(module);
  }, [getFormValue('modulesSelection')]);

  const getColomn: IGridColumn<IAccurateDataset>[] = [
    {
      title: '数据集',
      name: 'dataType',
      bodyRender: (data, pos) => {
        const { dataType } = data;
        const { row } = pos;

        if (row % 2 === 0) {
          return {
            props: {
              rowSpan: 2
            },
            children: <span>{dataType}</span>
          };
        } else {
          return {
            props: {
              rowSpan: 0
            }
          };
        }
      }
    },
    {
      title: '评价指标',
      name: 'itemType'
    },
    {
      title: '均值',
      name: 'mean',
      bodyRender: data => {
        const { mean } = data;
        return <span>{num2Exp(mean, 6)}</span>;
      }
    },
    {
      title: '方差',
      name: 'std',
      bodyRender: data => {
        const { std } = data;
        return <span>{num2Exp(std, 5)}</span>;
      }
    }
  ];

  const getModelData = async () => {
    const {
      modelSelection: model,
      modulesSelection: module,
      curveID
    } = getFormValue() as IModelingForm;
    const { data } = await getModelResById(model, module, curveID);
    const { data: res } = data;
    const { modelRes, current, voltage } = res;
    const _modelRes = voltage
      .slice(2)
      .reduce<IModelResItem[]>((prev, _vol, index) => {
        const vol = _vol as number;
        prev.push(
          { vol, curr: current[index], type: 'measured' },
          { vol, curr: modelRes[0][index], type: 'simulated' }
        );
        return prev;
      }, []);

    updateAccurate(module);
    setModelRes(_modelRes);
    updateModDataDis(module);
  };

  const clearTopChart = () => {
    setModelRes([]);
  };

  const renderResultTab = () => (
    <Grid datasets={accurateList} columns={getColomn}></Grid>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title}>光伏建模系统</div>
        <div className="systemIntro">
          <div className={styles.subtitle}>系统介绍</div>
          <div className={styles.content}>
            准确可靠的光伏建模方法对光伏系统的优化设计，运行和评估有着极其重要的意义.
            但由于获得真实的模型参数难度很大，而预定义模型结构又受到一定程度的限制，白盒模型在任意环境条件下的正确性和泛化能力相对较弱．为了解决上述问题，本系统在光伏建模时，采用了一种改进的一维深度残差网络结构的黒盒建模方法，在通过实测的模型进行训练后，其能在任意的环境条件下对IV曲线进行准确的建模.
          </div>
        </div>
        <div className={styles.modelRes}>
          <div className={styles.subtitle}>
            <span>建模结果</span>
            <span className={styles.notes}>(组件:{nowModule})</span>
          </div>
          <div className={styles.grid}>{renderResultTab()}</div>
          <div className={styles.caption}>所用模型: 1-D ResNet</div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightTop}>
          <div className={styles.form}>
            <div className={styles.subtitle} style={{ marginLeft: '15px' }}>
              建模选项
            </div>
            <div className={styles.middle}>
              <ModelForm
                getFormValue={getFormValue}
                setFormValue={setFormValue}
                getModelData={getModelData}
                clearTopChart={clearTopChart}
              ></ModelForm>
            </div>
          </div>
          <div className={styles.topChart}>
            <div className={styles.subtitle} style={{ marginLeft: '45px' }}>
              建模结果图
            </div>
            <MyChart
              containerWidth="100%"
              containerHeight="350px"
              data={modelRes}
              xLabelValue="vol"
              yLabelValue="curr"
              xLabelName="电压"
              yLabelName="电流"
              containerId="cs1"
              xLabelTextStyle={{
                fill: '#ff4444',
                fontWeight: 'bolder',
                fontSize: 16
              }}
              yLabelTextStyle={{
                fill: '#ff4444',
                fontWeight: 'bolder',
                fontSize: 16
              }}
              xLineStyle={{
                stroke: '#10316b',
                lineWidth: 2,
                opacity: 0.8
              }}
              yLineStyle={{
                stroke: '#10316b',
                lineWidth: 2,
                opacity: 0.8
              }}
              multiItem="type"
              padding={{ bottom: 50, top: 10, left: 50, right: 10 }}
            ></MyChart>
          </div>
        </div>
        <div className={styles.rightBottom}>
          <div className={styles.rbLeft}>
            <div className={styles.subtitle} style={{ marginLeft: '20px' }}>
              数据分布图{' '}
              <span className={styles.notes}>
                (组件: {nowModule}, 最大网格数量{maxCount})
              </span>
            </div>
            <MyChart
              data={heatMapData}
              xLabelName="幅照度"
              yLabelName="温度"
              xLabelValue="irr"
              yLabelValue="temp"
              chartType="polygon"
              labelValue="quantity"
              containerId="heatmap"
              xType="cat"
              yType="cat"
              xAxisValues={xAxisValue}
              yAxisValues={yAxisValue}
              containerWidth="100%"
              containerHeight="200px"
              xLabelTextStyle={{
                fill: '#ff4444',
                fontWeight: 'bolder',
                fontSize: 16
              }}
              yLabelTextStyle={{
                fill: '#ff4444',
                fontWeight: 'bolder',
                fontSize: 16
              }}
              scaleColor={['#fff4e0', '#73d2f3', '#26baee', '#465881']}
            ></MyChart>
          </div>
          <div className={styles.rbRight}>
            <div className="flowchartIntro">
              <div className={styles.subtitle}>流程介绍</div>
              <div>
                <FlowchartTabs></FlowchartTabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
