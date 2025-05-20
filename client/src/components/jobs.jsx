import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5020/api/jobs', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        // Since your API returns an array, just set it directly
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setError('Jobs data is not an array');
        }
      })
      .catch(err => setError('Failed to fetch jobs'));
  }, []);

  if (error) return <div>Error: {error}</div>;

  function handleClick(job){
    navigate('/jobDescription', { state: { job }});    
  }

  return (
    <div className="w-4/5 mx-auto mt-10 p-6 bg-bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200 rounded-xl shadow-2xl">
  <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Job Listings</h2>
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {jobs.map(job => (
      <li
        onClick={()=>handleClick(job)}
        key={job._id}
        className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100"
      >
        <strong className="text-lg text-indigo-700">{job.title}</strong>
        <span className="text-gray-600"> at </span>
        <span className="font-medium text-gray-800">{job.company}</span>
        <span className="text-gray-500"> ({job.location})</span>
        <div className="mt-2">
          <span className="font-semibold text-gray-700">Skills:</span>
          <span className="ml-2 text-gray-600">
            {job.skills?.join(', ')}
          </span>
        </div>
      </li>
    ))}
  </ul>
</div>

  
  );
}

export default JobList;
