import React from 'react'
import { hot } from 'react-hot-loader'
import Graph from '../../graph/components/Graph'
import { data1, data2 } from './data'

class App extends React.Component {
  render() {
    return (
      <div>
        <Graph
          url={data1.url}
          auth={data1.auth}
          components={data1.components}
          minStartDate={new Date(data1.minStartDate)}
          maxEndDate={new Date(data1.maxEndDate)}
          defaultStartDate={new Date(data1.defaultStartDate)}
          defaultEndDate={new Date(data1.defaultEndDate)}
          chartType={data1.chartType}
          chartHeight={data1.chartHeight}
        />
        <Graph
          url={data2.url}
          auth={data2.auth}
          components={data2.components}
          minStartDate={new Date(data2.minStartDate)}
          maxEndDate={new Date(data2.maxEndDate)}
          defaultStartDate={new Date(data2.defaultStartDate)}
          defaultEndDate={new Date(data2.defaultEndDate)}
          chartType={data2.chartType}
          chartHeight={data2.chartHeight}
        />
      </div>
    )
  }
}

export default hot(module)(App)
