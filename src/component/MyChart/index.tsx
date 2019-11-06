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
  isForceUpdate: boolean;
}

export class MyChart extends React.PureComponent<IAppProps, IState> {
  constructor(props: Readonly<IAppProps>) {
    super(props);
    this.state = {
      chart: null,
      isForceUpdate: false
    };
  }

  isForceUpdate() {
    const { isForceUpdate } = this.state;
    isForceUpdate && this.forceUpdate();
    this.setState({ isForceUpdate: !isForceUpdate });
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
    _chart.point().position(`${xLabelValue}*${yLabelValue}`);
    _chart.axis(yLabelValue, {
      title: {
        offset: 35,
        textStyle: yLabelTextStyle,
        position: 'center'
      }
    });
    _chart.tooltip({
      useHtml: true,
      htmlContent: function(title, items) {
        const { point } = items[0];
        const { _origin } = point;
        return `
        <div class="g2-tooltip">
        <div class="g2-tooltip-title" style="margin-bottom: 4px;text-align:left">数据详情:</div>
          <ul class="g2-tooltip-list" style="text-align:left">
            <li>${xLabelName}: ${_origin[xLabelValue]}</li>
            <li>${yLabelName}: ${_origin[yLabelValue]}</li>
          </ul>
        </div>
        `;
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
    this.isForceUpdate();
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
