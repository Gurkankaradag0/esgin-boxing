import RegisterForm from '@/components/Auth/RegisterForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
    title: 'Kayıt'
}

const RegisterPage = () => {
    return (
        <div className='flex flex-col w-min m-auto gap-8 justify-center items-center'>
            <h2 className='text-3xl font-semibold'>Kayıt Ol</h2>
            <div className='flex flex-col gap-2 justify-center items-center border border-solid p-8 rounded-xl'>
                <RegisterForm />
                <hr className='w-full' />
                <div className='flex w-full justify-center items-center text-xs whitespace-nowrap'>
                    <span>Zaten bir hesabın var mı?</span>
                    <Link href='/auth/login'>
                        <Button
                            variant='link'
                            size='sm'
                        >
                            Giriş Yap
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
