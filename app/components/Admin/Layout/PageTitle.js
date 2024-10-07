'use client'

import { ADMIN_SIDEBAR_ITEMS } from '@/utils/consts'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const PageTitle = () => {
    const pathname = usePathname()
    const ADMIN_PAGE = useMemo(() => ADMIN_SIDEBAR_ITEMS.find((item) => item.pathname === pathname), [pathname])
    return <h4 className='text-[22px] font-semibold text-[#333333] dark:text-white mb-5'>{ADMIN_PAGE.label}</h4>
}

export default PageTitle
