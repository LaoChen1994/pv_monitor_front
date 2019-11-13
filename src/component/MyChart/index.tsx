import React from 'react';
import G2, { Styles, TooltipConfig, TooltipItem } from '@antv/g2';
import { filterParamInObj } from '../../utils';

interface IAppProps {
  data: any[];
  containerWidth?: string | number;
  containerHeight?: string | number;
  xLabelValue: string;
  yLabelValue: string;
  xLabelName?: string;
  yLabelName?: string;
  chartType?: 'line' | 'interval' | 'point' | 'polygon';
  colorCurves?: string[];
  containerId: string;
  padding?: { top: number; right: number; bottom: number; left: number };
  xLabelTextStyle?: Styles.text;
  yLabelTextStyle?: Styles.text;
  xLineStyle?: Styles.line;
  yLineStyle?: Styles.line;
  multiItem?: string;
  xRange?: [number, number];
  yRange?: [number, number];
  xType?: 'identity' | 'linear' | 'cat' | 'time' | 'timeCat' | 'log' | 'pow';
  xAxisValues?: string[];
  yType?: 'identity' | 'linear' | 'cat' | 'time' | 'timeCat' | 'log' | 'pow';
  yAxisValues?: string[];
  labelValue?: string;
  scaleColor?: string[];
  toolTipConfig?: TooltipConfig;
  toolTipUseHTMLTemp?: boolean;
  toolTipCosTemp?: (title: string, items: TooltipItem[]) => string;
}

interface IState {
  chart: any;
}

export class MyChart extends React.PureComponent<IAppProps, IState> {
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
      padding,
      xLabelTextStyle,
      yLabelTextStyle,
      xLabelName,
      yLabelName,
      containerHeight = 300,
      xLineStyle,
      yLineStyle,
      multiItem,
      xType,
      yType,
      xAxisValues,
      yAxisValues,
      labelValue,
      scaleColor = ['#73d2f3', '#10316b'],
      colorCurves = [],
      toolTipConfig,
      toolTipUseHTMLTemp,
      toolTipCosTemp
    } = this.props;

    const _chart = new G2.Chart({
      container: containerId,
      forceFit: true,
      height: +containerHeight || 300,
      padding
    });

    const xScaleConfig = filterParamInObj({ type: xType, values: xAxisValues });
    const yScaleConfig = filterParamInObj({ type: yType, values: yAxisValues });

    const htmlTemp: (title: string, items: TooltipItem[]) => string = (
      title: string,
      items: TooltipItem[]
    ) => {
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
    };

    const _toolTipConfig: TooltipConfig =
      toolTipConfig ||
      (toolTipUseHTMLTemp
        ? { useHtml: true, htmlContent: toolTipCosTemp || htmlTemp }
        : {});
    console.log(_toolTipConfig);

    _chart.source(data, {
      [xLabelValue]: {
        alias: xLabelName,
        ...xScaleConfig
      },
      [yLabelValue]: {
        alias: yLabelName,
        ...yScaleConfig
      }
    });

    _chart.axis(xLabelValue, {
      title: {
        textStyle: xLabelTextStyle,
        position: 'center',
        offset: 40
      },
      line: xLineStyle
    });
    _chart.axis(yLabelValue, {
      title: {
        offset: 40,
        textStyle: yLabelTextStyle,
        position: 'center'
      },
      line: yLineStyle
    });

    _chart.tooltip(_toolTipConfig);

    chartType === 'polygon' && labelValue
      ? _chart[chartType]()
          .position(`${xLabelValue}*${yLabelValue}`)
          .color(labelValue, scaleColor)
          .label(labelValue, {
            offset: 0,
            textStyle: {
              fill: '#f44',
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)'
            }
          })
      : multiItem
      ? _chart[chartType]()
          .position(`${xLabelValue}*${yLabelValue}`)
          .color(multiItem, colorCurves)
      : _chart[chartType]().position(`${xLabelValue}*${yLabelValue}`);

    chartType === 'polygon'
      ? console.log(123)
      : multiItem
      ? _chart
          .point()
          .position(`${xLabelValue}*${yLabelValue}`)
          .color(multiItem, colorCurves)
          .shape(multiItem, ['hollowCircle', 'hollowSquare', 'hollowTriangle'])
      : _chart.point().position(`${xLabelValue}*${yLabelValue}`);

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
