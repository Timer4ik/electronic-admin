"use client"
import React from 'react'
import {Link} from "react-router-dom"

export const Aside = () => {

    return (
        <aside className="aside">
            <div className="aside__logo">
                <img width={150} height={100} src="/img/header/logo.svg" alt="" />
            </div>
            <nav className="aside__navbar">

                <div className="navbar__item item">
                    <div className="item__title">
                        <img width={0} height={0} src="/img/icons/content.svg" alt="" />
                        <div>Контент</div>
                    </div>
                    <div className="item__list">
                        <Link className="item__link" to="/categories">Категории товаров</Link>
                        <Link className="item__link" to="/properties">Характеристики</Link>
                        <Link className="item__link" to="/developers">Производители</Link>
                        <Link className="item__link" to="/products">Товары</Link>
                        <Link className="item__link" to="/sliders">Слайдеры</Link>
                        <Link className="item__link" to="/shops">Магазины</Link>
                        {/* <a className="item__link" to="#">Категории товаров</a>
                        <a className="item__link" to="#">Категории товаров</a>
                        <a className="item__link" to="#">Категории товаров</a> */}
                    </div>
                </div>
                {/* <div className="navbar__item item">
                    <div className="item__title">
                        <img width={0} height={0} src="/img/icons/content.svg" alt="" />
                        <div>Дополнительно</div>
                    </div>
                    <div className="item__list">
                        <Link className="item__link" to="/property-types">Единицы измерения</Link>

                    </div>
                </div> */}
                {/* <div className="navbar__item item">
                    <div className="item__title">
                        <img width={0} height={0} src="/img/icons/content.svg" alt="" />
                        <div>Контент</div>
                    </div>
                    <div className="item__list">
                        <a className="item__link" to="#">Слайдер</a>
                        <a className="item__link" to="#">Залы</a>
                        <a className="item__link" to="#">Категории товаров</a>
                        <a className="item__link" to="#">Категории товаров</a>
                        <a className="item__link" to="#">Категории товаров</a>
                        <a className="item__link" to="#">Категории товаров</a>
                    </div>
                </div>
                <div className="navbar__item item">
                    <div className="item__title">
                        <img width={0} height={0} src="/img/icons/content.svg" alt="" />
                        <div>Контент</div>
                    </div>
                    <div className="item__list">
                        <a className="item__link" to="#">Слайдер</a>
                        <a className="item__link" to="#">Залы</a>
                        <a className="item__link" to="#">Категории товаров</a>
                        <a className="item__link" to="#">Категории товаров</a>
                        <a className="item__link" to="#">Категории товаров</a>
                        <a className="item__link" to="#">Категории товаров</a>
                    </div>
                </div> */}
            </nav>
        </aside>
    )
}
