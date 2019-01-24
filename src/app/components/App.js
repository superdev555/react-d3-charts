import React from 'react'
import { hot } from 'react-hot-loader'
import Graph from '../../graph/components/Graph'

class App extends React.Component {
  render() {
    const components = {
      trunk_id: {
        label: 'Trunk Groups',
        type: 'drop_down',
        choices: [
          { label: 'Choice 1', value: 101064 },
          { label: 'Choice 2', value: 101065 }
        ]
      },
      direction: {
        label: 'Direction',
        type: 'drop_down',
        default: 'both',
        choices: [
          { label: 'Inbound', value: 'inbound' },
          { label: 'Outbound', value: 'outbound' },
          { label: 'Both', value: 'both' }
        ]
      }
    }
    const auth = {
      username: 'mauricio.severi1212@gmail.com',
      password:
        'g470E6bTu796eZIfwzzIkJmjsCsElZAlX2NLlqtT8wWFsaDTC1J9ZDgB9624CEJv'
    }
    const url = 'https://api.apeiron.io/v2/graphs/voice/calls_total'

    return <Graph url={url} auth={auth} components={components} height={400} />
  }
}

export default hot(module)(App)
