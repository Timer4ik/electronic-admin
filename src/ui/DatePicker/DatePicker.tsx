import React, { ReactNode, FC, InputHTMLAttributes, useState } from 'react'
import Calendar from 'react-calendar'
// import "./DatePicker.scss"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode,
}

export const DatePicker: FC<Props> = ({ label, ...props }) => {
  const [value, setValue] = useState<Date | null | any>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="datepicker">
      <label className='datepicker__label' onClick={() => setIsActive(!isActive)}>
        <span className='datepicker__span'>{label}</span>
        <input className='datepicker__input' {...props} readOnly value={value?.toLocaleDateString()} />
      </label>
      {isActive
        &&
        <Calendar
          onChange={setValue}
          value={value}
          nextLabel={
            <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.95125 8.20711C9.34177 7.81658 9.34177 7.18342 8.95125 6.79289L2.58729 0.428932C2.19676 0.0384079 1.5636 0.0384079 1.17307 0.428932C0.782549 0.819456 0.782549 1.45262 1.17307 1.84315L6.82993 7.5L1.17307 13.1569C0.782549 13.5474 0.782549 14.1805 1.17307 14.5711C1.5636 14.9616 2.19676 14.9616 2.58729 14.5711L8.95125 8.20711ZM7.24414 8.5H8.24414V6.5H7.24414V8.5Z" fill="black" />
            </svg>
          }
          prevLabel={
            <svg width="10" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.537034 6.79289C0.14651 7.18342 0.14651 7.81658 0.537034 8.20711L6.90099 14.5711C7.29152 14.9616 7.92468 14.9616 8.31521 14.5711C8.70573 14.1805 8.70573 13.5474 8.31521 13.1569L2.65835 7.5L8.31521 1.84315C8.70573 1.45262 8.70573 0.819456 8.31521 0.428932C7.92468 0.0384079 7.29152 0.0384079 6.90099 0.428932L0.537034 6.79289ZM2.24414 6.5H1.24414V8.5H2.24414V6.5Z" fill="black" />
            </svg>
          }
          next2Label={null}
          prev2Label={null}
        />}
    </div>
  )
}
