import { FC } from "react"
import { useField, Formik, Form } from "formik"
import { AdaptiveImage, Col, ErrorText, Field, PhotoLoader, Row, Select, Stack } from "../../ui"

interface FormikPhotoLoader {
    name: string
    label: string
}

export const FormikPhotoLoader: FC<FormikPhotoLoader> = ({ label, name }) => {

    const [field, meta, helpers] = useField({
        name,
        validate(value) {
            const type = value?.file?.name?.split(".")[value.file.name?.split(".").length - 1]
            if (! value?.file?.name){
                return
            }
            if (
                type !== "jpg" &&
                type !== "png" &&
                type !== "jpeg" &&
                type !== "webp"
            ) {
                return "Загружен не корректный тип файла";
            }
            if (value?.file?.size / 1024 / 1024 > 5) {
                return "Максимальный вес файла 5 мегабайт";
            }
        }
    })

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
        <>
            <Stack flex={"same-all"} gap={5}>
                <PhotoLoader label={label} onChange={handleOnFileChange} isInvalid={!!meta.error} />
                <Stack flexDirection="column" gap={2}>
                    {!!field?.value?.url && !meta.error && <Field noModify label={field?.value.file?.name} value={Math.round(field?.value.file?.size / 1024) + " кб"} />}
                    {!!field?.value?.url && !meta.error && <AdaptiveImage src={field?.value?.url} />}
                </Stack>
            </Stack>
            {meta.error && <ErrorText>{meta.error}</ErrorText>}
        </>

    )

}