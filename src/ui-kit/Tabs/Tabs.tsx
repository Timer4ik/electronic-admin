import React, { FC, ReactNode } from 'react'
import "./Tabs.scss"

interface TabsProps {
    children: ReactNode
}

interface TabsItem {
    children: ReactNode
    active?: boolean
}

export const TabsItem: FC<TabsItem> = ({ active, children, ...props }) => {
    return (
        <li className={active ? 'tabs__item active' : "tabs__item"} {...props}>
            {children}
        </li>
    )
}

export const Tabs: FC<TabsProps> = ({ children }) => {
    return (
        <ul className='nav__tabs'>
            {React.Children.map(children, child => {
                return child
            })}
        </ul>

    )
}
