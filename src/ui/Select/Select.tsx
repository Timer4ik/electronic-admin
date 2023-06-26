'use client'
import React, { FC, ReactElement, useMemo, useState } from 'react'

interface SelectItemProps {
    children: React.ReactNode
    value: any
    onClick:(value: any) => void
}
export interface SelectProps {
    children: React.ReactNode
    label?: string
    value: any
    onChange: (value: any) => void
    isInvalid?: boolean
}
interface SelectOptionProps {
    children: React.ReactNode
    value: any
}

export const SelectOption: FC<SelectOptionProps> = ({ children, value }) => {
    return <>{children}</>

}

const SelectItem: FC<SelectItemProps> = ({ children, value, ...props }) => {

    const { onClick } = props as { onClick: any }

    return (
        <div className='select__option' onClick={() => onClick && onClick(value)}>
            {children}
        </div>
    )
}

export const Select: FC<SelectProps> = ({ children, label, value, onChange, isInvalid }) => {

    const [isOpened, setIsOpened] = useState<boolean>(false)
    const toggleSelect = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        setIsOpened(!isOpened);

        e.stopPropagation()
    }

    const options = useMemo(() => {
        return React.Children.map(children, (child) => {
            const childReactElem = (child as ReactElement<SelectOptionProps>)
            return {
                value: childReactElem.props.value,
                children: childReactElem.props.children,
            }
        })
    }, [children])

    const inputClassName = (isOpened ? 'select__input active' : 'select__input') + (isInvalid ? " error" : "")

    return (
        <label className='select' onClick={toggleSelect}>

            {label ? <div className='select__label'>{label}</div> : null}

            <div className={inputClassName} >

                <div className='select__value'>{options?.find(item => item.value == value)?.children || "Не выбрано"}</div>
                {isOpened &&
                    <div className='select__options'>
                        {options?.map(item => {
                            return (
                                <SelectItem key={item.value} onClick={onChange} value={item.value}>{item.children}</SelectItem>
                            )
                        })}
                    </div>
                }
            </div>
        </label>
    )
}
