import dbConnect from '@/lib/mongodb'
import Member from '@/models/Members'
import Payment from '@/models/Payments'
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'

export const GET = async (req) => {
    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()

    await dbConnect()
    const membersCollection = mongoose.connection.collection('members')
    const paymentsCollection = mongoose.connection.collection('payments')
    const membersStream = membersCollection.watch()
    const paymentsStream = paymentsCollection.watch()

    membersStream.on('change', async (change) => {
        if (change.operationType === 'insert') {
            change.fullDocument = (await Member.findById(change.documentKey._id).populate('author', 'name email'))._doc
        }
        writer.write(`data: ${JSON.stringify(change)}\n\n`)
    })

    paymentsStream.on('change', async (change) => {
        if (change.operationType === 'insert') {
            try {
                change.fullDocument = (
                    await Payment.findById(change.documentKey._id).populate([
                        {
                            path: 'author',
                            select: 'name email'
                        },
                        {
                            path: 'member',
                            select: 'name'
                        }
                    ])
                )._doc
            } catch (err) {
                console.log(err)
            }
        }
        writer.write(`data: ${JSON.stringify(change)}\n\n`)
    })

    req.signal.onabort = () => {
        membersStream.close()
        paymentsStream.close()
        writer.close()
    }

    return new Response(readable, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/event-stream; charset=utf-8',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache, no-transform',
            'X-Accel-Buffering': 'no',
            'Content-Encoding': 'none'
        }
    })
}
