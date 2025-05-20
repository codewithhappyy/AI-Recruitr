import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleMatches = async () => {
    const token = localStorage.getItem('token');
    try {
      const userProfile = await axios.get('http://localhost:5020/api/user', {
        headers: { authorization: `Bearer ${token}` }
      });
      if (!userProfile) {
        alert('User profile not found.');
        return;
      }
      const response = await axios.post('http://localhost:5020/api/job-matches', userProfile.data, {
        headers: { authorization: `bearer ${token}` }
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
            className="text-xl text-white px-4 py-2 rounded-md transition-all duration-200 font-semibold hover:bg-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            type="button"
          >
            <span className="inline-block mr-1">🔍</span> Find My Matches
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
    </div>
  );
}
