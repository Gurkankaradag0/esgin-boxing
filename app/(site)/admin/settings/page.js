import Settings from '@/components/Admin/Settings'

export const metadata = {
    title: 'Ayarlar'
}

const AdminSettingsPage = () => {
    return (
        <div className='flex flex-col gap-4'>
            <Settings />
        </div>
    )
}

export default AdminSettingsPage
