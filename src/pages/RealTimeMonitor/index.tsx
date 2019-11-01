import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { MyForm } from '../../component/SearchForm';
import { SearchGrid } from '../../component/SearchGrid';
import { ISearchFormData, ITableSearchInfo, IPageInfo } from '../../interface';
import { radioList, notesList } from '../../constant';
import { RouteComponentProps } from 'react-router-dom';
import {
  LayoutRow as Row,
  LayoutCol as Col,
  LayoutGrid as Grid,
  LayoutConfigProvider as ConfigProvider
} from 'zent';

import { getSearchTableData } from '../../api';
import { useAppContext } from '../../store/AppContext';

export const RealTimeMonitor: React.FC<{} & RouteComponentProps> = props => {
  const [formData, setFormData] = useState<ISearchFormData>({
    mode: '',
    timeRange: []
  });
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    current: 1,
    pageSize: 20,
    totalItem: 0
  });
  const [gridData, setGridData] = useState<ITableSearchInfo[]>([]);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const { handleNavChange, addNewBreads } = useAppContext();

  const updateFormValue = (formValue: ISearchFormData) => {
    setFormData(formValue);
  };

  const getSearchInfo = async (
    startPage: number,
    endPage: number,
    low?: number,
    high?: number,
    mode?: number
  ) => {
    low && setFormLoading(true);

    const { data } = await getSearchTableData(
      startPage * pageInfo.pageSize,
      endPage * pageInfo.pageSize,
      low,
      high,
      mode
    );

    setFormLoading(false);

    const { data: itemList, totalNumber: totalItem } = data;

    setGridData(itemList);
    if (totalItem !== pageInfo.totalItem) {
      setPageInfo({ ...pageInfo, totalItem });
    }
  };

  const handlePageInfo = (current: number) => {
    setPageInfo({ ...pageInfo, current });
  };

  const linkToSearch = (id: number) => {
    const { push } = props.history;
    push(`/query_curve/${id}`);
    handleNavChange && handleNavChange(1)();
  };

  useEffect(() => {
    addNewBreads && addNewBreads({ name: '曲线检测' });
  }, []);

  const renderNotes: () => React.ReactElement = () => (
    <div className={styles.notes}>
      <div className={styles.subtitle}>使用说明</div>
      <div className={styles.content}>
        <ol>
          {notesList.map((elem, index) => (
            <li
              key={`noteItem-${index}`}
              className={styles.note_item}
            >{`${index + 1}. ${elem}`}</li>
          ))}
        </ol>
      </div>
    </div>
  );

  useEffect(() => {
    const { current } = pageInfo;
    const { timeRange, mode } = formData;
    const [start, end, dataType] = timeRange.length
      ? [...timeRange.map(elem => new Date(elem).getTime()), +mode]
      : [undefined, undefined, undefined];
    getSearchInfo(current - 1, current, start, end, dataType);
  }, [pageInfo, formData]);

  return (
    <ConfigProvider
      value={{ rowGutter: 16, colGutter: { fallback: 4, xxl: 12 } }}
    >
      <Grid className={styles.wrapper}>
        <Row className={styles.filter}>
          <Col span={16}>
            <div className={styles.form}>
              <MyForm
                dataMode={{
                  initialValue: '1',
                  radioList: radioList
                }}
                loading={formLoading}
                updateFormValue={updateFormValue}
              ></MyForm>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.notes}>{renderNotes()}</div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <SearchGrid
              searchDataset={gridData}
              handlePageChange={handlePageInfo}
              pageInfo={pageInfo}
              pageLink={linkToSearch}
            ></SearchGrid>
          </Col>
        </Row>
      </Grid>
    </ConfigProvider>
  );
};
