import React, { FC, ReactNode, useEffect, useMemo } from 'react'
import "./Paginator.scss"

interface Props {
    children?: ReactNode
    pageCount: number
}

const Paginator: FC<Props> = ({ pageCount }) => {

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

    return (
        <div className='paginator'>
            <div className='paginator__item'>{"<"}</div>
            {pages.map((item) => {
                return (
                    <div className='paginator__item'>{item.page}</div>
                )
            })}
            <div className='paginator__item'>{">"}</div>
        </div>
    )
}

export default Paginator