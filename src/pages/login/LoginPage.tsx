import React from 'react'
import { Button, Card, Stack } from '../../ui'
import { Formik, Form } from 'formik'
import { useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/slices/authSlice'
import { FormikField } from '../../components/form/FormikField'

const LoginPage = () => {

    const dispatch = useAppDispatch()

    return (
        <div
            style={{
                margin:"300px auto",
                marginTop: "300px",
                width: "600px",
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
            }}>
            <Card>
                <Stack flexDirection='column' alignItems='center' gap={3} >
                    <h1>Авторизация</h1>
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        onSubmit={(values) => {

                            dispatch(
                                login({
                                    email: values.email,
                                    password: values.password
                                })
                            )

                        }}
                    >
                        <Form>
                            <Stack flexDirection='column' gap={3}>
                                <FormikField label='Введите email' name="email" />
                                <FormikField label='Введите пароль' name="password" />
                                <Button>Войти</Button>
                            </Stack>
                        </Form>
                    </Formik>
                </Stack>
            </Card>
        </div>
    )
}

export default LoginPage