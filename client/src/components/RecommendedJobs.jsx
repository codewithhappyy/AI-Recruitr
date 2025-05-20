import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

export const JobMatches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const matches = location.state.jobs || [];
  console.log(matches)
  if (!matches.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Job Matches Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Recommended Job Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {matches.map((job, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{job.JobTitle}</h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-600">Company:</span>{" "}
                {job.CompanyName || <span className="text-gray-400">TBA</span>}
              </p>
              <p className="font-semibold text-gray-600 mb-1">Skills Required:</p>
              <ul className="list-disc list-inside mb-3">
                {(job.Skills ? job.Skills.split(',').map(skill => skill.trim()) : []).map((skill, i) => (
                  <li key={i} className="text-gray-700">{skill}</li>
                ))}
              </ul>
              <p className="font-semibold text-gray-600">
                Salary: <span className="text-green-600 font-bold">₹{job.SalaryInt.toLocaleString("en-IN")}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};
