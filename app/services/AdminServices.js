export const GetMembers = async () => {
    const res = await fetch('/api/admin/members', {
        method: 'GET',
        credentials: 'include'
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}

export const AddMember = async (values) => {
    const res = await fetch('/api/admin/members/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}

export const UpdateMember = async (values) => {
    const res = await fetch('/api/admin/members/update', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}

export const DelMember = async (_id) => {
    const res = await fetch('/api/admin/members/del', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id })
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}

export const GetPayments = async () => {
    const res = await fetch('/api/admin/payments', {
        method: 'GET',
        credentials: 'include'
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}

export const AddPayment = async (values) => {
    const res = await fetch('/api/admin/payments/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}

export const UpdatePayment = async (values) => {
    const res = await fetch('/api/admin/payments/update', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}

export const DelPayment = async (_id) => {
    const res = await fetch('/api/admin/payments/del', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id })
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}