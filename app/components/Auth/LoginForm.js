'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../ui/button'
import InputField from '../Form/InputField'

import { Login } from '@/services/AuthServices'
import { setUser } from '@/store/authStore'

const LoginSchema = z.object({
    email: z.string().email('Geçersiz E-Posta'),
    password: z.string().min(2, 'Çok Kısa').max(32, 'Çok Uzun')
})

const LoginForm = () => {
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
            >
                {error && <div className='flex justify-start items-center py-2 px-4 rounded bg-destructive font-semibold text-sm'>{error}</div>}

                <InputField
                    name='email'
                    form={form}
                    label='E-Posta'
                    type='email'
                    disabled={disabled}
                />
                <InputField
                    name='password'
                    form={form}
                    label='Şifre'
                    type='password'
                    disabled={disabled}
                />

                <Button
                    type='submit'
                    disabled={disabled}
                    variant='secondary'
                    className='w-full'
                >
                    Giriş Yap
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm
