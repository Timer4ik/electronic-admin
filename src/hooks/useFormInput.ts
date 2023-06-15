import { ChangeEvent, useState } from "react"

interface useFormInputOptions {
    mask?: (value:string) => any,
    initialValue: string,
    validateOnChange?: (value:string) => any,
    validateOnBlur?: (value:string) => any
}

export const useInput = (initialValue:any) => {
    const [value,setValue] = useState(initialValue)

    return {
        value,
        onChange(e:any) {
            setValue(e.target.value)
        }
    }
}

export const useFormInput = (options: useFormInputOptions) => {

    const {
        mask,
        initialValue,
        validateOnChange,
        validateOnBlur,
    } = options

    const [value, setValue] = useState(initialValue)
    const [isValid, setIsValid] = useState(true)

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {

        if (validateOnBlur) {
            const validationResult = validateOnBlur(value)

            setIsValid(validationResult)
        }
        
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(value);
        
        const maskedValue = mask ? mask(e.target.value) : e.target.value

        if (validateOnChange) {
            const validationResult = validateOnChange(maskedValue)
            setIsValid(validationResult)
        }
        if (validateOnBlur) {
            const validationResult = validateOnBlur(value)
            if (validationResult) {
                setIsValid(validationResult)
            }
        }

        setValue(maskedValue)
    }

    return {
        setValue,
        isValid,
        state: {
            value,
            onChange,
            onBlur
        }
    }
}