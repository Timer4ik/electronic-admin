import React, { FC, useState } from 'react'
import "./Select.scss"
import { useEffectOutsideClick } from '@/hooks/useEffectOutsideClick'

interface Props {
    label?: string
    selectedItem?: {
        value: string | number,
        content: string
    }
    options: {
        value: string | number,
        content: string
    }[]
    isInvalid?: boolean
    onChange: (selectedItem: { value: string | number, content: string }) => void
}

export const Select: FC<Props> = ({ label, selectedItem, options, isInvalid, onChange }) => {

    const [isOpened, setIsOpened] = useState(false)
    const [currentItem, setCurrentItem] = useState(selectedItem)

    useEffectOutsideClick("select", () => {
        if (isOpened) {
            setIsOpened(false)
        }
    }, [isOpened])

    const handleClick = (option: {
        value: string | number,
        content: string
    }) => {
        setCurrentItem(option)
        onChange(option)
    }

    return (
        <label className='select' onClick={(e) => { setIsOpened(!isOpened); e.stopPropagation() }}>

            {label ? <div className='select__label'>{label}</div> : null}

            <div className={(isOpened ? 'select__input active' : 'select__input') + (isInvalid ? " error" : "")} >

                <div className='select__value'>{currentItem?.content || options[0].content}</div>
                {isOpened &&
                    <div className='select__options'>
                        {options?.map(option => (
                            <div className='select__option' key={option.value} onClick={() => handleClick(option)}>{option.content}</div>
                        ))}
                    </div>
                }
            </div>
        </label>
    )
}



// import React, { Children, FC, ReactNode, useState } from 'react'
// import "./Select.scss"
// import { useEffectOutsideClick } from '@/hooks/useEffectOutsideClick'

// interface SelectProps {
//     children: ReactNode
//     label: string
//     selectedItem: string
// }

// interface SelectOptionProps extends React.HTMLAttributes<HTMLDivElement> {
//     children:ReactNode
// }

// export const SelectOption:FC<SelectOptionProps> = ({ children, ...props }) => {
//     return <div className='select__option' {...props}>{children}</div>
// }

// export const Select: FC<SelectProps> = ({ label, children, selectedItem }) => {

//     const [isOpened, setIsOpened] = useState(false)

//     useEffectOutsideClick("select",() => {
//         if (isOpened){
//             setIsOpened(false)
//         }
//     },[isOpened])

//     return (
//         <label className='select' onClick={(e) => { setIsOpened(!isOpened);e.stopPropagation() }}>

//             {label ? <div className='select__label'>{label}</div> : null}

//             <div className={isOpened ? 'select__input active' : 'select__input'} >

//                 <div className='select__value'>{selectedItem ?? "Выберите значение"}</div>

//                 {isOpened && <div className='select__options'>
//                     {isOpened && Children.map(children, child => <>{child}</>)}
//                 </div>}

//             </div>
//         </label>
//     )
// }
