import { NextResponse } from 'next/server'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export const POST = async (req) => {
    await dbConnect()
    const { name, email, password } = await req.json()
    const userExists = await User.findOne({ email })

    if (userExists) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const user = await User.create({ name, email, password })

    return NextResponse.json({ user: { ...user }, message: 'User created successfully' })
}
