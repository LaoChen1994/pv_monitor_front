import React, { useEffect, useState, ReactNode, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { routes } from './constant';
import { INavItem } from './interface';
import cx from 'classnames';

import { Drawer } from './component/Drawer';
import { Footer } from './pages/Footer';

import styles from './sass/index.module.scss';
import './sass/reset.css';

const App: React.FC = () => {
  const [navItemActive, setActive] = useState<number>(0);
  const handleNavChange = useCallback(
    (index: number) => () => setActive(index),
    [setActive]
  );

  const renderNav = (elem: INavItem, index: number): ReactNode => {
    const { urlMatch, name } = elem;

    return (
      <>
        <Link
          to={urlMatch}
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

  const renderNavItem = (elem: INavItem, index: number): ReactNode => {
    const { urlMatch, isExact, component: Component } = elem;
    return (
      <>
        {isExact ? (
          <Route path={urlMatch}>
            <Component></Component>
          </Route>
        ) : (
          <Route path={urlMatch} exact>
            <Component></Component>
          </Route>
        )}
      </>
    );
  };

  // const render

  return (
    <div className="App">
      <Router>
        <nav>
          <Drawer width={'200px'} padding={'30px 0'}>
            <div>{routes.map((elem, index) => renderNav(elem, index))}</div>
          </Drawer>
        </nav>
        <Switch>
          <div className={cx({ [styles.wrapper]: true })}>
            {routes.map((elem, index) => renderNavItem(elem, index))}
            {/* 这个空标签不能删 */}
            <div className={cx({ [styles.push]: true })}></div>
          </div>
        </Switch>
        <div className={cx({ [styles.footer]: true })}>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
