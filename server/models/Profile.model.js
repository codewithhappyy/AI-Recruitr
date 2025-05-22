import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, // ensures email is unique in the collection
        required: true, // (optional but recommended)
        lowercase: true, // normalizes the email
        trim: true // removes leading/trailing whitespace
    },
    name: String,
    location: String,
    experience: Number,
    skills: [String],
    jobType: String
});

export default mongoose.model('Profile', ProfileSchema);