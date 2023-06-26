import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { object as YupObject, string as YupString } from 'yup';
import { useCreateSliderMutation, useGetSliderByIdQuery, useUpdateSliderByIdMutation } from '../../redux/services/slidersApi';
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

const SlidersEditPage = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [updateSlider] = useUpdateSliderByIdMutation()

    const { data: slider, isLoading: isSliderLoading } = useGetSliderByIdQuery({
        id: +(params?.id || 0),
        params: {
            extend: "file"
        }
    })

    const [createFile] = useCreateFileMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        title: YupString()
            .min(2, 'Название должно иметь не меньше 2 символов')
            .max(50, 'Название не должно иметь больше 50 символов')
            .required('Обязательное поле'),
    });

    const initialValues: FormType = useMemo(() => ({
        title: slider?.data.title || "",
        text: slider?.data.text || "",
        photo: {
            url: slider?.data?.file?.link,
            file: {
                name: slider?.data?.file?.name,
                size: slider?.data?.file?.size
            }
        },
        is_active: slider?.data.is_active || false,
        product_id: slider?.data.product_id || 0,
        end_active_dt: new Date(slider?.data.end_active_dt || Date.now())?.toISOString().split('T')[0],
        start_active_dt: new Date(slider?.data.start_active_dt || Date.now())?.toISOString().split('T')[0],
    }), [slider])

    const handleSubmit = async (values: FormType) => {
        try {
            if (values?.photo?.file?.type) {
                let data = await createFile(values.photo)

                if (('error' in data)) {
                    return
                }

                values.file_id = data?.data?.file_id
            }

            await updateSlider({
                slider_id: slider?.data.slider_id || 0,
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

    return !isSliderLoading ? (
        <Stack flexDirection='column' gap={3}>
            <h1>Слайдеры - {slider?.data?.title}({slider?.data?.slider_id})</h1>
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
                        {activeTab == 0 && <>
                            <Row>
                                <FormikField label='Заголовок слайдера' name={'title'} />
                            </Row>
                            <Row>
                                <FormikTextarea label='Текст слайдера' name={'text'} />
                            </Row>
                            <Row>
                                <FormikCheckbox label='Активность' name={'is_active'} />
                            </Row>
                            <Row>
                                <FormikField label='Id прикреплённого продукта' name={'product_id'} />
                            </Row>
                            <Row>
                                <FormikPhotoLoader label='Загрузите фотографию' name='photo' />
                            </Row>
                            <Row>
                                <FormikField type="date" label='Начало активности' name={'start_active_dt'} />
                            </Row>
                            <Row>
                                <FormikField type="date" label='Конец активности' name={'end_active_dt'} />
                            </Row>
                        </>}
                        <Button type='submit'>Сохранить</Button>
                    </Form>
                </Formik>
            </Card>
        </Stack >
    ) : null
}

export default SlidersEditPage
