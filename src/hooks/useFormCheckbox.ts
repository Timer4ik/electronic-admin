import { ChangeEvent, useState } from "react"

interface useFormCheckboxOptions {
    initialValue: boolean,
    validateOnChange?: (value:boolean) => any,
    validateOnBlur?: (value:boolean) => any
}

export const useFormCheckbox = (options: useFormCheckboxOptions) => {

    const {
        initialValue,
        validateOnChange,
        validateOnBlur,
    } = options

    const [checked, setChecked] = useState(initialValue)
    const [isValid, setIsValid] = useState(true)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const isChecked = e.target.checked

        if (validateOnChange) {
            const validationResult = validateOnChange(isChecked)
            setIsValid(validationResult)
        }

        setChecked(isChecked)
    }

    return {
        isValid,
        state: {
            checked,
            onChange,
            // onBlur
        }
    }
}