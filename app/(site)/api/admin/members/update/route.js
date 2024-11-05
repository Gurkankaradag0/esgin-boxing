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
        const user = await User.findById(decoded.userId).select('_id isAdmin')

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { _id, name, registrationDate, phoneNumber, courseType, amountToBePaid } = await req.json()

        const member = await Member.findOneAndUpdate(
            { _id },
            {
                name,
                registrationDate,
                phoneNumber,
                courseType,
                amountToBePaid
            },
            { returnDocument: 'after', populate: { path: 'author', select: '_id name email' } }
        )

        return NextResponse.json({ ...member._doc }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}
