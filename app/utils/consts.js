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

export const PaymentTypes = [
    {
        label: 'Gelir',
        value: 'Income'
    },
    {
        label: 'Gider',
        value: 'Expense'
    }
]

export const PaymentDescriptions = [
    {
        label: 'Öğrenci',
        value: 'Member'
    },
    {
        label: 'Kira',
        value: 'Rent'
    },
    {
        label: 'Fatura',
        value: 'Invoice'
    },
    {
        label: 'Ürün',
        value: 'Product'
    },
    {
        label: 'Diğer',
        value: 'Other'
    }
]
