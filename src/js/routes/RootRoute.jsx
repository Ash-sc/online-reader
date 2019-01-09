import React from 'react';
import { Route, Router, IndexRedirect, hashHistory } from 'react-router';

import App from 'components/_shared/App/App';
import loginPage from './Login/LoginPage';
import IndexPage from './Index/Index';
import ArticlePage from './Article/ArticlePage';

export default class RootRoute extends React.Component {

  static get contextTypes() {
    return {
      store: React.PropTypes.object.isRequired,
    };
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route component={App}>
          <Route path="/">
            <IndexRedirect to="article" />
            <Route path="login" component={loginPage} />
            <Route path="index" component={IndexPage} />
            <Route path="article" component={ArticlePage}>
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
}
