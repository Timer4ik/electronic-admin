'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { useCreatePropertyMutation, useFetchAllPropertiesQuery } from '@/redux/services/properties'
import { FormikSelect } from '@/components/form/FormikSelect'
import { addNotSelectedOption } from '@/utils/addNotSelectedOption'

interface FormType {
    name: string
    property_type: {
        content: string
        value: number
    }
    is_active: boolean
    _propertyTypes: {
        content: string
        value: number
    }[]
}

const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: properties, refetch: refetchProperties } = useFetchAllPropertiesQuery({
       
    })
    const { data: propertyTypes, isLoading: isPropertyTypesLoading } = useFetchAllPropertyTypesQuery({
        "filter[is_active]": true
    })

    const [createProperty, { isLoading }] = useCreatePropertyMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название характеристики должно иметь не меньше 2 символов')
            .max(50, 'Название характеристики не должно иметь больше 50 символов')
            .required('Обязательное поле')

    });

    const initialValues = useMemo((): FormType => {
        return {
            name: "",
            property_type: {
                content: "Не выбрано",
                value: 0
            },
            is_active: false,
            _propertyTypes: addNotSelectedOption(propertyTypes?.data.map(item => {
                return {
                    value: item.property_type_id,
                    content: item.type_name
                }
            }))
        }
    }, [propertyTypes])

    const handleSubmit = async (values: FormType) => {
        try {
            await createProperty({
                name: values.name,
                property_type_id: values.property_type.value,
                is_active: values.is_active
            })
            refetchProperties()
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
                {isPropertyTypesLoading &&
                    <Loader />
                }
                {!isPropertyTypesLoading &&
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
                                        <FormikField label='Название характеристики' name={'name'} />
                                    </Row>
                                    <Row>
                                        <FormikSelect
                                            label='Единица измерения'
                                            name={'property_type'}
                                            selectedItem={initialValues.property_type}
                                            options={initialValues._propertyTypes}
                                        />
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