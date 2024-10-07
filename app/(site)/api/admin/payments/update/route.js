import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Payment from '@/models/Payments'

export const POST = async (req) => {
    const token = req.cookies.get('access-token')?.value

    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
        await dbConnect()
        const user = await User.findById(decoded.userId).select('_id isAdmin')

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { _id, paymentDate, member } = await req.json()

        const payment = await Payment.findOneAndUpdate(
            { _id },
            {
                paymentDate,
                member,
                author: user._doc._id
            }
        )

        return NextResponse.json({ ...payment._doc }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}