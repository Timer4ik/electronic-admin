import { ChangeEvent, FC } from "react"
import { useField, Formik, Form } from "formik"
import { Textarea, Select, ErrorText } from "../../ui"

interface FormikTextarea {
    name: string
    label: string
    type?: string
    mask?: (e: ChangeEvent<HTMLInputElement>) => string
    validate?:(values:string)=>string
}

export const FormikTextarea: FC<FormikTextarea> = ({ label, name, type, mask,validate }) => {

    const [field, meta, helpers] = useField({ name,validate })
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = mask ? mask(e) : e.target.value
        
        helpers.setValue(value)
    }

    return (
        <div>
            <Textarea label={label} value={field.value} 
            isInvalid={!!meta.error}
            onChange={(e) => helpers.setValue(e.target.value)}/>
            {meta.error && <ErrorText>{meta.error}</ErrorText>}
        </div>

    )

}