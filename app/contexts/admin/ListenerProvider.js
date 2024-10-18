'use client'

import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { addLesson, addMember, addPayment, delLesson, delMember, delPayment, updateLesson, updateMember, updatePayment } from '@/store/adminStore'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

const ListenerProvider = ({ children }) => {
    const { toast } = useToast()

    useEffect(() => {
        const eventSource = new EventSource('/api/admin/listener')

        eventSource.onmessage = function (event) {
            const newData = JSON.parse(event.data)
            const { operationType, ns, fullDocument, documentKey, updateDescription } = newData

            if (operationType === 'insert') {
                if (ns.coll === 'members') {
                    addMember(fullDocument)
                    toast({
                        title: 'Üye Eklendi',
                        description: format(new Date(), 'PPP', { locale: tr })
                    })
                } else if (ns.coll === 'payments') {
                    addPayment(fullDocument)
                    toast({
                        title: 'Ödeme Eklendi',
                        description: format(new Date(), 'PPP', { locale: tr })
                    })
                } else if (ns.coll === 'lessons') {
                    addLesson(fullDocument)
                    toast({
                        title: 'Ders Eklendi',
                        description: format(new Date(), 'PPP', { locale: tr })
                    })
                }
            } else if (operationType === 'update') {
                if (ns.coll === 'members') {
                    updateMember(documentKey._id, updateDescription.updatedFields)
                    toast({
                        title: 'Üye Düzenlendi',
                        description: format(new Date(), 'PPP', { locale: tr })
                    })
                } else if (ns.coll === 'payments') {
                    updatePayment(documentKey._id, updateDescription.updatedFields)
                    toast({
                        title: 'Ödeme Düzenlendi',
                        description: format(new Date(), 'PPP', { locale: tr })
                    })
                } else if (ns.coll === 'lessons') {
                    updateLesson(documentKey._id, updateDescription.updatedFields)
                    toast({
                        title: 'Ders Düzenlendi',
                        description: format(new Date(), 'PPP', { locale: tr })
                    })
                }
            } else if (operationType === 'delete') {
                if (ns.coll === 'members') {
                    delMember(documentKey._id)
                    toast({
                        title: 'Üye Silindi',
                        description: format(new Date(), 'PPP', { locale: tr })
                    })
                } else if (ns.coll === 'payments') {
                    delPayment(documentKey._id)
                    toast({
                        title: 'Ödeme Silindi',
                        description: format(new Date(), 'PPP', { locale: tr })
                    })
                } else if (ns.coll === 'lessons') {
                    delLesson(documentKey._id)
                    toast({
                        title: 'Ders Silindi',
                        description: format(new Date(), 'PPP', { locale: tr })
                    })
                }
            }
        }

        eventSource.onerror = function () {
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [])

    return children
}

export default ListenerProvider
