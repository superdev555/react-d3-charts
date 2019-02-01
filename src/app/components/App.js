import React from 'react'
import { hot } from 'react-hot-loader'
import Graph from '../../graph/components/Graph'
import { GRAPH_TYPE_LINE_CHART } from '../../graph/constants'
import { startOfMonth, endOfMonth } from 'date-fns'

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

    return (
      <Graph
        url={url}
        auth={auth}
        components={components}
        minStartDate={new Date('1990-01-01T00:00:00')}
        maxEndDate={new Date('2030-12-31T00:00:00')}
        defaultStartDate={startOfMonth(new Date())}
        defaultEndDate={endOfMonth(new Date())}
        chartHeight={400}
        chartType={GRAPH_TYPE_LINE_CHART}
      />
    )
  }
}

export default hot(module)(App)
