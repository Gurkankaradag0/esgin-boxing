'use client'

import { useEffect } from 'react'

import { GetExpenses, GetLessons, GetPayments, GetSettings } from '@/services/AdminServices'
import { setExpenses, setLessons, setMembers, setPayments, setSettings } from '@/store/adminStore'

const MongoProvider = ({ children }) => {
    useEffect(() => {
        Promise.all([GetSettings(), GetPayments(), GetExpenses(), GetLessons()]).then(([settings, payments, expenses, lessons]) => {
            settings.ok && setSettings(settings.data.settings)
            settings.ok && setMembers(settings.data.members)
            payments.ok && setPayments(payments.data.payments)
            expenses.ok && setExpenses(expenses.data.expenses)
            lessons.ok && setLessons(lessons.data.lessons)
        })
    }, [])

    return children
}

export default MongoProvider
