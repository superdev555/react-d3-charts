import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import CustomChart from './customChart';
import { getGraphDataSaga } from './actions';
import getFilteredGraphData from './selectors';
import { StyledDivGraph } from '../styledComponents';

import 'nvd3/build/nv.d3.css';
import 'bootstrap3/dist/css/bootstrap.min.css';

class Graph extends Component {
  componentDidMount() {
    this.getData();
  }

  getData() {
    const { getGraphDataFunc } = this.props;
    const { ApiURL } = this.props;
    const param = { ApiURL };
    getGraphDataFunc(param);
  }

  formatData = () => {
    const { filteredGraphData } = this.props;
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
          key: target, values, color: colors[i], area: true
        };
        ret.push(newobject);
      }
    });

    return ret;
  }

  render() {
    const datum = this.formatData();

    const { type } = this.props;
    const StyledDivGraphNew = { ...StyledDivGraph };
    return (
      <StyledDivGraphNew>
        <Row>
          <Col xs={12} md={12}>
            <CustomChart type={type} datum={datum} svgHeight="400px" />
          </Col>
        </Row>
      </StyledDivGraphNew>
    );
  }
}
const mapStateToProps = (state, props) => ({
  filteredGraphData: getFilteredGraphData(state, props),
});

const mapDispatchToProps = dispatch => ({
  getGraphDataFunc: param => dispatch(getGraphDataSaga(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
