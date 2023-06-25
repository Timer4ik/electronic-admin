'use client'
import { Button, Card, Field, Row, RowBetween } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { login } from '@/redux/slices/authSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isAuth } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (isAuth){
            router.push("/categories")
        }
    },[isAuth])

    return (
        <Card>
            <Row>
                <h1>Авторизация</h1>
            </Row>
            <Row>
                <Field label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Row>
            <Row>
                <Field label='Пароль' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Row>
            <Row>
                <RowBetween>
                    <Button onClick={() => {
                        dispatch(login({ email, password }))
                    }}>Войти</Button>
                    <Link href={""} style={{ fontSize: 12 }}>Забыли пароль?</Link>
                </RowBetween>
            </Row>
        </Card>
    )
}

export default LoginPage