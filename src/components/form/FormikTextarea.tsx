import { FC } from "react"
import { useField, Formik, Form } from "formik"
import { Textarea, Select } from "@/ui-kit"

interface FormikTextarea {
    name: string
    label: string
}

export const FormikTextarea: FC<FormikTextarea> = ({ label, name }) => {

    const [field, meta, helpers] = useField({ name })

    return (
        <div>
            <Textarea label={label} value={field.value} onChange={(e) => helpers.setValue(e.target.value)}/>
        </div>

    )

}