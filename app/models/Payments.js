import mongoose, { Schema } from 'mongoose'
import { PaymentDescriptions, PaymentTypes } from '@/utils/consts'

const PaymentSchema = new Schema(
    {
        paymentDate: { type: Date, required: true },
        paymentType: { type: String, required: true, enum: PaymentTypes.map((_type) => _type.value) },
        paymentAmount: { type: Number, required: true },
        paymentDescription: { type: String, required: true, enum: PaymentDescriptions.map((_type) => _type.value) },
        member: { type: Schema.Types.ObjectId, ref: 'Member', required: false },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema)
export default Payment
