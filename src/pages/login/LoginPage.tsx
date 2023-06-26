import React from 'react'
import { Button, Card, Stack } from '../../ui'
import { Formik, Form } from 'formik'
import { useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/slices/authSlice'
import { FormikField } from '../../components/form/FormikField'
import { Header } from '../../layouts/default/Header'
import { Aside } from '../../layouts/default/Aside'

const LoginPage = () => {

    const dispatch = useAppDispatch()

    return (
        <div className='auth-page'>
            <aside className="aside aside-short">
                <div className="aside__logo">
                    <img width={250} height={100} src="/img/header/logo.svg" alt="" />
                </div>
            </aside>
            <Card padding={5}>
                <Stack flexDirection='column' gap={3} >
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
                            </Stack>
                            <Stack marginTop={3} justifyContent='space-between' alignItems='center'>
                                <Button>Войти</Button>
                                <a href="">Забыли пароль?</a>
                            </Stack>
                        </Form>
                    </Formik>
                </Stack>
            </Card>
        </div>
    )
}

export default LoginPage