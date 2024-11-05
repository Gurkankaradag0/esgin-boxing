import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Payment from '@/models/Payments'
import Member from '@/models/Members'

export const POST = async (req) => {
    const token = req.cookies.get('access-token')?.value

    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
        await dbConnect()
        const user = await User.findById(decoded.userId)

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { paymentDate, member } = await req.json()

        const payment = await Payment.create({
            paymentDate,
            member,
            author: user._doc._id
        })

        const memberDoc = await Member.findById(member).select('_id name')

        return NextResponse.json(
            { ...payment._doc, member: memberDoc, author: { _id: user._id, name: user.name, email: user.email } },
            { status: 200 }
        )
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}
