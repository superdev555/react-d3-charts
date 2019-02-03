import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { format } from 'date-fns'
import FilterItem from './FilterItem'

import DatePicker from 'react-datepicker'
import DatePickerWapper from '../styled'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    const { defaultStartDate, defaultEndDate } = props
    this.state = {
      minDate: defaultStartDate,
      maxDate: defaultEndDate
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
      onDateFilter(
        format(minDate, 'YYYY-MM-DD HH:mm'),
        format(maxDate, 'YYYY-MM-DD HH:mm')
      )
    }
  }

  render() {
    const { minDate, maxDate } = this.state
    const {
      components,
      onApiParamChange,
      minStartDate,
      maxEndDate
    } = this.props

    return (
      <Grid>
        <Row>
          <Col md={2} xs={5}>
            <p>Start date:</p>
            <DatePickerWapper>
              <DatePicker
                aria-label="Start date"
                selected={minDate}
                onChange={this.handleStartChange}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="yyyy/MM/dd h:mm aa"
                minDate={minStartDate}
                maxDate={maxDate}
              />
            </DatePickerWapper>
          </Col>
          <Col md={2} md-offset={1} xs={5}>
            <p>End date:</p>
            <DatePickerWapper>
              <DatePicker
                aria-label="End date"
                selected={maxDate}
                onChange={this.handleEndChange}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="yyyy/MM/dd h:mm aa"
                minDate={minDate}
                maxDate={maxEndDate}
              />
            </DatePickerWapper>
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
  onApiParamChange: PropTypes.func,
  minStartDate: PropTypes.instanceOf(Date),
  maxEndDate: PropTypes.instanceOf(Date),
  defaultStartDate: PropTypes.instanceOf(Date),
  defaultEndDate: PropTypes.instanceOf(Date)
}

export default SearchBar
