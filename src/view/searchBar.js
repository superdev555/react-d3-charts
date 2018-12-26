import React, { Component } from 'react';
import {
  Grid, Row, Col, Button
} from 'react-bootstrap';
import Select from 'react-select';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import { GRAPH_TYPE_LINE_CHART, GRAPH_TYPE_BAR_CHART } from '../graph/constants';
import { StyledRow, StyledCheckLabel } from '../styledComponents';

const DatePicker = require('react-16-bootstrap-date-picker');

const startOfMonth = require('date-fns/start_of_month');
const endOfMonth = require('date-fns/end_of_month');
const format = require('date-fns/format');

const options = [{ value: GRAPH_TYPE_LINE_CHART, label: 'Line Chart' }, { value: GRAPH_TYPE_BAR_CHART, label: 'Discrete Bar Chart' }];

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
      this.targetsChanged(dispTargets);
      this.setState({ isFirst: false });
    }
  }

  handleStartChange = (mmt) => {
    this.setState({ minDate: mmt });
  }

  handleEndChange = (mmt) => {
    this.setState({ maxDate: mmt });
  }

  targetsChanged = (newTargets) => {
    const { dispTargets } = this.props;
    if (newTargets.length === 0) {
      // eslint-disable-next-line no-param-reassign
      newTargets = dispTargets;
    }
    this.setState({
      selectedTargets: newTargets
    });
    const { setTargets } = this.props;
    setTargets(newTargets);
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
    this.setState({ selectedOption: type });
    onTypeChange(type.value);
  }

  render() {
    const {
      minDate, maxDate
    } = this.state;

    const { selectedOption, selectedTargets } = this.state;
    const { dispTargets } = this.props;

    return (
      <Grid>
        <Row>
          <Col md={3} xs={10}>
            <Select value={selectedOption} options={options} onChange={this.handleTypeChange} />
          </Col>
          <Col md={2} xs={5}>
            <DatePicker id="start-datepicker" value={format(minDate, 'YYYY-MM-DD HH:mm')} onChange={this.handleStartChange} showClearButton={false} />
          </Col>
          <Col md={2} md-offset={1} xs={5}>
            <DatePicker id="end-datepicker" value={format(maxDate, 'YYYY-MM-DD HH:mm')} onChange={this.handleEndChange} showClearButton={false} />
          </Col>
          <Col md={3} xs={3}>
            <Button bsStyle="info" onClick={this.onFilter}>Filter</Button>
          </Col>
        </Row>
        <StyledRow>
          <Col>
            <CheckboxGroup
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
            </CheckboxGroup>
          </Col>
        </StyledRow>
      </Grid>
    );
  }
}
export default SearchBar;
