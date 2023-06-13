import React from 'react'
import "./DatePicker.scss"

export const DatePicker = ({ label, ...props }) => {
  return (
    <label className='datepicker'>
      <div className='datepicker__label'>{label}</div>
      <input className='datepicker__input' type="datetime-local" {...props} />
    </label>
  )
}

export default DatePicker