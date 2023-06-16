import React, { FC, ReactElement, ReactNode } from 'react'
// import "./Table.scss"

interface Props {
  children: ReactNode
}

export const TableMenuIcon:FC = ({ ...props }) => {
  return (
    <div className='table__menu' {...props}>
      <img src="/img/icons/menu-dotes.svg" alt="" />
    </div>
  )
}

export const Table: FC<Props> = ({ children }) => {
  return (
    <div className="table">
      <table className='table__block'>
        {React.Children.count(children) > 0 && React.Children.toArray(children)[0]}
        {React.Children.count(children) > 1 && React.Children.toArray(children)[1]}
      </table>
    </div>

  )
}
