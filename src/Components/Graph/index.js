import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import styled from 'styled-components';

import CustomChart from '../CustomChart';
import { getGraphDataSaga } from './actions';
import getFilteredGraphData from './selectors';

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
    const colors = ['#ff9896', '#1f77b4', '#98df8a', '#ffbb78'];

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
    const StyledGrid = styled(Grid)`
      padding: 20px;
      background-color: #eeeeee;
    `;
    const { type } = this.props;
    return (

      <StyledGrid>
        <Row>
          <Col xs={12} md={12}>
            <div>
              <CustomChart type={type} datum={datum} svgHeight="400px" />
            </div>
          </Col>
        </Row>
      </StyledGrid>
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
