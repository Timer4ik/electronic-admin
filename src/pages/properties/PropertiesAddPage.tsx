import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { object as YupObject, string as YupString } from 'yup';
import { useCreatePropertyMutation } from '../../redux/services/propertiesApi';
import { Button, Card, Row, Stack, Tabs, TabsItem } from '../../ui';
import { FormikField } from '../../components/form/FormikField';
import { FormikCheckbox } from '../../components/form/FormikCheckbox';

interface FormType {
    name: string
    is_active: boolean
}

const PropertiesAddPage = () => {

    const navigate = useNavigate()

    const [createProperty] = useCreatePropertyMutation()

    const [activeTab, setActiveTab] = useState(0)

    const schema = YupObject().shape({
        name: YupString()
            .min(2, 'Название характеристики должно иметь не меньше 2 символов')
            .max(50, 'Название характеристики не должно иметь больше 50 символов')
            .required('Обязательное поле')

    });

    const initialValues = {
        name: "",
        is_active: false,
    }

    const handleSubmit = async (values: FormType) => {
        try {
            await createProperty({
                name: values.name,
                is_active: values.is_active
            })
            navigate("/properties")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Stack flexDirection='column' gap={3}>
            <h1>Характеристики - Создание</h1>
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
                                <FormikField label='Название характеристики' name={'name'} />
                                <FormikCheckbox label='Активность' name={'is_active'} />
                            </Stack>}
                            <Stack marginTop={3}>
                                <Button type='submit'>Сохранить</Button>
                            </Stack>
                        </Form>
                    </Formik>
                </Stack>

            </Card>

        </Stack>

    )
}

export default PropertiesAddPage
