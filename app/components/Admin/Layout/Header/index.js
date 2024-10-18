import Link from 'next/link'
import Button from './Button'

const Header = () => {
    return (
        <div className='min-h-[55px] w-full fixed z-50 border-b border-solid transition-all duration-500 main-panel bg-background'>
            <div className='float-left w-[260px] h-[55px] border-r border-solid z-50 text-lg leading-4 font-semibold px-[25px] flex max-[991px]:!w-full max-[991px]:text-left justify-center items-center min-[992px]:justify-start'>
                <Link
                    className=''
                    href='/admin'
                >
                    ESGİN BOXİNG
                </Link>
                <Button />
            </div>
        </div>
    )
}

export default Header
