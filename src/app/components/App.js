import React from 'react'
import { hot } from 'react-hot-loader'
import View from './View'

class App extends React.Component {
  render() {
    return (
      <div>
        <View/>
      </div>
    )
  }
}

export default hot(module)(App)
