import { FC } from "react"
import { useField, Formik, Form } from "formik"
import { ErrorText, Select } from "@/ui-kit"

interface FormikSelectProps {
    name: string
    label: string
    options?: {
        value: string | number,
        content: string
    }[]
    selectedItem: {
        value: string | number,
        content: string
    }
}

export const FormikSelect: FC<FormikSelectProps> = ({ label, selectedItem, options, name }) => {

    const [field, meta, helpers] = useField({ name })

    const handleChangeSelection = (option: any) => {
        helpers.setValue(option)
    }

    return (
        <div>
            <Select
                label={label}
                onChange={handleChangeSelection}
                selectedItem={field.value}
                options={options}
                isInvalid={!!meta.error}
            />
            {meta.error && <ErrorText>{meta.error}</ErrorText>}
        </div>

    )

}