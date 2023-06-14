import { FC } from "react"
import { useField, Formik, Form } from "formik"
import { AdaptiveImage, Col, Field, PhotoLoader, Row, Select } from "@/ui-kit"

interface FormikPhotoLoader {
    name: string
    label: string
}

export const FormikPhotoLoader: FC<FormikPhotoLoader> = ({ label, name }) => {

    const [field, meta, helpers] = useField({ name })

    const handleOnFileChange = (e: any) => {
        const files = e.target.files
        if (!files?.length) {
            return
        }
        const url = URL.createObjectURL(files[0]);
        const file = files[0]
        helpers.setValue({ url, file })
    }

    return (
        <Row>
            <PhotoLoader label={label} onChange={handleOnFileChange} />
            <Col>
                {!!field?.value?.url && <Field noModify label={field?.value.file?.name} value={Math.round(field?.value.file?.size / 1024) + " кб"} />}
                {!!field?.value?.url && <AdaptiveImage src={field?.value?.url} />}
            </Col>
        </Row>

    )

}