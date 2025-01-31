'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import InputField from '@/components/Form/InputField'
import PhoneNumberField from '@/components/Form/PhoneNumberField'
import SelectField from '@/components/Form/SelectField'
import DatePickerField from '@/components/Form/DatePickerField'
import { AddMemberAction, UpdateMemberAction } from '@/actions/AdminActions'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAdminStore } from '@/store/adminStore'

const CreateMemberSchema = z.object({
    name: z.string().min(3, 'Çok Kısa'),
    registrationDate: z.date({
        required_error: 'Gerekli'
    }),
    phoneNumber: z.string().nullable(),
    courseType: z
        .string({
            required_error: 'Gerekli'
        })
        .min(1, 'Seçim Yapınız'),
    amountToBePaid: z.number().min(1, 'Geçersiz')
})

const CreateMember = ({ trigger = 'Open Modal', triggerClassname, member }) => {
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [oldAmountToBePaid, setOldAmountToBePaid] = useState(member?.amountToBePaid ?? 0)
    const { settings } = useAdminStore()

    const form = useForm({
        resolver: zodResolver(CreateMemberSchema),
        defaultValues: member
            ? {
                  name: member.name,
                  registrationDate: new Date(member.registrationDate),
                  phoneNumber: member.phoneNumber,
                  courseType: member.courseType,
                  amountToBePaid: member.amountToBePaid
              }
            : {
                  name: '',
                  registrationDate: undefined,
                  phoneNumber: '',
                  courseType: '',
                  amountToBePaid: 0
              }
    })

    const courseType = useWatch({
        control: form.control,
        name: 'courseType'
    })

    const amountToBePaid = useWatch({
        control: form.control,
        name: 'amountToBePaid'
    })

    const onSubmit = async (values) => {
        setError('')
        setDisabled(true)
        const response = member ? await UpdateMemberAction({ ...values, _id: member._id }) : await AddMemberAction(values)
        !response.ok && setError(response.status === 401 ? 'Yetkisiz işlem.' : 'Bir sorun ile karşılaşıldı lütfen sonra tekrar deneyiniz.')
        if (response.ok) {
            form.reset()
            setOpen(false)
        }
        setDisabled(false)
    }

    useEffect(() => {
        if (courseType === 'group') {
            setOldAmountToBePaid(amountToBePaid)
            form.setValue('amountToBePaid', settings.groupPrice)
        } else {
            form.setValue('amountToBePaid', oldAmountToBePaid)
        }
    }, [courseType])

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger className={triggerClassname}>{trigger}</DialogTrigger>
            <DialogContent className='flex flex-col max-w-fit'>
                <DialogHeader>
                    <DialogTitle>{member ? 'Üye Düzenle' : 'Üye Ekle'}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 mt-8'
                    >
                        {error && <div className='flex justify-start items-center py-2 px-4 rounded bg-destructive font-semibold'>{error}</div>}
                        <InputField
                            name='name'
                            form={form}
                            label='İsim'
                            disabled={disabled}
                        />
                        <DatePickerField
                            name='registrationDate'
                            form={form}
                            label='Kayıt Tarihi'
                            portal={false}
                            disabled={disabled}
                        />
                        <PhoneNumberField
                            name='phoneNumber'
                            form={form}
                            label='Telefon Numarası'
                            disabled={disabled}
                        />
                        <SelectField
                            name='courseType'
                            form={form}
                            label='Ders Türü'
                            values={[
                                {
                                    value: 'group',
                                    label: 'Grup'
                                },
                                {
                                    value: 'personal',
                                    label: 'Özel'
                                }
                            ]}
                            disabled={disabled}
                        />
                        <InputField
                            name='amountToBePaid'
                            form={form}
                            label='Ödenecek Tutar'
                            type='number'
                            min={0}
                            disabled={disabled || courseType !== 'personal'}
                        />

                        <Button
                            type='submit'
                            disabled={disabled}
                            variant='secondary'
                            className='w-full'
                        >
                            {member ? 'Düzenle' : 'Ekle'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateMember
