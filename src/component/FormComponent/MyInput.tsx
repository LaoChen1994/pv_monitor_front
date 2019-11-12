import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  ReactNode
} from 'react';
import { IInputProps } from 'zent';
import { Input, Notify } from 'zent';
import cx from 'classnames';
import styles from './myStyle.module.scss';
import { ICommonFormProps } from '../../interface';

export interface IInputRef {
  clearInput: () => void;
}

interface Props {
  validator?: (value: any) => boolean;
  ErrorMsg?: string;
  cRef?: React.MutableRefObject<IInputRef>;
  margin?: string;
  caption?: string | ReactNode;
}

export const MyInput: React.FC<
  Props & ICommonFormProps & IInputProps
> = props => {
  const {
    name,
    label,
    type,
    _onChange: eventOnChange,
    value = type === 'number' ? 0 : '',
    hasColon = false,
    layout = 'horizontal',
    validator,
    align = 'start',
    ErrorMsg,
    cRef,
    margin,
    caption,
    ...res
  } = props;

  const [_value, _setValue] = useState(value);
  const inputEl = useRef(null);

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = type === 'number' ? +event.target.value : event.target.value;

    _setValue(value);
    eventOnChange && eventOnChange(name, value);
    if (validator && !validator(value)) {
      Notify.error(ErrorMsg || '请输入正确参数');
    }
  };

  useEffect(() => {
    _setValue(value);
  }, [value]);

  const focusInput = () => {
    //@ts-ignore
    inputEl && inputEl.current.focus();
  };

  const clearInput = () => {
    const val = type === 'number' ? 0 : '';
    _setValue(val);
    eventOnChange && eventOnChange(name, val);
  };

  useImperativeHandle(cRef, () => ({ clearInput }));

  return (
    <>
      <div
        className={cx({ [styles.layout]: true })}
        style={{
          flexDirection: layout === 'horizontal' ? 'row' : 'column',
          justifyContent: align,
          margin: margin
        }}
      >
        {label && (
          <span
            className={cx({
              [styles.hasColon]: hasColon,
              [styles.label]: true
            })}
            onClick={focusInput}
          >
            {label}
          </span>
        )}

        {/* 
      // @ts-ignore */}
        <Input
          type={type}
          value={_value}
          onChange={_onChange}
          ref={inputEl}
          {...res}
        ></Input>
      </div>
      {caption && <div className={styles.caption}>{caption}</div>}
    </>
  );
};
