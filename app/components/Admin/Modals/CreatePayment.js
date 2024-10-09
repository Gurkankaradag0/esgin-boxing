'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import SelectField from '@/components/Form/SelectField'
import DatePickerField from '@/components/Form/DatePickerField'
import { AddPayment, UpdatePayment } from '@/services/AdminServices'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAdminStore } from '@/store/adminStore'

const CreatePaymentSchema = z.object({
    paymentDate: z.date({
        required_error: 'Gerekli'
    }),
    member: z
        .string({
            required_error: 'Gerekli'
        })
        .min(1, 'Seçim Yapınız')
})

const CreatePayment = ({ trigger = 'Open Modal', triggerClassname, payment }) => {
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const { members } = useAdminStore()

    const form = useForm({
        resolver: zodResolver(CreatePaymentSchema),
        defaultValues: payment
            ? {
                  paymentDate: new Date(payment.paymentDate),
                  member: payment.member._id
              }
            : {
                  paymentDate: undefined,
                  member: ''
              }
    })

    const onSubmit = async (values) => {
        setError('')
        setDisabled(true)
        const response = payment ? await UpdatePayment({ ...values, _id: payment._id }) : await AddPayment(values)
        !response.ok && setError(response.status === 401 ? 'Yetkisiz işlem.' : 'Bir sorun ile karşılaşıldı lütfen sonra tekrar deneyiniz.')
        if (response.ok) {
            form.reset()
            setOpen(false)
        }
        setDisabled(false)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger className={triggerClassname}>{trigger}</DialogTrigger>
            <DialogContent className='flex flex-col'>
                <DialogHeader>
                    <DialogTitle>{payment ? 'Ödeme Düzenle' : 'Ödeme Ekle'}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 mt-8'
                    >
                        {error && <div className='flex justify-start items-center py-2 px-4 rounded bg-destructive font-semibold'>{error}</div>}
                        <DatePickerField
                            name='paymentDate'
                            form={form}
                            label='Ödeme Tarihi'
                            portal={false}
                        />
                        <SelectField
                            name='member'
                            form={form}
                            label='Üye'
                            values={members.map((member) => ({
                                value: member._id,
                                label: member.name
                            }))}
                        />

                        <Button
                            type='submit'
                            disabled={disabled}
                            variant='secondary'
                            className='w-full'
                        >
                            {payment ? 'Düzenle' : 'Ekle'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePayment
