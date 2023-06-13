import { FC } from "react"
import { useField, Formik, Form } from "formik"
import { Checkbox } from "@/ui-kit"

interface FormikCheckbox {
    name: string
    label: string
}

export const FormikCheckbox: FC<FormikCheckbox> = ({ label, name }) => {

    const [field, meta, helpers] = useField({ name })

    return (
        <div>
            <Checkbox label={label} checked={field.value} onChange={e => helpers.setValue(e.target.checked)} />
        </div>

    )

}