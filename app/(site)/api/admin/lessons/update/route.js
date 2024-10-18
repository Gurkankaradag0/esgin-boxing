import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Lesson from '@/models/Lessons'

export const POST = async (req) => {
    const token = req.cookies.get('access-token')?.value

    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
        await dbConnect()
        const user = await User.findById(decoded.userId).select('_id isAdmin')

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { _id, day, hour, courseType, members } = await req.json()

        const lesson = await Lesson.findOneAndUpdate(
            { _id },
            {
                day,
                hour,
                courseType,
                members,
                author: user._doc._id
            }
        )

        return NextResponse.json({ ...lesson._doc }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}
