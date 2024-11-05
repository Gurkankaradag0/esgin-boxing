import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Settings from '@/models/Settings'
import Member from '@/models/Members'

export const GET = async (req) => {
    const token = req.cookies.get('access-token')?.value

    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')

        await dbConnect()
        const user = await User.findById(decoded.userId).select('isAdmin')

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        let settings = await Settings.findOne({})
        if (!settings) {
            settings = await Settings.create({})
            await Member.updateMany({ courseType: 'group' }, { amountToBePaid: settings.groupPrice })
        }

        const members = await Member.find({}).populate({ path: 'author', select: '_id name email' })

        return NextResponse.json({ settings: { ...settings._doc }, members }, { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}

export const POST = async (req) => {
    const token = req.cookies.get('access-token')?.value

    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')

        await dbConnect()
        const user = await User.findById(decoded.userId).select('isAdmin')

        if (!user._doc.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const values = await req.json()
        const _id = values._id
        delete values._id

        let settings = await Settings.findOneAndUpdate({ _id }, values, { returnDocument: 'after' })
        await Member.updateMany({ courseType: 'group' }, { amountToBePaid: settings.groupPrice })
        const members = await Member.find({}).populate({ path: 'author', select: '_id name email' })

        return NextResponse.json({ settings: { ...settings._doc }, members }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
}
