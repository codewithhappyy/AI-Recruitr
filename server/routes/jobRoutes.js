import express from 'express'
import Job from '../models/jobModel.js'
import Profile from '../models/Profile.model.js'
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

router.get('/user', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.post('/job-matches', async (req, res) => {
    try {
        const userDetails = req.body;
        console.log(req.body);
        if (!userDetails) {
            return res.status(400).json({ message: "User profile data is required" });
        }

        //call ai api with userProfile
        async function getJobSuggestions(userDetails) {
            // Initialize the Gemini client
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
            // Construct the prompt
            const prompt = `Based on the following user profile, suggest the top 3 most suitable job opportunities:
        Name: ${userDetails.name}
        Location: ${userDetails.location}
        Years of Experience: ${userDetails.yearsOfExperience}
        Skills: ${userDetails.skills.join(', ')}
        Preferred Job Type: ${userDetails.preferredJobType}
        
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
        
            // Call the Gemini API
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt,
            });
        
            // Return the generated text
            //Job title jobCompany skills: and salary
            return response.text;
        }
        getJobSuggestions(userDetails)
            .then(suggestions => {
                res.send(suggestions);
            })
            .catch(error => {
                console.error("Error getting job suggestions:", error);
            });


    } catch (error) {
        if (error.response) {
            console.error('OpenAI error:', error.response.status, error.response.data);
            res.status(error.response.status).json({ message: error.response.data.error.message });
        } else {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    }
})

export default router;