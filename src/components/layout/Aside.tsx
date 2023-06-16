"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Aside = () => {

    return (
        <aside className="aside">
            <div className="aside__logo">
                <Image width={150} height={100} src="/img/header/logo.svg" alt="" />
            </div>
            <nav className="aside__navbar">

                <div className="navbar__item item">
                    <div className="item__title">
                        <Image width={0} height={0} src="/img/icons/content.svg" alt="" />
                        <div>Контент</div>
                    </div>
                    <div className="item__list">
                        <Link className="item__link" href="/categories">Категории товаров</Link>
                        <Link className="item__link" href="/properties">Характеристики</Link>
                        <Link className="item__link" href="/developers">Производители</Link>
                        <Link className="item__link" href="/products">Товары</Link>
                        {/* <a className="item__link" href="#">Категории товаров</a>
                        <a className="item__link" href="#">Категории товаров</a>
                        <a className="item__link" href="#">Категории товаров</a> */}
                    </div>
                </div>
                <div className="navbar__item item">
                    <div className="item__title">
                        <Image width={0} height={0} src="/img/icons/content.svg" alt="" />
                        <div>Дополнительно</div>
                    </div>
                    <div className="item__list">
                        <Link className="item__link" href="/property-types">Единицы измерения</Link>

                    </div>
                </div>
                {/* <div className="navbar__item item">
                    <div className="item__title">
                        <Image width={0} height={0} src="/img/icons/content.svg" alt="" />
                        <div>Контент</div>
                    </div>
                    <div className="item__list">
                        <a className="item__link" href="#">Слайдер</a>
                        <a className="item__link" href="#">Залы</a>
                        <a className="item__link" href="#">Категории товаров</a>
                        <a className="item__link" href="#">Категории товаров</a>
                        <a className="item__link" href="#">Категории товаров</a>
                        <a className="item__link" href="#">Категории товаров</a>
                    </div>
                </div>
                <div className="navbar__item item">
                    <div className="item__title">
                        <Image width={0} height={0} src="/img/icons/content.svg" alt="" />
                        <div>Контент</div>
                    </div>
                    <div className="item__list">
                        <a className="item__link" href="#">Слайдер</a>
                        <a className="item__link" href="#">Залы</a>
                        <a className="item__link" href="#">Категории товаров</a>
                        <a className="item__link" href="#">Категории товаров</a>
                        <a className="item__link" href="#">Категории товаров</a>
                        <a className="item__link" href="#">Категории товаров</a>
                    </div>
                </div> */}
            </nav>
        </aside>
    )
}
