import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Lesson from '@/models/Lessons'

export const GET = async (req) => {
    const token = req.cookies.get('access-token')?.value

    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')

        await dbConnect()
        const user = await User.findById(decoded.userId).select('isAdmin')

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const lessons = await Lesson.find({}).populate([
            {
                path: 'author',
                select: '_id name email'
            },
            {
                path: 'members',
                select: '_id name'
            }
        ])

        return NextResponse.json({ lessons }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token', message: err.message }, { status: 401 })
    }
}
