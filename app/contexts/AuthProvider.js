'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { setLoading, setUser, useAuth } from '../store/authStore'
import { GetMe } from '../services/AuthServices'
import Loader from '../components/Layout/Loader'

const AuthProvider = ({ children }) => {
    const { user, fetching, loading } = useAuth()

    const pathname = usePathname()
    const router = useRouter()

    const fetchUser = async () => {
        const me = await GetMe()
        setUser(me.ok ? me.data.user : null)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user && fetching && loading) {
            if (pathname.startsWith('/admin') && !user.isAdmin) {
                router.push('/')
            } else if (pathname.includes('login') || pathname.includes('register')) {
                router.push('/')
            } else {
                setLoading(false)
            }
        } else if (!user && fetching && loading) {
            if (pathname.startsWith('/admin')) {
                router.push('/auth/login')
            } else {
                setLoading(false)
            }
        } else if (!user && fetching && !loading) {
            if (pathname.startsWith('/admin')) {
                router.push('/')
            }
        }
    }, [user, fetching, pathname])

    if (pathname !== '/' && loading) return <Loader />

    return <>{children}</>
}

export default AuthProvider
