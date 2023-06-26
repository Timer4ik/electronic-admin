import React from 'react'
import { Dropdown } from '../../ui'
import { useAppDispatch } from '../../redux/hooks'
import { logout } from '../../redux/slices/authSlice'

export const Header = () => {

    const dispatch = useAppDispatch()

    return (
        <header className="header">
            <div className="header__title">
                Администрирование
            </div>
            <Dropdown>
                <div className="header__user user">
                    <div className="header__username">
                        <div>Администратор</div>
                    </div>
                    <img className='header__arrowdown' src="/img/icons/arrow-down.svg" alt="" />
                </div>
                <div>
                    <div onClick={() => dispatch(logout())}>Выйти из системы</div>
                </div>
            </Dropdown>
        </header>
    )
}
