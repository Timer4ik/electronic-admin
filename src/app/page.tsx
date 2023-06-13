'use client'
import React, { FC } from 'react'

interface SlotProps {
    name: string
    id: number
}
interface Props {
    someText: string
    children: FC<SlotProps>
}

const List: FC<Props> = ({ children, someText }) => {

    const MainSlot = children

    return (
        <ul>
            <MainSlot id={+Date.now()} name={someText} />
        </ul>
    )
}

const MainPage = () => {

    return (
        <div>
           
        </div>
    )
}

export default MainPage