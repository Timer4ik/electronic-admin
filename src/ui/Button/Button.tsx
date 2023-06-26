import React, { FC, ReactNode } from 'react'
// import "./Button.scss"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    color?: "standard" | "danger" | "green"
    size?: 1 | 2 | 3 | 4 | 5
}


export const Button: FC<Props> = ({ children, color, size, ...props }) => {

    const colorStyle = color ? " button-" + color : " button-primary"
    const sizeStyle = size ? " button-size-" + size : " button-size-3"

    return <button className={'button' + colorStyle + sizeStyle} {...props}>{children}</button>

}
