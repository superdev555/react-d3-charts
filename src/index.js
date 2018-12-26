import React from 'react';
import { render } from 'react-dom';

//import registerServiceWorker from './registerServiceWorker';

import View from './view';

const rootElement = document.getElementById('root');

render(
  <View />,
  rootElement
);

//registerServiceWorker();
