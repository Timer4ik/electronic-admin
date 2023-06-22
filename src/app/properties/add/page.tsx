'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button, Card, Row, Tabs, TabsItem } from '@/components/ui'
import { Form, Formik } from 'formik'
import { FormikField } from '@/components/form/FormikField'
import { FormikCheckbox } from '@/components/form/FormikCheckbox'
import { object as YupObject, string as YupString } from 'yup';
import { useCreatePropertyMutation } from '@/redux/services/propertiesApi'
interface FormType {
    name: string
    is_active: boolean
}

const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const [createProperty] = useCreatePropertyMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название характеристики должно иметь не меньше 2 символов')
            .max(50, 'Название характеристики не должно иметь больше 50 символов')
            .required('Обязательное поле')

    });

    const initialValues = {
        name: "",
        is_active: false,
    }

    const handleSubmit = async (values: FormType) => {
        try {
            await createProperty({
                name: values.name,
                is_active: values.is_active
            })
            router.push("/properties")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Row>
                <h1>Характеристики - Создание</h1>
            </Row>
            <Card>
                <Row>
                    <Tabs>
                        <TabsItem active={activeTab == 0} onClick={() => setActiveTab(0)}>Основная информация</TabsItem>
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
                                <FormikField label='Название характеристики' name={'name'} />
                            </Row>
                            <Row>
                                <FormikCheckbox label='Активность' name={'is_active'} />
                            </Row>
                        </>}
                        <Button type='submit'>Сохранить</Button>
                    </Form>
                </Formik>
            </Card>

        </div>

    )
}

export default CategoryEditPage


// 'use client'
// import React, { useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { useUpdateCategoryMutation, useFetchAllCategoriesQuery, useFetchCategoryByIdQuery } from '@/redux/services/properties'
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