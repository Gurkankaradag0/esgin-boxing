import { toast } from '@/hooks/use-toast'

import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

import {
    AddLesson,
    AddMember,
    AddPayment,
    DelLesson,
    DelMember,
    DelPayment,
    UpdateLesson,
    UpdateMember,
    UpdatePayment,
    UpdateSettings
} from '@/services/AdminServices'
import {
    addLesson,
    addMember,
    addPayment,
    delLesson,
    delMember,
    delPayment,
    setMembers,
    setSettings,
    updateLesson,
    updateMember,
    updatePayment
} from '@/store/adminStore'

export const UpdateSettingsAction = async (values) => {
    const response = await UpdateSettings(values)
    if (response.ok) {
        setSettings(response.data.settings)
        setMembers(response.data.members)
        toast({
            title: 'Ayarlar Güncellendi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    } else {
        toast({
            title: 'Ayarlar Güncellenemedi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    }
    return response
}

export const AddMemberAction = async (values) => {
    const response = await AddMember(values)
    if (response.ok) {
        addMember(response.data)
        toast({
            title: 'Üye Eklendi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    } else {
        toast({
            title: 'Üye Eklenemedi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    }
    return response
}

export const UpdateMemberAction = async (values) => {
    const response = await UpdateMember(values)
    if (response.ok) {
        updateMember(response.data._id, response.data)
        toast({
            title: 'Üye Düzenlendi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    } else {
        toast({
            title: 'Üye Düzenlenemedi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    }
    return response
}

export const DelMemberAction = async (member_id) => {
    const response = await DelMember(member_id)
    if (response.ok) {
        delMember(response.data._id)
        toast({
            title: 'Üye Silindi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    } else {
        toast({
            title: 'Üye Silinemedi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    }
    return response
}

export const AddPaymentAction = async (values) => {
    const response = await AddPayment(values)
    if (response.ok) {
        addPayment(response.data)
        toast({
            title: 'Ödeme Eklendi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    } else {
        toast({
            title: 'Ödeme Eklenemedi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    }
    return response
}

export const UpdatePaymentAction = async (values) => {
    const response = await UpdatePayment(values)
    if (response.ok) {
        updatePayment(response.data._id, response.data)
        toast({
            title: 'Ödeme Düzenlendi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    } else {
        toast({
            title: 'Ödeme Düzenlenemedi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    }
    return response
}

export const DelPaymentAction = async (member_id) => {
    const response = await DelPayment(member_id)
    if (response.ok) {
        delPayment(response.data._id)
        toast({
            title: 'Ödeme Silindi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    } else {
        toast({
            title: 'Ödeme Silinemedi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    }
    return response
}

export const AddLessonAction = async (values) => {
    const response = await AddLesson(values)
    if (response.ok) {
        addLesson(response.data)
        toast({
            title: 'Ders Eklendi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    } else {
        toast({
            title: 'Ders Eklenemedi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    }
    return response
}

export const UpdateLessonAction = async (values) => {
    const response = await UpdateLesson(values)
    if (response.ok) {
        updateLesson(response.data._id, response.data)
        toast({
            title: 'Ders Düzenlendi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    } else {
        toast({
            title: 'Ders Düzenlenemedi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    }
    return response
}

export const DelLessonAction = async (member_id) => {
    const response = await DelLesson(member_id)
    if (response.ok) {
        delLesson(response.data._id)
        toast({
            title: 'Ders Silindi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    } else {
        toast({
            title: 'Ders Silinemedi',
            description: format(new Date(), 'PPP', { locale: tr })
        })
    }
    return response
}
