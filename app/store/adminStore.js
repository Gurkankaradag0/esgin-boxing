import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useAdmin = create((set, get) => ({
    members: [],
    payments: [],
    fetching: false,
    setMembers: (members) => set({ members }),
    setPayments: (payments) => set({ payments }),
    addMember: (member) => {
        const { members } = get()
        set({ members: [...members, member] })
    },
    updateMember: (memberId, updatedFields) => {
        const { members } = get()
        set({
            members: members.map((member) => {
                if (member._id === memberId) {
                    return {
                        ...member,
                        ...updatedFields
                    }
                }

                return member
            })
        })
    },
    delMember: (memberId) => {
        const { members } = get()
        set({ members: members.filter((member) => member._id !== memberId) })
    },
    addPayment: (payment) => {
        const { payments } = get()
        set({ payments: [...payments, payment] })
    },
    updatePayment: (paymentId, updatedFields) => {
        const { payments } = get()
        set({
            payments: [
                ...payments.filter((payment) => payment._id !== paymentId),
                {
                    ...payments.find((payment) => payment._id === paymentId),
                    ...updatedFields
                }
            ]
        })
    },
    delPayment: (paymentId) => {
        const { payments } = get()
        set({ payments: payments.filter((payment) => payment._id !== paymentId) })
    }
}))

if (process.env.NODE_ENV === 'development') {
    useAdmin.subscribe((state) => console.log('Admin Store:', state))
}

// Hooks
export const useAdminStore = () =>
    useAdmin(
        useShallow((state) => ({
            members: state.members,
            payments: state.payments,
            fetching: state.fetching
        }))
    )

// Actions
export const getAdminStore = () => useAdmin.getState()

export const setMembers = useAdmin.getState().setMembers
export const setPayments = useAdmin.getState().setPayments
export const addMember = useAdmin.getState().addMember
export const updateMember = useAdmin.getState().updateMember
export const delMember = useAdmin.getState().delMember
export const addPayment = useAdmin.getState().addPayment
export const updatePayment = useAdmin.getState().updatePayment
export const delPayment = useAdmin.getState().delPayment