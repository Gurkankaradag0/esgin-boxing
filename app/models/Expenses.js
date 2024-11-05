import mongoose, { Schema } from 'mongoose'

const ExpenseSchema = new Schema(
    {
        expenseDate: { type: Date, required: true },
        expenseAmount: { type: Number, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema)
export default Expense
