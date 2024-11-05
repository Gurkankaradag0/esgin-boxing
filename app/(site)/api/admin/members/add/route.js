import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Member from '@/models/Members'

export const POST = async (req) => {
    const token = req.cookies.get('access-token')?.value

    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
        await dbConnect()
        const user = await User.findById(decoded.userId)

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { name, registrationDate, phoneNumber, courseType, amountToBePaid } = await req.json()

        const member = await Member.create({
            name,
            registrationDate,
            phoneNumber,
            courseType,
            amountToBePaid,
            author: user._doc._id
        })

        return NextResponse.json({ ...member._doc, author: { _id: user._id, name: user.name, email: user.email } }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}
