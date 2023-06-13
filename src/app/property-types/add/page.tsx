'use client'
import React, { useCallback, useEffect } from 'react'
import FormikForm, { TemplateFields, TemplateTypes } from '@/components/form/FormikForm'
import { useCreatePropertyTypeMutation, useFetchAllPropertyTypesQuery, useFetchPropertyTypeByIdQuery, useUpdatePropertyTypeMutation } from '@/api/propertyTypes'
import { useParams, useRouter } from 'next/navigation'
import { ICategory, IPropertyType } from '@/types/models/types'
import { Card, Col, Row, Tabs, TabsItem } from '@/ui-kit'


const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: propertyTypes, refetch: refetchPropertyTypes } = useFetchAllPropertyTypesQuery({limit:5,page:0})
    const { data: propertyType, isSuccess, refetch: refetchPropertyType } = useFetchPropertyTypeByIdQuery(+params?.id)

    const [createPropertyType, { isLoading }] = useCreatePropertyTypeMutation()

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


    ], [propertyTypes, propertyType])

    return (
        <div>
            <Row>
                <h1>Единицы измерения категорий - Создание</h1>
            </Row>
            <Card>
                <Col>
                    <Row>
                        <Tabs>
                            <TabsItem>Один</TabsItem>
                            <TabsItem>Два</TabsItem>
                            <TabsItem>Три</TabsItem>
                            <TabsItem>Четыре</TabsItem>
                        </Tabs>
                    </Row>
                    <FormikForm
                        fieldsTemplate={fieldsTemplate()}
                        onSubmit={async (values) => {
                            await createPropertyType({
                                type_name: values.type_name,
                                unit_type: values.unit_type,
                            })
                            refetchPropertyTypes()
                            refetchPropertyType()
                            router.back()
                        }}
                    />
                </Col>

            </Card>

        </div>

    )
}

export default CategoryEditPage


// 'use client'
// import React, { useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { useUpdateCategoryMutation, useFetchAllCategoriesQuery, useFetchCategoryByIdQuery } from '@/api/propertyTypes'
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

//     const { data: propertyTypes } = useFetchAllCategoriesQuery("")
//     const { data: propertyType, isSuccess } = useFetchCategoryByIdQuery(+params?.id)

//     const [updateCategory, { isLoading }] = useUpdateCategoryMutation()


//     useEffect(() => {

//     }, [isSuccess])


//     return (
//         <>
//             <Row>
//                 <h2>Редактирование категории товара - {propertyType?.data?.name}({propertyType?.data?.category_id})</h2>
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