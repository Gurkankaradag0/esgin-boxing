'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Login } from '@/services/AuthServices'
import { setUser } from '@/store/authStore'
import { Button } from '../ui/button'

const LoginForm = () => {
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Geçersiz E-Posta').required('Gerekli'),
        password: Yup.string().min(2, 'Çok Kısa!').max(32, 'Çok Uzun!').required('Gerekli')
    })

    const onSubmit = async (values) => {
        setError('')
        setDisabled(true)
        const loginRes = await Login(values)
        if (!loginRes.ok) {
            setError(loginRes.status === 400 ? 'E-Posta ve/veya şifre yanlış.' : 'Bir sorun ile karşılaşıldı lütfen sonra tekrar deneyiniz.')
            setDisabled(false)
        } else {
            setUser(loginRes.data.user)
            router.push('/')
        }
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
        >
            <Form className='flex flex-col gap-4'>
                {error && <div className='flex justify-start items-center py-2 px-4 rounded bg-red-400 text-white'>{error}</div>}
                <label className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <span>E-Posta :</span>
                        <ErrorMessage
                            name='email'
                            component='span'
                            className='text-red-400 text-xs flex justify-end items-center'
                        />
                    </div>
                    <Field
                        id='email'
                        name='email'
                        type='email'
                        placeholder='xyz@xyz.com'
                        className='py-2 px-4 rounded outline-none dark:bg-white/50 dark:placeholder:text-black disabled:opacity-50'
                        disabled={disabled}
                    />
                </label>
                <label className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <span>Şifre :</span>
                        <ErrorMessage
                            name='password'
                            component='span'
                            className='text-red-400 text-xs flex justify-end items-center'
                        />
                    </div>
                    <Field
                        id='password'
                        name='password'
                        type='password'
                        placeholder=''
                        className='py-2 px-4 rounded outline-none dark:bg-white/50 dark:placeholder:text-black disabled:opacity-50'
                        disabled={disabled}
                    />
                </label>

                <Button
                    type='submit'
                    disabled={disabled}
                    variant='secondary'
                >
                    Giriş
                </Button>
            </Form>
        </Formik>
    )
}

export default LoginForm
