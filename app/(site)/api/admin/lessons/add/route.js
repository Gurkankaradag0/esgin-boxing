import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Lesson from '@/models/Lessons'
import Member from '@/models/Members'

export const POST = async (req) => {
    const token = req.cookies.get('access-token')?.value

    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
        await dbConnect()
        const user = await User.findById(decoded.userId)

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { day, hour, courseType, members } = await req.json()

        const lesson = await Lesson.create({
            day,
            hour,
            courseType,
            members,
            author: user._doc._id
        })

        const memberDocs = (await Member.find({}).select('_id name')).filter((member) => members.includes(member._id.toString()))

        return NextResponse.json(
            { ...lesson._doc, members: memberDocs, author: { _id: user._id, name: user.name, email: user.email } },
            { status: 200 }
        )
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token', message: err.message }, { status: 401 })
    }
}
