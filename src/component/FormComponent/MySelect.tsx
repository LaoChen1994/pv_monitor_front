import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Select, ISelectProps } from 'zent';
import { ICommonFormProps } from '../../interface';
import styles from './myStyle.module.scss';
import cx from 'classnames';

export interface ISelectDataItem {
  value: any;
  text: string;
}

export type ISelectData = ISelectDataItem[];

export interface IRefObj {
  clearSelct: () => void;
}

interface IMySelectProps {
  margin?: string;
  cRef?: React.MutableRefObject<IRefObj>;
  data: ISelectData;
}

export const MySelect: React.FC<ICommonFormProps &
  ISelectProps &
  IMySelectProps> = props => {
  const {
    name,
    label,
    _onChange,
    data,
    hasColon = true,
    layout = 'horizontal',
    align = 'start',
    placeholder = '',
    value,
    margin,
    cRef,
    ...res
  } = props;

  const [_value, setValue] = useState(value);

  const _setValue = (event: {
    target: {
      type: any;
      value: any;
    };
  }) => {
    const { value } = event.target;
    setValue(value);
    _onChange && _onChange(name, value);
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  const clearSelct = () => {
    setValue('');
    _onChange && _onChange(name, '');
  };

  useEffect(() => {
    value && _onChange && _onChange(name, value);
  }, []);

  useImperativeHandle(cRef, () => ({ clearSelct }));

  return (
    <div
      className={cx({ [styles.layout]: true })}
      style={{
        flexDirection: layout === 'horizontal' ? 'row' : 'column',
        justifyContent: align,
        margin
      }}
    >
      {label && (
        <span
          className={cx({ [styles.hasColon]: hasColon, [styles.label]: true })}
        >
          {label}
        </span>
      )}
      <Select
        placeholder={placeholder}
        data={data}
        value={_value}
        onChange={_setValue}
        {...res}
      ></Select>
    </div>
  );
};
