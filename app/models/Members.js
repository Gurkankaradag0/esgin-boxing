import mongoose, { Schema } from 'mongoose'

const MemberSchema = new Schema(
    {
        name: { type: String, required: true },
        registrationDate: { type: Date, required: true },
        phoneNumber: { type: String, default: '' },
        courseType: { type: String, required: true },
        amountToBePaid: { type: Number, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Member = mongoose.models.Member || mongoose.model('Member', MemberSchema)
export default Member
