import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import styled from 'styled-components';

const DatePicker = require('react-16-bootstrap-date-picker');

const startOfMonth = require('date-fns/start_of_month');
const endOfMonth = require('date-fns/end_of_month');
const format = require('date-fns/format');


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smoment: startOfMonth(new Date()),
      emoment: endOfMonth(new Date()),
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

  render() {
    const {
      smoment, emoment
    } = this.state;
    const StyledGrid = styled(Grid)`
      background-color: #eeeeff;
      padding: 20px;
      margin-bottom: 10px;
    `;

    return (
      <StyledGrid>
        <Row>
          <Col md={3} xs={8}>
            <DatePicker id="start-datepicker" value={format(smoment, 'YYYY-MM-DD HH:mm')} onChange={this.handleStartChange} showClearButton={false} />
          </Col>
          <Col md={3} xs={8}>
            <DatePicker id="end-datepicker" value={format(emoment, 'YYYY-MM-DD HH:mm')} onChange={this.handleEndChange} showClearButton={false} />
          </Col>
          <Col md={3} xs={3}>
            <Button bsStyle="info" onClick={this.onFilter}>Filter</Button>
          </Col>
        </Row>
      </StyledGrid>
    );
  }
}
export default SearchBar;
