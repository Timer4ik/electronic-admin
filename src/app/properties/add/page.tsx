'use client'
import React, { useCallback, useEffect } from 'react'
import FormikForm, { TemplateFields, TemplateTypes } from '@/components/form/FormikForm'
import { useParams, useRouter } from 'next/navigation'
import { ICategory, IProperty, IPropertyType } from '@/types/models/types'
import { Card, Col, Row, Tabs, TabsItem } from '@/ui-kit'
import { useCreatePropertyMutation, useFetchAllPropertiesQuery, useFetchPropertyByIdQuery } from '@/api/properties'
import { useFetchAllPropertyTypesQuery } from '@/api/propertyTypes'


const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: properties, refetch: refetchProperties } = useFetchAllPropertiesQuery({ limit: 5, page: 0 })
    const { data: propertyTypes } = useFetchAllPropertyTypesQuery({ limit: 5, page: 0 })

    const [createPropertyType, { isLoading }] = useCreatePropertyMutation()

    const fieldsTemplate = useCallback((property?: IProperty): TemplateFields[] => [

        {
            label: "Название характеристики",
            name: "name",
            type: TemplateTypes.TEXT,
            initialValue: property?.name || ""
        },
        {
            label: "Единица измерения",
            name: "property_type",
            type: TemplateTypes.SELECT,
            options: [
                ...propertyTypes?.data.map(property_type => ({ value: property_type.property_type_id, content: property_type.type_name })) || []
            ],
            initialValue: {
                value: propertyTypes?.data[0]?.property_type_id || 0,
                content: propertyTypes?.data[0]?.type_name || "",
            }
        },


    ], [propertyTypes])

    return (
        <div>
            <Row>
                <h1>Единицы измерения категорий - Создание</h1>
            </Row>
            <Card>
                <Col>
                    <Row>
                        <Tabs>
                            <TabsItem active>Основная информация</TabsItem>
                            <TabsItem>Дополнительная информация</TabsItem>
                        </Tabs>
                    </Row>
                    <FormikForm
                        fieldsTemplate={fieldsTemplate()}
                        onSubmit={async (values) => {
                            await createPropertyType({
                                name: values.name,
                                property_type_id: values.property_type.value
                            })
                            router.push("/properties")
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
// import { useUpdateCategoryMutation, useFetchAllCategoriesQuery, useFetchCategoryByIdQuery } from '@/api/properties'
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

//     const { data: properties } = useFetchAllCategoriesQuery("")
//     const { data: property, isSuccess } = useFetchCategoryByIdQuery(+params?.id)

//     const [updateCategory, { isLoading }] = useUpdateCategoryMutation()


//     useEffect(() => {

//     }, [isSuccess])


//     return (
//         <>
//             <Row>
//                 <h2>Редактирование категории товара - {property?.data?.name}({property?.data?.category_id})</h2>
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