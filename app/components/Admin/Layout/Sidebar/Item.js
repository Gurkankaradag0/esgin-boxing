'use client'

import { closeSidebar, useThemeStore } from '@/store/themeStore'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Item = ({ item }) => {
    const pathname = usePathname()
    const { admin } = useThemeStore()

    return (
        <li className='relative list-item'>
            <Link
                href={item.pathname}
                className={classNames('flex items-center gap-4 p-[13px_25px] w-full text-sm leading-4', {
                    'bg-muted/50 font-bold before:bg-secondary before:opacity-100 before:absolute before:z-10 before:w-[3px] before:h-full before:content-[""] before:left-0 before:top-0':
                        pathname === item.pathname,
                    'text-muted-foreground font-semibold hover:bg-muted/50 hover:before:bg-secondary hover:before:opacity-100 hover:before:absolute hover:before:z-10 hover:before:w-[3px] hover:before:h-full hover:before:content-[""] hover:before:left-0 hover:before:top-0':
                        pathname !== item.pathname
                })}
                onClick={() => admin.sidebar.isOpen && closeSidebar()}
            >
                <div
                    className={classNames('flex justify-center items-center', {
                        'text-muted-foreground': pathname !== item.pathname
                    })}
                >
                    {item.icon}
                </div>
                <p>{item.label}</p>
            </Link>
        </li>
    )
}

export default Item
