import React, { FC, useEffect, useState } from 'react'

interface Props {
    children: React.ReactNode
    flexDirection?: "column" | "row"
    gap?: 1 | 2 | 3 | 4 | 5
    marginY?: 1 | 2 | 3 | 4 | 5
    marginX?: 1 | 2 | 3 | 4 | 5
}

export const Stack: FC<Props> = ({ children, flexDirection, gap, marginX, marginY }) => {

    const gapStyle = gap ? " stack-gap-" + gap : ""
    const flexDirectionStyle = flexDirection ? " stack-" + flexDirection : ""
    const marginXStyle = marginX ? " stack-marginX-" + marginX : ""
    const marginYStyle = marginY ? " stack-marginY-" + marginY : ""

    return (
        <div className={'stack' + flexDirectionStyle + gapStyle + marginXStyle + marginYStyle}>
            {children}
        </div>
    )
}