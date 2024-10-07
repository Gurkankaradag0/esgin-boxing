import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useTheme = create((set, get) => ({
    admin: {
        sidebar: {
            isOpen: false,
            isCollapseOpen: false
        }
    },
    setAdminSidebar: (status) => {
        const { admin } = get()
        set({ admin: { ...admin, sidebar: { ...admin.sidebar, isOpen: status } } })
        if (status) {
            document.getElementsByTagName('html')[0].classList.add('sidebar-open')
        } else {
            document.getElementsByTagName('html')[0].classList.remove('sidebar-open')
        }
    },
    setAdminSidebarCollapse: (status) => {
        const { admin } = get()
        set({ admin: { ...admin, sidebar: { ...admin.sidebar, isCollapseOpen: status } } })
    },
    closeSidebar: () => {
        const { admin } = get()
        set({ admin: { ...admin, sidebar: { ...admin.sidebar, isOpen: false } } })
        document.getElementsByTagName('html')[0].classList.remove('sidebar-open')
    },
    closeSidebarCollapse: () => {
        const { admin } = get()
        set({ admin: { ...admin, sidebar: { ...admin.sidebar, isCollapseOpen: false } } })
    }
}))

if (process.env.NODE_ENV === 'development') {
    useTheme.subscribe((state) => console.log('Theme Store:', state))
}

// Hooks
export const useThemeStore = () =>
    useTheme(
        useShallow((state) => ({
            admin: state.admin
        }))
    )

// Actions
export const getThemeStore = () => useTheme.getState()

export const setAdminSidebar = useTheme.getState().setAdminSidebar
export const setAdminSidebarCollapse = useTheme.getState().setAdminSidebarCollapse
export const closeSidebar = useTheme.getState().closeSidebar
export const closeSidebarCollapse = useTheme.getState().closeSidebarCollapse
