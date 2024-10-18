'use client'

import { GetLessons, GetMembers, GetPayments } from '@/services/AdminServices'
import { setLessons, setMembers, setPayments } from '@/store/adminStore'
import { useEffect } from 'react'

const MongoProvider = ({ children }) => {
    useEffect(() => {
        GetMembers()
            .then((response) => {
                if (response.ok) setMembers(response.data.members)
            })
            .catch(console.error)

        GetPayments()
            .then((response) => {
                if (response.ok) setPayments(response.data.payments)
            })
            .catch(console.error)

        GetLessons()
            .then((response) => {
                if (response.ok) setLessons(response.data.lessons)
            })
            .catch(console.error)
    }, [])

    return children
}

export default MongoProvider
