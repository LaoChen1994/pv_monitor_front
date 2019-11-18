import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../store/AppContext';
import styles from './style.module.scss';
import {
  getFaultNumber,
  getDetectResById,
  getAlgorithmAcc,
  queryChartAcc
} from '../../api';

import { Tabs, Swiper, Notify, Dialog, Button, Icon } from 'zent';
import {
  IFaultNumberRes,
  IDetectionForm,
  IGetAlgorithmAcc,
  IDetectRadarData,
  IModelStructure
} from '../../interface';
import { faultNumberInit } from '../../constant';
import { MyItems } from '../../component/MyItems';
import { faultTypes } from '../../constant';

import { deSwiperData } from '../../constant';
import { useForm } from '../../store/useFormValue';

import { DetectForm } from '../../component/DetectionForm';
import { DetectGrid } from '../../component/DetectGrid';
import { MyChart } from '../../component/MyChart';
import { SliderTabs } from '../../component/SliderTabs';
import { modelIntroduction } from '../../constant';

const TabPanel = Tabs.TabPanel;
const { openDialog, closeDialog } = Dialog;

interface Props {}

export const FaultDetection: React.FC<Props> = () => {
  const { handleNavChange, setPageLoading } = useAppContext();
  const [faultNumberObj, setFaultNumberObj] = useState<IFaultNumberRes>(
    faultNumberInit
  );
  const [activeId, setActiveId] = useState<number>(0);
  const { formValue, getFormValue, setFormValue } = useForm<IDetectionForm>({});
  const [accList, setAccList] = useState<IGetAlgorithmAcc[]>([]);
  const [detecRes, setDetecRes] = useState<string>('');
  const [chartData, setChatData] = useState<IDetectRadarData[]>([]);
  const [chartType, setChartType] = useState('polar');

  const queryFaultNumber = async () => {
    const { data } = await getFaultNumber();
    setFaultNumberObj(data);
  };

  const renderDialog = (status: string) => {
    return (
      <div className={styles.dialogWrapper}>
        <Icon type="check" className={styles.icon}></Icon>该条曲线的工况为:{' '}
        <span className={styles.important}> {status} </span>
      </div>
    );
  };

  const _openDialog = (status: string) => {
    openDialog({
      dialogId: 'myDialog',
      title: '故障诊断结果',
      children: renderDialog(status),
      footer: (
        <Button type="primary" outline onClick={() => closeDialog('myDialog')}>
          关闭
        </Button>
      )
    });
  };

  useEffect(() => {
    if (detecRes !== '') {
      _openDialog(detecRes);
      setDetecRes('');
    }
  }, [detecRes]);

  const getDetectRes = async (
    model: IDetectionForm['model'],
    dataType: IDetectionForm['dataType'],
    id: number
  ) => {
    setPageLoading && setPageLoading(true);
    const { data } = await getDetectResById(model, dataType, id);
    const { data: res, status } = data;

    if (!status) {
      Notify.error('选择数据类型和编号曲线所对应的类型不匹配');
      return;
    }
    // @ts-ignore
    setDetecRes(faultTypes[res]);
    setPageLoading && setPageLoading(false);
  };

  const getAccForModel = async (
    model: IDetectionForm['model'],
    data: IDetectionForm['dataType']
  ) => {
    setPageLoading && setPageLoading(true);
    const { data: res } = await getAlgorithmAcc(model, data);
    const { data: aclist } = res;
    const dType = data === 'simulated' ? 'Sim' : 'true';

    const { data: pData } = await queryChartAcc(dType);
    const { data: pRes } = pData;
    pRes.map(elem => {
      const { value } = elem;
      // @ts-ignore
      value.splice(3, 0, value.shift());
    });
    // @ts-ignore
    aclist.splice(3, 0, aclist.shift());

    const _chartData: IDetectRadarData[] = aclist.flatMap((elem, index) => {
      const { frontendText } = elem;
      return pRes.reduce<IDetectRadarData[]>((prev, curr) => {
        const { name = 'ResNet', value } = curr;
        const _obj = {} as IDetectRadarData;
        _obj.accuracy = +(+value[index]).toFixed(4);
        _obj.faultName = faultTypes[frontendText];
        _obj.modelName = name;
        return [...prev, _obj];
      }, []);
    });

    setChatData(_chartData);
    setAccList(aclist);
    setPageLoading && setPageLoading(false);
  };

  useEffect(() => {
    handleNavChange && handleNavChange(3)();
    queryFaultNumber();
    getAccForModel('ResNet', 'simulated');
  }, []);

  const updateDetectRes = (
    model: IDetectionForm['model'],
    dataType: IDetectionForm['dataType'],
    id: number,
    chartType: IDetectionForm['chartType']
  ) => {
    getAccForModel(model, dataType);
    getDetectRes(model, dataType, id);
    setChartType(chartType === 'radar' ? 'polar' : 'line');
  };

  const tabChange = (id: number) => {
    setActiveId(id);
  };

  const renderNumTable = () => {
    const { faultNumber, expDataCount, simDataCount } = faultNumberObj;

    return (
      <Tabs activeId={activeId} onChange={tabChange}>
        {[true, false].map((elem, index) => (
          <TabPanel
            tab={<span>{elem ? '实测数据' : '模拟数据'}</span>}
            id={index}
          >
            {faultNumber
              .filter(e => e.trueData === elem)
              .map((e, index) => (
                <MyItems
                  label={faultTypes[e.fault_type]}
                  content={e.count.toString()}
                  key={`itemList-${index}`}
                  hasColon={false}
                ></MyItems>
              ))}

            <MyItems
              label="总计"
              content={(elem ? expDataCount : simDataCount).toString()}
              hasColon={false}
            ></MyItems>
          </TabPanel>
        ))}
      </Tabs>
    );
  };

  const slideBodyRender = (elem: IModelStructure) => {
    const { title, detail, imgUrl } = elem;

    return (
      <div className={styles.bWrapper}>
        <div className={styles.imgWrapper}>
          <img src={imgUrl} alt="图片" />
        </div>
        <div className={styles.textWrap}>
          <div className={styles.subtitle}>{title}</div>
          <div className={styles.bText}>{detail}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className="countTable">
          <div className={styles.subtitle}>故障样本统计</div>
          {renderNumTable()}
        </div>
        <div className="imgSwiper">
          <div className={styles.subtitle}>故障采集系统</div>
          <div className={styles.swiperContainer}>
            <Swiper dotsColor="red" dotsSize="small" arrows autoplay>
              {deSwiperData.map((elem, index) => (
                <div className={styles.swiperContent} key={index}>
                  <img
                    src={require(`../../static/img/PV_IMAGE/${elem.imgUrl}`)}
                    alt={elem.title}
                    className={styles.img}
                  />
                  <span className={styles.caption}>{elem.title}</span>
                </div>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightTop}>
          <div className={styles.leftBlock}>
            <div className={styles.subtitle}>故障诊断设置</div>
            <div className={styles.form}>
              <DetectForm
                // @ts-ignore
                getFormValue={getFormValue}
                setFormValue={setFormValue}
                formValue={formValue}
                updateDetectRes={updateDetectRes}
              ></DetectForm>
            </div>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.subtitle}>故障雷达图</div>
            <MyChart
              xLabelName="故障类型"
              xLabelValue="faultName"
              yLabelName="准确率"
              yLabelValue="accuracy"
              data={chartData}
              // @ts-ignore
              coordType={chartType}
              containerHeight={300}
              containerWidth="100%"
              containerId="radar1"
              multiItem="modelName"
              chartType="line"
              padding={{ top: 40, left: 50, right: 50, bottom: 50 }}
              colorCurves={['#da2d2d', '#eb8242', '#10316b']}
            ></MyChart>
          </div>
        </div>
        <div className={styles.rightBottom}>
          <div className={styles.rightBottomLeft}>
            <div className={styles.subtitle}>诊断结果</div>
            <DetectGrid data={accList}></DetectGrid>
          </div>
          <div className={styles.rightBottomRight}>
            <div className={styles.subtitle}>故障诊断模型示意图</div>
            <div className={styles.content}>
              <SliderTabs
                data={modelIntroduction}
                bodyRender={slideBodyRender}
              ></SliderTabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
