import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import store, { history } from './store';

import View from './view';

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={View} />
      </div>
    </ConnectedRouter>
  </Provider>,
  rootElement
);

registerServiceWorker();
