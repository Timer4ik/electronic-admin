import React, { FC, useEffect, useState } from 'react'

interface Props extends Pick<React.HTMLAttributes<HTMLDivElement>, "style"> {
    children: React.ReactNode
    flexDirection?: "column" | "row"
    gap?: 1 | 2 | 3 | 4 | 5
    marginY?: 1 | 2 | 3 | 4 | 5
    marginX?: 1 | 2 | 3 | 4 | 5
    marginTop?: 1 | 2 | 3 | 4 | 5
    marginBottom?: 1 | 2 | 3 | 4 | 5
    justifyContent?: "space-between" | "center"
    alignItems?: "center" | "flex-end"
    flex?: "same-all" | "stretch-all"
}

export const Stack: FC<Props> = ({ children, style, alignItems, flexDirection, gap, flex, marginX, marginY, marginBottom, justifyContent, marginTop }) => {

    const gapStyle = gap ? " stack-gap-" + gap : ""
    const flexDirectionStyle = flexDirection ? " stack-" + flexDirection : " stack-row"
    const marginXStyle = marginX ? " stack-marginX-" + marginX : ""
    const marginYStyle = marginY ? " stack-marginY-" + marginY : ""
    const marginTopStyle = marginTop ? " stack-marginTop-" + marginTop : ""
    const marginBottomStyle = marginBottom ? " stack-marginBottom-" + marginBottom : ""
    const justifyContentStyle = justifyContent ? " stack-" + justifyContent : ""
    const alignItemsStyle = alignItems ? " stack-align-items-" + alignItems : ""
    const flexStyle = flex !== undefined ? " stack-flex-" + flex : ""



    return (
        <div style={style} className={'stack' + flexStyle + alignItemsStyle + justifyContentStyle + flexDirectionStyle + gapStyle + marginXStyle + marginYStyle + marginBottomStyle + marginTopStyle}>
            {children}
        </div>
    )
}