'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button, Card, Col, PhotoLoader, Row, Tabs, TabsItem, Loader } from '@/components/ui'
import { Form, Formik, useFormik } from 'formik'
import { FormikField } from '@/components/form/FormikField'
import { FormikCheckbox } from '@/components/form/FormikCheckbox'
import { FormikSelect } from '@/components/form/FormikSelect'
import { addNotSelectedOption } from '@/utils/addNotSelectedOption'
import { FormikPhotoLoader } from '@/components/form/FormikPhotoLoader'
import { FormikTextarea } from '@/components/form/FormikTextarea'
import { object as YupObject, string as YupString } from 'yup';
import { useCreateFileMutation } from '@/redux/services/filesApi'
import { useGetDevelopersQuery } from '@/redux/services/developersApi'
import { useGetCategoriesQuery } from '@/redux/services/categoriesApi'
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/redux/services/productsApi'

interface FormType {
    name: string;
    descr: string;
    price: number;
    photo: any;
    developer: {
        value: number,
        content: string
    };
    category: {
        value: number,
        content: string
    };
    is_active: boolean;
    file_id?: number
    _categories: {
        value: number,
        content: string
    }[]
    _developers: {
        value: number,
        content: string
    }[]
}

const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: developers, isLoading: developersIsLoading } = useGetDevelopersQuery({})
    const { data: categories, isLoading: categoriesIsLoading } = useGetCategoriesQuery({})
    const { data: product } = useGetProductByIdQuery({
        id: +params?.id, params: {
            extend: "category,file,developer"
        }
    })
    const [updateProduct] = useUpdateProductMutation()

    const [createFile] = useCreateFileMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название категории должно иметь не меньше 2 символов')
            .max(50, 'Название категории не должно иметь больше 50 символов')
            .required('Название категории обязательно'),

    });

    const initialValues: FormType = {
        name: product?.data.name || "",
        photo: {
            url: product?.data?.file?.link,
            file: {
                name: product?.data?.file?.name,
                size: product?.data?.file?.size
            }
        },
        category: {
            value: product?.data.category_id || 0,
            content: product?.data.category?.name || "Не выбрано",
        },
        developer: {
            value: product?.data.developer_id || 0,
            content: product?.data.developer?.name || "Не выбрано",
        },
        descr: product?.data.descr || "",
        price: product?.data.price || 0,

        is_active: product?.data.is_active || false,
        _categories:
            addNotSelectedOption((categories?.data.map((item) => {
                return {
                    content: item.name,
                    value: item.category_id
                }
            }))),
        _developers:
            addNotSelectedOption((developers?.data.map((item) => {
                return {
                    content: item.name,
                    value: item.developer_id
                }
            }))),
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

            await updateProduct({
                product_id: product?.data?.product_id || 0,
                name: values.name,
                is_active: values.is_active,
                category_id: values.category.value,
                developer_id: values.developer.value,
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
                <h1>Товары - {product?.data.name}({product?.data.product_id})</h1>
            </Row>
            <Card>
                {categoriesIsLoading && developersIsLoading &&
                    <Loader />
                }
                {!categoriesIsLoading && !developersIsLoading && product &&
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
                                            name={'category'}
                                            selectedItem={initialValues.category}
                                            options={initialValues._categories}
                                        />
                                    </Row>
                                    <Row>
                                        <FormikSelect
                                            label='Выберите производителя'
                                            name={'developer'}
                                            selectedItem={initialValues.developer}
                                            options={initialValues._developers}
                                        />
                                    </Row>
                                    <Row>
                                        <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                                    </Row>

                                    <Row>
                                        <FormikField label='Цена' name='price' />
                                    </Row>
                                </>}
                                {activeTab == 1 && <>
                                    <Row>
                                        <FormikTextarea label='Описание' name='descr' />
                                    </Row>
                                    <Row>
                                        {/* <PhotoLoader */}
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