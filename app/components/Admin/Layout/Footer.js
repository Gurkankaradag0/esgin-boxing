import Link from 'next/link'
import Highlight from '../../Highlight'

const Footer = () => {
    return (
        <div className='border-t border-solid p-[15px]'>
            <div className='flex items-center w-full px-[15px] mx-auto'>
                <div className='ml-auto text-sm leading-4 py-2 text-muted-foreground'>
                    <Highlight
                        text='2024, Gürkan Karadağ tarafından ❤️ ile yapıldı'
                        match={'Gürkan Karadağ'}
                        render={(val) => (
                            <Link
                                href='https://github.com/Gurkankaradag0'
                                target='_blank'
                                rel='noreferrer'
                                className='text-destructive hover:underline'
                            >
                                {val}
                            </Link>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default Footer
