import { CalendarDays, HandCoins, LayoutDashboard, Settings, UsersRound } from 'lucide-react'

export const ADMIN_SIDEBAR_ITEMS = [
    {
        name: 'dashboard',
        label: 'Ana Sayfa',
        pathname: '/admin',
        icon: <LayoutDashboard size={24} />,
        sidebar: true
    },
    {
        name: 'timetable',
        label: 'Ders Programı',
        pathname: '/admin/timetable',
        icon: <CalendarDays size={24} />,
        sidebar: true
    },
    {
        name: 'members',
        label: 'Üyeler',
        pathname: '/admin/members',
        icon: <UsersRound size={24} />,
        sidebar: true
    },
    {
        name: 'payments',
        label: 'Ödemeler',
        pathname: '/admin/payments',
        icon: <HandCoins size={24} />,
        sidebar: true
    },
    {
        name: 'expenses',
        label: 'Giderler',
        pathname: '/admin/expenses',
        icon: <HandCoins size={24} />,
        sidebar: true
    },
    {
        name: 'settings',
        label: 'Ayarlar',
        pathname: '/admin/settings',
        icon: <Settings size={24} />,
        sidebar: true
    },
    {
        name: 'user',
        label: 'Ayarlar',
        pathname: '/admin/user',
        icon: <Settings size={24} />,
        sidebar: false
    }
]
