import Providers from '@/contexts/admin/Providers'

import Footer from '@/components/Admin/Layout/Footer'
import Header from '@/components/Admin/Layout/Header'
import PageTitle from '@/components/Admin/Layout/PageTitle'
import Sidebar from '@/components/Admin/Layout/Sidebar'

import { Toaster } from '@/components/ui/toaster'

export const metadata = {
    title: {
        template: '%s | Admin | Esgin Boxing',
        default: 'Admin'
    }
}

const AdminLayout = async ({ children }) => {
    return (
        <Providers>
            <div className='min-h-screen h-screen relative top-0'>
                <Header />
                <Sidebar />
                <div className='relative w-[calc(100%_-_260px)] min-h-full float-right max-[991px]:w-full transition-all duration-500 main-panel'>
                    <div className='p-[30px_15px] min-h-[calc(100vh_-_120px)] mt-[55px] max-[991px]:p-[30px_10px] bg-muted/30'>
                        <div className='w-full px-[15px] mx-auto'>
                            <PageTitle />
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            <Toaster />
        </Providers>
    )
}

export default AdminLayout
