import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import callAsyncMiddleware from '../middlewares/callAsyncMiddleware';
import shittyApiMiddleware from '../middlewares/shittyApiMiddleware';
import { rootReducer } from '../rootReducer';
import DevTools from '../dev/devTools';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, callAsyncMiddleware, shittyApiMiddleware),
      DevTools.instrument(),
      autoRehydrate(),
    )
  );

  persistStore(store, { whitelist: ['subMenu'] });

  return store;
};

export default configureStore;
