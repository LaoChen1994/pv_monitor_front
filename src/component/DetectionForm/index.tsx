import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ICommonForm, IDetectionForm, IDetectOptions } from '../../interface';
import {
  LayoutGrid as Grid,
  LayoutCol as Col,
  LayoutRow as Row,
  LayoutConfigProvider as ConfigProvider,
  Button,
  Notify
} from 'zent';

import { MyInput, IInputRef } from '../FormComponent/MyInput';
import { MySelect, ISelectDataItem, IRefObj } from '../FormComponent/MySelect';

import { getDetectOptions } from '../../api';
import { hasUnuseData } from '../../utils';

interface Props extends ICommonForm<IDetectionForm> {
  formValue: IDetectionForm;
  updateDetectRes: (
    model: IDetectionForm['model'],
    dataType: IDetectionForm['dataType'],
    id: number,
    chartType: IDetectionForm['chartType']
  ) => void;
}

export const DetectForm: React.FC<Props> = props => {
  const [modelOption, setModelOption] = useState<ISelectDataItem[]>([]);
  const [dataOption, setDataOption] = useState<ISelectDataItem[]>([]);
  const { setFormValue, formValue, updateDetectRes } = props;
  const modelRef = useRef({} as IRefObj);
  const dataRef = useRef({} as IRefObj);
  const idRef = useRef({} as IInputRef);

  const clear = () => {
    modelRef.current.clearSelct();
    dataRef.current.clearSelct();
    idRef.current.clearInput();
  };

  const queryOptions = async () => {
    const { data } = await getDetectOptions();
    const { dataTypes, modelTypes } = data;
    const getNewList = (data: IDetectOptions[]) =>
      data.map((e, i) => ({ text: e.cText, value: e.value }));
    const modelOpt = getNewList(modelTypes);
    const dataTypeOpt = getNewList(dataTypes);

    setModelOption(modelOpt);
    setDataOption(dataTypeOpt);
  };

  useEffect(() => {
    queryOptions();
  }, []);

  const _submit = useCallback(() => {
    // @ts-ignore
    const { id, dataType, model, chartType } = formValue;
    if (hasUnuseData([id, dataType, model])) {
      Notify.error('表格内数据为空, 请选择正确参数');
      return;
    }
    updateDetectRes(model, dataType, id || 1, chartType);
  }, [formValue]);

  return (
    <>
      <ConfigProvider value={{ rowGutter: 16, colGutter: 0 }}>
        <Grid>
          <Row justify="space-between">
            <Col span={24}>
              <MySelect
                data={modelOption}
                name="model"
                placeholder="请选择模型"
                value=""
                label="诊断模型"
                // @ts-ignore
                _onChange={setFormValue}
                width={250}
                cRef={modelRef}
              ></MySelect>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col span={24}>
              <MySelect
                data={dataOption}
                name="dataType"
                value=""
                label="数据类型"
                //@ts-ignore
                _onChange={setFormValue}
                placeholder="请选择数据类型"
                width={250}
                cRef={dataRef}
              ></MySelect>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <MyInput
                name="id"
                value=""
                placeholder="请输入想查询曲线ID"
                // @ts-ignore
                _onChange={setFormValue}
                hasColon={true}
                label="曲线编号"
                width={250}
                cRef={idRef}
              ></MyInput>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <MySelect
                name="chartType"
                value="radar"
                placeholder="选择图表类型"
                label="图表类型"
                data={[
                  { text: '雷达图', value: 'radar' },
                  { text: '折线图', value: 'line' }
                ]}
                width={250}
                // @ts-ignore
                _onChange={setFormValue}
              ></MySelect>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={8}></Col>
            <Col span={16}>
              <Button type="primary" onClick={_submit}>
                故障诊断
              </Button>
              <Button type="primary" outline onClick={clear}>
                清空表格
              </Button>
            </Col>
          </Row>
        </Grid>
      </ConfigProvider>
    </>
  );
};
