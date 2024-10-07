import { Poppins } from 'next/font/google'
import './assets/css/globals.css'
import Providers from './contexts/Providers'

const inter = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin', 'latin-ext']
})

export const metadata = {
    title: {
        template: '%s | Esgin Boxing',
        default: 'Esgin Boxing'
    },
    description: 'Esgin Boxing'
}

const RootLayout = ({ children }) => {
    return (
        <html lang='tr'>
            <body className={`${inter.className} antialiased`}>
                <Providers>
                    <main className='flex flex-col min-h-screen'>{children}</main>
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout
