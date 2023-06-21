'use client'
import React, { useEffect, useState } from 'react'
import { useCreateCategoryMutation, useGetCategoriesQuery } from '@/redux/services/categoriesApi'
import { useParams, useRouter } from 'next/navigation'
import { Button, Card, Col, Loader, Row, Tabs, TabsItem } from '@/components/ui'
import { Form, Formik, useFormik } from 'formik'
import { FormikField } from '@/components/form/FormikField'
import { FormikCheckbox } from '@/components/form/FormikCheckbox'
import { FormikSelect } from '@/components/form/FormikSelect'
import { addNotSelectedOption } from '@/utils/addNotSelectedOption'
import { FormikPhotoLoader } from '@/components/form/FormikPhotoLoader'
import { FormikTextarea } from '@/components/form/FormikTextarea'
import { object as YupObject, string as YupString } from 'yup';
import { useCreateFileMutation } from '@/redux/services/filesApi'
import { useCreateProductMutation } from '@/redux/services/productsApi'
import { useGetDevelopersQuery } from '@/redux/services/developersApi'
import { SelectOption } from '@/components/ui/Select/Select'

interface FormType {
    name: string;
    descr: string;
    price: number;
    photo: any;
    developer_id: number;
    category_id: number;
    is_active: boolean;
    file_id?: number
}

const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: developers, isLoading: developersIsLoading } = useGetDevelopersQuery({})
    const { data: categories, isLoading: categoriesIsLoading } = useGetCategoriesQuery({})

    const [createProduct] = useCreateProductMutation()

    const [createFile] = useCreateFileMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название категории должно иметь не меньше 2 символов')
            .max(50, 'Название категории не должно иметь больше 50 символов')
            .required('Название категории обязательно'),

    });

    const initialValues: FormType = {
        name: "",
        photo: null,
        category_id: 0,
        developer_id: 0,
        descr: "",
        price: 0,

        is_active: false,
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

            await createProduct({
                name: values.name,
                is_active: values.is_active,
                category_id: values.category_id,
                developer_id: values.developer_id,
                file_id: values.file_id,
                descr: values.descr,
                price: values.price,
            })
            router.push("/products")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Row>
                <h1>Товары - Создание</h1>
            </Row>
            <Card>
                {categoriesIsLoading && developersIsLoading &&
                    <Loader />
                }
                {!categoriesIsLoading && !developersIsLoading &&
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
                                        <FormikField label='Введите название категории' name={'name'} />
                                    </Row>
                                    <Row>
                                        <FormikCheckbox label='Активность' name={'is_active'} />
                                    </Row>
                                    <Row>
                                        <FormikSelect
                                            label='Выберите категорию товара'
                                            name={'category_id'}>
                                            {categories?.data?.map(cat => {
                                                return <SelectOption key={cat.category_id} value={cat.category_id}>{cat.name}</SelectOption>
                                            })}
                                        </FormikSelect>
                                    </Row>

                                    <Row>
                                        <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                                    </Row>
                                    <Row>
                                        <FormikSelect
                                            label='Выберите производителя'
                                            name={'developer_id'}>
                                            {developers?.data?.map(dev => {
                                                return <SelectOption key={dev.developer_id} value={dev.developer_id}>{dev.name}</SelectOption>
                                            })}
                                        </FormikSelect>
                                    </Row>
                                    <Row>
                                        <FormikField label='Цена' name='price' />
                                    </Row>

                                </>}
                                {activeTab == 1 && <>
                                    <Row>
                                        <FormikTextarea label='Описание' name='descr' />
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
// import { useUpdateCategoryMutation, useFetchAllCategoriesQuery, useFetchCategoryByIdQuery } from '@/redux/services/categories'
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