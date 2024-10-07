export const GetMe = async () => {
    const res = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include'
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}

export const Register = async (data) => {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}

export const Login = async (data) => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}

export const Logout = async () => {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })

    return { data: { ...(await res.json()) }, status: res.status, ok: res.ok }
}
