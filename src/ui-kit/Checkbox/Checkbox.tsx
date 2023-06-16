import React, { FC } from 'react'
// import "./Checkbox.scss"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox: FC<Props> = ({ label, ...props }) => {
  return (
    <label className='checkbox'>
      <input className='checkbox__input' type="checkbox" {...props} />
      {!!label && <div className='checkbox__label'>{label}</div>}
    </label>
  )
}
