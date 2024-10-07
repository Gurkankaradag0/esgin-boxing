import RegisterForm from '@/components/Auth/RegisterForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const metadata = {
    title: 'Kayıt'
}

const RegisterPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl'>Hesap oluştur</CardTitle>
                <CardDescription>Hesabınızı oluşturmak için aşağıya e-postanızı girin.</CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
            <hr className='w-full mb-4' />
            <CardFooter className='flex justify-center items-center text-xs whitespace-nowrap'>
                <span>Zaten bir hesabın var mı?</span>
                <Link href='/auth/login'>
                    <Button
                        variant='link'
                        size='sm'
                    >
                        Giriş Yap
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default RegisterPage
