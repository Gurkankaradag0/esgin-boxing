import mongoose, { Schema } from 'mongoose'

const SettingsSchema = new Schema(
    {
        groupPrice: { type: Number, default: 0 }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema)
export default Settings
