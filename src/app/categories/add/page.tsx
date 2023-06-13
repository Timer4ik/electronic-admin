'use client'
import React, { useCallback, useEffect } from 'react'
import FormikForm, { TemplateFields, TemplateTypes } from '@/components/form/FormikForm'
import { useUpdateCategoryMutation, useFetchAllCategoriesQuery, useFetchCategoryByIdQuery, useCreateCategoryMutation } from '@/api/categories'
import { useParams, useRouter } from 'next/navigation'
import { ICategory } from '@/types/models/types'
import { Card, Col, Row, Tabs, TabsItem } from '@/ui-kit'


const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: categories, refetch: refetchCategories } = useFetchAllCategoriesQuery({})
    const { data: category, isSuccess, refetch: refetchCategory } = useFetchCategoryByIdQuery(+params?.id)

    const [createCategory, { isLoading }] = useCreateCategoryMutation()

    const fieldsTemplate = useCallback((category?: ICategory): TemplateFields[] => [
       
        {
            label: "Название категории",
            name: "name",
            type: TemplateTypes.TEXT,
            initialValue: category?.name || ""
        },
        {
            label: "Крайняя категория?",
            name: "is_end",
            type: TemplateTypes.CHECKBOX,
            initialValue: category?.is_end || false,
        },
        {
            label: "Выберите родительскую категорию",
            name: "parent_category",
            type: TemplateTypes.SELECT,
            options: [
                {
                    value: 0,
                    content: "Не выбрано"
                },
                ...categories?.data.map(cat => ({ value: cat.category_id, content: cat.name })) || []
            ],
            initialValue: {
                value: category?.parent_id || 0,
                content: categories?.data.find(cat => cat.category_id == category?.parent_id)?.name || "Не выбрано"
            }
        },
        {
            label: "Активность",
            name: "is_active",
            type: TemplateTypes.CHECKBOX,
            initialValue: category?.is_active || false
        },
        {
            label: "Фото категории",
            name: "photo_full",
            type: TemplateTypes.IMAGE,
            initialValue: {
                url: "http://localhost:5000/" + category?.photo,
                file: null,
            }
        },
    ], [categories, category])

    return (
        <div>
            <Row>
                <h1>Категории товаров - Создание</h1>
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
                            await createCategory({
                                name: values.name,
                                is_end: values.is_end,
                                photo: values.photo_full.file,
                                parent_id: values.parent_category.value,
                                is_active: values.is_active
                            })
                            refetchCategories()
                            refetchCategory()
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