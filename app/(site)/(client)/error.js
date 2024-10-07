'use client'

const error = ({ error, reset }) => {
    return (
        <div className='w-3/4 max-md:w-4/5 max-sm:w-11/12 h-full my-16 flex flex-col justify-center items-center'>
            <h1 className='text-[250px] max-md:text-[200px] max-sm:text-[180px] leading-[220px] max-md:leading-[180px] max-sm:leading-[160px] font-black select-none'>
                500
            </h1>
            <span className='text-xl max-md:text-base max-sm:text-sm leading-5 font-bold text-center'>Bir şeyler ters gitti.</span>
            <button
                className='mt-4 py-1 px-2.5 rounded-full bg-[#1d1d1b] text-white text-base border-2 border-black hover:bg-zinc-300 hover:text-black duration-300 transition-colors'
                onClick={() => reset()}
            >
                Tekrar Deneyiniz
            </button>
        </div>
    )
}

export default error
