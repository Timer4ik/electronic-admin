'use client'
import { ErrorText, Select } from '../../ui'
import { useField } from 'formik'
import React, { FC } from 'react'
import { SelectProps } from '../../ui/Select/Select'


interface FormikSelectProps extends Pick<SelectProps, "label" | "children"> {
    name: string
    defaultValue?: string
}


export const FormikSelect: FC<FormikSelectProps> = ({ name, defaultValue, children, label }) => {

    const [field, meta, helpers] = useField({ value: defaultValue, name })

    const onChange = (value: string) => {
        helpers.setValue(value)
        console.log(value);

    }

    return (
        <div>
            <Select onChange={onChange} label={label} value={field.value} isInvalid={!!meta.error}>
                {children}
            </Select>

            {meta.error && <ErrorText>{meta.error}</ErrorText>}
        </div>
    )
}


