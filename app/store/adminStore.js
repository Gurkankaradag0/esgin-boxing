import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useAdmin = create((set, get) => ({
    members: [],
    payments: [],
    lessons: [],
    fetching: false,
    setMembers: (members) => set({ members }),
    setPayments: (payments) => set({ payments }),
    setLessons: (lessons) => set({ lessons }),
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
    },
    addLesson: (lesson) => {
        const { lessons } = get()
        set({ lessons: [...lessons, lesson] })
    },
    updateLesson: (lessonId, updatedFields) => {
        const { lessons } = get()
        set({
            lessons: [
                ...lessons.filter((lesson) => lesson._id !== lessonId),
                {
                    ...lessons.find((lesson) => lesson._id === lessonId),
                    ...updatedFields
                }
            ]
        })
    },
    delLesson: (lessonId) => {
        const { lessons } = get()
        set({ lessons: lessons.filter((lesson) => lesson._id !== lessonId) })
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
            lessons: state.lessons,
            fetching: state.fetching
        }))
    )

// Actions
export const getAdminStore = () => useAdmin.getState()

export const setMembers = useAdmin.getState().setMembers
export const setPayments = useAdmin.getState().setPayments
export const setLessons = useAdmin.getState().setLessons
export const addMember = useAdmin.getState().addMember
export const updateMember = useAdmin.getState().updateMember
export const delMember = useAdmin.getState().delMember
export const addPayment = useAdmin.getState().addPayment
export const updatePayment = useAdmin.getState().updatePayment
export const delPayment = useAdmin.getState().delPayment
export const addLesson = useAdmin.getState().addLesson
export const updateLesson = useAdmin.getState().updateLesson
export const delLesson = useAdmin.getState().delLesson
