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

        const values = await req.json()

        !values.member && delete values.member

        const payment = await Payment.create({
            ...values,
            author: user._doc._id
        })

        const result = {
            ...payment._doc,
            author: { _id: user._id, name: user.name, email: user.email }
        }

        values.member && (result.member = await Member.findById(values.member).select('_id name'))

        return NextResponse.json(result, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token', message: err.message }, { status: 401 })
    }
}
