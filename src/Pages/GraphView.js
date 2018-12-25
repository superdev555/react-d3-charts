import React, { Component } from 'react';
import Graph from '../components/Graph';
import SearchBar from '../components/SearchBar';

const startOfMonth = require('date-fns/start_of_month');
const endOfMonth = require('date-fns/end_of_month');
const format = require('date-fns/format');

class GraphView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: format(startOfMonth(new Date()), 'YYYY-MM-DD HH:mm'),
      maxDate: format(endOfMonth(new Date()), 'YYYY-MM-DD HH:mm')
    };
  }

  onFilter = (smoment, tmoment) => {
    this.setState({ minDate: smoment, maxDate: tmoment });
  };

  render() {
    //
    const { minDate, maxDate } = this.state;
    return (
      <div>
        <SearchBar onFilter={this.onFilter} />
        <Graph ApiURL="https://api.com/v1" minDate={minDate} maxDate={maxDate} />
      </div>
    );
  }
}

export default GraphView;
