import React, { FC, ReactNode, useEffect, useMemo } from 'react'
// import "./Paginator.scss"

interface Props {
    children?: ReactNode
    pageCount: number
    onClick: (page: number) => void
    currentPage: number
}

const Paginator: FC<Props> = ({ pageCount, onClick, currentPage }) => {

    const pages = useMemo((): {
        page: number,
        isActive: boolean
    }[] => {
        let items = []
        for (let i = 0; i < pageCount; i++) {

            items.push({
                page: i,
                isActive: false
            })
        }

        return items
    }, [pageCount])

    if (pageCount > 1)
        return (
            <div className='paginator'>
                <div className='paginator__item'>{"<"}</div>
                {pages.map((item) => {
                    return (
                        <div key={item.page} className={'paginator__item' + (currentPage == item.page ? " active" : "")} onClick={() => onClick(item.page)}>{item.page + 1}</div>
                    )
                })}
                <div className='paginator__item'>{">"}</div>
            </div>
        )
    else return null
}

export default Paginator