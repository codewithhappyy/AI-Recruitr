import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { register, login } from './controllers/auth.js';
import { updateProfile } from './controllers/profile.js'
import auth from './middleware/auth.js'
import jobRoutes from './routes/jobRoutes.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.post('/register', register);
app.post('/login', login);
app.post('/profileUpdate', auth,  updateProfile);
app.use('/api',auth, jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
