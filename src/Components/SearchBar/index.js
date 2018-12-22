import React, { Component } from 'react';
import moment from 'moment';
import {
  Container, Row, Col, Button, Input
} from 'reactstrap';
import { DatetimePickerTrigger } from 'rc-datetime-picker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-datetime-picker/dist/picker.css';
import 'font-awesome/css/font-awesome.min.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      smoment: moment().startOf('month'),
      emoment: moment().endOf('month')
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
      onFilter(smoment.format('YYYY-MM-DD HH:mm'), emoment.format('YYYY-MM-DD HH:mm'));
    }
  }

  render() {
    const shortcuts = {
      Today: moment(),
      Yesterday: moment().subtract(1, 'days'),
    };
    const { smoment, emoment } = this.state;
    return (
      <Container>
        <Row style={{
          paddingTop: 20, paddingBottom: 20, marginBottom: 20, backgroundColor: '#eeeeff'
        }}
        >
          <Col md="auto">
            <DatetimePickerTrigger shortcuts={shortcuts} moment={smoment} onChange={this.handleStartChange}>
              <Input type="text" value={smoment.format('YYYY-MM-DD HH:mm')} readOnly />
            </DatetimePickerTrigger>
          </Col>
          -
          <Col md="auto">
            <DatetimePickerTrigger shortcuts={shortcuts} moment={emoment} onChange={this.handleEndChange}>
              <Input type="text" value={emoment.format('YYYY-MM-DD HH:mm')} readOnly />
            </DatetimePickerTrigger>
          </Col>
          <Col md="auto">
            <Button onClick={this.onFilter}>Filter</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default SearchBar;
