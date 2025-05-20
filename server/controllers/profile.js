import Profile from '../models/Profile.model.js';

/**
 * Updates or creates a user's profile.
 * Expects authentication middleware to set req.user.id.
 */
export const updateProfile = async (req, res) => {
  try {
    // Destructure fields from request body
    const { name, location, experience, skills, jobType } = req.body;

    // Validate required fields (optional, but recommended)
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    // Normalize skills to an array
    let normalizedSkills = [];
    if (Array.isArray(skills)) {
      normalizedSkills = skills.map(skill => skill.trim());
    } else if (typeof skills === 'string') {
      normalizedSkills = skills.split(',').map(skill => skill.trim());
    }

    // Prepare fields to update
    const profileFields = {
      user: req.user.id,
      name,
      location,
      experience,
      skills: normalizedSkills,
      jobType,
    };

    // Upsert: Update if exists, create if not
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json({ message: 'Success', profile });
  } catch (err) {
    console.error('Update Profile Error:', err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const profile = async (req, res) => {
  try {
    // Find the profile by the authenticated user's ID
    const userProfile = await Profile.findOne({ user: req.user.id });

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    // Send the profile data
    return res.json(userProfile);
  } catch (err) {
    console.error('Fetch Profile Error:', err);
    return res.status(500).json({ message: 'Server Error' });
  }
}
