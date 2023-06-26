'use client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { object as YupObject, string as YupString } from 'yup';
import { useCreateDeveloperMutation } from '../../redux/services/developersApi';
import { useCreateFileMutation } from '../../redux/services/filesApi';
import { Button, Card, Stack, Tabs, TabsItem } from '../../ui';
import { FormikField } from '../../components/form/FormikField';
import { FormikCheckbox } from '../../components/form/FormikCheckbox';
import { FormikPhotoLoader } from '../../components/form/FormikPhotoLoader';

interface FormType {
    name: string
    photo: any;
    file_id?: number
    is_active: boolean
}

const DevelopersAddPage = () => {

    const navigate = useNavigate()

    const [createDeveloper] = useCreateDeveloperMutation()

    const [createFile] = useCreateFileMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название должно иметь не меньше 2 символов')
            .max(50, 'Название не должно иметь больше 50 символов')
            .required('Обязательное поле'),

    });

    const initialValues: FormType = {
        name: "",
        photo: null,
        is_active: false
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

            await createDeveloper({
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
            <h1>Производители - Создание</h1>
            <Card>
                <Stack flexDirection='column' gap={3}>
                    <Tabs>
                        <TabsItem active={activeTab == 0} onClick={() => setActiveTab(0)}>Основная информация</TabsItem>
                    </Tabs>

                    <Formik
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
                    </Formik>
                </Stack>

            </Card>

        </Stack >

    )
}

export default DevelopersAddPage