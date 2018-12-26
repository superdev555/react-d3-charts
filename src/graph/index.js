import React, { Component } from 'react';

import Chart from './chart';
import getFilteredGraphData from './selectors';
import getGraphData from './api';
import { StyledDivGraph } from './styled';

import 'nvd3/build/nv.d3.css';
import 'bootstrap3/dist/css/bootstrap.min.css';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      graphData: {},
      error: ''
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const { apiUrl } = this.props;
    this.setState(
      { loading: true },
      () => getGraphData({ apiUrl })
        .then((response) => {
          const graphData = response.data;
          const { getTargets } = this.props;
          getTargets(Object.keys(graphData.data));
          this.setState({ graphData, loading: false });
        })
        .catch((error) => {
          this.setState({ graphData: {}, loading: false, error: error.toString() });
        })
    );
  }

  formatData = (targets) => {
    const { graphData } = this.state;
    if (graphData.length === 0) return {};
    const filteredGraphData = getFilteredGraphData(this.state, this.props, targets);
    if (typeof filteredGraphData == 'undefined') return {};
    const result = [];

    Object.keys(filteredGraphData).forEach((target) => {
      const data = filteredGraphData[target];
      if (data.length > 0) {
        const values = [];
        for (const c in data) {
          if (c) {
            values.push({
              x: data[c][0],
              y: data[c][1]
            });
          }
        }
        result.push({
          key: target,
          values
        });
      }
    });
    return result;
  }

  render() {
    const { targets, height } = this.props;
    const datum = this.formatData(targets);

    const { type } = this.props;
    const { loading, error } = this.state;
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

export default (Graph);
