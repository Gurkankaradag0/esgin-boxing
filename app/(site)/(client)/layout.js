import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'

const ClientLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className='flex-grow flex flex-col justify-center items-center'>{children}</div>
            <Footer />
        </>
    )
}

export default ClientLayout
