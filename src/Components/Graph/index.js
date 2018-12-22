import React, { Component } from 'react';
import { connect } from 'react-redux';
import NVD3Chart from 'react-nvd3';
import { Dropdown } from 'semantic-ui-react';
import {
  Container, Row, Col
} from 'reactstrap';
import { getGraphDataSaga } from './actions';

import 'nvd3/build/nv.d3.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';

class Graph extends Component {
  constructor() {
    super();
    this.handleBtnOnClick = this.handleBtnOnClick.bind(this);
    this.state = { cur_target: 0 };
  }

  componentDidMount() {
    this.handleBtnOnClick();
  }

  componentWillReceiveProps(props) {
    if (this.props.minDate === props.minDate && this.props.maxDate === props.maxDate) {
      return;
    }
    this.props = props;
    this.handleBtnOnClick();
  }

  handleTargetChange = (event, data) => {
    this.setState({ cur_target: data.value });
  }

  formatData = () => {
    const { graphdata, targets } = this.props;
    const { cur_target } = this.state;
    if (typeof graphdata.data == 'undefined') return [];
    const data = graphdata.data[targets[cur_target].text];
    const values = [];
    for (const c in data) {
      if (c) {
        values.push({
          label: data[c][0],
          value: data[c][1]
        });
      }
    }
    return values;
  }

  handleBtnOnClick() {
    const { getGraphDataFunc } = this.props;
    const { minDate, maxDate, ApiURL } = this.props;
    const param = { minDate, maxDate, ApiURL };
    getGraphDataFunc(param);
  }

  render() {
    const datum = [{
      key: 'Cumulative Return',
      values: this.formatData()
    }];
    const { targets } = this.props;
    const { cur_target } = this.state;
    return (
      <Container style={{
        paddingTop: 20, paddingBottom: 20, marginBottom: 20, backgroundColor: '#eeeeee'
      }}
      >
        <Row>
          <Col>
            <Dropdown className="float-right" placeholder="State" search selection options={targets} defaultValue={cur_target} onChange={this.handleTargetChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="barChart">
              <NVD3Chart type="discreteBarChart" datum={datum} x="label" y="value" />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  graphdata: state.graphDataReducer.graphdata,
  targets: state.graphDataReducer.targets,
});

const mapDispatchToProps = dispatch => ({
  getGraphDataFunc: param => dispatch(getGraphDataSaga(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
