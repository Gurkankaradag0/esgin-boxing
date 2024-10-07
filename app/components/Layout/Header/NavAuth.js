'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Logout } from '@/services/AuthServices'
import { clearUser, useAuth } from '@/store/authStore'
import { UserRound } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const NavAuth = () => {
    const { user } = useAuth()
    const router = useRouter()

    return (
        <div className='flex justify-center items-center gap-2'>
            {!user ? (
                <div className='flex justify-center items-center gap-2 max-xl:gap-1.5'>
                    <Link href='/auth/login'>
                        <Button variant='secondary'>Giriş Yap</Button>
                    </Link>
                    <Link href='/auth/register'>
                        <Button variant='outline'>Kayıt Ol</Button>
                    </Link>
                </div>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex justify-center items-center gap-2 outline-none'>
                        <UserRound size={18} />
                        {user.name}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        sideOffset={10}
                        align='end'
                    >
                        <DropdownMenuLabel className='select-none'>{user.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => router.push('/admin')}>Admin Sayfası</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={async () => {
                                    const logoutRes = await Logout()
                                    if (logoutRes.ok) clearUser()
                                }}
                                className='text-destructive'
                            >
                                Çıkış Yap
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default NavAuth
