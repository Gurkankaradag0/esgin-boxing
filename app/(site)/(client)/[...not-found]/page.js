export const metadata = {
    title: '404 Sayfa Bulunamadı'
}

const NotFoundPage = () => {
    return (
        <div className='w-3/4 max-md:w-4/5 max-sm:w-11/12 h-full my-16 flex flex-col justify-center items-center'>
            <h1 className='text-[250px] max-md:text-[200px] max-sm:text-[180px] leading-[220px] max-md:leading-[180px] max-sm:leading-[160px] font-black select-none'>
                404
            </h1>
            <span className='text-xl max-md:text-base max-sm:text-sm leading-5 font-bold text-center'>Sanırım kayboldun.</span>
        </div>
    )
}

export default NotFoundPage
