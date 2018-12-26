import React, { Component } from 'react';
import Graph from '../graph';
import SearchBar from './searchBar';
import { GRAPH_TYPE_LINE_CHART } from '../graph/constants';
import { StyledDivNav, StyledDivContent } from './styled';

const startOfMonth = require('date-fns/start_of_month');
const endOfMonth = require('date-fns/end_of_month');
const format = require('date-fns/format');

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: format(startOfMonth(new Date()), 'YYYY-MM-DD HH:mm'),
      maxDate: format(endOfMonth(new Date()), 'YYYY-MM-DD HH:mm'),
      type: GRAPH_TYPE_LINE_CHART,
      targets: [],
      dispTargets: []
    };
  }

  onFilter = (minDate, maxDate) => {
    this.setState({ minDate, maxDate });
  };

  getTargets = (dispTargets) => {
    this.setState({ dispTargets });
  };

  setTargets = (targets) => {
    this.setState({ targets });
  };

  onTypeChange = (type) => {
    this.setState({ type });
  };

  render() {
    const {
      minDate, maxDate, type, targets, dispTargets
    } = this.state;
    return (
      <div>
        <StyledDivNav>
          <SearchBar
            onFilter={this.onFilter}
            onTypeChange={this.onTypeChange}
            setTargets={this.setTargets}
            dispTargets={dispTargets}
          />
        </StyledDivNav>
        <StyledDivContent>
          <Graph
            type={type}
            apiUrl="database.json"
            minDate={minDate}
            maxDate={maxDate}
            targets={targets}
            getTargets={this.getTargets}
            height={400}
          />
        </StyledDivContent>
      </div>

    );
  }
}

export default View;
