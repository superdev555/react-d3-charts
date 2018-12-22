import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../Components/Graph';
import SearchBar from '../Components/SearchBar';

class GraphView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: moment().startOf('month').format('YYYY-MM-DD HH:mm'),
      maxDate: moment().endOf('month').format('YYYY-MM-DD HH:mm')
    };
  }

  onFilter = (smoment, tmoment) => {
    this.setState({ minDate: smoment, maxDate: tmoment });
  };

  render() {
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
