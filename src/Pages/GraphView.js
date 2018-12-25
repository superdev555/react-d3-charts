import React, { Component } from 'react';
import Graph from '../components/Graph';
import SearchBar from '../components/SearchBar';
import { GRAPH_TYPE_LINE_CHART } from '../components/Graph/constants';

const startOfMonth = require('date-fns/start_of_month');
const endOfMonth = require('date-fns/end_of_month');
const format = require('date-fns/format');

class GraphView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: format(startOfMonth(new Date()), 'YYYY-MM-DD HH:mm'),
      maxDate: format(endOfMonth(new Date()), 'YYYY-MM-DD HH:mm'),
      type: GRAPH_TYPE_LINE_CHART
    };
  }

  onFilter = (smoment, tmoment) => {
    this.setState({ minDate: smoment, maxDate: tmoment });
  };

  onTypeChange = (type) => {
    this.setState({ type });
  };

  render() {
    const { minDate, maxDate, type } = this.state;
    return (
      <div>
        <SearchBar onFilter={this.onFilter} onTypeChange={this.onTypeChange} />
        <Graph type={type} ApiURL="https://api.com/v1" minDate={minDate} maxDate={maxDate} />
      </div>
    );
  }
}

export default GraphView;
