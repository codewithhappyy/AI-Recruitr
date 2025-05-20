import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();
mongoose.connect(process.env.DB_URI)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

export default mongoose;

