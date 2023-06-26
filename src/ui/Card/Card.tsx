import React, { FC, ReactElement, ReactNode } from 'react'
// import "./Card.scss"

type Props = {
    children: ReactNode
    noPadding?: boolean
    noPaddingY?: boolean
    padding?: 1 | 2 | 3 | 4 | 5
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

export const Card: FC<Props> = ({ noPadding, noPaddingY, children, padding }) => {

    const paddingStyle = padding ? " card-padding-" + padding : ""

    return (
        <div className='card'>
            <div className={"card__body" + paddingStyle} style={
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
