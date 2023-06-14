'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FormikForm, { FormikFieldsTemplate, TemplateFields, TemplateTypes, generateInitialObject } from '@/components/form/FormikForm'
import { useUpdateCategoryMutation, useFetchAllCategoriesQuery, useFetchCategoryByIdQuery, useCreateCategoryMutation } from '@/api/categories'
import { useParams, useRouter } from 'next/navigation'
import { ICategory } from '@/types/models/types'
import { Button, Card, Col, Row, Tabs, TabsItem } from '@/ui-kit'
import { FormikField } from '@/components/form/FormikField'
import { FormikCheckbox } from '@/components/form/FormikCheckbox'
import { FormikSelect } from '@/components/form/FormikSelect'
import { FormikPhotoLoader } from '@/components/form/FormikPhotoLoader'
import { Form, Formik } from 'formik'


const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: categories, refetch: refetchCategories } = useFetchAllCategoriesQuery({})
    const { data: category, isSuccess, refetch: refetchCategory } = useFetchCategoryByIdQuery(+params?.id)

    const [createCategory, { isLoading }] = useCreateCategoryMutation()

    const [selectedTab, setSelectedTab] = useState(0)

    const fieldsTemplateTab1 = useCallback((): TemplateFields[] => [
        {
            label: "Название категории",
            name: "name",
            type: TemplateTypes.TEXT,
            initialValue: ""
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
                value: 0,
                content: "Не выбрано"
            }
        },
        {
            label: "Активность",
            name: "is_active",
            type: TemplateTypes.CHECKBOX,
            initialValue: false
        },
        {
            label: "Фото категории",
            name: "photo_full",
            type: TemplateTypes.IMAGE,
            initialValue: {
                url: "",
                file: null,
            }
        },
    ], [categories])

    const fieldsTemplateTab2 = useCallback((): TemplateFields[] => [
        {
            label: "Описание категории",
            name: "desc",
            type: TemplateTypes.TEXT,
            initialValue: ""
        },
        {
            label: "Крайняя категория?",
            name: "is_end",
            type: TemplateTypes.CHECKBOX,
            initialValue: false,
        },
    ], [])

    const initialValuesTab1 = useMemo(() => generateInitialObject(fieldsTemplateTab1()), [fieldsTemplateTab1])
    const initialValuesTab2 = useMemo(() => generateInitialObject(fieldsTemplateTab2()), [fieldsTemplateTab2])


    return (
        <div>
            <Row>
                <h1>Категории товаров - Создание</h1>
            </Row>
            <Card>
                <Col>
                    <Row>
                        <Tabs>
                            <TabsItem active={selectedTab == 0} onClick={() => setSelectedTab(0)}>Основная информация</TabsItem>
                            <TabsItem active={selectedTab == 1} onClick={() => setSelectedTab(1)}>Дополнительные данные</TabsItem>
                        </Tabs>
                    </Row>
                    <Formik initialValues={{ ...initialValuesTab1, ...initialValuesTab2 }}
                        onSubmit={async (values:any) => {
                            await createCategory({
                                name: values.name,
                                is_end: values.is_end,
                                photo: values.photo_full.file,
                                parent_id: values.parent_category.value,
                                is_active: values.is_active,
                                desc:values.desc,
                            })
                            refetchCategories()
                            router.back()
                        }}
                    >
                        <Form>
                            {selectedTab == 0 && <FormikFieldsTemplate fieldsTemplate={fieldsTemplateTab1()} />}
                            {selectedTab == 1 && <FormikFieldsTemplate fieldsTemplate={fieldsTemplateTab2()} />}
                            <Button type='submit'>Сохранить</Button>
                        </Form>
                    </Formik>
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