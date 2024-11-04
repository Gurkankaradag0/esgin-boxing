'use client'

import { GetLessons, GetMembers, GetPayments } from '@/services/AdminServices'
import { setLessons, setMembers, setPayments } from '@/store/adminStore'
import { useEffect } from 'react'

const MongoProvider = ({ children }) => {
    useEffect(() => {
        Promise.all([GetMembers(), GetPayments(), GetLessons()]).then(([members, payments, lessons]) => {
            members.ok && setMembers(members.data.members)
            payments.ok && setPayments(payments.data.payments)
            lessons.ok && setLessons(lessons.data.lessons)
        })
    }, [])

    return children
}

export default MongoProvider
