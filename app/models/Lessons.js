import mongoose, { Schema } from 'mongoose'

const LessonSchema = new Schema(
    {
        day: { type: String, required: true },
        hour: { type: Number, required: true },
        courseType: { type: String, required: true },
        members: [{ type: Schema.Types.ObjectId, ref: 'Member', required: true }],
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Lesson = mongoose.models.Lesson || mongoose.model('Lesson', LessonSchema)
export default Lesson
