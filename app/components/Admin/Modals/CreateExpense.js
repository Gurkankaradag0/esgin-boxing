'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import DatePickerField from '@/components/Form/DatePickerField'
import { AddExpenseAction, UpdateExpenseAction } from '@/actions/AdminActions'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import InputField from '@/components/Form/InputField'
import TextAreaField from '@/components/Form/TextAreaField'

const CreateExpenseSchema = z.object({
    expenseDate: z.date({ required_error: 'Gerekli' }),
    expenseAmount: z.number().min(1, 'Geçersiz'),
    description: z.string()
})

const CreateExpense = ({ trigger = 'Open Modal', triggerClassname, expense }) => {
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)

    const form = useForm({
        resolver: zodResolver(CreateExpenseSchema),
        defaultValues: expense
            ? {
                  expenseDate: new Date(expense.expenseDate),
                  expenseAmount: expense.expenseAmount,
                  description: expense.description
              }
            : {
                  expenseDate: undefined,
                  expenseAmount: 0,
                  description: ''
              }
    })

    const onSubmit = async (values) => {
        setError('')
        setDisabled(true)
        const response = expense ? await UpdateExpenseAction({ ...values, _id: expense._id }) : await AddExpenseAction(values)
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
                    <DialogTitle>{expense ? 'Gider Düzenle' : 'Gider Ekle'}</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 mt-8'
                    >
                        {error && <div className='flex justify-start items-center py-2 px-4 rounded bg-destructive font-semibold'>{error}</div>}
                        <DatePickerField
                            name='expenseDate'
                            form={form}
                            label='Gider Tarihi'
                            portal={false}
                            disabled={disabled}
                        />

                        <TextAreaField
                            name='description'
                            form={form}
                            label='Gider Açıklaması'
                            disabled={disabled}
                        />

                        <InputField
                            name='expenseAmount'
                            form={form}
                            label='Gider Tutarı'
                            type='number'
                            disabled={disabled}
                        />

                        <Button
                            type='submit'
                            disabled={disabled}
                            variant='secondary'
                            className='w-full'
                        >
                            {expense ? 'Düzenle' : 'Ekle'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateExpense
