'use client'
import React, { useCallback, useEffect, useMemo } from 'react'
import FormikForm, { FormikFieldsTemplate, TemplateFields, TemplateTypes, generateInitialObject } from '@/components/form/FormikForm'
import { useCreatePropertyTypeMutation, useFetchAllPropertyTypesQuery, useFetchPropertyTypeByIdQuery, useUpdatePropertyTypeMutation } from '@/api/propertyTypes'
import { useParams, useRouter } from 'next/navigation'
import { ICategory, IPropertyType } from '@/types/models/types'
import { Button, Card, Col, Row, Tabs, TabsItem } from '@/ui-kit'
import { Form, Formik } from 'formik'


const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: propertyTypes, refetch: refetchPropertyTypes } = useFetchAllPropertyTypesQuery({ limit: 10, page: 0 })
    const { data: propertyType, isSuccess, refetch: refetchPropertyType } = useFetchPropertyTypeByIdQuery(+params?.id)

    const [updatePropertyType, { isLoading }] = useUpdatePropertyTypeMutation()

    const fieldsTemplate = useCallback((propertyType?: IPropertyType): TemplateFields[] => [
        {
            label: "Название единицы измерения",
            name: "type_name",
            type: TemplateTypes.TEXT,
            initialValue: propertyType?.type_name || ""
        },
        {
            label: "Название категории",
            name: "unit_type",
            type: TemplateTypes.TEXT,
            initialValue: propertyType?.unit_type || ""
        },
    ], [propertyType])

    const initialValues = useMemo(() => generateInitialObject(fieldsTemplate(propertyType?.data)), [fieldsTemplate])

    return (
        <div>
            <Row>
                <h1>Единицы измерения категорий - {propertyType?.data.type_name}({propertyType?.data.property_type_id})</h1>
            </Row>
            <Card>
                <Col>
                    <Row>
                        <Tabs>
                            <TabsItem active>Основная информация</TabsItem>
                        </Tabs>
                    </Row>
                    {!!propertyType?.data?.property_type_id && <FormikForm
                        fieldsTemplate={fieldsTemplate(propertyType.data)}
                        onSubmit={async (values) => {
                            await updatePropertyType({
                                property_type_id: propertyType?.data?.property_type_id,
                                type_name: values.type_name,
                                unit_type: values.unit_type,
                            })
                            refetchPropertyTypes()
                            refetchPropertyType()
                            router.back()
                        }}
                    />}
                    {propertyType?.data && <Formik initialValues={initialValues}
                        onSubmit={async (values: any) => {
                            await updatePropertyType({
                                property_type_id: propertyType?.data?.property_type_id,
                                type_name: values.type_name,
                                unit_type: values.unit_type,
                            })
                            refetchPropertyTypes()
                            refetchPropertyType()
                            router.back()
                        }}
                    >
                        <Form>
                            <FormikFieldsTemplate fieldsTemplate={fieldsTemplate(propertyType?.data)} />
                            <Button type='submit'>Сохранить</Button>
                        </Form>
                    </Formik>}
                </Col>

            </Card>
        </div>

    )
}

export default CategoryEditPage


// 'use client'
// import React, { useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { useUpdateCategoryMutation, useFetchAllCategoriesQuery, useFetchCategoryByIdQuery } from '@/api/categories'
// import { AdaptiveImage, Button, Card, Checkbox, Col, Field, PhotoLoader, Row, RowBetween, Select, SelectOption, Tabs, TabsItem } from '@/ui-kit'
// import { useFormik } from "formik"
// import { ICategory } from '@/types/models/types'


// const CategoryEditPage = () => {

//     const fieldsTemplate = [
//         {
//         },
//         {
//         }
//     ]

//     const params = useParams()

//     const { data: categories } = useFetchAllCategoriesQuery("")
//     const { data: category, isSuccess } = useFetchCategoryByIdQuery(+params?.id)

//     const [updateCategory, { isLoading }] = useUpdateCategoryMutation()


//     useEffect(() => {

//     }, [isSuccess])


//     return (
//         <>
//             <Row>
//                 <h2>Редактирование категории товара - {category?.data?.name}({category?.data?.category_id})</h2>
//             </Row>
//             <Card>
//                 <Row>
//                     <Tabs>
//                         <TabsItem active>Привет</TabsItem>
//                         <TabsItem>Привет</TabsItem>
//                         <TabsItem>Привет</TabsItem>
//                         <TabsItem>Привет</TabsItem>
//                     </Tabs>
//                 </Row>
//                 <Row>
//                     <form>
//                         <Col>
//                             <Field label='Название категории' type="text" />
//                             <Select selectedItem={"Не выбрано"} label="Выбор родительской категории">
//                                 <SelectOption>Не выбрано</SelectOption>
//                             </Select>
//                             <Checkbox label='Конечная категория' type="checkbox" />
//                             <PhotoLoader label='Фото Категории' />

//                             <Button type="submit">Сохранить</Button>
//                         </Col>
//                     </form>
//                 </Row>

//             </Card >
//         </>
//     )
// }

// export default CategoryEditPage