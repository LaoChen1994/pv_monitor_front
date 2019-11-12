import React, { useState, useEffect } from 'react';
import { Tabs, Card, Dialog, Button } from 'zent';

import { flowchartContent } from '../../constant';
import styles from './style.module.scss';
import { IFlowchartItem } from '../../interface';

interface Props {}

const TabPanel = Tabs.TabPanel;
const { openDialog, closeDialog } = Dialog;

export const FlowchartTabs: React.FC<Props> = () => {
  const [activeId, setActiveId] = useState<number>(0);

  const _openDialog = (data: IFlowchartItem) => () => {
    const { imgUrl, title } = data;
    const img = require(`../../static/img/PV_IMAGE/${imgUrl}`);
    data.imgUrl = img;
    openDialog({
      dialogId: 'myDialog', // id is used to close the dialog
      title,
      children: getDialogContent(data),
      footer: <Button onClick={() => closeDialog('myDialog')}>关闭</Button>
    });
  };

  const getDialogContent = (data: IFlowchartItem) => {
    const { detail } = data;

    return (
      <div className={styles.cWrapper}>
        <img src={data.imgUrl} alt="流程介绍图" width={500} height={500} />
        <div className={styles.dContent}>
          {detail.map((elem, index) => (
            <div className={styles.block} key={index}>
              <div className={styles.mark} key={`mark-${index}`}></div>
              <div className={styles.content} key={`dcontent-${index}`}>
                {elem}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAction = (data: IFlowchartItem) => (
    <div className={styles.action} onClick={_openDialog(data)}>
      查看详情
    </div>
  );

  return (
    <Tabs
      activeId={activeId}
      onChange={id => {
        setActiveId(id);
      }}
      type="card"
    >
      {flowchartContent.map((elem, index) => {
        return (
          <TabPanel tab={elem.title} id={index}>
            <Card
              style={{ width: 416, textAlign: 'left', height: 200 }}
              title={elem.title}
              action={renderAction(elem)}
            >
              <ol>
                {elem.detail.map((x, i) => (
                  <li key={i} className={styles.cardContent}>{`${i +
                    1}.${x}`}</li>
                ))}
              </ol>
            </Card>
          </TabPanel>
        );
      })}
    </Tabs>
  );
};
