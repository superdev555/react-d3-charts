import React from 'react';
import { render } from 'react-dom';
import View from './view/components/View';

import 'bootstrap3/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');

render(
  <View />,
  rootElement
);
