###  React+G2踩坑

---

#### 1. 使用changeData 实时更新数据

+ 用类组件
+ 在componentDidMount中初始化图表，然后将chart实例进行保存即可
+ 在componentWillUpdate的时候完成对于图标的更新
+ 代码例子

~~~javascript
import React from 'react';
import G2 from '@antv/g2';

interface Props {
  data: any[];
  containerWidth?: string | number;
  containerHeight?: string | number;
  xLabelName: string;
  yLabelName: string;
  chartType?: 'line' | 'interval' | 'point';
  colorCurves?: string;
  containerId: string;
}

export interface IAppProps {
  data: any[];
  containerWidth?: string | number;
  containerHeight?: string | number;
  xLabelName: string;
  yLabelName: string;
  chartType?: 'line' | 'interval' | 'point';
  colorCurves?: string;
  containerId: string;
  padding?: { top: number; right: number; bottom: number; left: number };
}

interface IState {
  chart: any;
}

export class MyChart extends React.Component<IAppProps, IState> {
  constructor(props: Readonly<IAppProps>) {
    super(props);
    this.state = {
      chart: null
    };
  }

  componentDidMount() {
    const {
      containerId,
      data,
      chartType = 'line',
      xLabelName,
      yLabelName,
      colorCurves,
      padding
    } = this.props;

    const _chart = new G2.Chart({
      container: containerId,
      forceFit: true,
      height: 300,
      padding
    });

    _chart.source(data);
    _chart[chartType]()
      .position(`${xLabelName}*${yLabelName}`)
      .color(colorCurves || xLabelName);
    _chart.render();

    // @ts-ignore
    this.setState({ chart: _chart });
  }

  componentWillUpdate() {
    const { data } = this.props;
    const { chart } = this.state;
    console.log('2222=', chart);
    console.log(chart === null);
    //　@ts-ignore
    chart !== null && chart.changeData(data);
  }

  public render() {
    const {
      containerId,
      containerHeight: height = 500,
      containerWidth: width = 300
    } = this.props;

    return (
      <div
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height
        }}
        id={containerId}
      ></div>
    );
  }
}

~~~






