import { FC } from "react"
import { useField, Formik, Form } from "formik"
import { ErrorText, Field, Select } from "@/components/ui"

interface FormikField {
    name: string
    label: string
    type?: string
}

export const FormikField: FC<FormikField> = ({ label, name, type }) => {

    const [field, meta, helpers] = useField({ name })

    return (
        <div>
            <Field type={type} label={label} value={field.value} isInvalid={!!meta.error} onChange={(e) => helpers.setValue(e.target.value)} />
            {meta.error && <ErrorText>{meta.error}</ErrorText>}
        </div>

    )

}