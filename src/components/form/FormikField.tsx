import { FC } from "react"
import { useField, Formik, Form } from "formik"
import { ErrorText, Field, Select } from "@/ui-kit"

interface FormikField {
    name: string
    label: string
}

export const FormikField: FC<FormikField> = ({ label, name }) => {

    const [field, meta, helpers] = useField({ name })

    return (
        <div>
            <Field label={label} value={field.value} isInvalid={!!meta.error} onChange={(e) => helpers.setValue(e.target.value)} />
            {meta.error && <ErrorText>{meta.error}</ErrorText>}
        </div>

    )

}