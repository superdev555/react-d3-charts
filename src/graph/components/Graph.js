import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from './Chart'
import getFormatedGraphData from '../selectors'
import getGraphData from '../api'
import { StyledDivGraph } from '../styled'

class Graph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiUrl: '',
      loading: false,
      graphData: {},
      error: ''
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.apiUrl !== this.state.apiUrl) {
      this.getData()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.apiUrl !== prevState.apiUrl) {
      return { apiUrl: nextProps.apiUrl }
    } else return null
  }

  getData() {
    const { apiUrl } = this.state
    const { auth } = this.props
    this.setState({ loading: true, error: '' }, () =>
      getGraphData(apiUrl, auth)
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

  render() {
    const { height, type } = this.props
    const { loading, error } = this.state
    const datum = this.formatData()

    const StyledDivGraphNew = { ...StyledDivGraph }

    return loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      <StyledDivGraphNew>
        <Chart type={type} datum={datum} height={height} />
      </StyledDivGraphNew>
    )
  }
}

Graph.propTypes = {
  apiUrl: PropTypes.string,
  auth: PropTypes.object,
  height: PropTypes.number,
  type: PropTypes.number
}

export default Graph
