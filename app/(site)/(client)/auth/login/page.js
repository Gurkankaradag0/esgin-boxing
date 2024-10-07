import LoginForm from '@/components/Auth/LoginForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
    title: 'Giriş'
}

const LoginPage = () => {
    return (
        <div className='flex flex-col w-min m-auto gap-8 justify-center items-center'>
            <h2 className='text-3xl font-semibold'>Giriş Yap</h2>
            <div className='flex flex-col gap-2 justify-center items-center border border-solid p-8 rounded-xl'>
                <LoginForm />
                <hr className='w-full' />
                <div className='flex w-full justify-center items-center text-xs whitespace-nowrap'>
                    <span>Hesabın yok mu?</span>
                    <Link href='/auth/register'>
                        <Button
                            variant='link'
                            size='sm'
                        >
                            Kayıt Ol
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
