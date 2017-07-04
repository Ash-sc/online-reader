import React from 'react';
import { Route, Router, IndexRedirect, hashHistory } from 'react-router';

function requireAuth(nextState, replace) {
  // console.log('auth required!');
  if (0) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

// import TopBar from 'components/_shared/TopBar/TopBar';

const App = (location, callback) => {
  require.ensure([], (require) => {
    callback(null, require('components/_shared/App/App').default);
  }, 'app');
};
// const TopBar = (location, callback) => {
//   require.ensure([], (require) => {
//     callback(null, require('components/_shared/TopBar/TopBar').default);
//   }, 'TopBar');
// };
const loginPage = (location, callback) => {
  require.ensure([], (require) => {
    callback(null, require('./Login/LoginPage').default);
  }, 'loginPage');
};
const IndexPage = (location, callback) => {
  require.ensure([], (require) => {
    callback(null, require('./Index/Index').default);
  }, 'IndexPage');
};
const ArticlePage = (location, callback) => {
  require.ensure([], (require) => {
    callback(null, require('./Article/ArticlePage').default);
  }, 'ArticlePage');
};

export default class RootRoute extends React.Component {

  static get contextTypes() {
    return {
      store: React.PropTypes.object.isRequired,
    };
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route getComponent={App}>
          <Route path="/" onEnter={requireAuth}>
            <IndexRedirect to="article" />
            <Route path="login" getComponent={loginPage} />
            <Route path="index" getComponent={IndexPage} />
            <Route path="article" getComponent={ArticlePage}>
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
}
