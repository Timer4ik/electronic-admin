'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button, Card, Row, Tabs, TabsItem } from '@/components/ui'
import { Form, Formik } from 'formik'
import { FormikField } from '@/components/form/FormikField'
import { FormikCheckbox } from '@/components/form/FormikCheckbox'
import { object as YupObject, string as YupString } from 'yup';
import { useCreateDeveloperMutation } from '@/redux/services/developersApi'
import { FormikPhotoLoader } from '@/components/form/FormikPhotoLoader'
import { useCreateFileMutation } from '@/redux/services/filesApi'
import { addNotSelectedOption } from '@/utils/addNotSelectedOption'
import { useGetProductsQuery } from '@/redux/services/productsApi'
import { useCreateSliderMutation, useGetSliderByIdQuery, useUpdateSliderByIdMutation } from '@/redux/services/slidersApi'
import { FormikSelect } from '@/components/form/FormikSelect'

interface FormType {
    title: string
    text: string
    photo: any;
    file_id?: number
    is_active: boolean

    start_active_dt: any
    end_active_dt: any
    product_id: number
}

const SliderEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const [updateSlider] = useUpdateSliderByIdMutation()

    const { data: slider, isLoading: isSliderLoading } = useGetSliderByIdQuery({
        id: +params?.id,
        params: {
            extend: "file"
        }
    })
    console.log();

    const [createFile] = useCreateFileMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        title: YupString()
            .min(2, 'Название должно иметь не меньше 2 символов')
            .max(50, 'Название не должно иметь больше 50 символов')
            .required('Обязательное поле'),

    });

    const initialValues: FormType = {
        title: slider?.data.title || "",
        text: slider?.data.text || "",
        photo: {
            url: slider?.data?.file?.link,
            file: {
                name: slider?.data?.file?.name,
                size: slider?.data?.file?.size
            }
        },
        is_active: slider?.data.is_active || false,
        product_id: slider?.data.product_id || 0,
        end_active_dt: new Date(slider?.data.end_active_dt || Date.now())?.toISOString().split('T')[0],
        start_active_dt: new Date(slider?.data.start_active_dt || Date.now())?.toISOString().split('T')[0],
    }

    const handleSubmit = async (values: FormType) => {
        try {
            if (values?.photo?.file?.type) {
                let data = await createFile(values.photo)

                if (('error' in data)) {
                    return
                }

                values.file_id = data?.data?.file_id
            }

            await updateSlider({
                slider_id: slider?.data.slider_id || 0,
                title: values.title,
                text: values.text,
                end_active_dt: values.end_active_dt,
                start_active_dt: values.start_active_dt,
                is_active: values.is_active,
                file_id: values.file_id,
                product_id: values.product_id,
            })
            router.push("/sliders")
        } catch (error) {
            console.log(error);
        }
    }

    return !isSliderLoading && (
        <div>
            <Row>
                <h1>Слайдеры - Создание</h1>
            </Row>
            <Card>
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
                                <FormikField label='Заголовок слайдера' name={'title'} />
                            </Row>
                            <Row>
                                <FormikField label='Текст слайдера' name={'text'} />
                            </Row>
                            <Row>
                                <FormikCheckbox label='Активность' name={'is_active'} />
                            </Row>
                            <Row>
                                <FormikField label='Id прикреплённого продукта' name={'product_id'} />
                            </Row>
                            <Row>
                                <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                            </Row>
                            <Row>
                                <FormikField type="date" label='Конец активности' name={'end_active_dt'} />
                            </Row>
                            <Row>
                                <FormikField type="date" label='Начало активности слайдера' name={'start_active_dt'} />
                            </Row>
                        </>}
                        <Button type='submit'>Сохранить</Button>
                    </Form>
                </Formik>
            </Card>

        </div >

    )
}

export default SliderEditPage


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