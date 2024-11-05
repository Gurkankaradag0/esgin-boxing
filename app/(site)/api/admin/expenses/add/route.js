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
        const user = await User.findById(decoded.userId)

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { expenseDate, expenseAmount, description } = await req.json()

        const expense = await Expense.create({
            expenseDate,
            expenseAmount,
            description,
            author: user._doc._id
        })

        return NextResponse.json({ ...expense._doc, author: { _id: user._id, name: user.name, email: user.email } }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}
