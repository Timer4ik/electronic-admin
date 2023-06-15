import React, { FC, ReactNode } from 'react'
import "./ErrorText.scss"

interface Props {
    children: ReactNode
}

export const ErrorText: FC<Props> = ({ children }) => {
    return (
        <div className='error__text'>{children}</div>
    )
}
