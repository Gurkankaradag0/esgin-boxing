'use client'

import { Logout } from '@/services/AuthServices'
import { clearUser, useAuth } from '@/store/authStore'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import classNames from 'classnames'
import { UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

const NavAuth = () => {
    const { user } = useAuth()
    const router = useRouter()

    const items = useMemo(() => {
        const _items = [
            {
                key: '0',
                label: user?.email
            },
            {
                type: 'divider'
            },
            {
                key: '1',
                label: 'Çıkış Yap',
                danger: true,
                onClick: async () => {
                    const logoutRes = await Logout()
                    if (logoutRes.ok) clearUser()
                }
            }
        ]

        if (user?.isAdmin) {
            return [
                ..._items.slice(0, 1),
                {
                    key: '2',
                    label: 'Admin Sayfası',
                    onClick: () => router.push('/admin')
                },
                ..._items.slice(1)
            ]
        }

        return _items
    }, [user])

    return (
        <div className='flex justify-center items-center gap-2'>
            {!user ? (
                <div className='flex justify-center items-center gap-2 max-xl:gap-1.5'>
                    <Link
                        href='/auth/login'
                        className='text-sm text-semibold py-2 px-4 max-xl:px-3 max-lg:px-2 bg-[#f9f9f9] dark:bg-[#FFFFFF] text-black dark:text-[#0F0F0F] border border-solid border-[#dadada] hover:bg-[#f9f8f8] transition-colors duration-300 text-center rounded-full whitespace-nowrap max-[330px]:hidden'
                    >
                        Giriş Yap
                    </Link>
                    <Link
                        href='/auth/register'
                        className='text-sm text-semibold py-2 px-4 max-xl:px-3 max-lg:px-2 bg-[#1d1d1b] dark:bg-[#0F0F0F] text-white border border-solid border-[#dadada] dark:border-white hover:bg-[#f9f8f8] hover:text-black transition-colors duration-300 text-center rounded-full whitespace-nowrap'
                    >
                        Kayıt Ol
                    </Link>
                </div>
            ) : (
                <Menu>
                    <MenuButton className='flex justify-end items-center gap-4'>
                        <div className='rounded-full w-8 h-8 border border-solid border-black dark:border-white flex justify-center items-center bg-transparent overflow-hidden'>
                            <UserRound size={18} />
                        </div>
                        <span className='text-sm leading-4 font-semibold text-ellipsis max-w-[125px] whitespace-nowrap overflow-hidden max-[360px]:hidden'>
                            {user.email}
                        </span>
                    </MenuButton>
                    <MenuItems
                        transition
                        anchor='bottom end'
                        className='w-52 origin-top-right rounded-xl border border-white/5 bg-black/10 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-white/10 mt-2'
                    >
                        {items.map((item, index) => {
                            if (item?.type === 'divider')
                                return (
                                    <div
                                        key={index}
                                        className='my-1 h-px bg-white/5'
                                    />
                                )
                            return (
                                <MenuItem
                                    key={index}
                                    as='button'
                                    className={classNames(
                                        'group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 overflow-hidden text-ellipsis whitespace-nowrap',
                                        {
                                            'data-[focus]:bg-white/10': item?.onClick || item?.path,
                                            'cursor-default': !item?.onClick && !item?.path,
                                            'text-red-400': item?.danger
                                        }
                                    )}
                                    onClick={item?.onClick}
                                >
                                    {item.label}
                                </MenuItem>
                            )
                        })}
                    </MenuItems>
                </Menu>
            )}
        </div>
    )
}

export default NavAuth
