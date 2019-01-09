import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Row, Col,
} from 'react-bootstrap';
import Select from 'react-select';
import { Checkbox } from 'react-checkbox-group';
import { GRAPH_TYPE_LINE_CHART, GRAPH_TYPE_BAR_CHART } from '../../graph/constants';
import { StyledRow, StyledCheckLabel, StyledCheckGroup } from '../styled';

const DatePicker = require('react-16-bootstrap-date-picker');

const startOfMonth = require('date-fns/start_of_month');
const endOfMonth = require('date-fns/end_of_month');
const format = require('date-fns/format');

const options = [
  { value: GRAPH_TYPE_LINE_CHART, label: 'Line Chart' },
  { value: GRAPH_TYPE_BAR_CHART, label: 'Bar Chart' },
];

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minDate: startOfMonth(new Date()),
      maxDate: endOfMonth(new Date()),
      selectedOption: options[0],
      selectedTargets: [],
    };
  }

  componentDidMount() {
    const { allTargets } = this.props;
    this.targetsChanged(allTargets);
  }

  handleStartChange = (minDate) => {
    this.setState({ minDate }, () => this.onFilter());
  }

  handleEndChange = (maxDate) => {
    this.setState({ maxDate }, () => this.onFilter());
  }

  targetsChanged = (newTargets) => {
    const { allTargets, setTargets } = this.props;
    if (newTargets.length === 0) {
      // eslint-disable-next-line no-param-reassign
      newTargets = allTargets;
    }

    this.setState({
      selectedTargets: newTargets
    }, () => setTargets(newTargets));
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

  render() {
    const {
      minDate, maxDate, selectedOption, selectedTargets,
    } = this.state;
    const { allTargets } = this.props;

    return (
      <Grid>
        <Row>
          <Col md={3} xs={10}>
            <p>Chart type:</p>
            <Select
              aria-label="Chart type"
              value={selectedOption}
              options={options}
              onChange={this.handleTypeChange}
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
        <StyledRow>
          <Col md={12}>
            <p>Target type:</p>
            <StyledCheckGroup
              checkboxDepth={2}
              value={selectedTargets}
              onChange={this.targetsChanged}
            >
              { allTargets.map((key, i) => (
                <StyledCheckLabel key={i}>
                  <Checkbox value={key} key={i} />
                  &nbsp;
                  {key}
                </StyledCheckLabel>
              ))}
            </StyledCheckGroup>
          </Col>
        </StyledRow>
      </Grid>
    );
  }
}

SearchBar.propTypes = {
  onFilter: PropTypes.func,
  onTypeChange: PropTypes.func,
  setTargets: PropTypes.func,
  allTargets: PropTypes.array
}

export default SearchBar;
