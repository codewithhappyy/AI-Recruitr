import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: String,
    location: String,
    experience: Number,
    skills: [String],
    jobType: String
});

export default mongoose.model('Profile', ProfileSchema);