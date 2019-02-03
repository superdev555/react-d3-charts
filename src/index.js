import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import App from './app/components/App'
import DefaultErrorBoundary from './app/components/DefaultErrorBoundary'
require('react-datepicker/dist/react-datepicker-cssmodules.css')

if (process.env.NODE_ENV === 'development') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

ReactDOM.render(
  <DefaultErrorBoundary>
    <App />
  </DefaultErrorBoundary>,
  document.getElementById('app')
)
