import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useAuthStore = create((set, get) => ({
    user: null,
    loading: true,
    fetching: false,
    setUser: (user) => set({ user, fetching: true }),
    setLoading: (status) => set({ loading: status }),
    clearUser: () => set({ user: null })
}))

if (process.env.NODE_ENV === 'development') {
    useAuthStore.subscribe((state) => console.log('Auth Store:', state))
}

// Hooks
export const useAuth = () =>
    useAuthStore(
        useShallow((state) => ({
            user: state.user,
            loading: state.loading,
            fetching: state.fetching
        }))
    )

// Actions
export const getAuthStore = () => useAuthStore.getState()

export const setUser = useAuthStore.getState().setUser
export const setLoading = useAuthStore.getState().setLoading
export const clearUser = useAuthStore.getState().clearUser
