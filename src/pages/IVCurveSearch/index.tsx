import React, { useEffect, useState, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FullLngLatPos } from 'react-amap';

import { useAppContext } from '../../store/AppContext';
import { MyMap } from '../../component/MyMap';
import { getPlotCurve } from '../../api';
import { MyItems } from '../../component/MyItems';
import { MyChart } from '../../component/MyChart';
import { CurSelForm } from '../../component/CurSelForm';

import { routes, nameTrans, faultTypes } from '../../constant';
import { IPlotCurve, TAEC, IKeyValueOnCurves } from '../../interface';
import styles from './style.module.scss';
import cx from 'classnames';

import { getCurveQuantity } from '../../api';

interface Props {}

interface IParams {
  id: string;
  [key: string]: any;
}

export const IVCurveSearch: React.FC<
  Props & RouteComponentProps<IParams>
> = props => {
  const { handleNavChange } = useAppContext();
  const [center, setCenter] = useState<FullLngLatPos>({
    longitude: 119.200382,
    latitude: 26.063076
  });

  const [curveData, setCurveData] = useState<IPlotCurve>({
    temperature: 0,
    irradiance: 0,
    plot_data: [],
    work_status: '',
    pk: 1
  });
  const [cQuantity, setQuantity] = useState<number>(0);

  const getOpc: () => Array<[TAEC<IPlotCurve>, string]> = () => {
    const { plot_data, ...rest } = curveData;
    return Object.entries(rest) as Array<[TAEC<IPlotCurve>, string]>;
  };

  const getKeyValue: IKeyValueOnCurves = useMemo(() => {
    const { plot_data } = curveData;

    const keyValue = plot_data.reduce(
      (prev, curr) => {
        const { Voc, Isc, Pmpp } = prev;

        Voc.value < curr[0] && (prev.Voc.value = curr[0]);
        Isc.value < curr[1] && (prev.Isc.value = curr[1]);
        Pmpp.value < curr[0] * curr[1] &&
          ([prev.Vmpp.value, prev.Impp.value, prev.Pmpp.value] = [
            curr[0],
            curr[1],
            curr[0] * curr[1]
          ]);
        return prev;
      },
      {
        Voc: { value: 0, org: 'V' },
        Isc: { value: 0, org: 'A' },
        Pmpp: { value: 0, org: 'W' },
        Vmpp: { value: 0, org: 'V' },
        Impp: { value: 0, org: 'A' }
      } as IKeyValueOnCurves
    );
    return keyValue;
  }, [curveData]);

  useEffect(() => {
    handleNavChange && handleNavChange(1)();

    const getNum = async () => {
      const { data } = await getCurveQuantity();
      const { total } = data;
      setQuantity(total);
    };

    getNum();
  }, []);

  useEffect(() => {
    const { params } = props.match;
    const { id } = params;
    const getData = async (index: number) => {
      const res = await getPlotCurve(index);
      const { data } = res;
      // @ts-ignore
      data.work_status = faultTypes[data.work_status];
      setCurveData(data);
    };
    getData(Number.isNaN(+id) ? 1 : +id);
  }, []);

  useEffect(() => {
    const getData = async (index: number) => {
      const res = await getPlotCurve(index);
      const { data } = res;
      // @ts-ignore
      data.work_status = faultTypes[data.work_status];
      setCurveData(data);
    };
    getData(curveData.pk);
  }, [curveData.pk]);

  const updateCurveById = (curveId: number) => {
    setCurveData({ ...curveData, pk: curveId });
  };

  const renderKeyValueTable = (kp: keyof IKeyValueOnCurves) => {
    const keyTable = getKeyValue[kp];
    const { value, org } = keyTable;

    const bodyRender: () => React.ReactElement = () => (
      <div className={styles.content}>{`${value.toFixed(2)} (${org})`}</div>
    );

    return (
      <>
        <MyItems label={kp} bodyRender={bodyRender}></MyItems>
      </>
    );
  };

  const getIVPlotData = useMemo(() => {
    const { plot_data } = curveData;

    return plot_data.map(elem => ({
      vol: +elem[0].toFixed(4),
      curr: +elem[1].toFixed(4)
    }));
  }, [curveData]);

  const getPVPlotData = useMemo(() => {
    const { plot_data } = curveData;

    return plot_data.map(elem => ({
      vol: +elem[0].toFixed(4),
      power: +(elem[1] * elem[0]).toFixed(4)
    }));
  }, [curveData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title}>曲线详情</div>
        <div className={styles.tableWrapper}>
          <div className={styles.subtitle}>基本工况</div>
          <div className={styles.tableList}>
            {getOpc().map((elem, index) => (
              <MyItems
                // @ts-ignore
                label={nameTrans[elem[0]]}
                content={elem[1]}
                key={index}
              ></MyItems>
            ))}
          </div>

          <div className={styles.subtitle}>关键点参数</div>
          <div className={styles.tableList}>
            {Object.keys(getKeyValue).map(elem =>
              // @ts-ignore
              renderKeyValueTable(elem)
            )}
          </div>
        </div>
        <div className={styles.mapWrapper}>
          <div className={styles.subtitle}>电站地址</div>
          <MyMap center={center} setCenter={setCenter}></MyMap>
        </div>
      </div>
      <div className={styles.right}>
        <div className={cx({ [styles.subtitle]: true, [styles.ml30]: true })}>
          特性曲线
        </div>
        <div className={styles.top}>
          <div className={styles.topChart}>
            <div className={styles.chartTitle}>I-V特性曲线</div>
            <MyChart
              containerId="s1"
              containerWidth="100%"
              containerHeight="300px"
              data={getIVPlotData}
              xLabelValue="vol"
              yLabelValue="curr"
              chartType="line"
              padding={{ top: 20, left: 60, bottom: 60, right: 40 }}
              xLabelName="电压 (V)"
              yLabelName="电流 (A)"
              xLabelTextStyle={{
                fill: '#ff4444',
                fontWeight: 'bolder'
              }}
              yLabelTextStyle={{
                fill: '#ff4444',
                fontWeight: 'bolder'
              }}
            ></MyChart>
          </div>
          <div className={styles.topChart}>
            <div className={styles.chartTitle}>P-V特性曲线</div>
            <MyChart
              chartType="line"
              containerId="s2"
              containerWidth="100%"
              containerHeight="300px"
              data={getPVPlotData}
              xLabelValue="vol"
              yLabelValue="power"
              padding={{ top: 20, left: 80, bottom: 60, right: 40 }}
              xLabelName="电压 (V)"
              yLabelName="功率 (W)"
              xLabelTextStyle={{
                fill: '#ff4444',
                fontWeight: 'bolder'
              }}
              yLabelTextStyle={{
                fill: '#ff4444',
                fontWeight: 'bolder'
              }}
            ></MyChart>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <div className={cx({ [styles.subtitle]: true })}>曲线查询列表</div>
            <CurSelForm
              curveId={curveData.pk}
              maxQuantity={cQuantity}
              updateCurveById={updateCurveById}
            ></CurSelForm>
          </div>
        </div>
      </div>
    </div>
  );
};
