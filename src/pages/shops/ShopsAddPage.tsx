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
import { useCreateShopMutation } from '../../redux/services/shopsApi';
import { FormikCoords } from '../../components/form/FormikCoords';

interface FormType {
    address: string
    cords: [number, number]
    is_active: boolean
    openFrom: string
    openTo: string
    file_id?: number
    photo: any
}

const ShopsAddPage = () => {

    const navigate = useNavigate()

    const [createShop] = useCreateShopMutation()

    const [createFile] = useCreateFileMutation()


    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        address: YupString()
            .min(2, 'Название должно иметь не меньше 2 символов')
            .max(200, 'Название не должно иметь больше 200 символов')
            .required('Обязательное поле'),

    });

    const initialValues: FormType = {
        address: "",
        cords: [55.79649522684434, 49.105883509847985],
        is_active: false,
        openFrom: "",
        openTo: "",
        photo: null,
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

            await createShop({
                openFrom: values.openFrom,
                openTo: values.openTo,
                file_id: values.file_id,
                address: values.address,
                cords: values.cords.join(","),
                is_active: values.is_active,
            })
            navigate("/shops")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Stack flexDirection='column' gap={3}>
            <h1>Магазины - Создание</h1>
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
                                <FormikCheckbox label='Активность' name={'is_active'} />
                                <FormikField label='Адрес магазина' name={'address'} />
                                <FormikCoords label='Координаты магазина' name={'cords'} />
                                <Stack justifyContent='space-between' gap={1} flex={"same-all"}>
                                    <FormikField type='time' label='Время работы от' name={'openFrom'} />
                                    <FormikField type='time' label='Время работы до' name={'openTo'} />
                                </Stack>
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

export default ShopsAddPage