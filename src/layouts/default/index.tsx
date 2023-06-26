import React, { FC } from 'react'
import { Aside } from './Aside'
import { Header } from './Header'
import {Outlet} from "react-router-dom"

const DefaultLayout: FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Aside />
            <Header />
            <main className="main">
                <Outlet/>
            </main>
        </>
    )
}

export default DefaultLayout