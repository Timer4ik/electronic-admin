import React, { FC } from 'react'
import "./Textarea.scss"

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  disabled?: boolean
  noModify?: boolean
  isInvalid?: boolean
}

export const Textarea: FC<Props> = ({ label, disabled, noModify, isInvalid, ...props }) => {
  if (noModify) {
    return (
      <label className='textarea'>
        {label ? <div className='textarea__label'>{label}</div> : null}
        {props.value ? <span className='textarea__nomodify'>{props.value}</span> : null}
      </label>
    )
  }
  return (
    <label className='textarea'>
      {label ? <div className='textarea__label'>{label}</div> : null}
      <textarea className={!isInvalid ? 'textarea__input' : "textarea__input error"}   {...props} />
    </label>
  )
}

export default Textarea