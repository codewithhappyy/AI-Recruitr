import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Header";

const ALL_SKILLS = [
  "JavaScript", "React", "Node.js", "Python", "Java", "SQL", "AWS", "Docker"
];
const JOB_TYPES = [
  { label: "Remote", value: "remote" },
  { label: "Onsite", value: "onsite" },
  { label: "Any", value: "any" }
];

export default function ProfileEdit() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    name: "",
    location: "",
    experience: "",
    skills: [],
    jobType: ""
  });

  // Fetch user details and prefill form
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get('http://localhost:5020/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const profileData = {
          name: res.data.name || "",
          location: res.data.location || "",
          experience: res.data.experience || "",
          skills: res.data.skills || [],
          jobType: res.data.jobType || ""
        };

        setForm(profileData);

      } catch (err) {
        console.error('Failed to fetch user details', err);
      }
    };
    fetchUserDetails();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter(skill => skill !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5020/profileUpdate',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      navigate('/home');
    } catch (err) {
      alert('Failed to save profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200 flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center my-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white/70 rounded-3xl shadow-2xl p-10 border border-white/30"
          autoComplete="off"
        >
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">
            <span className="inline-block bg-gradient-to-r from-indigo-500 via-blue-400 to-purple-400 text-transparent bg-clip-text">Profile</span>
          </h2>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition transform hover:scale-105"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-5">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition transform hover:scale-105"
              placeholder="Enter your location"
              required
            />
          </div>

          {/* Experience */}
          <div className="mb-5">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Years of Experience</label>
            <input
              type="number"
              name="experience"
              min={0}
              value={form.experience}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition transform hover:scale-105"
              placeholder="Enter years of experience"
              required
            />
          </div>

          {/* Skills */}
          <div className="mb-5">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Skills</label>
            <div className="flex flex-wrap gap-3">
              {ALL_SKILLS.map(skill => (
                <label key={skill} className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-lg shadow-sm hover:bg-indigo-100 transition">
                  <input
                    type="checkbox"
                    value={skill}
                    checked={form.skills.includes(skill)}
                    onChange={handleSkillChange}
                    className="accent-indigo-500"
                  />
                  <span className="text-gray-700 font-medium">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Preferred Job Type</label>
            <div className="flex gap-6">
              {JOB_TYPES.map(type => (
                <label key={type.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="jobType"
                    value={type.value}
                    checked={form.jobType === type.value}
                    onChange={handleChange}
                    className="accent-indigo-500"
                  />
                  <span className="text-gray-700 font-medium">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 px-4 text-lg font-bold rounded-xl bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 active:scale-95 transition duration-300"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
