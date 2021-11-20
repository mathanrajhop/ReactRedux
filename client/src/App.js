import React from 'react';

import {withRouter, Route, Redirect, Switch, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import urlPath from './constant/urlPath';
import Login from './component/login';
import Dashboard from './component/dashboard';

import './App.css';

function App() {
  const history = useHistory();
  const isLogin = useSelector( state => state.storage)

  const dashboardRoutes = [
        {
          url: urlPath.dashboard,
          component: Dashboard,
        }
      ];

  const dashboardOutRoutes = (items) => {
     if (isLogin.isActive) {
    return (
      <>
      {
          items.map(r => {
            return (
              <Route exact key={r.url} path={r.url} component={r.component} />
            )
          })
        }
      </>
      )
    }
  }

  let loggedOutRoutes
  if (!isLogin.isActive) {
    loggedOutRoutes = (
      <>
        <Route exact path={urlPath.login} component={Login}></Route>
        <Route path="*" render={() => (<Redirect to={urlPath.login} />)} />
      </>
    );
  }


  const getRoutes = (items) => {
    if (!items.length) {
      return null;
    }

    return (
      <Switch>

        { dashboardOutRoutes(items) }
        { loggedOutRoutes }
      </Switch>
    );
  }

  return (
    <div className="App">

      {getRoutes(dashboardRoutes)}

    </div>
  );
}

export default withRouter(App);
