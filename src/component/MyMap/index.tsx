import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'react-amap';
import { mapKey } from '../../constant';
import styles from './sytle.module.scss';
import { IMyMapProps } from '../../interface';
import { Pop } from 'zent';

export const MyMap: React.FC<IMyMapProps> = props => {
  const { center } = props;
  const renderMarker = () => (
    <Pop trigger="click" content="福大光伏电站1号">
      <div className={styles.marker}></div>
    </Pop>
  );
  return (
    <div className={styles.wrapper}>
      <Map
        amapkey={mapKey}
        center={center}
        zoom={16}
        plugins={['ToolBar', 'Scale']}
      >
        <Marker markers={[{ position: center }]} render={renderMarker}></Marker>
      </Map>
    </div>
  );
};
