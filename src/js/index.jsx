import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'assets/sass/styles.scss';
import 'assets/favicon.ico';
import 'index.html';

import RootRoute from './routes/RootRoute';
import configureStore from './store/configureStore';
// older browser support
require('es6-promise').polyfill();
require('isomorphic-fetch');

// load images and fonts
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('assets/fonts/', true));
requireAll(require.context('assets/images/', true));

const store = configureStore();

render(
  <Provider store={store}>
    <RootRoute />
  </Provider>,
  document.getElementById('app')
);

