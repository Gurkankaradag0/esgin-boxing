import Members from '@/components/Admin/Members'
import CreateMember from '@/components/Admin/Modals/CreateMember'
import { Button } from '@/components/ui/button'

export const metadata = {
    title: 'Üyeler'
}

const AdminMembersPage = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='inline-flex justify-end items-center'>
                <CreateMember
                    trigger={
                        <Button
                            variant='secondary'
                            size='lg'
                        >
                            Üye Ekle
                        </Button>
                    }
                />
            </div>
            <Members />
        </div>
    )
}

export default AdminMembersPage
