import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Col
} from 'reactstrap';
import CustomChart from '../CustomChart';
import { getGraphDataSaga } from './actions';
import getFilteredGraphData from './selectors';

import 'nvd3/build/nv.d3.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';

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
    const colors = ['#98df8a', '#ffbb78', '#ff9896', '#1f77b4'];


    Object.keys(filteredGraphData).forEach((target, i) => {
      const data = filteredGraphData[target];
      console.log('len=', data.length);
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
        console.log(values, values.length);

        const newobject = { key: target, values, color: colors[i] };
        ret.push(newobject);
      }
    });
    console.log(ret);

    return ret;
  }

  render() {
    const datum = this.formatData();
    return (
      <Container style={{
        paddingTop: 20, paddingBottom: 20, marginBottom: 20, backgroundColor: '#eeeeee'
      }}
      >
        <Row>
          <Col>
            <div id="barChart">
              <CustomChart datum={datum} />
            </div>
          </Col>
        </Row>
      </Container>
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
