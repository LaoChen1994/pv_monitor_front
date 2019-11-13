import React, { useState, ReactNode, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { AppContext } from './store/AppContext';
import { routes } from './constant';
import { INavItem } from './interface';
import cx from 'classnames';
import { Breadcrumb, IBreadcrumbItemProps } from 'zent';

import { Drawer } from './component/Drawer';
import { Footer } from './component/Footer';

import styles from './sass/index.module.scss';
import './sass/reset.css';

import { BlockLoading } from 'zent';

const App: React.FC = () => {
  const [navItemActive, setActive] = useState<number>(0);

  const handleNavChange = useCallback(
    (index: number) => () => {
      setActive(index);
      addNewBreads({ name: routes[index].name });
    },
    [setActive]
  );
  const [breads, setBreads] = useState<IBreadcrumbItemProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const renderNav = (elem: INavItem, index: number): ReactNode => {
    const { urlMatch, name } = elem;

    return (
      <>
        <Link
          to={urlMatch.replace(/:(.*)/gi, '1')}
          key={index}
          className={cx({
            [styles.navLink]: true,
            [styles.active]: index === navItemActive
          })}
          onClick={handleNavChange(index)}
        >
          {name}
        </Link>
      </>
    );
  };

  const setPageLoading = (status: boolean) => {
    setLoading(status);
  };

  const addNewBreads = (bread: IBreadcrumbItemProps) => {
    setBreads([{ name: '官网首页', href: '//www.fzu.edu.cn' }, bread]);
  };

  const renderNavItem = (elem: INavItem, index: number): ReactNode => {
    const { urlMatch, isExact, component: Component } = elem;
    return (
      <>
        {isExact ? (
          <Route path={urlMatch} component={Component}></Route>
        ) : (
          <Route path={urlMatch} exact component={Component}></Route>
        )}
      </>
    );
  };

  return (
    <div className="App">
      <AppContext.Provider
        value={{ handleNavChange, addNewBreads, setPageLoading }}
      >
        <Router>
          <nav>
            <Drawer width={'200px'} padding={'30px 0'}>
              <div>{routes.map((elem, index) => renderNav(elem, index))}</div>
            </Drawer>
          </nav>

          <div className={cx({ [styles.header]: true })}>
            <Breadcrumb breads={breads}></Breadcrumb>
          </div>
          <BlockLoading
            icon="circle"
            iconText="页面加载中,请稍等"
            iconSize={64}
            loading={isLoading}
          >
            <Switch>
              <div className={cx({ [styles.wrapper]: true })}>
                {routes.map((elem, index) => renderNavItem(elem, index))}
                {/* 这个空标签不能删 */}
                <div className={cx({ [styles.push]: true })}></div>
              </div>
            </Switch>
          </BlockLoading>

          <div className={cx({ [styles.footer]: true })}>
            <Footer />
          </div>
        </Router>
      </AppContext.Provider>
    </div>
  );
};

export default App;
