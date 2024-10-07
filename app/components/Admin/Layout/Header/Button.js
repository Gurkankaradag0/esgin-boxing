'use client'

import { setAdminSidebar, useThemeStore } from '@/store/themeStore'
import { PanelLeft, PanelLeftClose } from 'lucide-react'

const Button = () => {
    const { admin } = useThemeStore()
    return (
        <button
            onClick={() => setAdminSidebar(!admin.sidebar.isOpen)}
            className='hidden max-[991px]:absolute max-[991px]:top-auto max-[991px]:h-full max-[991px]:left-[15px] max-[991px]:block'
        >
            {admin.sidebar.isOpen ? <PanelLeftClose className='size-6' /> : <PanelLeft className='size-6' />}
        </button>
    )
}

export default Button
