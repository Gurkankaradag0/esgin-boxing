import { NextResponse } from 'next/server'

export const POST = async (req) => {
    const response = NextResponse.json({ message: 'Logout successful' })
    response.cookies.delete('access-token')

    return response
}
