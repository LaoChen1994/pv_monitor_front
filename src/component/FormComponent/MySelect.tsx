import React, { useState, useEffect } from 'react';
import { Select, ISelectProps } from 'zent';
import { ICommonFormProps } from '../../interface';
import styles from './myStyle.module.scss';
import cx from 'classnames';

export const MySelect: React.FC<ICommonFormProps & ISelectProps> = props => {
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

  return (
    <div
      className={cx({ [styles.layout]: true })}
      style={{
        flexDirection: layout === 'horizontal' ? 'row' : 'column',
        justifyContent: align
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
