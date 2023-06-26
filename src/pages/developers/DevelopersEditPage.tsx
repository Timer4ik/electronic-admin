'use client'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import { useNavigate, useParams } from "react-router-dom"
import { object as YupObject, string as YupString } from 'yup';
import { Button, Card, Loader, Stack, Tabs, TabsItem } from '../../ui';
import { FormikField } from '../../components/form/FormikField';
import { FormikCheckbox } from '../../components/form/FormikCheckbox';
import { FormikPhotoLoader } from '../../components/form/FormikPhotoLoader';
import { useCreateFileMutation } from '../../redux/services/filesApi';
import { useGetDeveloperByIdQuery, useUpdateDeveloperMutation } from '../../redux/services/developersApi';

interface FormType {
    name: string
    photo: any;
    file_id?: number
    is_active: boolean
}

const DeveloperEditPage = () => {

    const params = useParams()
    const navigate = useNavigate()

    const { data: developer, isLoading: developerIsLoading } = useGetDeveloperByIdQuery(+(params?.id ?? 0))

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
            navigate("/developers")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Stack flexDirection='column' gap={3}>
            <h1>Производители - {developer?.data?.name}({developer?.data?.developer_id})</h1>
            <Card>
                {developerIsLoading &&
                    <Loader />
                }
                {!developerIsLoading &&
                    <Stack flexDirection='column' gap={3}>
                        <Tabs>
                            <TabsItem active={activeTab == 0} onClick={() => setActiveTab(0)}>Основная информация</TabsItem>
                        </Tabs>

                        {developer && <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={schema}
                        >
                            <Form>
                                {activeTab == 0 && <Stack flexDirection='column' gap={3}>
                                    <FormikField label='Наименование производителя' name={'name'} />
                                    <FormikCheckbox label='Активность' name={'is_active'} />
                                    <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                                </Stack>}
                                <Stack marginTop={3}>
                                    <Button type='submit'>Сохранить</Button>
                                </Stack>
                            </Form>
                        </Formik>}
                    </Stack>}
            </Card>
        </Stack >

    )
}

export default DeveloperEditPage

