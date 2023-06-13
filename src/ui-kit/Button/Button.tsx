import React, { FC, ReactNode } from 'react'
import "./Button.scss"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    color?: string
}


export const Button: FC<Props> = ({ children, color,...props }) => {
    if (color === "standard")
        return <button className='button button-standard' {...props}>{children}</button>
    else if (color === "danger")
        return <button className='button button-danger' {...props}>{children}</button>
    else if (color === "green")
        return <button className='button button-green' {...props}>{children}</button>
    else
        return <button className='button button-primary' {...props}>{children}</button>
}
