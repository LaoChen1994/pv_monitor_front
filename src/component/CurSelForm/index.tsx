import React, { useState, useMemo, useEffect } from 'react';
import styles from './style.module.scss';
import { IMyCurSelFormParam } from '../../interface';
import { initCurSelValue } from '../../constant';
import { omit, get } from 'lodash';
import { MyInput } from '../FormComponent/MyInput';
import { MySelect } from '../FormComponent/MySelect';
import cx from 'classnames';
import { ICurSelForm } from './interface';

import {
  LayoutGrid as Grid,
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutConfigProvider as ConfigProvider,
  Button
} from 'zent';
import { faultTypes } from '../../constant';

export const CurSelForm: React.FC<ICurSelForm> = props => {
  const {
    curveId = 1,
    maxQuantity,
    updateCurveById,
    updateCurveByAdvanced
  } = props;

  const [formValue, _setFormValue] = useState<IMyCurSelFormParam>(
    initCurSelValue
  );

  const nextCurve = () => updateCurveById && updateCurveById(curveId + 1);
  const prevCurve = () => updateCurveById && updateCurveById(curveId - 1);
  const specificIDCurve = () =>
    updateCurveById && updateCurveById(+getFormValue('curveId'));

  const setFormValue = (name: string, value: any) => {
    const res = omit(formValue, name);
    _setFormValue({ ...res, [name]: value } as IMyCurSelFormParam);
  };

  const getFormValue = (itemName?: keyof IMyCurSelFormParam) =>
    itemName
      ? get(formValue, itemName, initCurSelValue[itemName])
      : (formValue as IMyCurSelFormParam);

  const validator = (name: keyof IMyCurSelFormParam) => (
    value: any
  ): boolean => {
    if (name === 'highIrr' || name === 'lowIrr') {
      return formValue.lowIrr <= formValue.highIrr ? true : false;
    } else {
      return formValue.lowTemp <= formValue.highTemp ? true : false;
    }
  };

  const resetFormValue = () => _setFormValue(initCurSelValue);

  const updateCurByDetail = () => {
    updateCurveByAdvanced && updateCurveByAdvanced(formValue);
  };

  const selectData = useMemo(() => {
    return Object.keys(faultTypes).map(elem => ({
      value: elem,
      // @ts-ignore
      text: faultTypes[elem]
    }));
  }, [faultTypes]);

  return (
    <ConfigProvider
      value={{
        rowGutter: 8,
        colGutter: { fallback: 8 }
      }}
    >
      <Grid>
        <Row justify="space-between">
          <Col span={12}>
            <MyInput
              name="curveId"
              type="number"
              value={formValue.curveId.toString()}
              _onChange={setFormValue}
              label={'曲线ID'}
              hasColon={true}
              size="normal"
              min={0}
              width={100}
            ></MyInput>
          </Col>
          <Col span={12}>
            <Button
              type="danger"
              outline
              icon="search"
              className={styles.right}
              onClick={specificIDCurve}
            >
              查询
            </Button>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24}>
            <div
              className={cx({
                [styles.inlineBlock]: true,
                [styles.tempSelect]: true
              })}
            >
              <MyInput
                name="lowTemp"
                label="温度范围"
                value={formValue.lowTemp.toString()}
                _onChange={setFormValue}
                type="number"
                hasColon={true}
                size="normal"
                min={0}
                width={100}
                validator={validator('lowTemp')}
                ErrorMsg="温度上限应大于等于温度下限"
              ></MyInput>
              ~
              <MyInput
                name="highTemp"
                value={formValue.highTemp.toString()}
                _onChange={setFormValue}
                type="number"
                size="normal"
                width={100}
                validator={validator('highTemp')}
                ErrorMsg="温度上限应大于等于温度下限"
              ></MyInput>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div
              className={cx({
                [styles.inlineBlock]: true,
                [styles.irrSelect]: true
              })}
            >
              <MyInput
                name="lowIrr"
                label="幅度范围"
                value={formValue.lowIrr.toString()}
                _onChange={setFormValue}
                type="number"
                hasColon={true}
                size="normal"
                min={0}
                width={100}
                validator={validator('lowIrr')}
                ErrorMsg="幅照度上限应大于等于幅照度下限"
              ></MyInput>
              ~
              <MyInput
                name="highIrr"
                value={formValue.highIrr.toString()}
                _onChange={setFormValue}
                type="number"
                size="normal"
                width={100}
                ErrorMsg="幅照度上限应大于等于幅照度下限"
                validator={validator('highIrr')}
              ></MyInput>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <MySelect
              name="faultType"
              data={selectData}
              value={formValue.faultType}
              _onChange={setFormValue}
              label="故障类型"
              width={150}
            ></MySelect>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <MySelect
              name="dataType"
              data={[
                { value: 0, text: '模拟数据' },
                { value: 1, text: '实测数据' }
              ]}
              value={formValue.dataType}
              _onChange={setFormValue}
              label="数据类型"
              width={150}
            ></MySelect>
          </Col>
        </Row>
        <Row justify="start">
          <Col span={24} offset={0}>
            <div className={styles.left}>
              <Button
                type="primary"
                disabled={curveId <= 1}
                onClick={prevCurve}
              >
                前一条曲线
              </Button>
              <Button
                type="primary"
                outline
                disabled={curveId >= maxQuantity}
                onClick={nextCurve}
              >
                后一条曲线
              </Button>
              <Button
                type="success"
                outline
                icon="search"
                onClick={updateCurByDetail}
              >
                搜索
              </Button>
              <Button type="danger" outline onClick={resetFormValue}>
                重置
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    </ConfigProvider>
  );
};
