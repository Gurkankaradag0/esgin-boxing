import { ADMIN_SIDEBAR_ITEMS } from '@/utils/consts'

import Item from './Item'
import { UserRound } from 'lucide-react'
import Collapse from './Collapse'

const Sidebar = () => {
    return (
        <div className='fixed top-0 bottom-0 left-0 w-[260px] z-10 block font-extralight bg-cover border-r border-solid shadow-[6px_1px_20px_rgba(69,65,78,0.1)] max-[991px]:!left-0 max-[991px]:transition-all max-[991px]:duration-500 sidebar-translate3d'>
            <div className='relative max-h-[calc(100vh_-_75px)] min-h-full overflow-hidden w-[260px] z-20'>
                <div className='h-[919px] max-h-none min-h-full z-20 pb-[100px] overflow-y-auto left-0 top-0 w-auto relative pt-[55px] max-[991px]:pt-0'>
                    <div className='mt-[12.5px] px-[25px] pb-[12.5px] border-b border-solid block'>
                        <div className='w-10 h-10 overflow-hidden float-left mr-[11px] rounded-full flex justify-center items-center border border-solid'>
                            <UserRound size={24} />
                        </div>
                        <Collapse />
                    </div>
                    <ul className='flex flex-col mt-5 gap-[5px] w-full'>
                        {ADMIN_SIDEBAR_ITEMS.filter((item) => item.sidebar).map((item, index) => (
                            <Item
                                key={index}
                                item={item}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
