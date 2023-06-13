import React, { FC, ReactNode } from 'react'
import "./FileLoader.scss"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const FileLoader: FC<Props> = ({ label, ...props }) => {
    return (
        <label className='fileloader'>
            {!!label && <div className='fileloader__label'>{label}</div>}
            <input className='fileloader__input' type="file" {...props} />
        </label>
    )
}

export default FileLoader