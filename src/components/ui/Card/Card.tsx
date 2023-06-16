import React, { FC, ReactElement, ReactNode } from 'react'
// import "./Card.scss"

type Props = {
    children: ReactNode
    noPadding?: boolean
    noPaddingY?: boolean
}
export const BorderCard: FC<Props> = ({ noPadding, noPaddingY, children }) => {
    return (
        <div className='border-card'>
            <div className="border-card__body" style={
                {
                    ...noPadding ? { padding: 0 } : {},
                    ...noPaddingY ? { paddingTop: 0, paddingBottom: 0 } : {},
                }
            }>
                {children}
            </div>
        </div>
    )
}

export const Card: FC<Props> = ({ noPadding, noPaddingY, children }) => {
    return (
        <div className='card'>
            <div className="card__body" style={
                {
                    ...noPadding ? { padding: 0 } : {},
                    ...noPaddingY ? { paddingTop: 0, paddingBottom: 0 } : {},
                }
            }>
                {children}
            </div>
        </div>
    )
}
