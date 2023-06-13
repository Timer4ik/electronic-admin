import React, { FC } from 'react'
import "./Field.scss"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  disabled?: boolean
  noModify?: boolean
  isInvalid?: boolean
}

export const Field: FC<Props> = ({ label, disabled, noModify, isInvalid, ...props }) => {
  if (noModify) {
    return (
      <label className='field'>
        {label ? <div className='field__label'>{label}</div> : null}
        {props.value ? <span className='field__nomodify'>{props.value}</span> : null}
      </label>
    )
  }
  return (
    <label className='field'>
      {label ? <div className='field__label'>{label}</div> : null}
      <input className={!isInvalid ? 'field__input' : "field__input error"} type="text" {...props} />
    </label>
  )
}

export default Field