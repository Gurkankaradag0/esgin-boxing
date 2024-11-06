'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import SelectField from '@/components/Form/SelectField'
import DatePickerField from '@/components/Form/DatePickerField'
import { AddPaymentAction, UpdatePaymentAction } from '@/actions/AdminActions'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAdminStore } from '@/store/adminStore'
import InputField from '@/components/Form/InputField'
import RadioGroupField from '@/components/Form/RadioGroupField'
import { PaymentDescriptions, PaymentTypes } from '@/utils/consts'

const CreatePaymentSchema = z.object({
    paymentDate: z.date({
        required_error: 'Gerekli'
    }),
    paymentType: z
        .string({
            required_error: 'Gerekli'
        })
        .min(1, 'Seçim Yapınız'),
    paymentDescription: z
        .string({
            required_error: 'Gerekli'
        })
        .min(1, 'Seçim Yapınız'),
    paymentAmount: z.number().min(1, 'Geçersiz'),
    member: z.optional(z.string())
})

const CreatePayment = ({ trigger = 'Open Modal', triggerClassname, payment }) => {
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [oldPaymentAmount, setOldPaymentAmount] = useState(payment?.paymentAmount ?? 0)
    const { members } = useAdminStore()

    const form = useForm({
        resolver: zodResolver(CreatePaymentSchema),
        defaultValues: payment
            ? {
                  paymentDate: new Date(payment.paymentDate),
                  paymentType: payment.paymentType,
                  paymentDescription: payment.paymentDescription,
                  paymentAmount: payment.paymentAmount,
                  member: payment.member?._id ?? ''
              }
            : {
                  paymentDate: undefined,
                  paymentType: '',
                  paymentDescription: '',
                  paymentAmount: 0,
                  member: ''
              }
    })

    const paymentDescription = useWatch({ control: form.control, name: 'paymentDescription' })
    const paymentAmount = useWatch({ control: form.control, name: 'paymentAmount' })
    const member = useWatch({ control: form.control, name: 'member' })

    const onSubmit = async (values) => {
        setError('')
        setDisabled(true)
        const response = payment ? await UpdatePaymentAction({ ...values, _id: payment._id }) : await AddPaymentAction(values)
        !response.ok && setError(response.status === 401 ? 'Yetkisiz işlem.' : 'Bir sorun ile karşılaşıldı lütfen sonra tekrar deneyiniz.')
        if (response.ok) {
            form.reset()
            setOpen(false)
        }
        setDisabled(false)
    }

    useEffect(() => {
        if (paymentDescription === 'Member') {
            if (!member) return
            setOldPaymentAmount(paymentAmount)
            form.setValue('paymentAmount', members.find((m) => m._id === member).amountToBePaid)
        } else {
            form.setValue('paymentAmount', oldPaymentAmount)
            form.setValue('member', '')
        }
    }, [paymentDescription, member])

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger className={triggerClassname}>{trigger}</DialogTrigger>
            <DialogContent className='flex flex-col'>
                <DialogHeader>
                    <DialogTitle>{payment ? 'Ödeme Düzenle' : 'Ödeme Ekle'}</DialogTitle>
                    <DialogDescription />
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
                            disabled={disabled}
                        />
                        <SelectField
                            name='paymentType'
                            form={form}
                            label='Ödeme Tipi'
                            values={PaymentTypes}
                            disabled={disabled}
                        />
                        <RadioGroupField
                            name='paymentDescription'
                            form={form}
                            label='Ödeme Açıklaması'
                            values={PaymentDescriptions}
                            disabled={disabled}
                        />
                        {paymentDescription === 'Member' && (
                            <SelectField
                                name='member'
                                form={form}
                                label='Üye'
                                values={members.map((member) => ({
                                    value: member._id,
                                    label: member.name
                                }))}
                                disabled={disabled}
                            />
                        )}
                        <InputField
                            name='paymentAmount'
                            form={form}
                            label='Ödeme Tutarı'
                            type='number'
                            min={0}
                            disabled={disabled || !paymentDescription || paymentDescription === 'Member'}
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
