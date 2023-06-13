import React, { FC, ReactNode } from 'react'
import "./Row.scss"

interface Props {
    children: ReactNode
}

export const Row: FC<Props> = ({ children }) => {
    return (
        <div className='row'>
            {React.Children.count(children) ? React.Children.map(children, (item, idx) => {
                return (
                    <div key={idx} className="row-col">
                        {item}
                    </div>
                )
            }) :
                <div className="row-col">{children}</div>
            }
        </div>
    )
}
export const RowBetween: FC<Props> = ({ children }) => {
    return (
        <div className='row row__between'>
            {React.Children.count(children) ? React.Children.map(children, (item, idx) => {
                return (
                    <div key={idx} className="row-col">
                        {item}
                    </div>
                )
            }) :
                <div className="row-col">{children}</div>
            }
        </div>
    )
}
