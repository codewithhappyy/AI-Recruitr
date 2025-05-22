import Profile from '../models/Profile.model.js';
import mongoose from 'mongoose';

export const updateProfile = async (req, res) => {
  try {
    const { name, email, location, experience, skills, jobType } = req.body;

    let normalizedSkills = [];
    if (Array.isArray(skills)) {
      normalizedSkills = skills.map(skill => skill.trim());
    } else if (typeof skills === 'string') {
      normalizedSkills = skills.split(',').map(skill => skill.trim());
    }

    const profileFields = {
      name,
      email,
      location,
      experience,
      skills: normalizedSkills,
      jobType,
    };

    let profile = await Profile.findOne({ email: email });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { email: email },
        { $set: profileFields },
        { new: true }
      );
      return res.json({ message: 'Profile updated successfully', profile });
    } else {
      // Create new profile
      profile = new Profile(profileFields);
      await profile.save();
      return res.json({ message: 'Profile created successfully', profile });
    }
  } catch (err) {
    console.error('Update Profile Error:', err);
    return res.status(500).json({ message: 'Server Error' });
  }
};
