import mongoose, { Schema } from 'mongoose'

const PaymentSchema = new Schema(
    {
        paymentDate: { type: Date, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        member: { type: Schema.Types.ObjectId, ref: 'Member', required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema)
export default Payment
