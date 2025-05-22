import express from 'express'
import Job from '../models/jobModel.js'
import Profile from '../models/Profile.model.js'
import User from '../models/user.model.js'
import dotenv from 'dotenv'
import axios from 'axios'
import { GoogleGenAI } from '@google/genai';
dotenv.config();
const router = express.Router();

router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
});

router.get('/user_data', async (req, res) => {
    try {
        const profile = await User.findOne({ email: req.query.email });
        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.get('/profile_data', async (req, res) => {
    try {
        const profile = await Profile.findOne({ email: req.query.email });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.get('/job_matches', async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
    return res.status(400).json({ message: "Email is required" });
}

        const userDetails = await Profile.findOne({ email: email });

        if (!userDetails) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
            // Construct the prompt
        const prompt = `Based on the following user profile, suggest the  top 3 most suitable job opportunities:
            Name: ${userDetails.name || "Not specified"}
            Location: ${userDetails.location || "Not specified"}
            Years of Experience: ${userDetails.experience || 0}
            Skills: ${userDetails.skills?.join(', ') || "No skills listed"}
            Preferred Job Type: ${userDetails.jobType || "Not specified"}
        
        Please provide:
        1. JobTitle
        2. CompanyName
        4. Skills 
        5. SalaryInt
        
        Format must be  JSON array of objects like 
            {
                JobTitle: "",
                CompanyName: "",
                Skills:"",
                SalaryInt:""
            }

        `;
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt,
            });

            res.send(response.text);

    } catch (error) {
        console.error("Error in job-matches:", error);
        res.status(500).json({ 
            message: "Server Error",
            error: error.message 
        });
    }
})

export default router;