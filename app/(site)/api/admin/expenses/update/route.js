import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Expense from '@/models/Expenses'

export const POST = async (req) => {
    const token = req.cookies.get('access-token')?.value

    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
        await dbConnect()
        const user = await User.findById(decoded.userId).select('_id isAdmin')

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { _id, expenseDate, expenseAmount, description } = await req.json()

        const expense = await Expense.findOneAndUpdate(
            { _id },
            {
                expenseDate,
                expenseAmount,
                description
            },
            {
                returnDocument: 'after',
                populate: [{ path: 'author', select: '_id name email' }]
            }
        )

        return NextResponse.json({ ...expense._doc }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}
