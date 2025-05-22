import mongoose from "../config/db.js";

const userSchema = new mongoose.Schema({ 
  name: String,
  email: {
    type: String,
    unique: true, // ensures email is unique in the collection
    required: true, // (optional but recommended)
    lowercase: true, // normalizes the email
    trim: true // removes leading/trailing whitespace
  },
  password: String
});

const User = mongoose.model('User', userSchema);
export default User;
