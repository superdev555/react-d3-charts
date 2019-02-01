import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { startOfMonth, endOfMonth, format } from 'date-fns'
import FilterItem from './FilterItem'

const DatePicker = require('react-16-bootstrap-date-picker')

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      minDate: startOfMonth(new Date()),
      maxDate: endOfMonth(new Date())
    }
  }

  handleStartChange = minDate => {
    this.setState({ minDate }, () => this.onDateFilter())
  }

  handleEndChange = maxDate => {
    this.setState({ maxDate }, () => this.onDateFilter())
  }

  onDateFilter = () => {
    const { minDate, maxDate } = this.state
    const { onDateFilter } = this.props

    if (minDate > maxDate) {
      alert('Start date must be less than end date.')
    } else {
      onDateFilter(format(minDate, 'YYYY-MM-DD'), format(maxDate, 'YYYY-MM-DD'))
    }
  }

  render() {
    const { minDate, maxDate } = this.state
    const { components, onApiParamChange } = this.props

    return (
      <Grid>
        <Row>
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
          {Object.keys(components).map(function(key) {
            const filterComp = components[key]
            return (
              <Col md={2} xs={10} key={key}>
                <FilterItem
                  paramName={key}
                  label={filterComp.label}
                  filterType={filterComp.type}
                  choices={filterComp.choices}
                  onApiParamChange={onApiParamChange}
                />
              </Col>
            )
          })}
        </Row>
      </Grid>
    )
  }
}

SearchBar.propTypes = {
  components: PropTypes.object,
  onDateFilter: PropTypes.func,
  onApiParamChange: PropTypes.func
}

export default SearchBar
