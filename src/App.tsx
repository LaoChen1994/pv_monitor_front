import React, { useEffect, useState, ReactNode } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { routes } from './constant';
import { INavItem } from './interface';

const App: React.FC = () => {
  const renderNav = (elem: INavItem, index: number): ReactNode => {
    const { urlMatch, name } = elem;

    return (
      <>
        <Link to={urlMatch} key={index}>
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
          <div>{routes.map((elem, index) => renderNav(elem, index))}</div>
        </nav>
        <Switch>
          <div>{routes.map((elem, index) => renderNavItem(elem, index))}</div>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
