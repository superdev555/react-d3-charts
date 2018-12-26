import { createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './graph/reducers';
import sagas from './graph/sagas';

export const history = createHistory();


const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const enhancers = [];
const middleware = [
  routerMiddleware(history),
  sagaMiddleware,
  logger
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
);

sagaMiddleware.run(sagas);

export default store;
