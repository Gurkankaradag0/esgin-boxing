import Link from 'next/link'
import NavAuth from './NavAuth'

const Header = () => {
    return (
        <header className='border-b border-solid border-muted py-6 px-8'>
            <nav className='flex justify-between items-center'>
                <Link
                    className='text-2xl max-sm:text-base uppercase font-semibold select-none'
                    href='/'
                >
                    Esgin Boxing
                </Link>
                <NavAuth />
            </nav>
        </header>
    )
}

export default Header
