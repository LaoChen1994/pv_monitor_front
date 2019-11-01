import React, { useState, useEffect } from 'react';
import { Map } from 'react-amap';
import { mapKey } from '../../constant';
import styles from './sytle.module.scss';

interface Props {}

export const MyMap: React.FC<Props> = () => {
  const [coords, setCoords] = useState();

  useEffect(() => {
    console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(position =>
      console.log(position.coords.latitude)
    );
  }, []);

  return (
    <div className={styles.wrapper}>
      <Map amapkey={mapKey}></Map>
    </div>
  );
};
