'use client'
import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { object as YupObject, string as YupString } from 'yup';
import { useFetchPropertyByIdQuery, useUpdatePropertyMutation } from '../../redux/services/propertiesApi';
import { Button, Card, Loader, Stack, Tabs, TabsItem } from '../../ui';
import { FormikField } from '../../components/form/FormikField';
import { FormikCheckbox } from '../../components/form/FormikCheckbox';
import PropertyValues from './parts/PropertyValues';

interface FormType {
    name: string
    is_active: boolean
}

const PropertiesEditPage = () => {

    const params = useParams()
    const navigate = useNavigate()

    const { data: property, isLoading: isPropertyLoading } = useFetchPropertyByIdQuery({
        id: +(params?.id ?? 0),
        params: {}
    })

    const [updateProperty] = useUpdatePropertyMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название характеристики должно иметь не меньше 2 символов')
            .max(50, 'Название характеристики не должно иметь больше 50 символов')
            .required('Обязательное поле')

    });

    const initialValues = useMemo((): FormType => {
        return {
            name: property?.data.name || "",
            is_active: property?.data?.is_active || false,
        }
    }, [property])

    const handleSubmit = async (values: FormType) => {
        try {
            await updateProperty({
                property_id: property?.data.property_id || 0,
                name: values.name,
                is_active: values.is_active
            })
            navigate("/properties")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Stack flexDirection='column' gap={3} >
            <h1>Характеристики - {property?.data?.name}({property?.data?.property_id})</h1>
            <Card>
                {isPropertyLoading &&
                    <Loader />
                }
                {!isPropertyLoading && property &&
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
                                    <h2>Основная информация</h2>
                                    <FormikField label='Название характеристики' name={'name'} />
                                    <FormikCheckbox label='Активность' name={'is_active'} />
                                </Stack>}
                                {activeTab == 1 && <Stack flexDirection='column' gap={3}>
                                    <PropertyValues property_id={property?.data?.property_id} />
                                </Stack>}
                                <Stack marginTop={3}>
                                    <Button type='submit'>Сохранить</Button>
                                </Stack>
                            </Form>
                        </Formik>
                    </Stack>}
            </Card>

        </Stack>

    )
}

export default PropertiesEditPage
