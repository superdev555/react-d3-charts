import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from './Chart';
import getFilteredGraphData from '../selectors';
import getGraphData from '../api';
import { StyledDivGraph } from '../styled';

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      graphData: {},
      error: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const { apiUrl } = this.props;
    this.setState(
      { loading: true },
      () => getGraphData(apiUrl)
        .then((response) => {
          const graphData = response.data;
          this.setState({ graphData, loading: false });
        })
        .catch((error) => {
          this.setState({ graphData: {}, loading: false, error: error.toString() });
        })
    );
  }

  formatData = (targets) => {
    const { graphData } = this.state;
    if (graphData.length === 0) {
      return {};
    }
    const filteredGraphData = getFilteredGraphData(this.state, this.props, targets);
    if (typeof filteredGraphData == 'undefined') {
      return {};
    }
    const result = [];

    Object.keys(filteredGraphData).forEach((target) => {
      const data = filteredGraphData[target];
      if (data.length > 0) {
        const values = [];
        for (const c in data) {
          if (c) {
            values.push({
              x: data[c][0],
              y: data[c][1],
            });
          }
        }
        result.push({
          key: target,
          values,
        });
      }
    });
    return result;
  }

  render() {
    const { targets, height, type } = this.props;
    const { loading, error } = this.state;
    const datum = this.formatData(targets);

    const StyledDivGraphNew = { ...StyledDivGraph };

    return (
      loading
        ? <div>Loading...</div>
        : error ? <div>{error}</div>
          : (
            <StyledDivGraphNew>
              <Chart type={type} datum={datum} height={height} />
            </StyledDivGraphNew>
          )
    );
  }
}

Graph.propTypes = {
  apiUrl: PropTypes.string,
  targets: PropTypes.array,
  height: PropTypes.number,
  type: PropTypes.number
}

export default Graph;
