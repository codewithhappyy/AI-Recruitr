import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:5020/login', { email, password });
      if(result.data.message === 'Success'){
        // Optionally store token: localStorage.setItem('token', result.data.token);
        localStorage.setItem('email', email);
        localStorage.setItem('token', result.data.token);
        navigate('/home');
      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert('Invalid credentials');
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold transition"
        >
          Log In
        </button>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Not a member yet? </span>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline font-semibold ml-1"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
