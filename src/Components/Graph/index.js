import React, { Component } from 'react';
import { connect } from 'react-redux';
import NVD3Chart from 'react-nvd3';
import { Dropdown, Container, Grid } from 'semantic-ui-react';
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
    getGraphDataFunc();
  }

  render() {
    const datum = [{
      key: 'Cumulative Return',
      values: this.formatData()
    }];
    const { targets } = this.props;
    const { cur_target } = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Dropdown className="float-right" placeholder="State" search selection options={targets} defaultValue={cur_target} onChange={this.handleTargetChange} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div id="barChart">
                <NVD3Chart type="discreteBarChart" datum={datum} x="label" y="value" />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  graphdata: state.graphDataReducer.graphdata,
  targets: state.graphDataReducer.targets,
});

const mapDispatchToProps = dispatch => ({
  getGraphDataFunc: () => dispatch(getGraphDataSaga())
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
