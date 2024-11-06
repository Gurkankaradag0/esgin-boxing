import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='border-t border-solid border-muted py-4 px-8'>
            <Link
                href='https://github.com/Gurkankaradag0'
                target='_blank'
                rel='noreferrer'
                className='hover:underline text-xs flex justify-end items-center'
            >
                Gürkan Karadağ
            </Link>
        </footer>
    )
}

export default Footer
