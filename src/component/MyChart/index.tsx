import React from 'react';
import G2, { Styles } from '@antv/g2';

interface ITextStyle {
  textAlign?: 'center' | 'start' | 'end';
  fill?: string;
  fontSize?: string;
  fontWeight: 'bold' | 'normal' | 'bolder';
  rotate: number;
}

interface IAppProps {
  data: any[];
  containerWidth?: string | number;
  containerHeight?: string | number;
  xLabelValue: string;
  yLabelValue: string;
  xLabelName?: string;
  yLabelName?: string;
  chartType?: 'line' | 'interval' | 'point';
  colorCurves?: string;
  containerId: string;
  padding?: { top: number; right: number; bottom: number; left: number };
  xLabelTextStyle?: Styles.text;
  yLabelTextStyle?: Styles.text;
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
      xLabelValue,
      yLabelValue,
      colorCurves,
      padding,
      xLabelTextStyle,
      yLabelTextStyle,
      xLabelName,
      yLabelName
    } = this.props;

    const _chart = new G2.Chart({
      container: containerId,
      forceFit: true,
      height: 300,
      padding
    });

    _chart.source(data, {
      [xLabelValue]: {
        alias: xLabelName
      },
      [yLabelValue]: {
        alias: yLabelName
      }
    });

    _chart[chartType]()
      .position(`${xLabelValue}*${yLabelValue}`)
      .color(colorCurves || xLabelValue);
    _chart.axis(xLabelValue, {
      title: {
        textStyle: xLabelTextStyle,
        position: 'center',
        offset: 35
      }
    });
    _chart.axis(yLabelValue, {
      title: {
        offset: 35,
        textStyle: yLabelTextStyle,
        position: 'center'
      }
    });
    _chart.render();

    // @ts-ignore
    this.setState({ chart: _chart });
  }

  componentWillUpdate() {
    const { data } = this.props;
    const { chart } = this.state;
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
