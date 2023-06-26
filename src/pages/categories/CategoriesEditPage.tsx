import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useCreateCategoryMutation, useGetCategoriesQuery, useGetCategoryByIdQuery, useUpdateCategoryMutation } from '../../redux/services/categoriesApi';
import { useCreateFileMutation } from '../../redux/services/filesApi';
import { object as YupObject, string as YupString } from 'yup';
import { Button, Card, Loader, Stack, Tabs, TabsItem } from '../../ui';
import { Formik, Form } from 'formik';
import { FormikField } from '../../components/form/FormikField';
import { FormikCheckbox } from '../../components/form/FormikCheckbox';
import { FormikSelect } from '../../components/form/FormikSelect';
import { SelectOption } from '../../ui/Select/Select';
import { FormikPhotoLoader } from '../../components/form/FormikPhotoLoader';
import { FormikTextarea } from '../../components/form/FormikTextarea';
import CategoryProperties from './parts/CategoryProperties';

interface FormType {
    name: string;
    photo: any;
    parent_category_id: number;
    is_active: boolean;
    desc: string;
    is_end: boolean;
    file_id?: number
}

const CategoryEditPage = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const { data: categories, isLoading } = useGetCategoriesQuery({})

    const { data: category, isLoading: categoryIsLoading } = useGetCategoryByIdQuery(+(id ?? 0))

    const [updateCategory] = useUpdateCategoryMutation()
    const [createFile] = useCreateFileMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название категории должно иметь не меньше 2 символов')
            .max(50, 'Название категории не должно иметь больше 50 символов')
            .required('Название категории обязательно'),
        desc: YupString()
            .max(1000, 'Описание не может содержать больше 1000 символов')
    });

    const initialValues = useMemo((): FormType => {
        return {
            name: category?.data.name || "",
            photo: {
                url: category?.data?.file?.link,
                file: {
                    name: category?.data?.file?.name,
                    size: category?.data?.file?.size
                }
            },
            parent_category_id: category?.data?.parent_id || 0,
            is_active: !!category?.data.is_active,
            desc: category?.data?.desc || "",
            is_end: !!category?.data.is_end,
        }
    }, [category])

    const handleSubmit = async (values: FormType) => {

        try {
            if (!category) {
                return
            }
            if (values.photo.file.type) {
                let data = await createFile(values.photo)

                if (('error' in data)) {
                    return
                }

                values.file_id = data?.data?.file_id
            }
            await updateCategory({
                category_id: category.data.category_id,
                name: values.name,
                is_active: values.is_active,
                is_end: values.is_end,
                parent_id: values.parent_category_id,
                desc: values.desc,
                file_id: values.file_id || category?.data.category_id
            })
            navigate("/categories")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Stack flexDirection='column' gap={3}>
                <h1>Категории товаров - {category?.data.name}({category?.data.category_id})</h1>
                <Card>
                    {(isLoading || categoryIsLoading ) &&
                        <Loader />
                    }
                    {!isLoading && !categoryIsLoading &&
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
                                {({ values }) => {
                                    return <>
                                        <Form>
                                            {activeTab == 0 && <Stack flexDirection='column' gap={3}>
                                                <h2>Основная информация</h2>
                                                <FormikField label='Введите название категории' name={'name'} />
                                                <FormikCheckbox label='Активность' name={'is_active'} />
                                                <FormikSelect
                                                    label='Выберите родительскую категорию'
                                                    name={'parent_category_id'}
                                                >
                                                    <SelectOption value={0}>Не выбрано</SelectOption>
                                                    {categories?.data.map(cat => {
                                                        return (
                                                            <SelectOption key={cat.category_id} value={cat.category_id}>{cat.name}</SelectOption>
                                                        )
                                                    })}
                                                </FormikSelect>
                                                <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                                            </Stack>}
                                            {activeTab == 1 && <Stack gap={3} flexDirection='column'>
                                                <h2>Дополнительные данные</h2>
                                                <FormikTextarea label='Описание категории' name={'desc'} />
                                                <FormikCheckbox label='Конечная категория?' name={'is_end'} />
                                                {/*  */}
                                                {values.is_end && category && <>
                                                    <CategoryProperties category={category.data} />
                                                </>}
                                            </Stack>}
                                            <Stack marginTop={2}>
                                                <Button type='submit'>Сохранить</Button>
                                            </Stack>
                                        </Form>
                                    </>
                                }}
                            </Formik>
                        </Stack>}
                </Card>
            </Stack>
        </div>
    )
}

export default CategoryEditPage
