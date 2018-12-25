import React, { Component } from 'react';
import {
  Grid, Row, Col, Button
} from 'react-bootstrap';
import Select from 'react-select';
import styled from 'styled-components';
import { GRAPH_TYPE_LINE_CHART, GRAPH_TYPE_BAR_CHART } from '../Graph/constants';

const DatePicker = require('react-16-bootstrap-date-picker');

const startOfMonth = require('date-fns/start_of_month');
const endOfMonth = require('date-fns/end_of_month');
const format = require('date-fns/format');

const options = [{ value: GRAPH_TYPE_LINE_CHART, label: 'Line Chart' }, { value: GRAPH_TYPE_BAR_CHART, label: 'Discrete Bar Chart' }];

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smoment: startOfMonth(new Date()),
      emoment: endOfMonth(new Date()),
      selectedOption: options[0],
    };
  }

  handleStartChange = (mmt) => {
    this.setState({ smoment: mmt });
  }

  handleEndChange = (mmt) => {
    this.setState({ emoment: mmt });
  }

  onFilter = () => {
    const { smoment, emoment } = this.state;
    if (smoment > emoment) {
      alert('Start date must be less than end date.');
    } else {
      const { onFilter } = this.props;
      onFilter(format(smoment, 'YYYY-MM-DD'), format(emoment, 'YYYY-MM-DD'));
    }
  }

  handleTypeChange =(type) => {
    const { onTypeChange } = this.props;
    this.setState({ selectedOption: type });
    onTypeChange(type.value);
  }

  render() {
    const {
      smoment, emoment
    } = this.state;
    const StyledGrid = styled(Grid)`
      background-color: #f9b6d2;
      padding: 20px;
      margin-bottom: 10px;
    `;
    const { selectedOption } = this.state;

    return (
      <StyledGrid>
        <Row>
          <Col md={3} xs={10}>
            <Select value={selectedOption} options={options} onChange={this.handleTypeChange} />
          </Col>
          <Col md={2} xs={5}>
            <DatePicker id="start-datepicker" value={format(smoment, 'YYYY-MM-DD HH:mm')} onChange={this.handleStartChange} showClearButton={false} />
          </Col>
          <Col md={2} md-offset={1} xs={5}>
            <DatePicker id="end-datepicker" value={format(emoment, 'YYYY-MM-DD HH:mm')} onChange={this.handleEndChange} showClearButton={false} />
          </Col>
          <Col md={3} xs={3}>
            <Button bsStyle="danger" onClick={this.onFilter}>Filter</Button>
          </Col>
        </Row>
      </StyledGrid>
    );
  }
}
export default SearchBar;
