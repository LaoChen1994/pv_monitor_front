import React from 'react';
import cx from 'classnames';
import styles from './style.module.scss';
import iconStyles from '../../sass/fontIcon.module.scss';
import { contact } from '../../constant';

interface Props {}

export const Footer: React.FC<Props> = () => {
  return (
    <div className={cx({ [styles.wrapper]: true })}>
      <img
        src={require('../../static/img/PV_IMAGE/FZULogo.png')}
        alt="福大logo"
        className={styles.imgBox}
      />
      <div className={styles.introduction} style={{ pointerEvents: 'none' }}>
        <div>
          本站点为非盈利光伏实时故障检测平台，提供的内容仅适用于
          <a
            href="https://www.fzu.edu.cn/"
            target="_blank"
            className={styles.highlight}
          >
            福州大学
          </a>
          物信学院微纳器件与太阳能电池研究所。
        </div>
        <div className="addr footerFont">
          <span>
            &copy;2015
            福州大学地址：福建省福州市福州大学城乌龙江北大道2号&nbsp;&nbsp;邮编：350108&nbsp;&nbsp;传真：86-0591-22866099
          </span>
        </div>
      </div>
      <div className={styles.connect}>
        {contact.map((elem, index) =>
          elem.url ? (
            <a
              key={`contact-${index}`}
              className={styles.connect_item}
              href={elem.url}
              target="_blank"
            >
              <span
                className={cx({
                  [iconStyles[`icon-${elem.iconName}`]]: true,
                  [iconStyles.iconfont]: true,
                  [styles.icon]: true
                })}
              ></span>
              <span
                className={cx({
                  [styles.iconText]: true,
                  [styles.highlight]: true
                })}
              >
                {elem.name}
              </span>
            </a>
          ) : (
            <div
              key={`contact-${index}`}
              className={styles.connect_item}
              style={{ pointerEvents: 'none' }}
            >
              <span
                className={cx({
                  [iconStyles[`icon-${elem.iconName}`]]: true,
                  [iconStyles.iconfont]: true,
                  [styles.icon]: true
                })}
              ></span>
              <span
                className={cx({
                  [styles.iconText]: true,
                  [styles.highlight]: true
                })}
              >
                {elem.name}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};
