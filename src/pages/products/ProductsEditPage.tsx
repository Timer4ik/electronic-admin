'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Formik, useFormik } from 'formik'
import { object as YupObject, string as YupString, number as YupNumber } from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetDevelopersQuery } from '../../redux/services/developersApi';
import { useGetCategoriesQuery } from '../../redux/services/categoriesApi';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../redux/services/productsApi';
import { useCreateFileMutation } from '../../redux/services/filesApi';
import { Button, Card, Loader, Stack, Tabs, TabsItem } from '../../ui';
import { FormikField } from '../../components/form/FormikField';
import { FormikCheckbox } from '../../components/form/FormikCheckbox';
import { FormikSelect } from '../../components/form/FormikSelect';
import { SelectOption } from '../../ui/Select/Select';
import { FormikPhotoLoader } from '../../components/form/FormikPhotoLoader';
import { FormikTextarea } from '../../components/form/FormikTextarea';
import ProductPhotos from './parts/ProductPhotos';
import ProductProperties from './parts/ProductProperties';
import { setLoader } from '../../redux/slices/loaderSlice';

interface FormType {
    name: string;
    descr: string;
    price: string;
    photo: any;
    developer_id: number;
    category_id: number;
    is_active: boolean;
    file_id?: number
}

const ProductsEditPage = () => {

    const params = useParams()
    const navigate = useNavigate()

    const loaderIsLoading = useAppSelector((state) => state.loader.isLoading)
    const dispatch = useAppDispatch()

    const { data: developers, isLoading: developersIsLoading } = useGetDevelopersQuery({})
    const { data: categories, isLoading: categoriesIsLoading } = useGetCategoriesQuery({})
    const { data: product } = useGetProductByIdQuery({
        id: +(params?.id ?? 0), params: {
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
        developer_id: YupNumber().moreThan(0, "Выберите производителя товара"),
        category_id: YupNumber().moreThan(0, "Выберите категорию товара"),
        descr: YupString()
            .max(1000, 'Описание не может содержать больше 1000 символов')

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
        category_id: product?.data.category_id || 0,
        developer_id: product?.data.developer_id || 0,
        descr: product?.data.descr || "",
        price: (product?.data.price || 0).toLocaleString(),

        is_active: product?.data.is_active || false,
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
            dispatch(setLoader(true))
            await updateProduct({
                product_id: product?.data?.product_id || 0,
                name: values.name,
                is_active: values.is_active,
                category_id: values.category_id,
                developer_id: values.developer_id,
                file_id: values.file_id,
                descr: values.descr,
                price: +(values.price?.match(/\d/g)?.join("") || "0"),
            })
            dispatch(setLoader(false))
            navigate("/products")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Stack flexDirection='column' gap={3}>
            <h1>Товары - {product?.data.name}({product?.data.product_id})</h1>
            <Card>
                {!categoriesIsLoading && !developersIsLoading && product &&
                    <Stack flexDirection='column' gap={3}>
                        <Tabs>
                            <TabsItem active={activeTab == 0} onClick={() => setActiveTab(0)}>Основная информация</TabsItem>
                            <TabsItem active={activeTab == 1} onClick={() => setActiveTab(1)}>Дополнительные данные</TabsItem>
                            <TabsItem active={activeTab == 2} onClick={() => setActiveTab(2)}>Характеристики</TabsItem>
                        </Tabs>

                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={schema}
                        >
                            {({ values }) => {
                                return <Form>
                                    {activeTab == 0 && <Stack flexDirection='column' gap={3}>
                                        <h2>Основная информация</h2>
                                        <FormikField label='Введите название товара' name={'name'} />
                                        <FormikCheckbox label='Активность' name={'is_active'} />
                                        <FormikSelect
                                            label='Выберите категорию товара'
                                            name={'category_id'}>
                                            {categories?.data?.map(cat => {
                                                return <SelectOption key={cat.category_id} value={cat.category_id}>{cat.name}</SelectOption>
                                            })}
                                        </FormikSelect>
                                        <FormikSelect
                                            label='Выберите производителя'
                                            name={'developer_id'}>
                                            {developers?.data?.map(dev => {
                                                return <SelectOption key={dev.developer_id} value={dev.developer_id}>{dev.name}</SelectOption>
                                            })}
                                        </FormikSelect>
                                        <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                                        <FormikField label='Цена' name='price'
                                            mask={(value) => {

                                                return (+(value?.match(/\d/g)?.join("") || 0)).toLocaleString()

                                            }} />
                                    </Stack>}
                                    {activeTab == 1 && <Stack flexDirection='column' gap={3}>
                                        <h2>Дополнительные данные</h2>
                                        <FormikTextarea label='Описание' name='descr' />
                                        <ProductPhotos product_id={product?.data?.product_id} />
                                    </Stack>}
                                    {activeTab == 2 && <>
                                        <ProductProperties product_id={product?.data?.product_id} category_id={values.category_id} />
                                    </>}
                                    <Stack marginTop={3}>
                                        <Button type='submit'>Сохранить</Button>
                                    </Stack>
                                </Form>
                            }}

                        </Formik>
                    </Stack>}
            </Card>
            {(loaderIsLoading || categoriesIsLoading || developersIsLoading || !product) && <Loader fixed />}

        </Stack>

    )
}

export default ProductsEditPage

