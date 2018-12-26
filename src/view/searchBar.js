import React, { Component } from 'react';
import {
  Grid, Row, Col
} from 'react-bootstrap';
import Select from 'react-select';
import { Checkbox } from 'react-checkbox-group';
import { GRAPH_TYPE_LINE_CHART, GRAPH_TYPE_BAR_CHART } from '../graph/constants';
import { StyledRow, StyledCheckLabel, StyledCheckGroup } from './styled';

const DatePicker = require('react-16-bootstrap-date-picker');

const startOfMonth = require('date-fns/start_of_month');
const endOfMonth = require('date-fns/end_of_month');
const format = require('date-fns/format');

const options = [
  { value: GRAPH_TYPE_LINE_CHART, label: 'Line Chart' },
  { value: GRAPH_TYPE_BAR_CHART, label: 'Bar Chart' }
];

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: startOfMonth(new Date()),
      maxDate: endOfMonth(new Date()),
      selectedOption: options[0],
      selectedTargets: [],
      isFirst: true
    };
  }

  componentWillReceiveProps(props) {
    const { dispTargets } = props;
    const { isFirst } = this.state;
    if (dispTargets.length > 0 && isFirst) {
      this.setState({ isFirst: false }, () => this.targetsChanged(dispTargets));
    }
  }

  handleStartChange = (mmt) => {
    this.setState({ minDate: mmt }, () => this.onFilter());
  }

  handleEndChange = (mmt) => {
    this.setState({ maxDate: mmt }, () => this.onFilter());
  }

  targetsChanged = (newTargets) => {
    const { dispTargets } = this.props;
    if (newTargets.length === 0) {
      // eslint-disable-next-line no-param-reassign
      newTargets = dispTargets;
    }
    const { setTargets } = this.props;
    this.setState({
      selectedTargets: newTargets
    }, () => setTargets(newTargets));
  }

  onFilter = () => {
    const { minDate, maxDate } = this.state;
    if (minDate > maxDate) {
      alert('Start date must be less than end date.');
    } else {
      const { onFilter } = this.props;
      onFilter(format(minDate, 'YYYY-MM-DD'), format(maxDate, 'YYYY-MM-DD'));
    }
  }

  handleTypeChange =(type) => {
    const { onTypeChange } = this.props;
    this.setState({ selectedOption: type }, () => onTypeChange(type.value));
  }

  render() {
    const {
      minDate, maxDate, selectedOption, selectedTargets
    } = this.state;

    const { dispTargets } = this.props;

    return (
      <Grid>
        <Row>
          <Col md={3} xs={10}>
            {'Chart type:'}
            <Select
              value={selectedOption}
              options={options}
              onChange={this.handleTypeChange}
            />
          </Col>
          <Col md={2} xs={5}>
            {'Start date:'}
            <DatePicker
              id="start_datepicker"
              value={format(minDate, 'YYYY-MM-DD HH:mm')}
              onChange={this.handleStartChange}
              showClearButton={false}
            />
          </Col>
          <Col md={2} md-offset={1} xs={5}>
            {'End date:'}
            <DatePicker
              id="end_datepicker"
              value={format(maxDate, 'YYYY-MM-DD HH:mm')}
              onChange={this.handleEndChange}
              showClearButton={false}
            />
          </Col>
        </Row>
        <StyledRow>
          <Col md={12}>
            {'Target type:'}
            <StyledCheckGroup
              checkboxDepth={2}
              name="targets"
              value={selectedTargets}
              onChange={this.targetsChanged}
            >
              {dispTargets.map((key, i) => (
                <StyledCheckLabel key={i}>
                  <Checkbox value={key} key={i} />
                      &nbsp;
                  {key}
                </StyledCheckLabel>))}
            </StyledCheckGroup>
          </Col>
        </StyledRow>
      </Grid>
    );
  }
}
export default SearchBar;
