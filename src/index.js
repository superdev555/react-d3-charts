import React from 'react';
import { render } from 'react-dom';


import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import store, { history } from './store';

import GraphView from './pages/GraphView';

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={GraphView} />
      </div>
    </ConnectedRouter>
  </Provider>,
  rootElement
);

registerServiceWorker();
