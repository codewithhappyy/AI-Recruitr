import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Header'
import axios from 'axios'

const getRandomSeed = () => Math.random().toString(36).substring(2, 10);

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    experience: "",
    skills: [],
    jobType: ""
  });
  
  useEffect(() => {
    const getDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        const res = await axios.get('http://localhost:5020/api/profile_data', {
          headers: { Authorization: `Bearer ${token}` }, 
          params: { email: email }
        });
        setUser(res.data);
      } catch (error) {
        console.log("Failed to fetch user data", error);
      }
    };
    getDetails();
  }, []);


  const avatarSeed = user?.name || getRandomSeed();

  return (
    <div>
      <Header />
<div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        {/* Cartoon Avatar */}
        <img
          src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${encodeURIComponent(avatarSeed)}`}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full mb-6 border-4 border-indigo-300 shadow"
        />

        {/* User Details */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{user?.name || "Your Name"}</h2>
        <div className="text-gray-600 mb-1">
          <span className="font-semibold">Email:</span> {user?.email || "Unknown"}
        </div>
        <div className="text-gray-600 mb-1">
          <span className="font-semibold">Location:</span> {user?.location || "Unknown"}
        </div>
        <div className="text-gray-600 mb-1">
          <span className="font-semibold">Experience:</span> {user?.experience || "0"} years
        </div>
        <div className="text-gray-600 mb-1">
          <span className="font-semibold">Skills:</span>{" "}
          {user?.skills?.length
            ? user.skills.join(", ")
            : "No skills listed"}
        </div>
        <div className="text-gray-600 mb-6">
          <span className="font-semibold">Preferred Job Type:</span> {user?.jobType || "Any"}
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => navigate("/profileEdit")}
          className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
    </div>
    
  );
}

// Example usage
// <ProfilePage user={{
//   name: "Amit Kumar",
//   location: "Hyderabad",
//   experience: 3,
//   skills: ["React", "Node.js", "SQL"],
//   jobType: "Remote"
// }} />
