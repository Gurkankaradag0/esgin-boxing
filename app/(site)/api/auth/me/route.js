import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import User from '@/models/User'
import dbConnect from '@/lib/mongodb'

export const GET = async (req) => {
    const token = req.cookies.get('access-token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
        await dbConnect()
        const user = await User.findById(decoded.userId).select('name email isAdmin')

        return NextResponse.json({ user: { ...user._doc }, message: 'Successful' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}
