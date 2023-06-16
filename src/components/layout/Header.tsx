"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
    return (
        <header className="header">
            <div className="header__title">
                Администрирование
            </div>
            <a href='#' className="header__user user">
                <div className="header__userlogo">
                    <img src="/img/user.png" alt="" />
                </div>
                <div className="header__username">
                    <div>Администратор</div>
                </div>
                <img className='header__arrowdown' src="/img/icons/arrow-down.svg" alt="" />
            </a>
        </header>
    )
}
