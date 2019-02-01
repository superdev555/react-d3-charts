import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from './Chart'
import getFormatedGraphData from '../selectors'
import getGraphData from '../api'
import SearchBar from '../../search-bar/components/SearchBar'
import { StyledDivGraph, StyledDivNav, StyledDivContent } from '../styled'

class Graph extends Component {
  constructor(props) {
    super(props)

    const { components, url, defaultStartDate, defaultEndDate } = props
    let apiParams = {},
      apiUrl = url
    Object.keys(components).map(function(key) {
      apiParams[key] = components[key].choices[0].value
      apiUrl += '/' + apiParams[key]
    })

    this.state = {
      apiUrl,
      loading: false,
      graphData: {},
      error: '',
      minDate: defaultStartDate,
      maxDate: defaultEndDate,
      apiParams
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.apiUrl !== this.state.apiUrl ||
      prevState.minDate !== this.state.minDate ||
      prevState.maxDate !== this.state.maxDate
    ) {
      this.getData()
    }
  }

  toUnixTimeStamp = date => {
    return new Date(date).getTime() / 1000
  }

  getData() {
    const { auth } = this.props
    const { minDate, maxDate, apiUrl } = this.state

    const fromDate = this.toUnixTimeStamp(minDate)
    const untilDate = this.toUnixTimeStamp(maxDate)

    this.setState({ loading: true, error: '' }, () =>
      getGraphData(`${apiUrl}?from=${fromDate}&until=${untilDate}`, auth)
        .then(response => {
          const graphData = response.data
          this.setState({ graphData, loading: false })
        })
        .catch(error => {
          this.setState({
            graphData: {},
            loading: false,
            error: error.toString()
          })
        })
    )
  }

  formatData = () => {
    const { graphData } = this.state

    if (graphData.length === 0) {
      return {}
    }
    return getFormatedGraphData(this.state)
  }

  onDateFilter = (minDate, maxDate) => {
    this.setState({ minDate, maxDate })
  }

  onApiParamChange = (param, value) => {
    const { url } = this.props
    let { apiParams } = this.state

    let apiUrl = url
    apiParams[param] = value

    Object.keys(apiParams).map(function(key) {
      apiUrl += '/' + apiParams[key]
    })
    this.setState({ apiUrl })
  }

  render() {
    const {
      chartHeight,
      components,
      chartType,
      minStartDate,
      maxEndDate,
      defaultStartDate,
      defaultEndDate
    } = this.props
    const { loading, error } = this.state

    const datum = this.formatData()
    const StyledDivGraphNew = { ...StyledDivGraph }

    return (
      <div>
        <StyledDivNav>
          <SearchBar
            components={components}
            onDateFilter={this.onDateFilter}
            onApiParamChange={this.onApiParamChange}
            minStartDate={minStartDate}
            maxEndDate={maxEndDate}
            defaultStartDate={defaultStartDate}
            defaultEndDate={defaultEndDate}
          />
        </StyledDivNav>
        <StyledDivContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <StyledDivGraphNew>
              <Chart
                chartType={chartType}
                datum={datum}
                chartHeight={chartHeight}
              />
            </StyledDivGraphNew>
          )}
        </StyledDivContent>
      </div>
    )
  }
}

Graph.propTypes = {
  auth: PropTypes.object,
  url: PropTypes.string,
  components: PropTypes.object,
  minStartDate: PropTypes.instanceOf(Date),
  maxEndDate: PropTypes.instanceOf(Date),
  defaultStartDate: PropTypes.instanceOf(Date),
  defaultEndDate: PropTypes.instanceOf(Date),
  chartHeight: PropTypes.number,
  chartType: PropTypes.number
}

export default Graph
