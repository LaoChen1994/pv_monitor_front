import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { routes } from '../../constant';
import { useAppContext } from '../../store/AppContext';
import { MyMap } from '../../component/MyMap';
import styles from './style.module.scss';

interface Props {}

export const IVCurveSearch: React.FC<Props & RouteComponentProps> = props => {
  const { addNewBreads } = useAppContext();

  useEffect(() => {
    addNewBreads && addNewBreads({ name: routes[1].name });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.mapWrapper}>
          <MyMap></MyMap>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  );
};
