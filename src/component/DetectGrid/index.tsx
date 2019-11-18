import React, { useMemo } from 'react';
import { Grid, IGridColumn } from 'zent';
import { IGetAlgorithmAcc } from '../../interface';
import { faultTypes } from '../../constant';

interface Props {
  data: IGetAlgorithmAcc[];
}

export const DetectGrid: React.FC<Props> = props => {
  const { data } = props;

  const renderColum: IGridColumn<IGetAlgorithmAcc>[] = useMemo(
    () => [
      {
        title: '故障类型',
        bodyRender: ({ frontendText }) => {
          return faultTypes[frontendText];
        }
      },
      {
        title: '正确样本/总样本',
        name: 'samples'
      },
      {
        title: '准确率',
        name: 'accuracy'
      }
    ],
    [data]
  );

  return (
    <Grid datasets={data} columns={renderColum} scroll={{ y: 250 }}></Grid>
  );
};
