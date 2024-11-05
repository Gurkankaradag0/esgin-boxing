'use client'

import { useAdminStore } from '@/store/adminStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'
import { Button } from '../ui/button'
import InputField from '../Form/InputField'
import { z } from 'zod'
import { UpdateSettingsAction } from '@/actions/AdminActions'
import { toast } from '@/hooks/use-toast'

const UpdateSettingsSchema = z.object({
    groupPrice: z.number().min(1, 'Geçersiz')
})

const Settings = () => {
    const [disabled, setDisabled] = useState(false)
    const { settings } = useAdminStore()

    const form = useForm({
        resolver: zodResolver(UpdateSettingsSchema),
        values: {
            groupPrice: settings?.groupPrice ?? 0
        }
    })

    const onSubmit = async (values) => {
        setDisabled(true)
        const response = await UpdateSettingsAction({ ...values, _id: settings._id })
        !response.ok &&
            toast({
                title: 'Hata Oluştu!',
                description: response.data.error
            })
        if (response.ok) form.reset()
        setDisabled(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 mt-8'
            >
                <InputField
                    name='groupPrice'
                    form={form}
                    label='Grup Ders Ücreti'
                    type='number'
                    min={0}
                    disabled={disabled}
                />

                <Button
                    type='submit'
                    disabled={disabled}
                    variant='secondary'
                    className='w-full'
                >
                    Kaydet
                </Button>
            </form>
        </Form>
    )
}

export default Settings
