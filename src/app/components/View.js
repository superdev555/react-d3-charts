import React, { Component } from 'react';
import Graph from '../../graph/components/Graph';
import SearchBar from '../../search-bar/components/SearchBar';
import { GRAPH_TYPE_LINE_CHART } from '../../graph/constants';
import { StyledDivNav, StyledDivContent } from '../styled';

const startOfMonth = require('date-fns/start_of_month');
const endOfMonth = require('date-fns/end_of_month');
const format = require('date-fns/format');

const trunk_id = {
  label: "Trunk Groups",
  type: "drop_down",
  choices: [
    { label: "Choice 1", value: 101064 },
  ]
};
const direction = {
  label: "Direction",
  type: "drop_down",
  default: "both",
  choices: [
    { label: "Inbound", value: "inbound" },
    { label: "Outbound", value: "outbound" },
    { label: "Both", value: "both" },
  ]
}
const auth = {
  username: "mauricio.severi1212@gmail.com",
  password: "g470E6bTu796eZIfwzzIkJmjsCsElZAlX2NLlqtT8wWFsaDTC1J9ZDgB9624CEJv",
};

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minDate: format(startOfMonth(new Date()), 'YYYY-MM-DD HH:mm'),
      maxDate: format(endOfMonth(new Date()), 'YYYY-MM-DD HH:mm'),
      type: GRAPH_TYPE_LINE_CHART,
      curTrunkId: trunk_id.choices[0].value,
      curDirection: direction.choices[0].value,
    };
  }

  onFilter = (minDate, maxDate) => {
    this.setState({ minDate, maxDate });
  };

  onTypeChange = (type) => {
    this.setState({ type });
  };

  onApiParamChange = (param) => {
    this.setState(param);
  };

  toUnixTimeStamp = (date) => {
    return new Date(date).getTime() / 1000;
  };

  render() {
    const {
      minDate, maxDate, type, curTrunkId, curDirection,
    } = this.state;

    const from = this.toUnixTimeStamp(minDate);
    const until = this.toUnixTimeStamp(maxDate);

    return (
      <div>
        <StyledDivNav>
          <SearchBar
            onFilter={this.onFilter}
            onTypeChange={this.onTypeChange}
            onApiParamChange={this.onApiParamChange}
            trunk_id={trunk_id}
            direction={direction}
          />
        </StyledDivNav>
        <StyledDivContent>
          <Graph
            type={type}
            apiUrl={`https://api.apeiron.io/v2/graphs/voice/calls_total/${curTrunkId}/${curDirection}?from=${from}&until=${until}`}
            auth={auth}
            height={400}
          />
        </StyledDivContent>
      </div>

    );
  }
}

export default View;
