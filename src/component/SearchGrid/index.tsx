import React from 'react';
import {
  Grid,
  IGridColumn,
  Tag,
  Button,
  IGridOnChangeConfig,
  Notify
} from 'zent';
import { ISearchGridProp } from '../../interface';

export const SearchGrid: React.FC<ISearchGridProp> = props => {
  const { searchDataset, handlePageChange, pageInfo, pageLink } = props;

  const columns: IGridColumn[] = [
    {
      title: 'ID',
      name: 'id',
      width: 100
    },
    {
      title: '录入时间 / 地点',
      name: 'date',
      width: '30%',
      bodyRender: ({ date }, pos) => {
        const _ = new Date(date);
        return (
          <>
            <div>{`${_.getFullYear()}-${_.getMonth() +
              1}-${_.getDate()}     ${_.getHours()} : ${_.getMinutes()} : ${_.getSeconds()} `}</div>
            <div>福建省福州市乌龙江北大道2号　1号光伏电站</div>
          </>
        );
      }
    },
    {
      title: '数据类型',
      width: '15%',
      bodyRender: ({ data_type }, pos) => (
        <Tag theme={data_type ? 'red' : 'blue'} outline rounded>
          {data_type ? '实测数据' : '模拟数据'}
        </Tag>
      )
    },
    {
      title: '数据来源',
      width: '15%',
      bodyRender: ({ isNew }, pos) => (
        <Tag theme={isNew ? 'blue' : 'green'} outline rounded>
          {isNew ? '实时数据' : '历史数据'}
        </Tag>
      )
    },
    {
      title: '操作',
      bodyRender: ({ id }) => (
        <div>
          <Button
            type="primary"
            icon="search"
            style={{ marginRight: '20px' }}
            onClick={() => {
              pageLink && pageLink(id);
            }}
          >
            查询
          </Button>
          <Button type="danger" outline icon="close" onClick={delCurves}>
            删除
          </Button>
        </div>
      )
    }
  ];

  const handleChange = ({ current }: IGridOnChangeConfig) => {
    current && handlePageChange(current);
  };

  const delCurves = () => {
    Notify.error('目前暂不支持现在删除曲线！');
  };

  return (
    <Grid
      columns={columns}
      datasets={searchDataset}
      pageInfo={pageInfo}
      onChange={handleChange}
      scroll={{ y: 800 }}
    ></Grid>
  );
};
