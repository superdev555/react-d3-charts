import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

class FilterItem extends React.Component {
  constructor(props) {
    super(props)

    if (props.filterType == 'drop_down') {
      this.state = {
        curOption: props.choices[0]
      }
    } else if (props.filterType == 'text_field') {
      this.state = {
        curOption: ''
      }
    }
  }

  handleChangeOption = option => {
    const { filterType, onApiParamChange, paramName } = this.props

    if (filterType == 'drop_down') {
      this.setState({ curOption: option }, () =>
        onApiParamChange(paramName, option.value)
      )
    } else if (filterType == 'text_field') {
      const newValue = option.target.value
      this.setState({ curOption: newValue }, () =>
        onApiParamChange(paramName, newValue)
      )
    }
  }

  render() {
    const { curOption } = this.state
    const { label, filterType, choices } = this.props

    let item = ''
    if (filterType == 'drop_down') {
      item = (
        <Select
          aria-label={label}
          value={curOption}
          options={choices}
          onChange={this.handleChangeOption}
        />
      )
    } else if (filterType == 'text_field') {
      item = <input onChange={this.handleChangeOption} />
    }

    return (
      <div>
        <p>{label}:</p>
        {item}
      </div>
    )
  }
}

FilterItem.propTypes = {
  paramName: PropTypes.string,
  label: PropTypes.string,
  filterType: PropTypes.string,
  defaultValue: PropTypes.string,
  choices: PropTypes.array,
  onApiParamChange: PropTypes.func
}

export default FilterItem
