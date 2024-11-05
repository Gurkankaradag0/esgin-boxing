'use client'

import { useEffect } from 'react'

import { GetLessons, GetPayments, GetSettings } from '@/services/AdminServices'
import { setLessons, setMembers, setPayments, setSettings } from '@/store/adminStore'

const MongoProvider = ({ children }) => {
    useEffect(() => {
        Promise.all([GetSettings(), GetPayments(), GetLessons()]).then(([settings, payments, lessons]) => {
            settings.ok && setSettings(settings.data.settings)
            settings.ok && setMembers(settings.data.members)
            payments.ok && setPayments(payments.data.payments)
            lessons.ok && setLessons(lessons.data.lessons)
        })
    }, [])

    return children
}

export default MongoProvider
