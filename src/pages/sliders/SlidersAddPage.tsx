import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { object as YupObject, string as YupString } from 'yup';
import { useCreateSliderMutation } from '../../redux/services/slidersApi';
import { useCreateFileMutation } from '../../redux/services/filesApi';
import { Button, Card, Row, Stack, Tabs, TabsItem } from '../../ui';
import { FormikField } from '../../components/form/FormikField';
import { FormikCheckbox } from '../../components/form/FormikCheckbox';
import { FormikPhotoLoader } from '../../components/form/FormikPhotoLoader';
import { FormikTextarea } from '../../components/form/FormikTextarea';


interface FormType {
    title: string
    text: string
    photo: any;
    file_id?: number
    is_active: boolean

    start_active_dt: any
    end_active_dt: any
    product_id: number
}

const SlidersAddPage = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [createSlider] = useCreateSliderMutation()

    const [createFile] = useCreateFileMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        title: YupString()
            .min(2, 'Название должно иметь не меньше 2 символов')
            .max(50, 'Название не должно иметь больше 50 символов')
            .required('Обязательное поле'),

    });

    const initialValues: FormType = {
        title: "",
        text: "",
        photo: null,
        is_active: false,
        product_id: 0,
        end_active_dt: new Date(Date.now())?.toISOString().split('T')[0],
        start_active_dt: new Date(Date.now())?.toISOString().split('T')[0],
    }

    const handleSubmit = async (values: FormType) => {
        try {
            console.log(values?.photo?.file?.type);

            if (values?.photo?.file?.type) {
                let data = await createFile(values.photo)

                if (('error' in data)) {
                    return
                }

                values.file_id = data?.data?.file_id
            }

            await createSlider({
                title: values.title,
                text: values.text,
                end_active_dt: values.end_active_dt,
                start_active_dt: values.start_active_dt,
                is_active: values.is_active,
                file_id: values.file_id,
                product_id: values.product_id,
            })
            navigate("/sliders")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Stack flexDirection="column" gap={3}>
            <h1>Слайдеры - Создание</h1>
            <Card>
                <Row>
                    <Tabs>
                        <TabsItem active={activeTab == 0} onClick={() => setActiveTab(0)}>Основная информация</TabsItem>
                    </Tabs>
                </Row>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={schema}
                >
                    <Form>
                        {activeTab == 0 && <Stack flexDirection='column' gap={3}>
                            <FormikField label='Заголовок слайдера' name={'title'} />
                            <FormikTextarea label='Текст слайдера' name={'text'} />
                            <FormikCheckbox label='Активность' name={'is_active'} />

                            <FormikField label='Id прикреплённого продукта' name={'product_id'} />
                            <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                            <FormikField type="date" label='Начало активности' name={'start_active_dt'} />
                            <FormikField type="date" label='Конец активности' name={'end_active_dt'} />
                        </Stack>}
                        <Stack marginTop={3}>
                            <Button type='submit'>Сохранить</Button>
                        </Stack>
                    </Form>
                </Formik>
            </Card>
        </Stack>
    )
}

export default SlidersAddPage

