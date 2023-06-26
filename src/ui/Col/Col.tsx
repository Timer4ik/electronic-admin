import React, { FC, ReactNode } from 'react'
// import "./Col.scss"

interface Props {
    children: ReactNode
}

export const Col:FC<Props> = ({ children }) => {
    return (
        <div className='col'>
            {React.Children.count(children) ? React.Children.map(children, (item, idx) => {
                return (
                    <div key={idx} className='col-row'>
                        {item}
                    </div>
                )
            }) :
                <div className='col-row'>{children}</div>
            }
        </div>
    )
}