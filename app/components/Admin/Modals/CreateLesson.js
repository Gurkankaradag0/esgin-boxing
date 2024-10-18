'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import SelectField from '@/components/Form/SelectField'
import { AddLesson, DelLesson, UpdateLesson } from '@/services/AdminServices'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import MultiSelectField from '@/components/Form/MultiSelectField'
import { useAdminStore } from '@/store/adminStore'

const CreateLessonSchema = z.object({
    courseType: z
        .string({
            required_error: 'Gerekli'
        })
        .min(1, 'Seçim yapınız'),
    members: z
        .array(
            z.object({
                label: z.string(),
                value: z.string(),
                disable: z.boolean().optional()
            })
        )
        .min(1, 'En az bir seçim yapınız')
})

const CreateLesson = ({ trigger = 'Open Modal', triggerClassname, lesson, day, hour }) => {
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const modalRef = useRef(null)
    const { members } = useAdminStore()

    const form = useForm({
        resolver: zodResolver(CreateLessonSchema),
        values: lesson
            ? {
                  courseType: lesson.courseType,
                  members: lesson.members.map((member) => ({ label: member.name, value: member._id }))
              }
            : {
                  courseType: '',
                  members: []
              }
    })

    const onSubmit = async (values) => {
        setError('')
        setDisabled(true)
        const response = lesson
            ? await UpdateLesson({ courseType: values.courseType, members: values.members.map((member) => member.value), day, hour, _id: lesson._id })
            : await AddLesson({ courseType: values.courseType, members: values.members.map((member) => member.value), day, hour })
        !response.ok && setError(response.status === 401 ? 'Yetkisiz işlem.' : 'Bir sorun ile karşılaşıldı lütfen sonra tekrar deneyiniz.')
        if (response.ok) {
            form.reset()
            setOpen(false)
        }
        setDisabled(false)
    }

    const onDelete = async () => {
        setError('')
        setDisabled(true)
        const response = await DelLesson(lesson._id)
        !response.ok && setError(response.status === 401 ? 'Yetkisiz işlem.' : 'Bir sorun ile karşılaşıldı lütfen sonra tekrar deneyiniz.')
        if (response.ok) {
            form.reset()
            setOpen(false)
        }
        setDisabled(false)
    }

    useEffect(() => {
        if (!modalRef.current) {
            form.reset()
            setError('')
            setDisabled(false)
            setOpen(false)
        }
    }, [modalRef.current])

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger className={triggerClassname}>{trigger}</DialogTrigger>
            <DialogContent
                className='flex flex-col w-full'
                ref={modalRef}
            >
                <DialogHeader>
                    <DialogTitle>{lesson ? 'Üye Düzenle' : 'Üye Ekle'}</DialogTitle>
                    <DialogDescription>
                        {day} : {hour}:00 - {hour + 1}:00
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 mt-8'
                    >
                        {error && <div className='flex justify-start items-center py-2 px-4 rounded bg-destructive font-semibold'>{error}</div>}
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
                        <MultiSelectField
                            name='members'
                            form={form}
                            disabled={disabled}
                            label='Üyeler'
                            values={members.map((member) => ({
                                label: member.name,
                                value: member._id
                            }))}
                        />

                        <Button
                            type='submit'
                            disabled={disabled}
                            variant='secondary'
                            className='w-full'
                        >
                            {lesson ? 'Düzenle' : 'Ekle'}
                        </Button>
                    </form>
                </Form>
                {lesson && (
                    <Button
                        type='button'
                        variant='destructive'
                        className='w-full'
                        onClick={onDelete}
                    >
                        {'Sil'}
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CreateLesson
