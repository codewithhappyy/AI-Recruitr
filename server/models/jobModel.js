import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true},
    company: { type: String, required: true},
    location: { type: String, required: true},
    skills: [String]
})

export default mongoose.model('Job', JobSchema);