import React, { Component } from 'react';

import { Row, Col } from 'react-bootstrap';
import CustomChart from './customChart';
import getFilteredGraphData from './selectors';
import getGraphData from './api';
import { StyledDivGraph } from '../styledComponents';

import 'nvd3/build/nv.d3.css';
import 'bootstrap3/dist/css/bootstrap.min.css';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      graphData: {},
      errorMsg: ''
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const { ApiURL } = this.props;
    const param = { ApiURL };
    this.setState({ loading: true });
    getGraphData(param)
      .then((response) => {
        const graphData = response.data;
        const { getTargets } = this.props;
        getTargets(Object.keys(graphData.data));

        this.setState({ graphData, loading: false });
      })
      .catch((err) => {
        this.setState({ graphData: {}, loading: false, errorMsg: err });
      });
  }

  formatData = (targets) => {
    const { graphData } = this.state;
    if (graphData.length === 0) return {};
    const filteredGraphData = getFilteredGraphData(this.state, this.props, targets);
    if (typeof filteredGraphData == 'undefined') return {};
    const ret = [];
    const colors = ['#ff533d', '#52004b', '#80ff00', '#ffd43d'];

    Object.keys(filteredGraphData).forEach((target, i) => {
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
        const newobject = {
          key: target, values, color: colors[i]
        };
        ret.push(newobject);
      }
    });
    return ret;
  }

  render() {
    const { targets, graphHeight } = this.props;
    const datum = this.formatData(targets);

    const { type } = this.props;
    const { loading } = this.state;
    const StyledDivGraphNew = { ...StyledDivGraph };
    return (loading) ? (<div>Loading...</div>) : (
      <StyledDivGraphNew>
        <Row>
          <Col xs={12} md={12}>
            <CustomChart type={type} datum={datum} svgHeight={graphHeight} />
          </Col>
        </Row>
      </StyledDivGraphNew>
    );
  }
}

export default (Graph);
