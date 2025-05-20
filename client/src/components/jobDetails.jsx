import { useLocation } from 'react-router-dom';
import Header from './Header';

function JobDescription() {
  const location = useLocation();
  const { job } = location.state || {};

  if (!job) {
    return <div>No job details found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200">
      <Header />

      <div className="max-w-2xl mx-auto mt-10 ">
        {/* Job Description Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{job.title} - <i>{job.company}</i></h2>
            <span className="text-gray-500 text-base">{job.location}</span>
          </div>
          <div className="text-gray-700 mb-1">
            <span className="font-semibold">Skills:</span> {job.skills?.join(', ')}
          </div>
          <hr className="my-4" />
        </div>

        {/* Application Question Form */}
        <form>
          <label className="block text-xl font-bold text-gray-900 mb-2">
            What interests you about working for this company?
          </label>
          <textarea
            rows={5}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-8 resize-none"
            placeholder="Share your motivation, goals, or what excites you about this role..."
            required
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-6">
            <button
              type="button"
              className="text-lg font-medium text-gray-900 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-gray-900 text-white text-lg font-semibold hover:bg-gray-800 transition"
            >
              Send application
            </button>
          </div>
        </form>
      </div>


    </div>
  );
}

export default JobDescription;
