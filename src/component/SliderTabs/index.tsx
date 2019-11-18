import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { ISliderTabProps } from './interface';
import { IModelStructure } from '../../interface';
import cx from 'classnames';

export const SliderTabs: React.FC<ISliderTabProps<IModelStructure>> = props => {
  const [activeId, setActiveId] = useState<number>(0);
  const { data, bodyRender } = props;

  const defaultTemplate = (elem: IModelStructure) => (
    <>
      <div className={styles.subtitle}>{elem.title}</div>
      <div className={styles.textContent}>{elem.detail}</div>
    </>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabWrapper}>
        {data.map((elem, index) => {
          const { title } = elem;

          return (
            <div
              className={cx({
                [styles.show]: activeId === index,
                [styles.tabs]: true
              })}
              onClick={() => setActiveId(index)}
            >
              {title}
            </div>
          );
        })}
      </div>
      <div className={styles.content}>
        {data.map((elem, index) => (
          <div
            className={cx({
              [styles.show]: activeId === index,
              [styles.contentItem]: true
            })}
          >
            {bodyRender ? bodyRender(elem) : defaultTemplate(elem)}
          </div>
        ))}
      </div>
    </div>
  );
};
