'use client'
import React, { useCallback, useEffect, useState } from 'react'
import FormikForm, { TemplateFields, TemplateTypes } from '@/components/form/FormikForm'
import { useCreatePropertyTypeMutation, useFetchAllPropertyTypesQuery, useFetchPropertyTypeByIdQuery, useUpdatePropertyTypeMutation } from '@/redux/services/propertyTypes'
import { useParams, useRouter } from 'next/navigation'
import { ICategory, IPropertyType } from '@/types/models/types'
import { Button, Card, Col, Row, Tabs, TabsItem } from '@/components/ui'
import { Form, Formik } from 'formik'
import Loader from '@/components/ui/Loader/Loader'
import { FormikField } from '@/components/form/FormikField'
import { FormikCheckbox } from '@/components/form/FormikCheckbox'
import { object as YupObject, string as YupString } from 'yup';

interface FormType {
    type_name: string
    unit_type: string
    is_active: boolean
}

const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: propertyTypes, refetch: refetchPropertyTypes, isLoading: propertyTypesIsLoading } = useFetchAllPropertyTypesQuery({ limit: 5, page: 0 })
    // const { data: propertyType, isSuccess, refetch: refetchPropertyType } = useFetchPropertyTypeByIdQuery(+params?.id)

    const [createPropertyType, { isLoading }] = useCreatePropertyTypeMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        type_name: YupString()
            .min(2, 'Название единицы измерения должно иметь не меньше 2 символов')
            .max(50, 'Название единицы измерения не должно иметь больше 50 символов')
            .required('Обязательное поле'),
        unit_type: YupString()
            .min(2, 'Обозначение единицы измерения должно иметь не меньше 2 символов')
            .max(50, 'Обозначение единицы измерения не должно иметь больше 50 символов')
            .required('Обязательное поле'),

    });

    const initialValues: FormType = {
        type_name: "",
        unit_type: "",
        is_active: false,
    }

    const handleSubmit = async (values: FormType) => {
        try {
            await createPropertyType({
                type_name: values.type_name,
                unit_type: values.unit_type,
                is_active: values.is_active
            })
            refetchPropertyTypes()
            router.push("/property-types")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Row>
                <h1>Единицы измерения - Создание</h1>
            </Row>
            <Card>
                {propertyTypesIsLoading &&
                    <Loader />
                }
                {!propertyTypesIsLoading &&
                    <>
                        <Row>
                            <Tabs>
                                <TabsItem active={activeTab == 0} onClick={() => setActiveTab(0)}>Основная информация</TabsItem>
                                <TabsItem active={activeTab == 1} onClick={() => setActiveTab(1)}>Дополнительные данные</TabsItem>
                            </Tabs>
                        </Row>

                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={schema}
                        >
                            <Form>
                                {activeTab == 0 && <>
                                    <Row>
                                        <FormikField label='Название единицы измерения' name={'type_name'} />
                                    </Row>
                                    <Row>
                                        <FormikField label='Обозначение' name={'unit_type'} />
                                    </Row>
                                    <Row>
                                        <FormikCheckbox label='Активность' name={'is_active'} />
                                    </Row>
                                </>}
                                <Button type='submit'>Сохранить</Button>
                            </Form>
                        </Formik>
                    </>}
            </Card>

        </div>

    )
}

export default CategoryEditPage


// 'use client'
// import React, { useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { useUpdateCategoryMutation, useFetchAllCategoriesQuery, useFetchCategoryByIdQuery } from '@/redux/services/propertyTypes'
// import { AdaptiveImage, Button, Card, Checkbox, Col, Field, PhotoLoader, Row, RowBetween, Select, SelectOption, Tabs, TabsItem } from '@/components/ui'
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