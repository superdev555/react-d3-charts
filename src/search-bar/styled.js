import styled from 'styled-components'

const DatePickerWapper = styled.div`
  .react-datepicker__input-container input {
    border-radius: 4px;
    height: 38px;
    font-size: 15px;
    border-style: solid;
    border-width: 1px;
    padding-left: 10px;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
  }
  .react-datepicker {
    width: 265px;
  }
  .react-datepicker__month-container {
    font-size: 12px;
  }
  .react-datepicker__day {
    width: 23px;
    line-height: 23px;
  }
  .react-datepicker__day-name {
    width: 23px;
    line-height: 23px;
  }
  .react-datepicker__current-month {
    font-weight: bold;
    font-size: 14px;
  }
  .react-datepicker-time__header {
    font-weight: bold;
    font-size: 14px;
  }
  .react-datepicker__time-list-item {
    font-size: 11px;
  }
`

export default DatePickerWapper
