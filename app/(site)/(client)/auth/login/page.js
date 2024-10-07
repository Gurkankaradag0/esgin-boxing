import Link from 'next/link'

import LoginForm from '@/components/Auth/LoginForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
    title: 'Giriş'
}

const LoginPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl'>Giriş</CardTitle>
                {/* <CardDescription>Hesabınızı oluşturmak için aşağıya e-postanızı girin.</CardDescription> */}
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <hr className='w-full mb-4' />
            <CardFooter className='flex justify-center items-center text-xs whitespace-nowrap'>
                <span>Hesabın yok mu?</span>
                <Link href='/auth/register'>
                    <Button
                        variant='link'
                        size='sm'
                    >
                        Kayıt Ol
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default LoginPage
