import { ChangeEvent, FC, useMemo } from "react"
import { useField, Formik, Form } from "formik"
import { CoordsField, ErrorText, Field } from "../../ui"

interface FormikCoords {
    name: string
    label: string
}

export const FormikCoords: FC<FormikCoords> = ({ label, name }) => {

    const [field, meta, helpers] = useField({ name })

    const handleOnChange = (coords: [number, number]) => {

        helpers.setValue(coords)
    }

    return (
        <div>
            <CoordsField label={label} onChange={handleOnChange} coords={field.value} />
        </div>

    )

}