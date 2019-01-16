import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Row, Col,
} from 'react-bootstrap';
import Select from 'react-select';
import { GRAPH_TYPE_LINE_CHART, GRAPH_TYPE_BAR_CHART } from '../../graph/constants';

const DatePicker = require('react-16-bootstrap-date-picker');
const startOfMonth = require('date-fns/start_of_month');
const endOfMonth = require('date-fns/end_of_month');
const format = require('date-fns/format');

const chartTypes = [
  { value: GRAPH_TYPE_LINE_CHART, label: 'Line Chart' },
  { value: GRAPH_TYPE_BAR_CHART, label: 'Bar Chart' },
];

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minDate: startOfMonth(new Date()),
      maxDate: endOfMonth(new Date()),
      selectedOption: chartTypes[0],
      curTrunkId: props.trunk_id.choices[0],
      curDirection: props.direction.choices[0],
    };
  }

  handleStartChange = (minDate) => {
    this.setState({ minDate }, () => this.onFilter());
  }

  handleEndChange = (maxDate) => {
    this.setState({ maxDate }, () => this.onFilter());
  }

  onFilter = () => {
    const { minDate, maxDate } = this.state;
    const { onFilter } = this.props;
    if (minDate > maxDate) {
      alert('Start date must be less than end date.');
    } else {
      onFilter(format(minDate, 'YYYY-MM-DD'), format(maxDate, 'YYYY-MM-DD'));
    }
  }

  handleTypeChange = (type) => {
    const { onTypeChange } = this.props;
    this.setState({ selectedOption: type }, () => onTypeChange(type.value));
  }

  handleTrunkChange = (trunk) => {
    const { onApiParamChange } = this.props;
    this.setState({ curTrunkId: trunk }, () => onApiParamChange({curTrunkId: trunk.value}));
  }

  handleDirectionChange = (direction) => {
    const { onApiParamChange } = this.props;
    this.setState({ curDirection: direction }, () => onApiParamChange({curDirection: direction.value}));
  }

  render() {
    const {
      minDate, maxDate, selectedOption, curTrunkId, curDirection
    } = this.state;
    const { trunk_id, direction } = this.props;

    return (
      <Grid>
        <Row>
          <Col md={3} xs={10}>
            <p>Chart type:</p>
            <Select
              aria-label="Chart type"
              value={selectedOption}
              options={chartTypes}
              onChange={this.handleTypeChange}
            />
          </Col>
          <Col md={2} xs={10}>
            <p>{trunk_id.label}</p>
            <Select
              aria-label="Trunk type"
              value={curTrunkId}
              options={trunk_id.choices}
              onChange={this.handleTrunkChange}
            />
          </Col>
          <Col md={2} xs={10}>
            <p>{direction.label}</p>
            <Select
              aria-label="Direction type"
              value={curDirection}
              options={direction.choices}
              onChange={this.handleDirectionChange}
            />
          </Col>
          <Col md={2} xs={5}>
            <p>Start date:</p>
            <DatePicker
              aria-label="Start date"
              id="start_datepicker"
              value={format(minDate, 'YYYY-MM-DD HH:mm')}
              onChange={this.handleStartChange}
              showClearButton={false}
            />
          </Col>
          <Col md={2} md-offset={1} xs={5}>
            <p>End date:</p>
            <DatePicker
              aria-label="End date"
              id="end_datepicker"
              value={format(maxDate, 'YYYY-MM-DD HH:mm')}
              onChange={this.handleEndChange}
              showClearButton={false}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

SearchBar.propTypes = {
  onFilter: PropTypes.func,
  onTypeChange: PropTypes.func,
  onApiParamChange: PropTypes.func,
  trunk_id: PropTypes.object,
  direction: PropTypes.object,
}

export default SearchBar;
