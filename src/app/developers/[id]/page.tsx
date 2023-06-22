'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button, Card, Col, Row, Tabs, TabsItem, Loader } from '@/components/ui'
import { Form, Formik } from 'formik'
import { FormikField } from '@/components/form/FormikField'
import { FormikCheckbox } from '@/components/form/FormikCheckbox'
import { object as YupObject, string as YupString } from 'yup';
import { useGetDeveloperByIdQuery, useUpdateDeveloperMutation } from '@/redux/services/developersApi'
import { FormikPhotoLoader } from '@/components/form/FormikPhotoLoader'
import { useCreateFileMutation } from '@/redux/services/filesApi'

interface FormType {
    name: string
    photo: any;
    file_id?: number
    is_active: boolean
}

const DeveloperEditPage = () => {

    const params = useParams()
    const router = useRouter()

    const { data: developer, isLoading: developerIsLoading } = useGetDeveloperByIdQuery(+params?.id)

    const [updateDeveloper, { isLoading }] = useUpdateDeveloperMutation()

    const [createFile] = useCreateFileMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название должно иметь не меньше 2 символов')
            .max(50, 'Название не должно иметь больше 50 символов')
            .required('Обязательное поле'),

    });

    const initialValues: FormType = {
        name: developer?.data.name || "",
        photo: {
            url: developer?.data?.file?.link,
            file: {
                name: developer?.data?.file?.name,
                size: developer?.data?.file?.size
            }
        },
        is_active: developer?.data.is_active || false
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

            await updateDeveloper({
                developer_id: developer?.data?.developer_id || 0,
                name: values.name,
                is_active: values.is_active,
                file_id: values.file_id
            })
            router.push("/developers")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Row>
                <h1>Производители - Создание</h1>
            </Row>
            <Card>
                {developerIsLoading &&
                    <Loader />
                }
                {!developerIsLoading &&
                    <>
                        <Row>
                            <Tabs>
                                <TabsItem active={activeTab == 0} onClick={() => setActiveTab(0)}>Основная информация</TabsItem>
                            </Tabs>
                        </Row>

                        {developer && <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={schema}
                        >
                            <Form>
                                {activeTab == 0 && <>
                                    <Row>
                                        <FormikField label='Наименование производителя' name={'name'} />
                                    </Row>
                                    <Row>
                                        <FormikCheckbox label='Активность' name={'is_active'} />
                                    </Row>
                                    <Row>
                                        <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                                    </Row>
                                </>}
                                <Button type='submit'>Сохранить</Button>
                            </Form>
                        </Formik>}
                    </>}
            </Card>

        </div >

    )
}

export default DeveloperEditPage


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