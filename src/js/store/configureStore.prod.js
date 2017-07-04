import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import callAsyncMiddleware from '../middlewares/callAsyncMiddleware';
import shittyApiMiddleware from '../middlewares/shittyApiMiddleware';
import { rootReducer } from '../rootReducer';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, callAsyncMiddleware, shittyApiMiddleware),
      autoRehydrate(),
    )
  );

  persistStore(store, { whitelist: ['subMenu'] });

  return store;
};

export default configureStore;
