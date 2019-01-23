import React, { Component } from 'react'
import Graph from '../../graph/components/Graph'
import SearchBar from '../../search-bar/components/SearchBar'
import { GRAPH_TYPE_LINE_CHART } from '../../graph/constants'
import { StyledDivNav, StyledDivContent } from '../styled'

const startOfMonth = require('date-fns/start_of_month')
const endOfMonth = require('date-fns/end_of_month')
const format = require('date-fns/format')
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
  password: 'g470E6bTu796eZIfwzzIkJmjsCsElZAlX2NLlqtT8wWFsaDTC1J9ZDgB9624CEJv'
}
const baseUrl = 'https://api.apeiron.io/v2/graphs/voice/calls_total'

class View extends Component {
  constructor(props) {
    super(props)

    let apiParams = {},
      apiStr = baseUrl
    Object.keys(components).map(function(key) {
      apiParams[key] = components[key].choices[0].value
      apiStr += '/' + apiParams[key]
    })

    this.state = {
      minDate: format(startOfMonth(new Date()), 'YYYY-MM-DD HH:mm'),
      maxDate: format(endOfMonth(new Date()), 'YYYY-MM-DD HH:mm'),
      type: GRAPH_TYPE_LINE_CHART,
      apiStr: apiStr,
      apiParams: apiParams
    }
  }

  onFilter = (minDate, maxDate) => {
    this.setState({ minDate, maxDate })
  }

  onTypeChange = type => {
    this.setState({ type })
  }

  onApiParamChange = (param, value) => {
    let { apiParams } = this.state
    let apiStr = baseUrl
    apiParams[param] = value

    Object.keys(apiParams).map(function(key) {
      apiStr += '/' + apiParams[key]
    })
    this.setState({ apiStr: apiStr })
  }

  toUnixTimeStamp = date => {
    return new Date(date).getTime() / 1000
  }

  render() {
    const { minDate, maxDate, type, apiStr } = this.state

    const from = this.toUnixTimeStamp(minDate)
    const until = this.toUnixTimeStamp(maxDate)

    return (
      <div>
        <StyledDivNav>
          <SearchBar
            onFilter={this.onFilter}
            onTypeChange={this.onTypeChange}
            components={components}
            onApiParamChange={this.onApiParamChange}
          />
        </StyledDivNav>
        <StyledDivContent>
          <Graph
            type={type}
            apiUrl={`${apiStr}?from=${from}&until=${until}`}
            auth={auth}
            height={400}
          />
        </StyledDivContent>
      </div>
    )
  }
}

export default View
