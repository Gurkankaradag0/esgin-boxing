'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../ui/button'
import InputField from '../Form/InputField'

import { Register } from '@/services/AuthServices'

const RegisterSchema = z
    .object({
        name: z.string().min(3, 'Çok Kısa'),
        email: z.string().email('Geçersiz E-Posta'),
        password: z.string().min(2, 'Çok Kısa').max(32, 'Çok Uzun'),
        repassword: z.string().min(2, 'Çok Kısa').max(32, 'Çok Uzun')
    })
    .refine(({ password, repassword }) => password === repassword, {
        message: 'Şifreler eşleşmiyor',
        path: ['repassword']
    })

const RegisterForm = () => {
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            repassword: ''
        }
    })

    const onSubmit = async (values) => {
        setError('')
        setDisabled(true)
        const registerRes = await Register(values)
        if (!registerRes.ok) {
            setError(registerRes.status === 400 ? 'E-Posta zaten kullanılıyor.' : 'Bir sorun ile karşılaşıldı lütfen sonra tekrar deneyiniz.')
            setDisabled(false)
        } else {
            router.push('/auth/login')
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
                    name='name'
                    form={form}
                    label='İsim'
                />
                <InputField
                    name='email'
                    form={form}
                    label='E-Posta'
                    type='email'
                />
                <InputField
                    name='password'
                    form={form}
                    label='Şifre'
                    type='password'
                />
                <InputField
                    name='repassword'
                    form={form}
                    label='Tekrar Şifre'
                    type='password'
                />

                <Button
                    type='submit'
                    disabled={disabled}
                    variant='secondary'
                    className='w-full'
                >
                    Kayıt Ol
                </Button>
            </form>
        </Form>
    )
}

export default RegisterForm
