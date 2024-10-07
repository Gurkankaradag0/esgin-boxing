import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.method('comparePassword', async function (password) {
    return await bcrypt.compare(password, this.password)
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User
