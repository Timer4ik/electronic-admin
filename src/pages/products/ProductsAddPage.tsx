import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { object as YupObject, string as YupString, number as YupNumber } from 'yup';
import { setLoader } from '../../redux/slices/loaderSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetDevelopersQuery } from '../../redux/services/developersApi';
import { useGetCategoriesQuery } from '../../redux/services/categoriesApi';
import { Button, Card, Loader, Stack, Tabs, TabsItem } from '../../ui';
import { FormikField } from '../../components/form/FormikField';
import { FormikCheckbox } from '../../components/form/FormikCheckbox';
import { FormikSelect } from '../../components/form/FormikSelect';
import { SelectOption } from '../../ui/Select/Select';
import { FormikPhotoLoader } from '../../components/form/FormikPhotoLoader';
import { FormikTextarea } from '../../components/form/FormikTextarea';
import { useCreateProductMutation } from '../../redux/services/productsApi';
import { useCreateFileMutation } from '../../redux/services/filesApi';

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

const ProductsAddPage = () => {

    const navigate = useNavigate()

    const loaderIsLoading = useAppSelector((state) => state.loader.isLoading)
    const dispatch = useAppDispatch()

    const { data: developers, isLoading: developersIsLoading } = useGetDevelopersQuery({})
    const { data: categories, isLoading: categoriesIsLoading } = useGetCategoriesQuery({
        "filter[is_end]": true
    })

    const [createProduct] = useCreateProductMutation()

    const [createFile] = useCreateFileMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название категории должно иметь не меньше 2 символов')
            .max(150, 'Название категории не должно иметь больше 150 символов')
            .required('Название категории обязательно'),
        developer_id: YupNumber().moreThan(0, "Выберите производителя товара"),
        category_id: YupNumber().moreThan(0, "Выберите категорию товара"),
        descr: YupString()
            .max(5000, 'Описание не может содержать больше 5000 символов')

    });

    const initialValues: FormType = {
        name: "",
        photo: null,
        category_id: 0,
        developer_id: 0,
        descr: "",
        price: "0",

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
            dispatch(setLoader(true))

            await createProduct({
                name: values.name,
                is_active: values.is_active,
                category_id: values.category_id,
                developer_id: values.developer_id,
                file_id: values.file_id,
                descr: values.descr,
                price: +(values.price?.match(/\d/g)?.join("") || "0"),
            })
            navigate("/products")
            dispatch(setLoader(false))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Stack flexDirection='column' gap={3}>
            <h1>Товары - Создание</h1>
            <Card>
                {!categoriesIsLoading && !developersIsLoading &&
                    <Stack flexDirection='column' gap={3}>
                        <Tabs>
                            <TabsItem active={activeTab == 0} onClick={() => setActiveTab(0)}>Основная информация</TabsItem>
                            <TabsItem active={activeTab == 1} onClick={() => setActiveTab(1)}>Дополнительные данные</TabsItem>
                        </Tabs>

                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={schema}
                        >
                            <Form>
                                {activeTab == 0 && <Stack flexDirection='column' gap={3}>
                                    <FormikField label='Введите название товара' name={'name'} />
                                    <FormikCheckbox label='Активность' name={'is_active'} />
                                    <FormikSelect
                                        label='Выберите категорию товара'
                                        name={'category_id'}>
                                        {categories?.data?.map(cat => {
                                            return <SelectOption key={cat.category_id} value={cat.category_id}>{cat.name}</SelectOption>
                                        })}
                                    </FormikSelect>

                                    <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                                    <FormikSelect
                                        label='Выберите производителя'
                                        name={'developer_id'}>
                                        {developers?.data?.map(dev => {
                                            return <SelectOption key={dev.developer_id} value={dev.developer_id}>{dev.name}</SelectOption>
                                        })}
                                    </FormikSelect>
                                    <FormikField mask={(value) => {

                                        return (+(value?.match(/\d/g)?.join("") || 0)).toLocaleString()

                                    }} label='Цена' name='price' />

                                </Stack>}
                                {activeTab == 1 && <Stack flexDirection='column' gap={3}>
                                    <FormikTextarea label='Описание' name='descr' />
                                </Stack>}
                                <Stack marginTop={3}>
                                    <Button type='submit'>Сохранить</Button>
                                </Stack>
                            </Form>
                        </Formik>
                    </Stack>}
            </Card>
            {(loaderIsLoading || categoriesIsLoading || developersIsLoading) && <Loader fixed />}
        </Stack>

    )
}

export default ProductsAddPage
