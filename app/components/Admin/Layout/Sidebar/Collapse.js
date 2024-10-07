'use client'

import { Logout } from '@/services/AuthServices'
import { clearUser, useAuth } from '@/store/authStore'
import { closeSidebar, closeSidebarCollapse, setAdminSidebarCollapse, useThemeStore } from '@/store/themeStore'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

const Collapse = () => {
    const { admin } = useThemeStore()
    const { user } = useAuth()

    const CloseAll = () => {
        closeSidebar()
        closeSidebarCollapse()
    }

    const LogoutHandle = async () => {
        CloseAll()
        const logoutRes = await Logout()
        if (logoutRes.ok) clearUser()
    }

    return (
        <div>
            <a
                className='block relative whitespace-nowrap cursor-pointer select-none'
                onClick={() => setAdminSidebarCollapse(!admin.sidebar.isCollapseOpen)}
            >
                <span className='text-sm leading-4 font-semibold text-[#777] dark:text-white flex flex-col'>
                    <h2 className='text-ellipsis max-w-[132px] overflow-hidden'>{user?.email}</h2>{' '}
                    <span className='text-[#555] dark:text-white/70 font-bold text-[13px] mt-[5px]'>Administrator</span>
                    <div className='absolute top-[7.5px] right-0 flex justify-center items-center'>
                        {admin.sidebar.isCollapseOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                </span>
            </a>
            <div className='after:block after:clear-both after:content-[""]'></div>
            <AnimatePresence>
                {admin.sidebar.isCollapseOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ opacity: 1, height: 75 }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'
                    >
                        <ul className='list-none block float-none mt-5 text-[#777] dark:text-white/60'>
                            <li>
                                <Link
                                    href='/admin/settings'
                                    className='whitespace-nowrap p-[7px_0] text-sm leading-4 font-semibold flex flex-col'
                                    onClick={CloseAll}
                                >
                                    Ayarlar
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={LogoutHandle}
                                    className='whitespace-nowrap p-[7px_0] text-sm leading-4 font-semibold flex flex-col'
                                >
                                    Çıkış Yap
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Collapse
