import React from 'react';
import { IMyItemsProps } from '../../interface';
import styles from './style.module.scss';
import cx from 'classnames';

export const MyItems: React.FC<IMyItemsProps> = props => {
  const { label = '默认', content, hasColon = true, bodyRender } = props;

  return (
    <div className={cx({ [styles.wrapper]: true })}>
      <span
        className={cx({
          [styles.title]: true,
          [styles.addColon]: !!hasColon
        })}
      >
        {label}
      </span>

      {content && <span className={styles.content}> {content} </span>}
      {bodyRender && bodyRender()}
    </div>
  );
};
