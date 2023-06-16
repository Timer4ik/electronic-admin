'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FormikForm, { FormikFieldsTemplate, TemplateFields, TemplateTypes, generateInitialObject } from '@/components/form/FormikForm'
import { useUpdateCategoryMutation, useFetchAllCategoriesQuery, useFetchCategoryByIdQuery, useCreateCategoryMutation, useLazyFetchAllCategoriesQuery } from '@/api/categories'
import { useParams, useRouter } from 'next/navigation'
import { ICategory } from '@/types/models/types'
import { Button, Card, Col, Dropdown, Field, Row, RowBetween, Select, Table, TableMenuIcon, Tabs, TabsItem } from '@/ui-kit'
import { Form, Formik } from 'formik'
// import { useCategoryPage } from '@/hooks/useCategoryPage'
import { object as YupObject, string as YupString } from 'yup';
import { FormikSelect } from '@/components/form/FormikSelect'
import { FormikCheckbox } from '@/components/form/FormikCheckbox'
import { FormikField } from '@/components/form/FormikField'
import { useCreateFileMutation } from '@/api/filesApi'
import Loader from '@/ui-kit/Loader/Loader'
import { addNotSelectedOption } from '@/utils/addNotSelectedOption'
import { FormikPhotoLoader } from '@/components/form/FormikPhotoLoader'
import { FormikTextarea } from '@/components/form/FormikTextarea'
import { useCreateCategoryPropertyMutation, useDeleteCategoryPropertyMutation, useFetchAllCategoryPropertiesQuery } from '@/api/categoryPropertiesApi'
import { useFetchAllPropertiesQuery, useLazyFetchAllPropertiesQuery } from '@/api/properties'
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
    file_id?: number
}

const CategoryEditPage = () => {

    const router = useRouter()
    const params = useParams()

    const [fetchCategories, { data: categories, isLoading: categoriesIsLoading }] = useLazyFetchAllCategoriesQuery()
    const { data: category, refetch: refetchCategory, isLoading: categoryIsLoading } = useFetchCategoryByIdQuery(+params?.id)
    const [updateCategory] = useUpdateCategoryMutation()
    const [createFile] = useCreateFileMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название категории должно иметь не меньше 2 символов')
            .max(50, 'Название категории не должно иметь больше 50 символов')
            .required('Название категории обязательно'),
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
            parent_category: {
                value: category?.data.parent_id || 0,
                content: category?.data.parent?.name || "Не выбрано",
            },
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
                parent_id: values.parent_category.value,
                desc: values.desc,
                file_id: values.file_id || category?.data.category_id
            })
            refetchCategory()
            router.push("/categories")
        } catch (error) {
            console.log(error);
        }
    }
    // category-property

    const [fetchProperties, { data: properties }] = useLazyFetchAllPropertiesQuery({})
    const { data: categoryProperties, refetch: refetchCategoryProperties, isLoading: categoryPropertiesIsLoading } = useFetchAllCategoryPropertiesQuery({
        "filter[category_id]": category?.data.category_id,
        extend: "property.property_type"
    })
    const [createCategoryProperty] = useCreateCategoryPropertyMutation()
    const [deleteCategoryProperty] = useDeleteCategoryPropertyMutation()

    const [selectedProperty, setSelectedProperty] = useState<{
        value: number
        content: string
    }>({
        value: 0,
        content: "Не выбрано"
    })
    const [categoryPropertyName, setCategoryPropertyName] = useState("")

    useEffect(() => {
        fetchProperties({
            "filter[is_active]": true
        })
    }, [])

    const handleCreateCategoryProperty = async () => {
        if (!category?.data || selectedProperty.value <= 0) return

        await createCategoryProperty({
            category_id: category.data.category_id,
            property_id: selectedProperty.value,
            name: categoryPropertyName
        })

        refetchCategoryProperties()
    }

    const handleDeleteCategoryProperty = (id: number) => {
        deleteCategoryProperty(id)
        refetchCategoryProperties()
    }

    useEffect(() => {
        if (properties?.data?.length)
            setSelectedProperty({
                value: properties?.data[0]?.property_id || 0,
                content: properties?.data[0]?.name || "Не выбрано"
            })
    }, [properties])

    useEffect(() => {
        (async () => {
            await fetchCategories({})
        })()
    }, [])

    return (
        <div>
            <Row>
                <h1>Категории товаров - Создание</h1>
            </Row>
            <Card>
                {categoriesIsLoading && categoryIsLoading &&
                    <Loader />
                }
                {!categoriesIsLoading && !categoryIsLoading && category &&
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
                            {({ values }) => {
                                return <>
                                    <Form>
                                        {activeTab == 0 && <>
                                            <Row>
                                                <h2>Основная информация</h2>
                                            </Row>
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
                                                        value: category?.data.category_id,
                                                        content: category?.data.name,
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
                                                <h2>Дополнительные данные</h2>
                                            </Row>
                                            <Row>
                                                <FormikTextarea label='Описание категории' name={'desc'} />
                                            </Row>
                                            <Row>
                                                <FormikCheckbox label='Конечная категория?' name={'is_end'} />
                                            </Row>
                                            {/*  */}
                                            {properties && values.is_end && <>
                                                <Row>
                                                    <h2>Характеристики</h2>
                                                </Row>
                                                <Row>
                                                    <RowBetween>
                                                        <Select

                                                            label='Выберите характеристику'
                                                            selectedItem={selectedProperty}
                                                            options={properties?.data.map(item => {
                                                                return {
                                                                    value: item.property_id,
                                                                    content: item.name
                                                                }
                                                            })}
                                                            onChange={(item) => {
                                                                setSelectedProperty(item)
                                                            }}
                                                        />
                                                        <Field label='Наименование' value={categoryPropertyName} onChange={(e) => setCategoryPropertyName(e.target.value)} />
                                                        <Button type='button' onClick={() => handleCreateCategoryProperty()}>Добавить</Button>
                                                    </RowBetween>
                                                </Row>
                                                <Row>
                                                    <Table>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                </th>
                                                                <th>ID</th>
                                                                <th>Наименование</th>
                                                                <th>Характеристика</th>
                                                                <th>Обозначение характеристики</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {categoryProperties?.data.map(item => (
                                                                <tr key={item.category_property_id}>
                                                                    <td>
                                                                        <Dropdown>
                                                                            <div>
                                                                                <TableMenuIcon />
                                                                            </div>
                                                                            <div>
                                                                                <div onClick={() => handleDeleteCategoryProperty(item.category_property_id)} className="danger-hover">Удалить</div>
                                                                            </div>
                                                                        </Dropdown>
                                                                    </td>
                                                                    <td>{item.category_property_id}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item?.property?.name}</td>
                                                                    <td>{item?.property?.property_type?.unit_type}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </Row>
                                            </>}
                                        </>}
                                        <Button type='submit'>Сохранить</Button>
                                    </Form>
                                </>
                            }}
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