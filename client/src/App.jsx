import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './pages/homePage.jsx'
import ProfileEdit from './components/Profile/ProfileEdit.jsx'
import ProtectedRoute from './components/Auth/protectedRoutes.jsx';
import JobDescription from './components/jobDetails.jsx';
import ProfilePage from './components/Profile/Profile.jsx';
import { JobMatches } from './components/RecommendedJobs.jsx';

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profileEdit" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/jobDescription" element={<ProtectedRoute><JobDescription /></ProtectedRoute>} />
        <Route path="/recommendedJobs" element={<ProtectedRoute><JobMatches /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}