import React from 'react'
// import "./Loader.scss"

export const Loader = ({ fixed }: { fixed?: boolean }) => {
    return (
        <div className={"loader" + (fixed ? " fixed" : "")}>
            <span ></span>
        </div>
    )
}
