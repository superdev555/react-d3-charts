import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import NVD3Chart from 'react-nvd3';

import { getGraphDataSaga } from '../../actions';

import styles from './styles';
import './styles.css';

class Graph extends Component {
  constructor() {
    super();
    this.handleBtnOnClick = this.handleBtnOnClick.bind(this);
    this.state = {
      cur_target: 0
    };
  }

  componentDidMount() {
    this.handleBtnOnClick();
  }
  handleBtnOnClick() {
    this.props.getGraphDataSaga();
  }
  handleTargetChange = (event) => {
    this.setState({cur_target: event.target.value});
  }
  formatData = () => {
    const { graphdata, targets } = this.props;
    if(typeof graphdata.data == 'undefined') return;
    var target = targets[this.state.cur_target];
    var data = graphdata.data[target];
    var values = [];
    for(var c in data) {
      values.push({
        "label" : data[c][0],
        "value" : data[c][1]
      });
    }
    return values;
  }


  render() {
    
    var datum = [{
      key: "Cumulative Return",
      values: this.formatData()
    }];
    return (
      <div style={styles.container}>
        <select class="ui search dropdown" onChange={this.handleTargetChange}>
        {this.props.targets.map((target,i) => (
            <option value={i}>{target}</option>
          ))
        }
        </select>
        <div id="barChart">
          <NVD3Chart type="discreteBarChart" datum={datum} x="label" y="value"/>
        </div>
        {/* <Button
          color="teal"
          onClick={this.handleBtnOnClick}
        >
          Load Graph
        </Button> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  graphdata: state.graphDataReducer.graphdata,
  targets: state.graphDataReducer.targets,
});

const mapDispatchToProps = dispatch => ({
  getGraphDataSaga: () => dispatch(getGraphDataSaga())
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
