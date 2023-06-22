import { ChangeEvent, FC } from "react"
import { useField, Formik, Form } from "formik"
import { ErrorText, Field, Select } from "@/components/ui"

interface FormikField {
    name: string
    label: string
    type?: string
    mask?: (e: ChangeEvent<HTMLInputElement>) => string
}

export const FormikField: FC<FormikField> = ({ label, name, type, mask }) => {

    const [field, meta, helpers] = useField({ name })
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = mask ? mask(e) : e.target.value
        
        helpers.setValue(value)
    }

    return (
        <div>
            <Field type={type} label={label} value={field.value} isInvalid={!!meta.error}
                onChange={handleOnChange} />
            {meta.error && <ErrorText>{meta.error}</ErrorText>}
        </div>

    )

}