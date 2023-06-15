'use client'
import React, { useState } from 'react'
import { useFetchAllCategoriesQuery, useFetchCategoryByIdQuery, useCreateCategoryMutation } from '@/api/categories'
import { useParams, useRouter } from 'next/navigation'
import { Button, Card, Col, Row, Tabs, TabsItem } from '@/ui-kit'
import { Form, Formik, useFormik } from 'formik'
import { FormikField } from '@/components/form/FormikField'
import { FormikCheckbox } from '@/components/form/FormikCheckbox'
import { FormikSelect } from '@/components/form/FormikSelect'
import Loader from '@/ui-kit/Loader/Loader'
import { addNotSelectedOption } from '@/utils/addNotSelectedOption'
import { FormikPhotoLoader } from '@/components/form/FormikPhotoLoader'
import { FormikTextarea } from '@/components/form/FormikTextarea'
import { object as YupObject, string as YupString } from 'yup';
import { useCreateFileMutation } from '@/api/filesApi'

interface FormType {
    name: string;
    photo: any;
    parent_category: {
        value: number,
        content: string
    };
    is_active: boolean;
    desc: string;
    is_end: boolean;
    file_id?:number
}

const CategoryEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: categories, refetch: refetchCategories, isLoading: categoriesIsLoading } = useFetchAllCategoriesQuery({})
    // const { data: category, isSuccess, refetch: refetchCategory } = useFetchCategoryByIdQuery(+params?.id)
    const [createCategory, { isLoading, isError }] = useCreateCategoryMutation()

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
        parent_category: {
            value: 0,
            content: "Не выбрано"
        },
        is_active: false,
        desc: "",
        is_end: false,
    }

    const handleSubmit = async (values: FormType) => {

        try {
            if (values.photo.file.type) {
                let data = await createFile(values.photo)

                if (('error' in data)) {
                    return
                }

                values.file_id = data?.data?.file_id
            }
            
            await createCategory({
                name: values.name,
                is_active: values.is_active,
                is_end: values.is_end,
                parent_id: values.parent_category.value,
                desc: values.desc,
                file_id: values.file_id
            })
            router.push("/categories")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Row>
                <h1>Категории товаров - Создание</h1>
            </Row>
            <Card>
                {categoriesIsLoading &&
                    <Loader />
                }
                {!categoriesIsLoading &&
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
                                            label='Выберите родительскую категория'
                                            name={'parent_category'}
                                            selectedItem={{
                                                value: 0,
                                                content: "Не выбрано"
                                            }}
                                            options={addNotSelectedOption((categories?.data.map((item) => {
                                                return {
                                                    content: item.name,
                                                    value: item.category_id
                                                }
                                            })))}
                                        />
                                    </Row>
                                    <Row>
                                        <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                                    </Row>
                                </>}
                                {activeTab == 1 && <>
                                    <Row>
                                        <FormikTextarea label='Описание категории' name={'desc'} />
                                    </Row>
                                    <Row>
                                        <FormikCheckbox label='Конечная категория?' name={'is_end'} />
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