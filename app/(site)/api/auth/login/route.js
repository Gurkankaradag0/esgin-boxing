import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export const POST = async (req) => {
    await dbConnect()
    const { email, password } = await req.json()
    const user = await User.findOne({ email })

    if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    delete user._doc.password

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })
    const response = NextResponse.json({ user: { ...user._doc, token: { accessToken: token } }, message: 'Login successful' })
    response.cookies.set('access-token', token, { maxAge: 604800, httpOnly: true, path: '/', sameSite: 'strict' })

    return response
}
