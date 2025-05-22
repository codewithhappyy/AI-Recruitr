import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('profileForm');
    navigate('/');
  };

  const handleMatches = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      const response = await axios.get('http://localhost:5020/api/job_matches', {
        headers: { authorization: `bearer ${token}` },
        params: { email: email }
      });

      const matches = response.data;

      const match = matches.match(/\[([\s\S]*?)\]/);

      if (match) {
        const arrayContent = `[${match[1]}]`;
        const jobs = JSON.parse(arrayContent);
        navigate('/recommendedJobs', { state: { jobs } })
      }
    } catch (error) {
      alert('Failed to fetch job matches.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-2">
      <header className="flex justify-between items-center w-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl px-6 py-3 shadow-lg">
        <a
          href="/home"
          className="text-3xl font-extrabold text-white p-2 transition-transform duration-200 hover:scale-105 hover:text-yellow-300"
          style={{ letterSpacing: "2px" }}
        >
          <span className="inline-block animate-bounce mr-2">🤖</span>
          AI Job Search
        </a>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/profile')}
            className="text-xl text-white px-4 py-2 rounded-md transition-all duration-200 font-semibold hover:bg-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            type="button"
          >
            <span className="inline-block mr-1">👤</span> Profile
          </button>
          
          <button
            onClick={handleMatches}
            disabled={isLoading}
            className="text-xl text-white px-4 py-2 rounded-md transition-all duration-200 font-semibold hover:bg-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-300 relative"
            type="button"
          >
            {isLoading ? (
              <>
                <span className="inline-block mr-1">⏳</span>
                <span className="loading-dots">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </span>
              </>
            ) : (
              <>
                <span className="inline-block mr-1">🔍</span> 
                Find My Matches
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="text-xl text-white px-4 py-2 rounded-md transition-all duration-200 font-semibold hover:bg-red-500/80 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300"
            type="button"
          >
            <span className="inline-block mr-1">🚪</span> Logout
          </button>
        </div>
      </header>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Analyzing your profile...</p>
            <p className="text-sm text-gray-600">Finding the perfect job matches for you</p>
          </div>
        </div>
      )}
    </div>
  );
}
