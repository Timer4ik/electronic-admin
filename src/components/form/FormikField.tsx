import { ChangeEvent, FC, useMemo } from "react"
import { useField, Formik, Form } from "formik"
import { ErrorText, Field } from "../../ui"

interface FormikField {
    name: string
    label: string
    type?: string
    mask?: (value: any) => any
    validate?: (values: string) => string
}

export const FormikField: FC<FormikField> = ({ label, name, type, mask, validate }) => {

    const [field, meta, helpers] = useField({ name, validate })
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

        helpers.setValue(mask ? mask(e.target.value) : e.target.value)
    }

    return (
        <div>
            <Field type={type} label={label} value={field.value}
                isInvalid={!!meta.error}
                onChange={handleOnChange} />
            {meta.error && <ErrorText>{meta.error}</ErrorText>}
        </div>

    )

}