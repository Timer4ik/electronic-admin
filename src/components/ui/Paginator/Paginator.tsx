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
        for (let i = 1; i <= pageCount; i++) {

            items.push({
                page: i,
                isActive: false
            })
        }

        return items
    }, [pageCount])

    if (pageCount > 7)
        return (
            <div className='paginator'>
                <div className='paginator__item' onClick={() => currentPage > 1 && onClick(currentPage - 1)}>{"<"}</div>
                {currentPage < 5 && (
                    <>
                        <div className={'paginator__item' + (currentPage == 1 ? " active" : "")} onClick={() => onClick(1)}>1</div>
                        <div className={'paginator__item' + (currentPage == 2 ? " active" : "")} onClick={() => onClick(2)}>2</div>
                        <div className={'paginator__item' + (currentPage == 3 ? " active" : "")} onClick={() => onClick(3)}>3</div>
                        <div className={'paginator__item' + (currentPage == 4 ? " active" : "")} onClick={() => onClick(4)}>4</div>
                        <div className={'paginator__item' + (currentPage == 5 ? " active" : "")} onClick={() => onClick(5)}>5</div>
                        <div className={'paginator__item' + (currentPage == 6 ? " active" : "")} onClick={() => onClick(6)}>6</div>
                        <div className={'paginator__item' + (currentPage == 7 ? " active" : "")} onClick={() => onClick(7)}>7</div>
                        <div className={'paginator__item'} onClick={() => onClick(Math.round((currentPage + 1 + pageCount) / 2))}>...</div>
                        <div className={'paginator__item'} onClick={() => onClick(pageCount)}>{pageCount}</div>
                    </>
                )}
                {currentPage > 4 && currentPage < pageCount - 4 && (
                    <>
                        <div className={'paginator__item'} onClick={() => onClick(1)}>1</div>
                        <div className={'paginator__item'} onClick={() => onClick(Math.round((currentPage - 3) / 2))}>...</div>
                        <div className={'paginator__item'} onClick={() => onClick(currentPage - 2)}>{currentPage - 2}</div>
                        <div className={'paginator__item'} onClick={() => onClick(currentPage - 1)}>{currentPage - 1}</div>
                        <div className={'paginator__item' + " active"}>{currentPage}</div>
                        <div className={'paginator__item'} onClick={() => onClick(currentPage + 1)}>{currentPage + 1}</div>
                        <div className={'paginator__item'} onClick={() => onClick(currentPage + 2)}>{currentPage + 2}</div>
                        <div className={'paginator__item'} onClick={() => onClick(Math.round((currentPage + 1 + pageCount) / 2))}>...</div>
                        <div className={'paginator__item'} onClick={() => onClick(pageCount)}>{pageCount}</div>
                    </>
                )}
                {currentPage >= pageCount - 4 && (
                    <>
                        <div className={'paginator__item'} onClick={() => onClick(1)}>1</div>
                        <div className={'paginator__item'} onClick={() => onClick(Math.round(currentPage / 2))}>...</div>
                        <div className={'paginator__item' + (pageCount - 6 == currentPage ? " active" : "")} onClick={() => onClick(pageCount - 6)}>{pageCount - 6}</div>
                        <div className={'paginator__item' + (pageCount - 5 == currentPage ? " active" : "")} onClick={() => onClick(pageCount - 5)}>{pageCount - 5}</div>
                        <div className={'paginator__item' + (pageCount - 4 == currentPage ? " active" : "")} onClick={() => onClick(pageCount - 4)}>{pageCount - 4}</div>
                        <div className={'paginator__item' + (pageCount - 3 == currentPage ? " active" : "")} onClick={() => onClick(pageCount - 3)}>{pageCount - 3}</div>
                        <div className={'paginator__item' + (pageCount - 2 == currentPage ? " active" : "")} onClick={() => onClick(pageCount - 2)}>{pageCount - 2}</div>
                        <div className={'paginator__item' + (pageCount - 1 == currentPage ? " active" : "")} onClick={() => onClick(pageCount - 1)}>{pageCount - 1}</div>
                        <div className={'paginator__item' + (pageCount == currentPage ? " active" : "")} onClick={() => onClick(pageCount)}>{pageCount}</div>

                    </>
                )}
                <div className='paginator__item' onClick={() => currentPage < pageCount && onClick(currentPage + 1)}>{">"}</div>
            </div >
        )
    if (pageCount > 1)
        return (
            <div className='paginator'>
                <div className='paginator__item' onClick={() => currentPage > 1 && onClick(currentPage - 1)}>{"<"}</div>
                {pages.map(item => (
                    <div className={'paginator__item' + (currentPage == item.page ? " active" : "")} onClick={() => onClick(item.page)}>{item.page}</div>
                ))}
                <div className='paginator__item' onClick={() => currentPage < pageCount && onClick(currentPage + 1)}>{">"}</div>
            </div>
        )
    else return null
}

export default Paginator