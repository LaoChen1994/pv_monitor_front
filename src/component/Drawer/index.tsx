import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import cx from 'classnames';
import { throttle } from 'lodash';

interface Props {
  width?: number | string;
  padding?: string | number;
  height?: string;
}

export const Drawer: React.FC<Props> = props => {
  const { children, width, padding } = props;
  const [isShow, setShow] = useState<boolean>(false);
  const [scrolTop, setScrolTop] = useState<number>(0);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      throttle(() => {
        const top = window.pageYOffset;
        setScrolTop(top);
      }, 200)
    );
  }, []);

  return (
    <div
      className={cx({ [styles.wrapper]: true, [styles.show]: isShow })}
      style={{
        width: typeof width === 'string' ? width : width + 'px',
        padding: typeof padding === 'string' ? padding : padding + 'px',
        top: scrolTop + 'px'
      }}
    >
      <div className={styles.toggle} onClick={() => setShow(!isShow)}>
        {isShow ? '收起' : '展开'}
      </div>
      {children}
    </div>
  );
};
