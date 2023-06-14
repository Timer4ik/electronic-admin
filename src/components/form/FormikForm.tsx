import React, { FC, ReactNode, useMemo } from 'react'
import { useField, Formik, Form, FormikHelpers, FormikConfig, FormikValues } from "formik"
import { Button, Row } from '@/ui-kit'
import { FormikField } from './FormikField'
import { FormikCheckbox } from './FormikCheckbox'
import { FormikSelect } from './FormikSelect'
import { FormikPhotoLoader } from './FormikPhotoLoader'



export enum TemplateTypes {
    TEXT = "TEXT",
    SELECT = "SELECT",
    CHECKBOX = "CHECKBOX",
    IMAGE = "IMAGE"
}

export interface TemplateText {
    label: string
    name: string
    type: TemplateTypes.TEXT
    initialValue: string
}
export interface TemplateCheckbox {
    label: string
    name: string
    type: TemplateTypes.CHECKBOX
    initialValue: boolean
}
export interface TemplateImage {
    label: string
    name: string
    type: TemplateTypes.IMAGE
    initialValue: {
        url: string,
        file: any
    }
}
export interface TemplateSelect {
    label: string
    name: string
    type: TemplateTypes.SELECT
    options: {
        value: string | number
        content: string
    }[]
    initialValue: {
        value: string | number
        content: string
    }
}

export type TemplateFields = TemplateText | TemplateCheckbox | TemplateSelect | TemplateImage


interface Props {
    children?: ReactNode
    fieldsTemplate: TemplateFields[]
    onSubmit: (values: any) => void
}

export const generateInitialObject = (fieldsTemplate: TemplateFields[]) => {
    let initialObject = {}
    fieldsTemplate.map(field => {
        initialObject = { ...initialObject, [field.name]: field.initialValue }
    })

    return initialObject
}

const FormikForm: FC<Props> = ({ fieldsTemplate, onSubmit, children, ...props }) => {

    const generateInitialObject = useMemo(() => {
        let initialObject = {}
        fieldsTemplate.map(field => {
            initialObject = { ...initialObject, [field.name]: field.initialValue }
        })

        return initialObject
    }, [fieldsTemplate])

    return (
        <Formik
            initialValues={generateInitialObject}
            onSubmit={onSubmit}
            {...props}
        >
            {children ?
                <Form>{children}</Form>
                :
                <Form>
                    {fieldsTemplate.map(field => {
                        if (field.type === TemplateTypes.TEXT) {
                            return (
                                <Row key={field.name}>
                                    <FormikField label={field.label} name={field.name} />
                                </Row>
                            )
                        }
                        else if (field.type === TemplateTypes.CHECKBOX) {
                            return (
                                <Row key={field.name}>
                                    <FormikCheckbox label={field.label} name={field.name} />
                                </Row>
                            )
                        }
                        else if (field.type === TemplateTypes.SELECT) {
                            return (
                                <Row key={field.name}>
                                    <FormikSelect label={field.label} selectedItem={field.initialValue} options={field.options} name={field.name} />
                                </Row>
                            )
                        }
                        else if (field.type === TemplateTypes.IMAGE) {
                            return (
                                <Row key={field.name}>
                                    <FormikPhotoLoader label={field.label} name={field.name} />
                                </Row>
                            )
                        }
                    })}
                    <Button type='submit'>Сохранить</Button>
                </Form>
            }
        </Formik>
    )
}

export default FormikForm


interface FormikFieldsTemplateProps {
    fieldsTemplate: TemplateFields[]
}
export const FormikFieldsTemplate: FC<FormikFieldsTemplateProps> = ({ fieldsTemplate, }) => {

    return (
        <>
            {fieldsTemplate.map(field => {
                if (field.type === TemplateTypes.TEXT) {
                    return (
                        <Row key={field.name}>
                            <FormikField label={field.label} name={field.name} />
                        </Row>
                    )
                }
                else if (field.type === TemplateTypes.CHECKBOX) {
                    return (
                        <Row key={field.name}>
                            <FormikCheckbox label={field.label} name={field.name} />
                        </Row>
                    )
                }
                else if (field.type === TemplateTypes.SELECT) {
                    return (
                        <Row key={field.name}>
                            <FormikSelect label={field.label} selectedItem={field.initialValue} options={field.options} name={field.name} />
                        </Row>
                    )
                }
                else if (field.type === TemplateTypes.IMAGE) {
                    return (
                        <Row key={field.name}>
                            <FormikPhotoLoader label={field.label} name={field.name} />
                        </Row>
                    )
                }
            })}
        </>)
}